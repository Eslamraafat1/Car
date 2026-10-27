"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { C, type BiStr } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, usePrefersReducedMotion } from "@/lib/motion";
import type { Vehicle } from "@/lib/vehicles";

const SCENES: { time: string; title: BiStr; body: (v: Vehicle) => BiStr }[] = [
  {
    time: "06:30",
    title: { ar: "الفجر", en: "First light" },
    body: (v) => ({ ar: `هدوء الصباح، ${v.brand} ${v.model} جاهزة قبل أن تستيقظ المدينة.`, en: `Morning stillness — the ${v.brand} ${v.model} is ready before the city wakes.` }),
  },
  {
    time: "12:30",
    title: { ar: "الظهيرة", en: "High noon" },
    body: () => ({ ar: "طريق مفتوح وسماء صافية، وكل تفصيلة تعمل كما صُمّمت.", en: "Open road, clear sky — every detail working exactly as designed." }),
  },
  {
    time: "18:00",
    title: { ar: "الغروب", en: "Golden hour" },
    body: () => ({ ar: "الضوء الذهبي يرسم خطوط السيارة، وهذه أجمل لحظات القيادة.", en: "Golden light traces every line — the best drive of the day." }),
  },
  {
    time: "22:30",
    title: { ar: "الليل", en: "City lights" },
    body: (v) => ({ ar: `أضواء المدينة ورفاهية هادئة، وهكذا تنتهي الرحلة مع ${v.model}.`, en: `City lights and quiet luxury — that is how a day ends with the ${v.model}.` }),
  },
];

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

/**
 * Car page — "a day with the car". Pinned: as you scroll, the sky moves from
 * dawn through noon and golden hour into night; the sun crosses its arc and
 * the moon rises, stars appear, the clock ticks, and the photograph is graded
 * to match. All graded layers are updated through CSS variables, not React.
 */
