"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  listLogs,
  clusterByLocation,
  countByCountry,
  type LogEntry,
} from "@/lib/logsRepo";
import LogsMap from "@/components/LogsMap";

function formatTime(ms: number | null): string {
  if (ms == null) return "—";
  return new Date(ms).toLocaleString();
}

function formatLocation(l: LogEntry): string {
  return [l.city, l.region, l.country].filter(Boolean).join(", ") || "—";
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setLogs(await listLogs());
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const clusters = useMemo(() => clusterByLocation(logs), [logs]);
  const countries = useMemo(() => countByCountry(logs), [logs]);
  const maxCountry = countries[0]?.count ?? 1;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="accent-text">Logs</span>
          </h1>
          <p className="mt-2 text-sm text-[#6b6157]">紀錄 · {logs.length} 筆</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={load}
            disabled={loading}
            className="rounded-full border border-[#1a1712]/25 px-5 py-2.5 text-sm font-medium text-[#1a1712] transition-colors hover:bg-[#1a1712]/5 disabled:opacity-50"
          >
            重新整理
          </button>
          <Link
            href="/admin"
            className="rounded-full border border-[#1a1712]/25 px-5 py-2.5 text-sm font-medium text-[#1a1712] transition-colors hover:bg-[#1a1712]/5"
          >
            ← 返回
          </Link>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-[#c73a2a]/30 bg-[#c73a2a]/10 px-4 py-3 text-sm text-[#c73a2a]">
          {error}
        </div>
      )}

      {!loading && logs.length > 0 && (
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <LogsMap clusters={clusters} />
            <p className="mt-2 text-xs text-[#6b6157]">
              {clusters.length} 個地點 · 圓圈大小代表紀錄數量
            </p>
          </div>
          <div className="paper-card rounded-2xl p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#6b6157]">
              國家 / 地區
            </h2>
            <ul className="mt-4 space-y-3">
              {countries.slice(0, 10).map((c) => (
                <li key={c.country}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#1a1712]">{c.country}</span>
                    <span className="text-[#6b6157]">{c.count}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#1a1712]/10">
                    <div
                      className="h-full rounded-full bg-[#e85d3d]"
                      style={{ width: `${(c.count / maxCountry) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-10">
        {loading ? (
          <div className="flex items-center gap-3 py-16 text-sm text-[#6b6157]">
            <div className="size-4 animate-spin rounded-full border-2 border-[#e85d3d]/30 border-t-[#e85d3d]" />
            Loading logs...
          </div>
        ) : logs.length === 0 ? (
          <div className="paper-card rounded-2xl p-12 text-center">
            <p className="text-[#6b6157]">目前沒有紀錄。</p>
          </div>
        ) : (
          <div className="paper-card overflow-x-auto rounded-2xl">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#1a1712]/15 text-xs uppercase tracking-wider text-[#6b6157]">
                  <th className="px-4 py-4">時間</th>
                  <th className="px-4 py-4">IP</th>
                  <th className="px-4 py-4">地區</th>
                  <th className="px-4 py-4">組織 / ISP</th>
                  <th className="hidden px-4 py-4 md:table-cell">來源</th>
                  <th className="hidden px-4 py-4 sm:table-cell">路徑</th>
                  <th className="hidden px-4 py-4 lg:table-cell">User-Agent</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((l) => (
                  <tr
                    key={l.id}
                    className="border-b border-[#1a1712]/10 align-top transition-colors last:border-0 hover:bg-[#1a1712]/[0.03]"
                  >
                    <td className="whitespace-nowrap px-4 py-4 text-[#6b6157]">
                      {formatTime(l.createdAt)}
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-[#1a1712]">
                      {l.ip || "—"}
                    </td>
                    <td className="px-4 py-4 text-[#6b6157]">
                      {formatLocation(l)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-[#1a1712]">
                        {l.org || l.isp || "—"}
                      </div>
                      {l.asn && (
                        <div className="mt-0.5 text-xs text-[#6b6157]">
                          AS{l.asn}
                        </div>
                      )}
                    </td>
                    <td className="hidden max-w-[16rem] truncate px-4 py-4 text-[#6b6157] md:table-cell">
                      {l.referrer || "—"}
                    </td>
                    <td className="hidden px-4 py-4 text-[#6b6157] sm:table-cell">
                      {l.path || "—"}
                    </td>
                    <td className="hidden max-w-[18rem] truncate px-4 py-4 text-xs text-[#6b6157] lg:table-cell">
                      {l.userAgent || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
