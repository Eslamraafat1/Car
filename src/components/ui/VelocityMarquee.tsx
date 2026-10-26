"use client";

import { useRef, type ReactNode } from "react";
import { useLang } from "@/lib/i18n";
import { gsap, ScrollTrigger, useGSAP, usePrefersReducedMotion } from "@/lib/motion";

/**
 * Endless marquee that reacts to the page: scrolling fast speeds it up and
 * scrolling back reverses it. Content is rendered twice for a seamless loop.
 */
export default function VelocityMarquee({
  children,
  reverse = false,
  duration = 40,
  className = "",
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const { lang } = useLang();

  useGSAP(
    () => {
      if (reduced) return;
      const track = rootRef.current?.querySelector<HTMLElement>(".vm-track");
      if (!track) return;
      const rtl = lang === "ar";
      const dir = (reverse ? -1 : 1) * (rtl ? -1 : 1);
      const tween = gsap.fromTo(track, { xPercent: dir > 0 ? 0 : -50 }, { xPercent: dir > 0 ? -50 : 0, duration, ease: "none", repeat: -1 });
      const base = dir > 0 ? 1 : -1;
      void base;
      const trigger = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          tween.timeScale(1 + Math.min(Math.abs(v) / 350, 5));
          if (v < -60) tween.timeScale(-(1 + Math.min(Math.abs(v) / 350, 5)));
        },
      });
      return () => {
        trigger.kill();
        tween.kill();
      };
    },
    { scope: rootRef, dependencies: [reduced, reverse, lang], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef} className={`relative overflow-hidden ${className}`} dir="ltr">
      <div className="vm-track flex w-max">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
