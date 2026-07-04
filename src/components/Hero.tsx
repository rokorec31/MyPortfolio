"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Web Exp.", value: 6, suffix: " years" },
  { label: "APP Exp.", value: 3, suffix: " years" },
  { label: "AI Exp.", value: 2, suffix: " years" },
  { label: "Projects", value: 12, suffix: "+" },
];

const skillsRow1 = [
  "React",
  "Next.js",
  "Vue.js",
  "TypeScript",
  "Swift",
  "LiveKit",
  "LangChain",
  "AI Agent",
  "Python",
  "Node.js",
];

const skillsRow2 = [
  "Tailwind CSS",
  "Kotlin",
  "Firebase",
  "AWS",
  "Supabase",
  "WebRTC",
  "PostgreSQL",
  "Docker",
  "Figma",
  "Git",
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

function TagPill({ label }: { label: string }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-[#1a1712]/20 bg-[#fffdf8] px-4 py-1.5 text-sm text-[#6b6157] transition-colors hover:border-[#e85d3d] hover:text-[#e85d3d]">
      {label}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative -mt-20 flex min-h-[100dvh] flex-col justify-center overflow-hidden">
      <div className="relative mx-auto w-full max-w-6xl px-6">
        {/* Kicker */}
        <div className="fade-in-up mb-6 flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e85d3d]">
            Portfolio
          </span>
          <div className="h-px flex-1 bg-[#1a1712]/15" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#6b6157]">
            Taipei, Taiwan
          </span>
        </div>

        {/* Name */}
        <div className="fade-in-up mb-4">
          <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
            Ethan
            <span className="accent-text">.</span>
            <span className="ml-3 inline-block align-baseline font-sans text-xl font-light tracking-wide text-[#6b6157] sm:text-2xl md:ml-5 md:text-3xl">
              洪毅
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="fade-in-up delay-2 mb-10 flex items-center gap-3">
          <div className="h-px w-12 bg-[#e85d3d]" />
          <p className="text-lg font-medium tracking-wide text-[#6b6157] md:text-xl">
            <span className="accent-text">Full-stack</span> Developer
          </p>
        </div>

        {/* Stat cards */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`paper-card fade-in-up rounded-xl p-4 delay-${i + 3}`}
            >
              <div className="mb-2 flex items-baseline justify-between">
                <span className="font-display text-sm italic text-[#e85d3d]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-[#6b6157]/70">
                  {stat.label}
                </span>
              </div>
              <div className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </div>
            </div>
          ))}
        </div>

        {/* Skill marquee */}
        <div className="fade-in-up delay-5 mb-12 space-y-3">
          <div className="marquee-mask flex">
            <div className="marquee-track">
              {[...skillsRow1, ...skillsRow1].map((s, i) => (
                <TagPill key={`${s}-${i}`} label={s} />
              ))}
            </div>
          </div>
          <div className="marquee-mask flex">
            <div className="marquee-track reverse">
              {[...skillsRow2, ...skillsRow2].map((s, i) => (
                <TagPill key={`${s}-${i}`} label={s} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="fade-in-up delay-6 flex flex-wrap items-center gap-5">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full bg-[#1a1712] px-8 py-3.5 text-base font-medium text-[#fffdf8] transition-all duration-300 hover:bg-[#e85d3d] active:translate-y-px"
          >
            View Projects
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="-rotate-90 transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-90"
              aria-hidden
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-[#1a1712]/25 px-8 py-3.5 text-base font-medium text-[#1a1712] transition-all duration-300 hover:border-[#e85d3d] hover:text-[#e85d3d] active:translate-y-px"
          >
            About Me
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="fade-in-up delay-6 absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#6b6157]/60">
            Scroll
          </span>
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-[#1a1712]/25 p-1">
            <div className="scroll-dot size-1.5 rounded-full bg-[#e85d3d]" />
          </div>
        </div>
      </div>
    </section>
  );
}
