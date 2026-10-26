"use client";

import Image from "next/image";
import { useRef } from "react";
import { useLang } from "@/lib/i18n";
import Reveal from "@/components/ui/Reveal";
import KineticHeading from "@/components/ui/KineticHeading";
import { gsap, useGSAP, useReducedMotion } from "@/lib/motion";
import type { EditorialContent } from "@/lib/showcase-types";

/** A magazine-style split: oversized index, copy column and a portrait plate. */
export default function EditorialSplit({ content }: { content: EditorialContent }) {
  const { t } = useLang();
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const accent = content.accent ?? "var(--c-volt)";

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ".editorial-img",
        { yPercent: -6 },
        {
          yPercent: 6,
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
    <section ref={rootRef} className="relative overflow-hidden bg-ink-2 py-16 sm:py-20 lg:py-24" aria-label={t(content.eyebrow)}>
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className={`lg:col-span-6 ${content.flip ? "lg:order-2" : ""}`}>
          <Reveal y={40}>
            <div className="group relative isolate aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-ink sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src={content.image}
                alt={t(content.alt)}
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="editorial-img scale-[1.12] object-cover will-change-transform"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
              <span
                className="numeral display pointer-events-none absolute bottom-3 start-5 text-[clamp(5rem,13vw,10rem)] leading-[0.8] text-white/55 mix-blend-overlay sm:bottom-5 sm:start-7"
                aria-hidden
              >
                {content.index}
              </span>
              {content.quote && (
                <blockquote className="absolute bottom-4 end-4 z-10 w-[calc(100%_-_2rem)] max-w-[20rem] border border-white/20 bg-black/55 p-4 shadow-2xl backdrop-blur-xl sm:bottom-6 sm:end-6 sm:p-5">
                  <span className="mb-3 block h-px w-8" style={{ background: accent }} />
                  <p className="display text-[clamp(0.95rem,1.8vw,1.25rem)] leading-snug text-white">
                    {t(content.quote)}
                  </p>
                </blockquote>
              )}
            </div>
          </Reveal>
        </div>

        <div className={`lg:col-span-6 ${content.flip ? "lg:order-1" : ""}`}>
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
            className="display mt-5 max-w-[16ch] text-[clamp(1.7rem,3.6vw,3rem)] leading-[1.05] text-fog"
            delay={0.06}
          />

          <Reveal delay={0.12}>
            <p className="mt-5 max-w-[52ch] text-[1rem] leading-relaxed text-mist">{t(content.body)}</p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex items-center gap-3 border-t border-line pt-4">
              <span className="numeral text-[0.68rem] tracking-[0.2em]" style={{ color: accent }}>
                {content.index}
              </span>
              <span className="h-px flex-1 bg-line" />
              <span className="eyebrow text-dim">AURELIS JOURNAL</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
