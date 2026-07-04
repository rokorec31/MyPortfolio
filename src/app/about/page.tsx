import Reveal from "@/components/Reveal";

export const metadata = { title: "About — MyPortfolio" };

const skillGroups: { title: string; tags: string[] }[] = [
  {
    title: "AI Agent",
    tags: ["Claude Code", "Gemini API", "Multica", "Hermes", "OpenClaw"],
  },
  {
    title: "Frontend",
    tags: [
      "React",
      "Next.js",
      "Vue.js",
      "Blazor",
      "TypeScript",
      "JavaScript",
      "HTML/CSS",
      "Tailwind CSS",
      "Vite",
    ],
  },
  {
    title: "Mobile & Desktop",
    tags: [
      "iOS (Swift)",
      "Android (Kotlin / Java)",
      "Flutter (Dart)",
      "Windows (C#)",
      "macOS",
      "Linux",
      "Rust",
    ],
  },
  {
    title: "Backend & Database",
    tags: [
      "ASP.NET Core",
      "Golang",
      "Python",
      "PostgreSQL",
      "MySQL",
      "RealmDB",
      "Firebase",
    ],
  },
  {
    title: "IoT & Protocols",
    tags: [
      "MQTT",
      "WebSocket",
      "WebRTC",
      "Socket.io",
      "SignalR",
      "BLE Mesh",
      "Z-Wave",
      "USB HID",
    ],
  },
  {
    title: "Tools & DevOps",
    tags: ["Docker", "Caddy", "Git", "CI/CD", "AWS"],
  },
];

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-[#1a1712]/15 bg-[#faf6f0] px-3 py-1.5 text-sm text-[#3d372f] transition-all hover:border-[#e85d3d] hover:text-[#e85d3d]">
      {label}
    </span>
  );
}

export default function AboutPage() {
  return (
    <div className="pt-8">
      {/* About Me */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <div className="mb-14 text-center md:mb-20">
              <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                About <span className="accent-text">Me</span>
              </h1>
              <p className="mt-4 text-lg text-[#6b6157] md:text-xl">
                Full-stack Developer
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="paper-card relative overflow-hidden rounded-2xl p-8 md:p-10">
              <div className="relative z-10 mb-8 space-y-5 text-lg leading-relaxed text-[#3d372f]">
                <p>
                  I&apos;m Ethan (洪毅). I currently manage an application
                  software department, leading development and technical
                  decisions across cloud, mobile apps, and hardware
                  integration. Over the past year my team has shipped more
                  than 200 software releases. To sustain that cadence, I
                  brought AI-assisted development tools — GitHub Copilot,
                  Antigravity, Claude Code — into our daily workflow, letting
                  AI handle repetitive boilerplate and documentation so
                  engineers can stay focused on core business logic and
                  quality keeps pace with release frequency.
                </p>
                <p>
                  My background spans native mobile apps and web development
                  through to IoT and cloud system architecture. What I care
                  about most is system stability and development efficiency.
                  While optimizing a firmware update tool, I re-architected
                  the update framework and packaged its core logic as an SDK,
                  cutting new-device integration time by 70%. In an IoT
                  project, to get real-time interaction between devices and
                  controllers, we weighed bandwidth against latency and chose
                  MQTT paired with WebSocket — eliminating the delay and
                  server load of traditional HTTP polling. I also lean on AI
                  tools for first-pass trade-off analysis and PoC code
                  generation, sharply compressing technical evaluation time
                  so the team can move faster on business logic and
                  decisions.
                </p>
                <p>
                  My use of AI goes beyond personal productivity — I work to
                  integrate it into the whole team&apos;s development process:
                  auto-generating code review checklists, drafting API
                  documentation, and helping new members quickly understand
                  existing architecture. The goal is always the same: within
                  real resource and time constraints, find the right
                  human–AI collaboration model that keeps systems
                  maintainable and extensible for the long run.
                </p>
              </div>
              <div className="relative z-10 flex flex-wrap gap-4">
                <a
                  href="mailto:rokorec31@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border border-[#1a1712]/20 bg-[#faf6f0] px-4 py-2 text-sm text-[#3d372f] transition-colors hover:border-[#e85d3d] hover:text-[#e85d3d]"
                >
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
                    aria-hidden
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  rokorec31@gmail.com
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <div className="mb-14 text-center md:mb-20">
              <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                <span className="accent-text">Skills</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {skillGroups.map((group, i) => (
              <Reveal key={group.title} delay={(i % 2) * 0.12}>
                <div className="paper-card group h-full rounded-2xl p-7">
                  <h3 className="font-display mb-5 text-lg font-semibold tracking-tight">
                    {group.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.tags.map((tag) => (
                      <Badge key={tag} label={tag} />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
