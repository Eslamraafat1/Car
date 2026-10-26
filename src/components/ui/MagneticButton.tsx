"use client";

import { useRef, type ReactNode } from "react";

/**
 * Wraps a CTA so it leans toward the pointer while hovered — the tiny bit of
 * physical feedback that makes a button feel machined. No-op on touch devices
 * and purely transform-based, so layout never shifts.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.28,
  /** Maximum pull in pixels. */
  limit = 14,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  limit?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = event.clientX - (rect.left + rect.width / 2);
    const py = event.clientY - (rect.top + rect.height / 2);
    const dx = Math.max(-limit, Math.min(limit, px * strength));
    const dy = Math.max(-limit, Math.min(limit, py * strength));
    el.style.transition = "transform 0.12s ease-out";
    el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1)";
    el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
