import Link from "next/link";
import type { Project } from "@/lib/projects";
import BlurImage from "@/components/BlurImage";

function ImagePlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#f0e9df] transition-transform duration-700 ease-out group-hover:scale-105">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,23,18,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(26,23,18,0.4) 1px, transparent 1px)",
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
        className="text-[#e85d3d]/40 transition-colors duration-500 group-hover:text-[#e85d3d]/70"
        aria-hidden
      >
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/view?id=${project.id}`}
      className="paper-card group block overflow-hidden rounded-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[#1a1712]/10">
        {project.imageUrl ? (
          <BlurImage
            src={project.imageUrl}
            alt={project.title}
            blur={project.imageBlur}
            fallback={<ImagePlaceholder />}
            className="h-full w-full object-cover group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder />
        )}
        <span className="font-display absolute right-3 top-3 rounded-full border border-[#1a1712]/20 bg-[#fffdf8]/90 px-3 py-1 text-xs font-medium italic text-[#1a1712] backdrop-blur">
          {project.year}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-[#1a1712] transition-colors duration-300 group-hover:text-[#e85d3d]">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-[#6b6157]">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#2f5d50]/25 bg-[#2f5d50]/8 px-2.5 py-0.5 text-xs text-[#2f5d50]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
