"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { listProjects } from "@/lib/projectsRepo";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listProjects()
      .then((all) => setProjects(all.slice(0, 3)))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && projects.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-8">
      <Reveal>
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Featured Projects</h2>
          <Link
            href="/projects"
            className="text-sm text-[#798093] transition-colors hover:text-white"
          >
            View all →
          </Link>
        </div>
      </Reveal>
      {loading ? (
        <div className="flex items-center gap-3 py-12 text-sm text-[#798093]">
          <div className="size-4 animate-spin rounded-full border-2 border-[#7796ff]/30 border-t-[#7796ff]" />
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.12}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
