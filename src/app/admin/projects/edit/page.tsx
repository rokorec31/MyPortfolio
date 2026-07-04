"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProjectForm from "@/components/ProjectForm";
import { getProjectById } from "@/lib/projectsRepo";
import type { Project } from "@/lib/projects";

export default function EditProjectPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-sm text-[#798093]">
          <div className="mr-3 size-4 animate-spin rounded-full border-2 border-[#7796ff]/30 border-t-[#7796ff]" />
          Loading project...
        </div>
      }
    >
      <EditProjectContent />
    </Suspense>
  );
}

function EditProjectContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const [project, setProject] = useState<Project | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">(
    "loading",
  );

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
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-[#798093]">
        <div className="mr-3 size-4 animate-spin rounded-full border-2 border-[#7796ff]/30 border-t-[#7796ff]" />
        Loading project...
      </div>
    );
  }

  if (status === "missing" || !project) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-[#798093]">
        找不到這個專案。
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-10 text-3xl font-bold tracking-tight">
        <span className="gradient-text">編輯專案</span>
      </h1>
      <ProjectForm project={project} />
    </div>
  );
}
