"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const particles = [
  { size: 5, left: "20%", top: "25%", hue: 260, delay: 0 },
  { size: 6, left: "70%", top: "20%", hue: 280, delay: 0.8 },
  { size: 4, left: "45%", top: "65%", hue: 250, delay: 1.6 },
  { size: 7, left: "80%", top: "55%", hue: 290, delay: 2.4 },
  { size: 5, left: "30%", top: "75%", hue: 270, delay: 3.2 },
  { size: 6, left: "60%", top: "40%", hue: 255, delay: 4 },
];

const stats = [
  { label: "Web Exp.", value: 6, suffix: " years", icon: "code" },
  { label: "APP Exp.", value: 3, suffix: " years", icon: "phone" },
  { label: "AI Exp.", value: 2, suffix: " years", icon: "brain" },
  { label: "Projects", value: 12, suffix: "+", icon: "globe" },
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

function StatIcon({ name }: { name: string }) {
  const common = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "text-[#7796ff]",
  };
  switch (name) {
    case "code":
      return (
        <svg {...common}>
          <path d="m18 16 4-4-4-4" />
          <path d="m6 8-4 4 4 4" />
          <path d="m14.5 4-5 16" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
      );
    case "brain":
      return (
        <svg {...common}>
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
          <path d="M9 13a4.5 4.5 0 0 0 3-4" />
          <path d="M12 13h4" />
          <path d="M12 8h8" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      );
  }
}

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
    <span className="whitespace-nowrap rounded-full border border-white/10 bg-[#04050d]/30 px-4 py-1.5 text-sm text-[#798093] backdrop-blur-sm transition-colors hover:border-[#7796ff]/30 hover:text-[#eceef5]">
      {label}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative -mt-20 flex min-h-[100dvh] flex-col justify-center overflow-hidden">
      {/* Background: radial glows + grid + particles */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(84,113,245,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_50%,rgba(161,112,235,0.10),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_80%,rgba(0,148,152,0.08),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(119,150,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(119,150,255,0.4) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              background: `hsla(${p.hue}, 90%, 72%, 0.6)`,
              boxShadow: "0 0 20px rgba(119,150,255,0.3)",
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6">
        {/* Name */}
        <div className="fade-in-up mb-4">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="gradient-text">Ethan</span>
            <span className="ml-3 inline-block align-baseline text-xl font-light tracking-wide text-[#798093] sm:text-2xl md:ml-5 md:text-3xl">
              洪毅
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="fade-in-up delay-2 mb-10 flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-[#7796ff]/80 to-transparent" />
          <p className="text-lg font-medium tracking-wide text-[#798093] md:text-xl">
            Full-stack Developer
          </p>
        </div>

        {/* Stat cards */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`glass-card group fade-in-up rounded-2xl p-4 transition-all hover:glow-sm delay-${i + 3}`}
            >
              <div className="mb-2 flex items-center gap-2">
                <StatIcon name={stat.icon} />
                <span className="text-xs font-medium uppercase tracking-wider text-[#798093]/60">
                  {stat.label}
                </span>
              </div>
              <div className="text-3xl font-bold tracking-tight md:text-4xl">
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
            className="glow-sm group inline-flex items-center gap-2 rounded-full bg-[#7796ff] px-8 py-3.5 text-base font-medium text-[#fcfcfc] transition-all duration-300 hover:bg-[#8ba5ff] hover:shadow-[0_0_30px_#7796ff33,0_0_80px_#5471f514] active:translate-y-px"
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
            className="rounded-full border border-white/15 px-8 py-3.5 text-base font-medium text-white transition-all duration-300 hover:border-[#7796ff]/40 hover:bg-white/5 active:translate-y-px"
          >
            About Me
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="fade-in-up delay-6 absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#798093]/50">
            Scroll
          </span>
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-[#798093]/20 p-1">
            <div className="scroll-dot size-1.5 rounded-full bg-[#7796ff]/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
