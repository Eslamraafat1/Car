"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import Reveal from "@/components/ui/Reveal";
import KineticHeading from "@/components/ui/KineticHeading";
import { gsap, useGSAP, useReducedMotion } from "@/lib/motion";
import type { PinsContent } from "@/lib/showcase-types";

/** A hero plate annotated with interactive hotspots that reveal labels. */
export default function FeaturePins({ content }: { content: PinsContent }) {
  const { t, lang } = useLang();
  const [activePin, setActivePin] = useState<number | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const accent = content.accent ?? "var(--c-volt)";

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from(".pin-dot", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(2.2)",
        stagger: 0.16,
        scrollTrigger: { trigger: rootRef.current, start: "top 66%", once: true },
      });
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-ink py-16 sm:py-20 lg:py-24" aria-label={t(content.eyebrow)}>
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-10" style={{ background: accent }} />
                <p className="eyebrow" style={{ color: accent }}>
                  {t(content.eyebrow)}
                </p>
              </div>
              <KineticHeading
                text={content.title}
                className="display mt-4 max-w-[20ch] text-[clamp(1.6rem,3.4vw,2.7rem)] leading-[1.06] text-fog"
              />
            </div>
          </Reveal>
          <span className="numeral text-[0.7rem] tracking-[0.2em] text-dim">
            {String(content.pins.length).padStart(2, "0")} — {lang === "ar" ? "تفاصيل" : "POINTS"}
          </span>
        </div>

        <Reveal y={40}>
          <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-ink-2">
            <Image
              src={content.image}
              alt={t(content.alt)}
              fill
              sizes="(min-width:1024px) 92vw, 100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-ink/10" />

            {content.pins.map((pin, index) => {
              const selected = activePin === index;
              const tooltipPosition = `${pin.y > 62 ? "bottom-full mb-3" : "top-full mt-3"} ${pin.x > 65 ? "end-0" : "start-0"}`;
              return (
                <span
                  key={`${pin.x}-${pin.y}`}
                  className="absolute z-10 inline-flex size-11 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                >
                  <button
                    type="button"
                    aria-label={`${t(pin.label)}${pin.value ? ` — ${pin.value}` : ""}`}
                    aria-expanded={selected}
                    aria-controls={`feature-pin-${index}`}
                    onClick={() => setActivePin(selected ? null : index)}
                    onFocus={() => setActivePin(index)}
                    className="pin-dot inline-flex size-11 items-center justify-center rounded-full outline-offset-2 focus-visible:outline-2 focus-visible:outline-volt"
                  >
                  <span className="relative flex size-5 items-center justify-center">
                    <span
                      className={`absolute inline-flex size-5 rounded-full opacity-50 ${selected ? "animate-ping" : ""}`}
                      style={{ background: accent }}
                    />
                    <span
                      className="relative inline-flex size-3 rounded-full ring-2 ring-white/90 shadow-[0_0_18px_rgba(0,0,0,0.65)]"
                      style={{ background: accent }}
                    />
                  </span>

                  <span
                    id={`feature-pin-${index}`}
                    role="tooltip"
                    className={`pointer-events-none absolute ${tooltipPosition} z-20 min-w-32 max-w-[min(14rem,65vw)] rounded-xl border border-white/15 bg-black/85 px-3.5 py-2.5 text-start shadow-2xl backdrop-blur-xl transition-[opacity,transform] duration-200 ${selected ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
                    aria-hidden={!selected}
                  >
                    <span className="block text-[0.76rem] font-medium leading-snug text-white">
                      {t(pin.label)}
                    </span>
                    {pin.value && (
                      <span className="numeral mt-1 block text-[0.68rem] text-white/60">{pin.value}</span>
                    )}
                  </span>
                  </button>
                </span>
              );
            })}
          </div>
        </Reveal>

        <div
          role="group"
          aria-label={lang === "ar" ? "تفاصيل السيارة" : "Car details"}
          className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3"
        >
          {content.pins.map((pin, index) => {
            const selected = activePin === index;
            return (
              <button
                key={`detail-${pin.x}-${pin.y}`}
                type="button"
                aria-pressed={selected}
                onClick={() => setActivePin(selected ? null : index)}
                className={`flex min-h-14 items-center gap-3 rounded-xl border px-3.5 py-2.5 text-start transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt ${
                  selected ? "border-volt/60 bg-volt/10" : "border-line bg-ink-2 hover:border-volt/35"
                }`}
              >
                <span
                  className="numeral inline-flex size-8 shrink-0 items-center justify-center rounded-full border text-[0.66rem]"
                  style={{ borderColor: selected ? accent : "var(--c-line)", color: selected ? accent : "var(--c-mist)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 truncate text-[0.78rem] font-medium text-fog">
                  {t(pin.label)}
                </span>
                {pin.value && <span className="numeral shrink-0 text-[0.68rem] text-dim">{pin.value}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
