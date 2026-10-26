"use client";

import Image from "next/image";
import { useRef } from "react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, useReducedMotion } from "@/lib/motion";

const TARGETS = [2.6, 1020, 350, 700];
const DECIMALS = [1, 0, 0, 0];

function localize(value: string, arabic: boolean) {
  if (!arabic) return value;
  return value.replace(/\d/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[Number(digit)]);
}

function format(value: number, decimals: number, arabic: boolean) {
  const fixed = value.toFixed(decimals);
  const [whole, fraction] = fixed.split(".");
  const withSeparator = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const text = fraction ? `${withSeparator}.${fraction}` : withSeparator;
  return localize(text, arabic);
}

/** Scene D — oversized illustrative specifications. */
export default function PerformanceScene() {
  const rootRef = useRef<HTMLElement | null>(null);
  const { t, lang } = useLang();
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      gsap.set(".perf-media", { scale: 1.16, yPercent: -4 });
      gsap.set([".perf-title", ".perf-body", ".perf-disclaimer"], { autoAlpha: 0, y: 30 });
      gsap.set(".perf-stat", { autoAlpha: 0, y: 46 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });

      tl.to(".perf-media", { scale: 1, yPercent: 0, duration: 0.55 }, 0)
        .to(".perf-title", { autoAlpha: 1, y: 0, duration: 0.16 }, 0.05)
        .to(".perf-body", { autoAlpha: 1, y: 0, duration: 0.14 }, 0.14)
        .to(".perf-stat", { autoAlpha: 1, y: 0, duration: 0.18, stagger: 0.06 }, 0.24)
        .to(".perf-disclaimer", { autoAlpha: 1, y: 0, duration: 0.14 }, 0.5)
        .to(".perf-media", { yPercent: 5, duration: 0.4 }, 0.55);

      const arabic = lang === "ar";
      gsap.utils.toArray<HTMLElement>(".perf-value").forEach((el, index) => {
        const target = TARGETS[index] ?? 0;
        const decimals = DECIMALS[index] ?? 0;
        const proxy = { value: 0 };
        gsap.to(proxy, {
          value: target,
          duration: 1.7,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = format(proxy.value, decimals, arabic);
          },
          scrollTrigger: {
            trigger: ".perf-stats",
            start: "top 78%",
            once: true,
          },
        });
      });
    },
    { scope: rootRef, dependencies: [reduced, lang], revertOnUpdate: true },
  );

  return (
    <section
      id="performance"
      ref={rootRef}
      className="cinema relative h-[130svh] bg-ink-2 lg:h-[150svh]"
      aria-labelledby="performance-title"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="perf-media absolute inset-0 will-change-transform">
          <Image
            src="/media/images/performance-car.jpg"
            alt={
              lang === "ar"
                ? "سيارة رياضية تعبر الطريق بسرعة"
                : "Sports car sweeping across the road"
            }
            fill
            sizes="100vw"
            className="object-cover opacity-45"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        <div className="pointer-events-none absolute inset-0 grain" />

        <div className="relative flex h-full flex-col justify-between px-4 pb-10 pt-24 sm:px-6 lg:px-10 lg:pb-14">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="flex items-center justify-between gap-6">
              <p className="eyebrow text-volt">{t(C.performance.scene)}</p>
              <span className="numeral text-[0.7rem] tracking-[0.3em] text-white/40">04 — 05</span>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <h2 id="performance-title" className="perf-title display h-section text-fog">
                  {t(C.performance.title)}
                </h2>
              </div>
              <p className="perf-body text-[0.95rem] leading-relaxed text-mist lg:col-span-5">
                {t(C.performance.body)}
              </p>
            </div>
          </div>

          <div className="perf-stats mx-auto w-full max-w-[1400px]">
            <ul className="grid grid-cols-2 gap-x-5 gap-y-7 lg:grid-cols-4">
              {C.performance.stats.map((stat, index) => (
                <li key={stat.label.en} className="perf-stat border-t border-white/15 pt-4">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="perf-value numeral h-stat font-semibold text-fog"
                      data-value={TARGETS[index]}
                    >
                      {format(TARGETS[index], DECIMALS[index], lang === "ar")}
                    </span>
                    <span className="text-[0.8rem] tracking-wider text-volt">{t(stat.unit)}</span>
                  </div>
                  <p className="mt-2 text-[0.82rem] text-mist">{t(stat.label)}</p>
                </li>
              ))}
            </ul>

            <p className="perf-disclaimer mt-7 max-w-2xl border-s-2 border-volt/60 ps-3 text-[0.75rem] leading-relaxed text-white/50">
              {t(C.performance.disclaimer)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
