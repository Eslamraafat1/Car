"use client";

import Image from "next/image";
import { useRef } from "react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, usePrefersReducedMotion } from "@/lib/motion";
import type { Vehicle } from "@/lib/vehicles";
import { perfOf } from "@/lib/vehicle-extra";

/** Speed streaks: [top %, width vw, velocity factor, opacity] — all driven by the scroll variable --p. */
const STREAKS: [number, number, number, number][] = [
  [8, 38, 90, 0.5], [14, 24, 140, 0.35], [21, 46, 70, 0.4], [29, 30, 120, 0.5], [36, 52, 100, 0.3],
  [44, 28, 150, 0.45], [52, 40, 80, 0.5], [60, 34, 130, 0.35], [67, 48, 95, 0.4], [74, 26, 160, 0.5],
  [81, 42, 85, 0.35], [88, 32, 125, 0.45], [93, 50, 105, 0.3],
];

/**
 * Car page — a pinned launch. Scrolling accelerates the car: the photograph
 * pans and pushes in, streaks tear past, and a live dashboard counts speed,
 * gear and revs up to the car's top speed, flagging the 0–100 mark on the way.
 * Everything is written straight to CSS variables / text nodes — no re-renders.
 */
export default function LaunchSequence({ vehicle }: { vehicle: Vehicle }) {
  const { t } = useLang();
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const perf = perfOf(vehicle);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const stage = root.querySelector<HTMLElement>(".ls-stage");
      const speedEl = root.querySelector<HTMLElement>("[data-speed]");
      const gearEl = root.querySelector<HTMLElement>("[data-gear]");
      const rpmEl = root.querySelector<HTMLElement>("[data-rpm]");
      const markEl = root.querySelector<HTMLElement>("[data-mark]");
      const flashEl = root.querySelector<HTMLElement>("[data-flash]");
      if (!stage || !speedEl || !gearEl || !rpmEl || !markEl || !flashEl) return;

      const apply = (p: number) => {
        stage.style.setProperty("--p", p.toFixed(4));
        const sp = Math.round(Math.pow(p, 1.35) * perf.top);
        speedEl.textContent = String(sp);
        const frac = sp / perf.top;
        gearEl.textContent = String(Math.min(6, 1 + Math.floor(frac * 6)));
        rpmEl.style.transform = `scaleX(${(0.22 + 0.78 * ((frac * 6) % 1)).toFixed(3)})`;
        markEl.dataset.on = sp >= 100 ? "true" : "false";
        flashEl.dataset.on = p > 0.94 ? "true" : "false";
      };

      if (reduced) {
        apply(0.72);
        return;
      }
      const state = { p: 0 };
      apply(0);
      gsap.to(state, {
        p: 1,
        ease: "none",
        onUpdate: () => apply(state.p),
        scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.45 },
      });
    },
    { scope: rootRef, dependencies: [reduced, perf.top] },
  );

  return (
    <section ref={rootRef} className="relative h-[300svh] bg-[#070809] text-white sm:h-[340svh]" aria-labelledby="launch-title">
      <div className="ls-stage sticky top-0 h-svh overflow-hidden" style={{ ["--p" as string]: 0 }}>
        {/* photograph: pans and pushes in as speed builds */}
        <div className="ls-img absolute inset-0 will-change-transform">
          <Image src={vehicle.image} alt={t(vehicle.alt)} fill sizes="100vw" quality={70} loading="lazy" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#070809] via-[#070809]/25 to-[#070809]/60" />
        <div className="ls-vignette pointer-events-none absolute inset-0" />
        <div className="ls-tint pointer-events-none absolute inset-0" style={{ background: `radial-gradient(70% 60% at 50% 55%, ${vehicle.accent}33, transparent 70%)` }} />

        {/* ghost model name drifting the other way */}
        <div className="ls-ghost pointer-events-none absolute inset-x-0 top-[22%] overflow-hidden" aria-hidden="true" dir="ltr">
          <p className="keep-tracking whitespace-nowrap font-display text-[clamp(6rem,26vw,24rem)] font-black uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.18)]">{vehicle.model}</p>
        </div>

        {/* streaks */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {STREAKS.map(([top, w, v, o], i) => (
            <span key={i} className="ls-streak absolute h-px bg-gradient-to-r from-transparent via-white to-transparent" style={{ top: `${top}%`, width: `${w}vw`, insetInlineStart: `${(i * 37) % 70}%`, ["--v" as string]: v, ["--o" as string]: o }} />
          ))}
        </div>

        {/* title */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] flex-col justify-between px-4 pb-28 pt-24 sm:px-6 sm:pt-28 lg:px-10 lg:pb-28">
          <div>
            <p className="eyebrow" style={{ color: vehicle.accent }}>{t(C.carPage.launchEyebrow)}</p>
            <h2 id="launch-title" className="display mt-3 text-[clamp(1.9rem,5vw,4.2rem)] text-white">{t(C.carPage.launchTitle)}</h2>
            <p className="ls-hint mt-3 text-[0.82rem] text-white/60">{t(C.carPage.launchHint)}</p>
          </div>

          {/* dashboard */}
          <div className="ls-hud flex items-end justify-between gap-4" dir="ltr">
            <div>
              <p className="text-[0.66rem] uppercase tracking-[0.22em] text-white/55">{t(C.carPage.speed)}</p>
              <p className="numeral flex items-baseline gap-2 font-display font-bold leading-none">
                <span data-speed className="inline-block min-w-[3ch] text-[clamp(4.2rem,17vw,10rem)] tabular-nums">0</span>
                <span className="text-[clamp(1rem,2.6vw,1.6rem)] font-medium text-white/65">{t(C.carPage.kmh)}</span>
              </p>
              <p data-mark data-on="false" className="ls-mark mt-3 inline-flex items-center gap-2 rounded-full border border-white/25 px-3.5 py-1.5 text-[0.74rem] text-white/60">
                <span className="size-1.5 rounded-full bg-current" />
                {t(C.carPage.reached100)} <span className="numeral font-semibold">{perf.accel.toFixed(1)}s</span>
              </p>
            </div>

            <div className="w-[8.5rem] shrink-0 sm:w-[14rem]">
              <div className="flex items-end justify-between">
                <p className="text-[0.66rem] uppercase tracking-[0.22em] text-white/55">{t(C.carPage.gear)}</p>
                <p className="numeral font-display text-[clamp(2.4rem,7vw,4.4rem)] font-bold leading-none" data-gear>1</p>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                <div data-rpm className="h-full origin-left rounded-full" style={{ background: `linear-gradient(90deg, ${vehicle.accent}, #fff)`, transform: "scaleX(0.22)" }} />
              </div>
              <div className="mt-2 flex justify-between text-[0.6rem] text-white/40">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <span key={n}>{n}</span>)}
              </div>
            </div>
          </div>
        </div>

        <p data-flash data-on="false" className="ls-flash pointer-events-none absolute inset-x-0 top-1/2 text-center font-display text-[clamp(2rem,9vw,6.5rem)] font-black uppercase tracking-[0.1em] text-white" aria-hidden="true">
          {t(C.carPage.topSpeedNow)}
        </p>
      </div>
    </section>
  );
}
