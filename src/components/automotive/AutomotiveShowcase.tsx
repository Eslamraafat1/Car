"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { getVehicle, type Vehicle, specValue } from "@/lib/vehicles";

const SLUGS = [
  "lamborghini-huracan-evo",
  "porsche-911-turbo-s",
  "mercedes-g63",
  "tesla-roadster",
  "bmw-7-series",
];

export default function AutomotiveShowcase() {
  const { t, lang } = useLang();
  const [slide, setSlide] = useState({ index: 0, offset: 1 });

  const fleet = useMemo(
    () => SLUGS.map((slug) => getVehicle(slug)).filter((v): v is Vehicle => Boolean(v)),
    [],
  );

  const index = slide.index;
  const active = fleet[index] ?? fleet[0];
  const sign = lang === "ar" ? -1 : 1;

  const go = (next: number) => {
    const bounded = (next + fleet.length) % fleet.length;
    setSlide((prev) => ({ index: bounded, offset: Math.sign(bounded - prev.index) || 1 }));
  };

  const direction = slide.offset * sign;

  return (
    <section
      className="relative isolate overflow-hidden bg-ink py-20 lg:py-32"
      aria-labelledby="showcase-title"
    >
      <div className="pointer-events-none absolute -end-40 top-12 select-none font-display text-[clamp(16rem,38vw,42rem)] font-black leading-none text-white/[0.018]" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="pointer-events-none absolute start-0 top-[38%] h-px w-1/3 bg-gradient-to-r from-transparent via-volt/30 to-transparent" aria-hidden="true" />
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 border-b border-line pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="size-2 rotate-45 bg-volt shadow-[0_0_18px_rgba(77,163,255,.8)]" />
              <p className="eyebrow text-volt">{t(C.showcase.eyebrow)}</p>
            </div>
            <h2 id="showcase-title" className="display mt-4 text-[clamp(2.8rem,7vw,6.4rem)] leading-[0.92] tracking-[-0.055em] text-fog">
              {t(C.showcase.title)}
            </h2>
          </div>
          <div className="flex items-end justify-between gap-6 lg:col-span-5">
            <p className="max-w-md text-[0.95rem] leading-relaxed text-mist">{t(C.showcase.body)}</p>
            <span className="hidden shrink-0 font-display text-5xl font-light tracking-[-0.06em] text-white/20 sm:block">{String(index + 1).padStart(2, "0")}<span className="text-lg text-volt"> / 0{fleet.length}</span></span>
          </div>
        </div>

        <div className="mt-8">
          <div className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[26px] border border-white/10 bg-ink-2 sm:aspect-[16/9] lg:aspect-[2/1]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active.slug}
                  initial={{ opacity: 0, x: direction * 80, scale: 1.08 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction * -60, scale: 0.98 }}
                  transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.image}
                    alt={t(active.alt)}
                    fill
                    priority={false}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(90deg, rgba(7,8,9,.7), transparent 70%), linear-gradient(to top, rgba(7,8,9,.92), transparent 54%), radial-gradient(55% 60% at 82% 8%, ${active.accent}44, transparent 75%)` }} />
              <div className="pointer-events-none absolute inset-0 grain" />

              <div className="pointer-events-none absolute inset-5 rounded-[18px] border border-white/[0.11] sm:inset-7" aria-hidden="true">
                <span className="absolute -start-px -top-px size-5 border-s-2 border-t-2" style={{ borderColor: active.accent }} />
                <span className="absolute -end-px -bottom-px size-5 border-e-2 border-b-2" style={{ borderColor: active.accent }} />
              </div>

              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 sm:p-8 lg:p-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-2 text-[0.64rem] tracking-[0.18em] text-white/80 backdrop-blur-md">
                  <span className="size-1.5 animate-pulse rounded-full" style={{ backgroundColor: active.accent }} />{t(C.showcase.demo)}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => go(index - 1)}
                    aria-label={lang === "ar" ? "السابق" : "Previous"}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/70"
                  >
                    {lang === "ar" ? <ChevronRight className="size-5" /> : <ChevronLeft className="size-5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => go(index + 1)}
                    aria-label={lang === "ar" ? "التالي" : "Next"}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/70"
                  >
                    {lang === "ar" ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
                  </button>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-7 sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:p-14">
                <div className="max-w-2xl">
                  <p className="eyebrow" style={{ color: active.accent }}>{active.brand}</p>
                  <h3 className="display mt-2 text-[clamp(2.3rem,6vw,5.7rem)] leading-[0.88] tracking-[-0.055em] text-white">{active.model}</h3>
                  <p className="mt-4 max-w-md text-[0.88rem] leading-relaxed text-white/75 sm:text-base">{t(active.tagline)}</p>
                </div>
                <div className="grid max-w-sm grid-cols-2 gap-x-8 gap-y-3 border-s border-white/25 ps-5 sm:gap-x-12 sm:ps-7">
                  {active.specs.slice(0, 2).map((spec) => <div key={spec.label.en}>
                    <p className="text-[0.65rem] uppercase tracking-[0.16em] text-white/55">{t(spec.label)}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-white sm:text-2xl">{specValue(spec.value, lang)}</p>
                  </div>)}
                </div>
              </div>
            </div>

            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5" role="list">
              {fleet.map((vehicle, i) => {
                const selected = i === index;
                return (
                  <li key={vehicle.slug} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-pressed={selected}
                      aria-label={`${vehicle.brand} ${vehicle.model}`}
                      className={`group relative flex min-h-[4.5rem] w-full items-center gap-3 overflow-hidden rounded-xl border px-3 text-start transition-all duration-300 sm:min-h-[5.25rem] sm:px-4 ${
                        selected
                          ? "border-white/30 bg-white/[0.08]"
                          : "border-line bg-transparent hover:border-white/25 hover:bg-white/[0.04]"
                      }`}
                    >
                      <span className="relative size-12 shrink-0 overflow-hidden rounded-lg sm:size-14">
                        <Image src={vehicle.image} alt="" fill sizes="56px" className="object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[0.58rem] uppercase tracking-[0.13em] text-dim">{vehicle.brand}</span>
                        <span className={`mt-1 block truncate font-display text-[0.78rem] font-medium sm:text-[0.84rem] ${selected ? "text-fog" : "text-mist"}`}>{vehicle.model}</span>
                      </span>
                      <span className="absolute inset-x-3 bottom-0 h-[2px] origin-start transition-transform duration-500" style={{ backgroundColor: vehicle.accent, transform: selected ? "scaleX(1)" : "scaleX(0)" }} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-8 grid gap-6 border-t border-line pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="grid gap-5 sm:grid-cols-2 lg:max-w-3xl">
              <div>
                <p className="eyebrow text-mist">{t(C.showcase.specsLabel)}</p>
                <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-mist">{t(active.description)}</p>
              </div>
              <dl className="grid grid-cols-2 gap-x-5 gap-y-3">
                {active.specs.map((spec) => <div key={spec.label.en} className="border-t border-line pt-2">
                  <dt className="text-[0.66rem] tracking-wider text-dim">{t(spec.label)}</dt>
                  <dd className="mt-1 font-display text-sm font-medium text-fog">{specValue(spec.value, lang)}</dd>
                </div>)}
              </dl>
            </div>
            <Link href={`/cars/${active.slug}`} className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-fog px-7 text-[0.88rem] font-semibold text-ink transition-all duration-300 hover:scale-[1.03] hover:bg-volt hover:text-white lg:min-w-56">
              {t(C.showcase.view)}
              {lang === "ar" ? <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={2.2} /> : <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.2} />}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