export default function DayStory({ vehicle }: { vehicle: Vehicle }) {
  const { t } = useLang();
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const [scene, setScene] = useState(0);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const stage = root.querySelector<HTMLElement>(".ds-stage");
      const sun = root.querySelector<HTMLElement>(".ds-sun");
      const moon = root.querySelector<HTMLElement>(".ds-moon");
      const clock = root.querySelector<HTMLElement>("[data-clock]");
      const skies = root.querySelectorAll<HTMLElement>(".ds-sky");
      const tints = root.querySelectorAll<HTMLElement>(".ds-tint");
      if (!stage || !sun || !moon || !clock) return;

      const apply = (p: number) => {
        const s = p * 3;
        skies.forEach((el, i) => (el.style.opacity = String(clamp(1 - Math.abs(s - i)))));
        tints.forEach((el, i) => (el.style.opacity = String(clamp(1 - Math.abs(s - i)))));
        stage.style.setProperty("--night", clamp((p - 0.62) / 0.3).toFixed(3));

        const ps = clamp(p / 0.8);
        sun.style.opacity = String(clamp(1 - (p - 0.74) / 0.1));
        sun.style.left = `${8 + 84 * ps}%`;
        sun.style.top = `${74 - 60 * Math.sin(Math.PI * ps)}%`;
        const pm = clamp((p - 0.68) / 0.3);
        moon.style.opacity = String(pm);
        moon.style.left = `${28 + 44 * pm}%`;
        moon.style.top = `${34 - 8 * pm}%`;

        const minutes = Math.round(390 + p * 1050);
        clock.textContent = `${String(Math.floor(minutes / 60) % 24).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
        const idx = Math.min(3, Math.round(s));
        setScene((prev) => (prev === idx ? prev : idx));
      };

      if (reduced) {
        apply(0.5);
        return;
      }
      const state = { p: 0 };
      apply(0);
      gsap.to(state, {
        p: 1,
        ease: "none",
        onUpdate: () => apply(state.p),
        scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.5 },
      });
    },
    { scope: rootRef, dependencies: [reduced] },
  );

  const sc = SCENES[scene];

  return (
    <section ref={rootRef} className="relative h-[380svh] bg-[#070809] text-white" aria-labelledby="day-title">
      <div className="ds-stage sticky top-0 h-svh overflow-hidden" style={{ ["--night" as string]: 0 }}>
        {/* four skies cross-fading */}
        <div className="ds-sky absolute inset-0" style={{ background: "linear-gradient(180deg,#27355f 0%,#c8688a 55%,#ffc89a 100%)" }} />
        <div className="ds-sky absolute inset-0 opacity-0" style={{ background: "linear-gradient(180deg,#2f7fe8 0%,#79b9ff 60%,#d7ecff 100%)" }} />
        <div className="ds-sky absolute inset-0 opacity-0" style={{ background: "linear-gradient(180deg,#5a3a8a 0%,#e6743d 58%,#ffc15a 100%)" }} />
        <div className="ds-sky absolute inset-0 opacity-0" style={{ background: "linear-gradient(180deg,#04060f 0%,#0b1536 60%,#16295a 100%)" }} />

        {/* stars */}
        <div className="ds-stars pointer-events-none absolute inset-0" aria-hidden="true" />
        {/* celestial bodies */}
        <div className="ds-sun pointer-events-none absolute size-[clamp(3.5rem,9vw,7rem)] -translate-x-1/2 -translate-y-1/2 rounded-full" aria-hidden="true" />
        <div className="ds-moon pointer-events-none absolute size-[clamp(2.6rem,6vw,4.5rem)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0" aria-hidden="true" />

        {/* horizon glow */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] flex-col px-4 pb-28 pt-24 sm:px-6 sm:pt-28 lg:px-10 lg:pb-28">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-white/85">{t(C.carPage.dayEyebrow)}</p>
              <h2 id="day-title" className="display mt-3 text-[clamp(1.8rem,4.6vw,3.8rem)] text-white">{t(C.carPage.dayTitle)}</h2>
            </div>
            <p data-clock className="numeral font-display text-[clamp(2.4rem,7vw,5rem)] font-light leading-none tabular-nums" dir="ltr">06:30</p>
          </div>

          {/* the car, graded to the hour */}
          <div className="relative mx-auto my-auto w-full max-w-[56rem] py-5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[26px] border border-white/20 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] sm:aspect-[16/9]">
              <Image src={vehicle.image} alt={t(vehicle.alt)} fill sizes="(min-width: 1024px) 896px, 92vw" quality={70} loading="lazy" className="ds-photo object-cover" />
              <div className="ds-tint absolute inset-0 mix-blend-soft-light" style={{ background: "linear-gradient(180deg,#ff9bb0,#ffd2a0)" }} />
              <div className="ds-tint absolute inset-0 opacity-0 mix-blend-soft-light" style={{ background: "linear-gradient(180deg,#bfe0ff,transparent)" }} />
              <div className="ds-tint absolute inset-0 opacity-0 mix-blend-soft-light" style={{ background: "linear-gradient(180deg,#ff7a2e,#ffb347)" }} />
              <div className="ds-tint absolute inset-0 opacity-0 mix-blend-multiply" style={{ background: "linear-gradient(180deg,#3a4f9a,#5a74c8)" }} />
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.35)]" />
            </div>
            <div className="ds-reflect pointer-events-none absolute inset-x-[8%] -bottom-1 h-6 rounded-[50%] bg-black/50 blur-xl" aria-hidden="true" />
          </div>

          <div className="grid items-end gap-4 sm:grid-cols-12">
            <div className="relative min-h-[7.5rem] sm:col-span-8 sm:min-h-[6.5rem]">
              {SCENES.map((s, i) => (
                <div key={s.time} aria-hidden={i !== scene} className={`absolute inset-x-0 top-0 transition-all duration-700 ease-out ${i === scene ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
                  <h3 className="font-display text-xl font-semibold sm:text-2xl">{t(s.title)}</h3>
                  <p className="mt-2 max-w-xl text-[0.92rem] leading-[1.8] text-white/80">{t(s.body(vehicle))}</p>
                </div>
              ))}
            </div>
            <ol className="flex gap-2 sm:col-span-4 sm:justify-end" aria-hidden="true">
              {SCENES.map((s, i) => (
                <li key={s.time} className={`h-1 rounded-full transition-all duration-500 ${i === scene ? "w-10 bg-white" : "w-4 bg-white/35"}`} />
              ))}
            </ol>
          </div>
        </div>
      </div>
      <span className="sr-only">{sc.time}</span>
    </section>
  );
}
