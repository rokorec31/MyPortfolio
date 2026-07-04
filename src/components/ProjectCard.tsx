import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/view?id=${project.id}`}
      className="glass-card group block overflow-hidden rounded-2xl hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.imageUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(84,113,245,0.15),transparent)] transition-transform duration-700 ease-out group-hover:scale-105">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(119,150,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(119,150,255,0.4) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#7796ff]/40 transition-colors duration-500 group-hover:text-[#7796ff]/60"
              aria-hidden
            >
              <path d="m18 16 4-4-4-4" />
              <path d="m6 8-4 4 4 4" />
              <path d="m14.5 4-5 16" />
            </svg>
          </div>
        )}
        <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium text-[#eceef5] backdrop-blur">
          {project.year}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-[#7796ff]">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-[#798093]">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#7796ff]/20 bg-[#7796ff]/10 px-2.5 py-0.5 text-xs text-[#a8bcff]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
