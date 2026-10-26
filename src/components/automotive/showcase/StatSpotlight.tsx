"use client";

import Image from "next/image";
import { useRef } from "react";
import { useLang } from "@/lib/i18n";
import Reveal from "@/components/ui/Reveal";
import KineticHeading from "@/components/ui/KineticHeading";
import { useCountUp, useInView } from "@/lib/showcase-hooks";
import { gsap, useGSAP, useReducedMotion } from "@/lib/motion";
import type { StatContent } from "@/lib/showcase-types";

/** A cinematic spec plate: the number is part of the photograph, not a dashboard. */
export default function StatSpotlight({ content }: { content: StatContent }) {
  const { t } = useLang();
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ".stat-img",
        { yPercent: -5 },
        {
          yPercent: 5,
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
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  const value = useCountUp(content.value, inView, 1600);
  const shown = content.decimals
    ? value.toFixed(content.decimals)
    : Math.round(value).toLocaleString("en-US");
  const accent = content.accent ?? "var(--c-volt)";

  return (
    <section
      ref={rootRef}
      className="cinema relative isolate overflow-hidden py-16 sm:py-20 lg:py-28"
      aria-label={t(content.eyebrow)}
    >
      <div
        className="pointer-events-none absolute -top-32 start-[-8rem] size-[30rem] rounded-full opacity-20 blur-[100px]"
        style={{ background: accent }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-9 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-10">
        <div className={`relative z-10 lg:col-span-5 ${content.flip ? "lg:order-2" : ""}`}>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10" style={{ background: accent }} />
              <p className="eyebrow" style={{ color: accent }}>
                {t(content.eyebrow)}
              </p>
            </div>
          </Reveal>

          <KineticHeading
            text={content.title}
            className="display mt-5 max-w-[15ch] text-[clamp(1.9rem,4vw,3.6rem)] leading-[1.04] text-fog"
            delay={0.08}
          />
          {content.body && (
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-[44ch] text-[0.95rem] leading-relaxed text-mist lg:text-[1rem]">
                {t(content.body)}
              </p>
            </Reveal>
          )}
          <div className="mt-8 flex items-center gap-3" aria-hidden="true">
            <span className="size-2 rounded-full" style={{ background: accent, boxShadow: `0 0 18px ${accent}` }} />
            <span className="eyebrow text-white/45">AURELIS / {String(content.value).padStart(2, "0")}</span>
          </div>
        </div>

        <div className={`lg:col-span-7 ${content.flip ? "lg:order-1" : ""}`}>
          <Reveal y={44}>
            <figure className="group relative isolate aspect-[4/3] overflow-hidden rounded-[1.6rem] border border-white/10 bg-ink-2 shadow-[0_35px_100px_-45px_rgba(0,0,0,0.8)] sm:aspect-[16/10]">
              <Image
                src={content.image}
                alt={t(content.alt)}
                fill
                sizes="(min-width:1024px) 58vw, 100vw"
                className="stat-img scale-[1.12] object-cover will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/15" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
                <div ref={ref} className="flex items-end gap-2 sm:gap-3">
                  <span
                    className="numeral display text-[clamp(4.2rem,13vw,9.5rem)] leading-[0.78] tracking-[-0.07em] text-white drop-shadow-2xl"
                    style={{ textShadow: `0 0 50px color-mix(in srgb, ${accent} 32%, transparent)` }}
                  >
                    {shown}
                  </span>
                  {content.suffix && (
                    <span className="display pb-1 text-[clamp(1.2rem,3vw,2.2rem)] text-white/80 sm:pb-2">
                      {content.suffix}
                    </span>
                  )}
                </div>
                <figcaption className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/25 pt-3">
                  <span className="h-px w-8" style={{ background: accent }} />
                  <span className="text-[0.82rem] font-medium tracking-wide text-white/90 sm:text-[0.9rem]">
                    {t(content.label)}
                  </span>
                  <span className="numeral ms-auto text-[0.65rem] tracking-[0.22em] text-white/50">
                    SPEC / 01
                  </span>
                </figcaption>
              </div>

              <span className="pointer-events-none absolute end-5 top-5 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[0.62rem] tracking-[0.24em] text-white/70 backdrop-blur-md sm:end-7 sm:top-7">
                {t(content.eyebrow)}
              </span>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
