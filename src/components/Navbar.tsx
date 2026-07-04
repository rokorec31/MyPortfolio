"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 z-50 w-full py-4 transition-all duration-500"
      style={{ transform: mounted ? "translateY(0)" : "translateY(-100px)" }}
    >
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-2xl border px-6 py-3 transition-all duration-500 ${
          scrolled
            ? "mx-4 border-white/10 bg-[#04050d]/70 shadow-lg shadow-black/20 backdrop-blur-md sm:mx-6 lg:mx-auto"
            : "border-transparent bg-transparent"
        }`}
      >
        {/* Logo + tagline */}
        <div className="flex items-center">
          <Link href="/" className="group relative z-10 flex flex-col">
            <span className="text-lg font-bold tracking-tight">
              Ethan<span className="gradient-text">.</span>
            </span>
          </Link>
          <div
            className={`ml-3 overflow-hidden transition-all duration-500 ${
              scrolled ? "h-0 opacity-0" : "h-3.5 opacity-100"
            }`}
          >
            <span
              className="block text-[10px] font-medium uppercase tracking-[0.2em] text-[#798093]/70 transition-all duration-700"
              style={
                mounted
                  ? { opacity: 1, filter: "blur(0)", transform: "translateY(0)" }
                  : {
                      opacity: 0,
                      filter: "blur(4px)",
                      transform: "translateY(6px)",
                    }
              }
            >
              洪毅 · Full-stack Developer
            </span>
          </div>
        </div>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="line-glow relative rounded-lg px-4 py-2 text-sm font-medium text-[#798093] transition-colors hover:text-[#eceef5]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className="relative z-10 flex size-10 items-center justify-center rounded-xl border border-white/10 bg-[#04050d]/50 backdrop-blur-md md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${menuOpen ? "rotate-90" : ""}`}
            aria-hidden
          >
            {menuOpen ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`mx-4 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#04050d]/90 backdrop-blur-xl transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="flex flex-col p-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-[#798093] transition-colors hover:bg-white/5 hover:text-[#eceef5]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
