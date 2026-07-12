import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const COLLECTION = "logs";

export interface LogInput {
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  org: string;
  isp: string;
  asn: string;
  referrer: string;
  userAgent: string;
  path: string;
}

export interface LogEntry extends LogInput {
  id: string;
  createdAt: number | null; // epoch millis, null until server timestamp resolves
}

/** One map marker: a geographic point with the entries that share it. */
export interface LocationCluster {
  key: string;
  latitude: number;
  longitude: number;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  count: number;
  orgs: string[]; // distinct network orgs seen at this point
}

/** Aggregate row per country. */
export interface CountryCount {
  country: string;
  countryCode: string;
  count: number;
}

function toLogEntry(id: string, data: Record<string, unknown>): LogEntry {
  const ts = data.createdAt;
  return {
    id,
    ip: (data.ip as string) ?? "",
    city: (data.city as string) ?? "",
    region: (data.region as string) ?? "",
    country: (data.country as string) ?? "",
    countryCode: (data.countryCode as string) ?? "",
    latitude: typeof data.latitude === "number" ? data.latitude : 0,
    longitude: typeof data.longitude === "number" ? data.longitude : 0,
    org: (data.org as string) ?? "",
    isp: (data.isp as string) ?? "",
    asn: (data.asn as string) ?? "",
    referrer: (data.referrer as string) ?? "",
    userAgent: (data.userAgent as string) ?? "",
    path: (data.path as string) ?? "",
    createdAt: ts instanceof Timestamp ? ts.toMillis() : null,
  };
}

export async function recordLog(input: LogInput): Promise<void> {
  await addDoc(collection(db, COLLECTION), {
    ...input,
    createdAt: serverTimestamp(),
  });
}

export async function listLogs(): Promise<LogEntry[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => toLogEntry(d.id, d.data()));
}

const hasGeo = (l: LogEntry) => l.latitude !== 0 || l.longitude !== 0;

/**
 * Collapse entries into map markers. Points are merged when they round to the
 * same ~0.01° cell (about a city block) so repeat visits from one origin stack
 * into a single, count-weighted marker.
 */
export function clusterByLocation(logs: LogEntry[]): LocationCluster[] {
  const map = new Map<string, LocationCluster>();
  for (const l of logs) {
    if (!hasGeo(l)) continue;
    const key = `${l.latitude.toFixed(2)},${l.longitude.toFixed(2)}`;
    const existing = map.get(key);
    if (existing) {
      existing.count += 1;
      if (l.org && !existing.orgs.includes(l.org)) existing.orgs.push(l.org);
    } else {
      map.set(key, {
        key,
        latitude: l.latitude,
        longitude: l.longitude,
        city: l.city,
        region: l.region,
        country: l.country,
        countryCode: l.countryCode,
        count: 1,
        orgs: l.org ? [l.org] : [],
      });
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}

export function countByCountry(logs: LogEntry[]): CountryCount[] {
  const map = new Map<string, CountryCount>();
  for (const l of logs) {
    const country = l.country || "Unknown";
    const existing = map.get(country);
    if (existing) existing.count += 1;
    else
      map.set(country, {
        country,
        countryCode: l.countryCode,
        count: 1,
      });
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}
