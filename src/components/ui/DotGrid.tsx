"use client";

import { useEffect, useRef, useState } from "react";

const GAP = 30;

/**
 * Interactive dot field. Hovering or tapping sends a ripple of scale and glow
 * outward from that dot, staggered by grid distance (anime.js). The number of
 * dots follows the container size, capped so it stays cheap on phones.
 */
export default function DotGrid({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [grid, setGrid] = useState({ cols: 0, rows: 0 });
  const busy = useRef(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setGrid({ cols: Math.min(44, Math.max(6, Math.floor(r.width / GAP))), rows: Math.min(14, Math.max(4, Math.floor(r.height / GAP))) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const ripple = async (index: number) => {
    const host = hostRef.current;
    if (!host || busy.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    busy.current = true;
    const { animate, stagger } = await import("animejs");
    animate(host.querySelectorAll("[data-dot]"), {
      scale: [{ to: 2.6, ease: "outSine", duration: 160 }, { to: 1, ease: "inOutQuad", duration: 520 }],
      opacity: [{ to: 1, duration: 160 }, { to: 0.35, duration: 520 }],
      delay: stagger(38, { grid: [grid.cols, grid.rows], from: index }),
      onComplete: () => { busy.current = false; },
    });
    window.setTimeout(() => { busy.current = false; }, 1400);
  };

  const fromEvent = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const col = Math.min(grid.cols - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * grid.cols)));
    const row = Math.min(grid.rows - 1, Math.max(0, Math.floor(((e.clientY - r.top) / r.height) * grid.rows)));
    // grid order follows DOM order; in RTL the first column is on the right
    const c = document.documentElement.dir === "rtl" ? grid.cols - 1 - col : col;
    void ripple(row * grid.cols + c);
  };

  // one gentle ripple when it first scrolls into view
  useEffect(() => {
    const el = hostRef.current;
    if (!el || !grid.cols) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        void ripple(Math.floor((grid.cols * grid.rows) / 2));
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid.cols, grid.rows]);

  return (
    <div
      ref={hostRef}
      onPointerMove={fromEvent}
      onPointerDown={fromEvent}
      className={`grid place-items-center ${className}`}
      style={{ gridTemplateColumns: `repeat(${grid.cols || 1}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${grid.rows || 1}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: grid.cols * grid.rows }, (_, i) => (
        <span key={i} data-dot className="size-1 rounded-full bg-[#4da3ff] opacity-35" />
      ))}
    </div>
  );
}
