"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from "leaflet";
import type { LocationCluster } from "@/lib/logsRepo";

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c] as string,
  );
}

/**
 * Renders clustered log origins on an OpenStreetMap. Leaflet is imported lazily
 * inside the effect so the static-export prerender never touches `window`.
 * Uses circle markers (vector) to avoid Leaflet's default icon image assets,
 * which break under the site's basePath.
 */
export default function LogsMap({ clusters }: { clusters: LocationCluster[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        worldCopyJump: true,
        scrollWheelZoom: false,
      }).setView([20, 0], 2);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);

      const max = clusters.reduce((m, c) => Math.max(m, c.count), 1);
      const bounds: [number, number][] = [];

      for (const c of clusters) {
        const radius = 6 + 14 * Math.sqrt(c.count / max);
        const place =
          [c.city, c.region, c.country].filter(Boolean).join(", ") ||
          "Unknown location";
        const orgs = c.orgs.length
          ? `<div style="margin-top:4px;color:#6b6157">${escapeHtml(
              c.orgs.slice(0, 4).join(", "),
            )}</div>`
          : "";
        L.circleMarker([c.latitude, c.longitude], {
          radius,
          color: "#e85d3d",
          weight: 1.5,
          fillColor: "#e85d3d",
          fillOpacity: 0.4,
        })
          .addTo(map)
          .bindPopup(
            `<strong>${escapeHtml(place)}</strong><br/>${c.count} 筆紀錄${orgs}`,
          );
        bounds.push([c.latitude, c.longitude]);
      }

      if (bounds.length) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 6 });
      }
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [clusters]);

  return (
    <div
      ref={containerRef}
      className="h-[420px] w-full overflow-hidden rounded-2xl border border-[#1a1712]/15"
      style={{ background: "#e8e2d6" }}
    />
  );
}
