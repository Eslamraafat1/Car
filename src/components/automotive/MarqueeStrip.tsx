"use client";

import { useRef } from "react";
import type { BiStr } from "@/lib/content";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, ScrollTrigger, useGSAP, usePrefersReducedMotion } from "@/lib/motion";

interface MarqueeRowProps {
  items: readonly BiStr[];
  t: (value: BiStr) => string;
  duplicate?: boolean;
}

function MarqueeRow({ items, t, duplicate }: MarqueeRowProps) {
  return (
    <ul
      className="flex shrink-0 items-center gap-8 pe-8 sm:gap-12 sm:pe-12"
      aria-hidden={duplicate || undefined}
    >
      {items.map((item) => (
        <li key={item.en} className="flex items-center gap-8 sm:gap-12">
          <span className="font-display text-[0.9rem] font-medium tracking-[0.26em] whitespace-nowrap text-mist sm:text-base">
            {t(item)}
          </span>
          <span className="size-1.5 rotate-45 bg-volt/70" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export default function MarqueeStrip() {
  const { t, lang } = useLang();
  const items = C.marquee.items;
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  /* GSAP-driven so the belt reacts to how you scroll: flick down and the
     categories race ahead, scroll back and they reverse — settling to a calm
     cruise when the page rests. CSS keeps the fallback animation. */
  useGSAP(
    () => {
      if (reduced) return;
      const track = rootRef.current?.querySelector<HTMLElement>(".marquee-track");
      if (!track) return;
      gsap.set(track, { animation: "none" });
      const from = lang === "ar" ? -50 : 0;
      const tween = gsap.fromTo(
        track,
        { xPercent: from },
        { xPercent: lang === "ar" ? 0 : -50, duration: 42, ease: "none", repeat: -1 },
      );

      const trigger = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const boost = Math.min(Math.abs(velocity) / 320, 6);
          if (velocity < -40) tween.reverse();
          else if (velocity > 40) tween.play();
          tween.timeScale(1 + boost);
        },
      });

      return () => {
        trigger.kill();
        tween.kill();
      };
    },
    { scope: rootRef, dependencies: [reduced, lang], revertOnUpdate: true },
  );

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden border-y border-line bg-ink py-5"
      aria-label={t(C.marquee.note)}
    >
      <div className="marquee-track flex w-max">
        <MarqueeRow items={items} t={t} />
        <MarqueeRow items={items} t={t} duplicate />
      </div>
      <div className="pointer-events-none absolute inset-y-0 start-0 w-16 bg-gradient-to-r from-ink to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 end-0 w-16 bg-gradient-to-l from-ink to-transparent sm:w-28" />
    </section>
  );
}
