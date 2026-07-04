"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Project } from "@/lib/projects";
import { getProjectById } from "@/lib/projectsRepo";
import BlurImage from "@/components/BlurImage";

export default function ProjectDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-sm text-[#6b6157]">
          <div className="mr-3 size-4 animate-spin rounded-full border-2 border-[#e85d3d]/30 border-t-[#e85d3d]" />
          Loading...
        </div>
      }
    >
      <ProjectDetailContent />
    </Suspense>
  );
}

function ProjectDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const [project, setProject] = useState<Project | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">(
    "loading",
  );
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    if (!id) {
      setStatus("missing");
      return;
    }
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
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-[#6b6157]">
        <div className="mr-3 size-4 animate-spin rounded-full border-2 border-[#e85d3d]/30 border-t-[#e85d3d]" />
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
          className="mt-6 inline-block text-sm text-[#e85d3d] hover:underline"
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
        className="text-sm text-[#6b6157] transition-colors hover:text-[#1a1712]"
      >
        ← Back to Projects
      </Link>

      <div className="fade-in-up mt-8 flex flex-wrap items-center gap-4">
        <span className="rounded-full border border-[#1a1712]/15 bg-[#fffdf8] px-3 py-1 text-sm text-[#3d372f]">
          {project.year}
        </span>
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#2f5d50]/25 bg-[#2f5d50]/8 px-3 py-1 text-sm text-[#2f5d50]"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="fade-in-up delay-1 font-display mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
        {project.title}
      </h1>
      <p className="fade-in-up delay-2 mt-4 text-lg text-[#6b6157]">
        {project.description}
      </p>

      {project.imageUrl && !imageFailed && (
        <div className="fade-in-up delay-3 mt-10 overflow-hidden rounded-xl border border-[#1a1712]/20">
          <BlurImage
            src={project.imageUrl}
            alt={project.title}
            blur={project.imageBlur}
            onError={() => setImageFailed(true)}
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
