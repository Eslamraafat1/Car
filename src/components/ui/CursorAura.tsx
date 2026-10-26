"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

const FINE_QUERY = "(pointer: fine)";

function subscribeFine(onChange: () => void) {
  const query = window.matchMedia(FINE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Fine-pointer + motion preference read during render (SSR-safe). */
function useFinePointer(): boolean {
  return useSyncExternalStore(
    subscribeFine,
    () => window.matchMedia(FINE_QUERY).matches,
    () => false,
  );
}

/**
 * A cinematic cursor aura: a precise dot that tracks the pointer exactly plus
 * a lagging ring that swells over anything interactive. It never replaces the
 * native cursor (accessibility), only trails it — fine pointers only, and it
 * bows out entirely under reduced motion.
 */
export default function CursorAura() {
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const enabled = fine && !reduced;
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;
    let visible = false;

    const render = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      scale += (targetScale - scale) * 0.18;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      const interactive = (event.target as Element | null)?.closest?.(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]',
      );
      targetScale = interactive ? 2.1 : 1;
    };
    const onDown = () => {
      targetScale = 0.72;
    };
    const onUp = () => {
      targetScale = 1;
    };
    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95]">
      <div
        ref={dotRef}
        className="cursor-dot absolute size-[5px] rounded-full bg-fog opacity-0 mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="cursor-ring absolute size-8 rounded-full border border-fog/60 opacity-0 mix-blend-difference"
      />
    </div>
  );
}
