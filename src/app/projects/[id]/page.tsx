"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Project } from "@/lib/projects";
import { getProjectById } from "@/lib/projectsRepo";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">(
    "loading",
  );

  useEffect(() => {
    getProjectById(id)
      .then((p) => {
        if (p) {
          setProject(p);
          setStatus("ready");
        } else {
          setStatus("missing");
        }
      })
      .catch(() => setStatus("missing"));
  }, [id]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-[#798093]">
        <div className="mr-3 size-4 animate-spin rounded-full border-2 border-[#7796ff]/30 border-t-[#7796ff]" />
        Loading...
      </div>
    );
  }

  if (status === "missing" || !project) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link
          href="/projects"
          className="mt-6 inline-block text-sm text-[#7796ff] hover:underline"
        >
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <Link
        href="/projects"
        className="text-sm text-[#798093] transition-colors hover:text-white"
      >
        ← Back to Projects
      </Link>

      <div className="fade-in-up mt-8 flex flex-wrap items-center gap-4">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-[#c3c8d6]">
          {project.year}
        </span>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#7796ff]/20 bg-[#7796ff]/10 px-3 py-1 text-sm text-[#a8bcff]"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="fade-in-up delay-1 mt-6 text-4xl font-bold tracking-tight md:text-5xl">
        {project.title}
      </h1>
      <p className="fade-in-up delay-2 mt-4 text-lg text-[#798093]">
        {project.description}
      </p>

      {project.imageUrl && (
        <div className="fade-in-up delay-3 mt-10 overflow-hidden rounded-2xl border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full object-cover"
          />
        </div>
      )}

      <div className="markdown-body fade-in-up delay-4 mt-12">
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </div>
    </article>
  );
}
