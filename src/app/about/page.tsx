import Reveal from "@/components/Reveal";

export const metadata = { title: "About — MyPortfolio" };

const skillGroups: { title: string; tags: string[] }[] = [
  {
    title: "AI Agent",
    tags: ["LiveKit", "LangChain", "LangGraph", "n8n", "Claude API", "OpenAI API"],
  },
  {
    title: "Frontend",
    tags: [
      "React.js",
      "Next.js",
      "Vue.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    title: "Mobile",
    tags: ["iOS (Swift)", "Android (Kotlin)", "React Native", "Flutter"],
  },
  {
    title: "Backend & Database",
    tags: [
      "Python",
      "Node.js",
      "Firebase",
      "AWS",
      "Supabase",
      "PostgreSQL",
      "MySQL",
    ],
  },
  {
    title: "Tools & Others",
    tags: ["Git", "Docker", "Figma", "WebRTC", "Postman", "Xcode"],
  },
];

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-white/10 bg-[#04050d]/40 px-3 py-1.5 text-sm text-[#c3c8d6] backdrop-blur-md transition-all hover:border-[#7796ff]/30 hover:bg-[#7796ff]/10">
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
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                <span className="gradient-text">About Me</span>
              </h1>
              <p className="mt-4 text-lg text-[#798093] md:text-xl">
                Full-stack Developer
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-card relative overflow-hidden rounded-3xl p-8 md:p-10">
              {/* Corner glow blob */}
              <div className="absolute -right-16 -top-16 size-48 rounded-full bg-[#7796ff]/10 blur-[80px]" />
              <p className="relative z-10 mb-8 text-lg leading-relaxed text-[#798093]">
                I&apos;m Ethan (洪毅), a full-stack developer who enjoys turning
                ideas into polished, production-ready products. My work spans
                modern web apps, native iOS apps, and AI-powered tools — from
                pixel-perfect interfaces to scalable backends. When I&apos;m
                not coding, I write about software architecture and contribute
                to open source.
              </p>
              <div className="relative z-10 flex flex-wrap gap-4">
                <a
                  href="mailto:rokorec31@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#04050d]/40 px-4 py-2 text-sm text-[#798093] backdrop-blur-md transition-colors hover:text-[#eceef5]"
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
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#04050d]/40 px-4 py-2 text-sm text-[#798093] backdrop-blur-md transition-colors hover:text-[#eceef5]"
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
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  GitHub
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
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                <span className="gradient-text">Skills</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {skillGroups.map((group, i) => (
              <Reveal key={group.title} delay={(i % 2) * 0.12}>
                <div className="glass-card group h-full rounded-3xl p-7 transition-all hover:glow-sm">
                  <h3 className="mb-5 text-lg font-bold tracking-tight">
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
