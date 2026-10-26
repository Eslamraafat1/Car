"use client";

import { useRef } from "react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, usePrefersReducedMotion } from "@/lib/motion";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";

/** Home — four-step method with a connecting line that draws as you scroll. */
export default function ProcessSection() {
  const { t } = useLang();
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ".process-line",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".process-grid", start: "top 78%", end: "bottom 60%", scrub: 0.5 } },
      );
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section ref={rootRef} className="relative bg-ink-2 py-20 lg:py-32" aria-labelledby="process-title">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow text-volt">{t(C.process.eyebrow)}</p>
        </Reveal>
        <KineticHeading id="process-title" text={C.process.title} className="display h-section mt-4 max-w-3xl text-fog" />

        <div className="process-grid relative mt-14">
          <div className="pointer-events-none absolute inset-x-0 top-[1.55rem] hidden h-px bg-line lg:block" aria-hidden="true">
            <span className="process-line absolute inset-0 origin-start bg-volt rtl:origin-right" />
          </div>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {C.process.steps.map((step, index) => (
              <li key={step.title.en}>
                <Reveal delay={index * 0.1} className="h-full">
                  <div className="group relative h-full rounded-2xl border border-transparent p-1 transition-colors duration-500 hover:border-line lg:p-0 lg:hover:border-transparent">
                    <span className="numeral relative z-10 inline-flex size-[3.1rem] items-center justify-center rounded-full border border-volt/50 bg-ink-2 font-display text-lg font-semibold text-volt transition-all duration-500 group-hover:scale-110 group-hover:bg-volt group-hover:text-white">
                      {index + 1}
                    </span>
                    <h3 className="mt-6 font-display text-xl font-semibold text-fog">{t(step.title)}</h3>
                    <p className="mt-3 max-w-[32ch] text-[0.92rem] leading-relaxed text-mist">{t(step.body)}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
