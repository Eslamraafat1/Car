"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fades + rises its children the first time they scroll into view.
 *
 * Content is visible in the server HTML and stays visible if scripts are slow
 * or fail; only blocks that start below the fold are hidden (imperatively, no
 * re-render) once hydrated. Nothing animates under reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 30,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.96) return; // already on screen

    el.style.opacity = "0";
    el.style.transform = `translate3d(0, ${y}px, 0)`;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        el.style.transition = `opacity 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}s, transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}s`;
        el.style.opacity = "1";
        el.style.transform = "none";
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.style.opacity = "";
      el.style.transform = "";
      el.style.transition = "";
    };
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
