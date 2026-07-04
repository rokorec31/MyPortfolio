"use client";

import { useEffect, useState } from "react";

export default function ScrollHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight > 80;
      setVisible(scrollable && window.scrollY < 40);
    };
    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex h-24 items-end justify-center bg-gradient-to-t from-[#faf6f0] via-[#faf6f0]/70 to-transparent pb-4 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#6b6157]/60">
          Scroll
        </span>
        <div className="relative h-9 w-px overflow-hidden bg-[#1a1712]/15">
          <div className="scroll-line absolute inset-0 bg-[#e85d3d]" />
        </div>
      </div>
    </div>
  );
}
