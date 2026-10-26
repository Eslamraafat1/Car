"use client";

import { useRef, useState } from "react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { ScrollTrigger, useGSAP } from "@/lib/motion";

/**
 * Home — the four-step method as a pinned story. A giant numeral and the
 * active step change as you scroll while a progress rail fills.
 */
export default function ProcessSection() {
  const { t } = useLang();
  const rootRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const steps = C.process.steps;

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
          setActive((p) => (p === idx ? p : idx));
          setProgress(self.progress);
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative bg-ink-2" style={{ height: `${steps.length * 85 + 60}svh` }} aria-labelledby="process-title">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.5]" aria-hidden="true">
          <div className="absolute -end-24 top-[18%] size-[30rem] rounded-full bg-volt/10 blur-[120px]" />
        </div>
        <div className="mx-auto grid w-full max-w-[1400px] gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-14 lg:px-10">
          <div className="lg:col-span-6">
            <p className="eyebrow text-volt">{t(C.process.eyebrow)}</p>
            <h2 id="process-title" className="display h-section mt-4 text-fog">{t(C.process.title)}</h2>

            <div className="relative mt-6 grid min-h-[8rem] sm:min-h-[9rem]">
              {steps.map((s, i) => (
                <div
                  key={s.title.en}
                  aria-hidden={active !== i}
                  className={`col-start-1 row-start-1 transition-all duration-700 ease-out ${active === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
                >
                  <h3 className="font-display text-2xl font-semibold text-fog sm:text-3xl">{t(s.title)}</h3>
                  <p className="mt-3 max-w-md text-[1rem] leading-[1.9] text-mist">{t(s.body)}</p>
                </div>
              ))}
            </div>

            <ol className="mt-8 flex gap-2 sm:gap-3" aria-label={t(C.process.title)}>
              {steps.map((s, i) => (
                <li key={s.title.en} className="flex-1">
                  <div className="h-1 overflow-hidden rounded-full bg-line">
                    <div className="h-full origin-start rounded-full bg-volt transition-transform duration-500 rtl:origin-right" style={{ transform: `scaleX(${Math.max(0, Math.min(1, progress * steps.length - i))})` }} />
                  </div>
                  <span className={`mt-2 block text-[0.7rem] transition-colors duration-300 sm:text-[0.78rem] ${active === i ? "text-fog" : "text-dim"}`}>{t(s.title)}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative flex items-center justify-center lg:col-span-6" aria-hidden="true">
            <div className="relative grid size-[min(62vw,22rem)] place-items-center rounded-full border border-line lg:size-[min(34vw,30rem)]">
              <div className="absolute inset-[8%] rounded-full border border-dashed border-line" style={{ transform: `rotate(${progress * 360}deg)` }} />
              <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(var(--c-volt) ${progress * 360}deg, transparent 0)`, mask: "radial-gradient(circle, transparent 62%, #000 63%)", WebkitMask: "radial-gradient(circle, transparent 62%, #000 63%)" }} />
              <div className="relative h-[44%] w-full overflow-hidden text-center">
                {steps.map((s, i) => (
                  <span
                    key={s.title.en}
                    className={`numeral absolute inset-0 flex items-center justify-center font-display text-[clamp(5rem,18vw,11rem)] font-bold leading-none text-fog transition-all duration-700 ease-out ${active === i ? "translate-y-0 opacity-100" : active > i ? "-translate-y-full opacity-0" : "translate-y-full opacity-0"}`}
                  >
                    0{i + 1}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
