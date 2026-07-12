"use client";

import { useEffect } from "react";
import { recordLog } from "@/lib/logsRepo";

const SESSION_KEY = "log-recorded";

interface IpWhoResponse {
  success?: boolean;
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  country_code?: string;
  latitude?: number;
  longitude?: number;
  connection?: { asn?: number; org?: string; isp?: string; domain?: string };
}

/**
 * Records one entry per browser session. Renders nothing and never surfaces an
 * error — any failure (blocked request, offline, rules) is swallowed so the
 * page is unaffected.
 */
export default function Logger() {
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");

    (async () => {
      try {
        let d: IpWhoResponse = {};
        try {
          const res = await fetch("https://ipwho.is/");
          d = (await res.json()) as IpWhoResponse;
        } catch {
          // network/API failure — still record client-side fields below
        }
        await recordLog({
          ip: d.ip ?? "",
          city: d.city ?? "",
          region: d.region ?? "",
          country: d.country ?? "",
          countryCode: d.country_code ?? "",
          latitude: typeof d.latitude === "number" ? d.latitude : 0,
          longitude: typeof d.longitude === "number" ? d.longitude : 0,
          org: d.connection?.org ?? "",
          isp: d.connection?.isp ?? "",
          asn: d.connection?.asn != null ? String(d.connection.asn) : "",
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          path: window.location.pathname,
        });
      } catch {
        // swallow: logging must never affect the page
      }
    })();
  }, []);

  return null;
}
