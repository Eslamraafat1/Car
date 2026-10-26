"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * Fades + rises its children the first time they enter the viewport.
 * Renders immediately (no transition) under reduced motion and disconnects
 * the observer once shown.
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
  const reduced = usePrefersReducedMotion();
  const [shownState, setShown] = useState(false);
  const shown = reduced || shownState;

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: reduced
          ? "none"
          : `opacity 0.85s cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}s, transform 0.85s cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}s`,
        willChange: reduced ? undefined : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
