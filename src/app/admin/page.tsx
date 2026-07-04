"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { projects as mockProjects, type Project } from "@/lib/projects";
import { createProject, deleteProject, listProjects } from "@/lib/projectsRepo";
import { deleteImageByUrl } from "@/lib/uploadImage";

export default function AdminPage() {
  const { user, signOut } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setProjects(await listProjects());
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (p: Project) => {
    if (!confirm(`確定刪除「${p.title}」?此動作無法復原。`)) return;
    setBusy(p.id);
    try {
      await deleteProject(p.id);
      if (p.imageUrl) await deleteImageByUrl(p.imageUrl);
      setProjects((prev) => prev.filter((x) => x.id !== p.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(null);
    }
  };

  const handleSeed = async () => {
    setBusy("seed");
    setError(null);
    try {
      for (const p of mockProjects) {
        const { id: _id, ...input } = p;
        await createProject(input);
      }
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="gradient-text">Admin Dashboard</span>
          </h1>
          <p className="mt-2 text-sm text-[#798093]">
            Signed in as {user?.email}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/projects/new"
            className="glow-sm rounded-full bg-[#7796ff] px-6 py-2.5 text-sm font-medium text-[#fcfcfc] transition-all hover:bg-[#8ba5ff] active:translate-y-px"
          >
            + 新增專案
          </Link>
          <button
            onClick={() => signOut()}
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Sign out
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-[#ff6568]/30 bg-[#ff6568]/10 px-4 py-3 text-sm text-[#ff6568]">
          {error}
        </div>
      )}

      {/* Project list */}
      <div className="mt-10">
        {loading ? (
          <div className="flex items-center gap-3 py-16 text-sm text-[#798093]">
            <div className="size-4 animate-spin rounded-full border-2 border-[#7796ff]/30 border-t-[#7796ff]" />
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center">
            <p className="text-[#798093]">目前資料庫沒有專案。</p>
            <button
              onClick={handleSeed}
              disabled={busy === "seed"}
              className="mt-6 rounded-full border border-[#7796ff]/40 bg-[#7796ff]/10 px-6 py-2.5 text-sm font-medium text-[#a8bcff] transition-colors hover:bg-[#7796ff]/20 disabled:opacity-50"
            >
              {busy === "seed" ? "匯入中..." : "匯入範例資料(6 筆)"}
            </button>
          </div>
        ) : (
          <div className="glass-card overflow-hidden rounded-3xl">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-[#798093]">
                  <th className="px-6 py-4">專案</th>
                  <th className="hidden px-6 py-4 sm:table-cell">年份</th>
                  <th className="hidden px-6 py-4 md:table-cell">標籤</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.03]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {p.imageUrl ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={p.imageUrl}
                            alt=""
                            className="hidden h-10 w-16 rounded-lg object-cover sm:block"
                          />
                        ) : (
                          <div className="hidden h-10 w-16 items-center justify-center rounded-lg border border-white/10 bg-[#7796ff]/5 sm:flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              className="text-[#7796ff]/40"
                              aria-hidden
                            >
                              <path d="m18 16 4-4-4-4" />
                              <path d="m6 8-4 4 4 4" />
                            </svg>
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-[#eceef5]">
                            {p.title}
                          </div>
                          <div className="mt-0.5 line-clamp-1 max-w-xs text-xs text-[#798093]">
                            {p.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-6 py-4 text-[#798093] sm:table-cell">
                      {p.year}
                    </td>
                    <td className="hidden px-6 py-4 md:table-cell">
                      <div className="flex max-w-xs flex-wrap gap-1.5">
                        {p.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-[#7796ff]/20 bg-[#7796ff]/10 px-2 py-0.5 text-xs text-[#a8bcff]"
                          >
                            {t}
                          </span>
                        ))}
                        {p.tags.length > 3 && (
                          <span className="text-xs text-[#798093]">
                            +{p.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/projects/${p.id}/edit`}
                          className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
                        >
                          編輯
                        </Link>
                        <button
                          onClick={() => handleDelete(p)}
                          disabled={busy === p.id}
                          className="rounded-full border border-[#ff6568]/30 px-4 py-1.5 text-xs font-medium text-[#ff6568] transition-colors hover:bg-[#ff6568]/10 disabled:opacity-50"
                        >
                          {busy === p.id ? "刪除中..." : "刪除"}
                        </button>
                      </div>
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
