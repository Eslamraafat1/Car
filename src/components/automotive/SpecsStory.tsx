"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, ScrollTrigger, useGSAP, usePrefersReducedMotion } from "@/lib/motion";
import { specValue, type Vehicle } from "@/lib/vehicles";

/**
 * Car page — specifications as a pinned story: the photograph drifts behind
 * while each figure takes the stage in turn, large, as you scroll.
 */
export default function SpecsStory({ vehicle }: { vehicle: Vehicle }) {
  const { t, lang } = useLang();
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const items = vehicle.specs.filter((s) => s.label.en !== "Year");
  const n = items.length;

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setActive((p) => {
            const idx = Math.min(n - 1, Math.floor(self.progress * n));
            return p === idx ? p : idx;
          });
          setProgress(self.progress);
        },
      });
      if (!reduced) {
        gsap.fromTo(".ss-bg", { scale: 1.2, xPercent: -3 }, { scale: 1.02, xPercent: 3, ease: "none", scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true } });
      }
    },
    { scope: rootRef, dependencies: [reduced, n], revertOnUpdate: true },
  );

  return (
    <section ref={rootRef} className="relative bg-[#070809] text-white" style={{ height: `${n * 70 + 60}svh` }} aria-label={t(C.car.specs)}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={vehicle.image} alt="" fill sizes="100vw" className="ss-bg object-cover opacity-45 will-change-transform" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070809] via-[#070809]/55 to-[#070809]/80" />
          <div className="absolute inset-0 opacity-70" style={{ background: `radial-gradient(60% 55% at 70% 40%, ${vehicle.accent}33, transparent 70%)` }} />
        </div>

        <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <p className="eyebrow" style={{ color: vehicle.accent }}>{vehicle.brand} · {vehicle.model}</p>

          <div className="relative mt-6 grid min-h-[12rem] sm:min-h-[16rem]">
            {items.map((s, i) => (
              <div
                key={s.label.en}
                aria-hidden={active !== i}
                className={`col-start-1 row-start-1 flex flex-col justify-center transition-all duration-700 ease-out ${active === i ? "translate-y-0 opacity-100 blur-0" : active > i ? "-translate-y-10 opacity-0 blur-sm" : "translate-y-10 opacity-0 blur-sm"}`}
              >
                <p className="text-[0.8rem] uppercase tracking-[0.22em] text-white/60">{t(s.label)}</p>
                <p className="display mt-3 break-words text-[clamp(2.4rem,10.5vw,9rem)] leading-[1.02] text-white">{specValue(s.value, lang)}</p>
              </div>
            ))}
          </div>

          <ol className="mt-8 flex gap-2 sm:gap-3" aria-hidden="true">
            {items.map((s, i) => (
              <li key={s.label.en} className="flex-1">
                <div className="h-[3px] overflow-hidden rounded-full bg-white/20">
                  <div className="h-full origin-start rounded-full rtl:origin-right" style={{ background: vehicle.accent, transform: `scaleX(${Math.max(0, Math.min(1, progress * n - i))})`, transition: "transform .3s linear" }} />
                </div>
                <span className={`mt-2 hidden text-[0.72rem] sm:block ${active === i ? "text-white" : "text-white/40"}`}>{t(s.label)}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
