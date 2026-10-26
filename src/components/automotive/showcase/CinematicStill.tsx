"use client";

import Image from "next/image";
import { useRef } from "react";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, useReducedMotion } from "@/lib/motion";
import Reveal from "@/components/ui/Reveal";
import KineticHeading from "@/components/ui/KineticHeading";
import type { StillContent } from "@/lib/showcase-types";

/** A full-bleed film still: parallax plate, letterbox bars, grain and a title lockup. */
export default function CinematicStill({ content }: { content: StillContent }) {
  const rootRef = useRef<HTMLElement | null>(null);
  const { t, lang } = useLang();
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ".still-img",
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section
      ref={rootRef}
      className="cinema relative isolate flex min-h-[92svh] items-end overflow-hidden bg-ink"
      aria-label={t(content.eyebrow)}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={content.image}
          alt={t(content.alt)}
          fill
          priority={false}
          sizes="100vw"
          className="still-img object-cover will-change-transform"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />
      <div className="pointer-events-none absolute inset-0 -z-10 grain" />
      <div className="pointer-events-none absolute inset-4 z-0 hidden border border-white/10 sm:block lg:inset-8" />

      {content.timecode && (
        <div className="absolute end-6 top-20 z-10 flex items-center gap-2.5 rounded-full border border-white/20 bg-black/30 px-3.5 py-2 backdrop-blur-md sm:end-12 sm:top-24">
          <span className="size-1.5 rounded-full" style={{ background: content.accent ?? "var(--c-volt)" }} />
          <span className="eyebrow text-[0.6rem] text-white/65">
            {content.timecode} <span className="mx-1 text-white/30">/</span> {lang === "ar" ? "إطار" : "FRAME"}
          </span>
        </div>
      )}

      {/* Letterbox bars */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[5svh] bg-ink" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[5svh] bg-ink" />

      <div className="relative z-10 w-full px-4 pb-[8svh] pt-28 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-[1400px]">
          <Reveal>
            <div className="flex items-center gap-4">
              <span
                className="h-px w-10"
                style={{ background: content.accent ?? "var(--c-volt)" }}
              />
              <p
                className="eyebrow"
                style={{ color: content.accent ?? "var(--c-volt)" }}
              >
                {t(content.eyebrow)}
              </p>
            </div>
          </Reveal>

          <KineticHeading
            text={content.title}
            className="display h-section mt-5 max-w-[18ch] text-fog"
            delay={0.08}
          />

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-line/70 pt-4">
            {content.caption ? (
              <Reveal delay={0.14}>
                <p className="max-w-[46ch] text-[0.92rem] leading-relaxed text-mist">
                  {t(content.caption)}
                </p>
              </Reveal>
            ) : (
              <span />
            )}
            <span className="eyebrow hidden text-[0.58rem] text-white/35 sm:inline">
              {lang === "ar" ? "AURELIS — يوميات سينمائية" : "AURELIS — CINEMATIC JOURNAL"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
