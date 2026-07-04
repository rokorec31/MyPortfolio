"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects";
import { listProjects } from "@/lib/projectsRepo";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listProjects()
      .then(setProjects)
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <h1 className="fade-in-up text-4xl font-bold tracking-tight">
        <span className="gradient-text glow-text">Projects</span>
      </h1>
      <p className="fade-in-up delay-1 mt-4 max-w-xl text-[#798093]">
        A selection of things I&apos;ve built — web apps, mobile apps, and open
        source tools.
      </p>

      {loading ? (
        <div className="flex items-center gap-3 py-24 text-sm text-[#798093]">
          <div className="size-4 animate-spin rounded-full border-2 border-[#7796ff]/30 border-t-[#7796ff]" />
          Loading projects...
        </div>
      ) : error ? (
        <p className="py-24 text-sm text-[#ff6568]">{error}</p>
      ) : projects.length === 0 ? (
        <p className="py-24 text-sm text-[#798093]">No projects yet.</p>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 3) * 0.12}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
