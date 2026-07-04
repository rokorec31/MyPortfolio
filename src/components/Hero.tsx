"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    label: "Web Exp.",
    value: 6,
    suffix: " years",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </>
    ),
  },
  {
    label: "APP Exp.",
    value: 3,
    suffix: " years",
    icon: (
      <>
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </>
    ),
  },
  {
    label: "AI Exp.",
    value: 2,
    suffix: " years",
    icon: (
      <>
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        <path d="M20 3v4" />
        <path d="M22 5h-4" />
      </>
    ),
  },
  {
    label: "Projects",
    value: 12,
    suffix: "+",
    icon: (
      <>
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
      </>
    ),
  },
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
    <section className="relative -mt-20 flex min-h-[100dvh] flex-col justify-center overflow-hidden pb-24 pt-28 md:py-20">
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
              <div className="mb-2 flex items-center justify-between">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#e85d3d]"
                  aria-hidden
                >
                  {stat.icon}
                </svg>
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
    </section>
  );
}
