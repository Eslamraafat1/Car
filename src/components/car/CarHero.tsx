"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, Mail } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, usePrefersReducedMotion } from "@/lib/motion";
import { useCountUp, useInView } from "@/lib/showcase-hooks";
import { CATEGORY_LABELS, specValue, type Vehicle } from "@/lib/vehicles";
import { perfOf, priceNumber } from "@/lib/vehicle-extra";
import { scrollToId } from "@/lib/smooth-scroll";

const ShaderImage = dynamic(() => import("@/components/three/ShaderImage"), { ssr: false });

/** Splits a model name into nowrap words of animated characters so it wraps only between words. */
function ModelName({ name }: { name: string }) {
  let n = 0;
  return (
    <h1 className="keep-tracking flex flex-wrap gap-x-[0.28em] font-display text-[clamp(2.7rem,11.5vw,10rem)] font-bold uppercase leading-[0.92] tracking-[-0.045em] rtl:justify-end" dir="ltr" aria-label={name}>
      {name.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split("").map((ch, ci) => (
            <span key={ci} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span className="ch-char inline-block" style={{ ["--i" as string]: n++ }}>{ch}</span>
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

/** Car page opening: parallax photo, ghost brand, kinetic model name, price and calls to action. */
export default function CarHero({ vehicle }: { vehicle: Vehicle }) {
  const { t, lang } = useLang();
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const [priceRef, seen] = useInView<HTMLDivElement>(0.3);
  const price = useCountUp(priceNumber(vehicle), seen, 1600);
  const perf = perfOf(vehicle);
  const Back = lang === "ar" ? ArrowRight : ArrowLeft;
  const subject = encodeURIComponent(`${C.brand.name} — ${vehicle.brand} ${vehicle.model}`);
  const chips = vehicle.specs.filter((s) => s.label.en !== "Year" && s.label.en !== "Indicative price").slice(0, 3);

  useGSAP(
    () => {
      if (reduced) return;
      const st = { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 0.4 };
      gsap.to(".ch-bg", { yPercent: 14, scale: 1.12, ease: "none", scrollTrigger: st });
      gsap.to(".ch-content", { yPercent: -10, autoAlpha: 0.2, ease: "none", scrollTrigger: st });
      gsap.from(".ch-in", { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.09, ease: "power3.out", delay: 0.35 });
    },
    { scope: rootRef, dependencies: [reduced] },
  );

  return (
    <section ref={rootRef} className="relative isolate overflow-hidden bg-[#070809] text-white" aria-label={`${vehicle.brand} ${vehicle.model}`}>
      <div className="ch-bg absolute inset-0 will-change-transform">
        <Image src={vehicle.image} alt={t(vehicle.alt)} fill priority sizes="100vw" className="object-cover" />
        <ShaderImage src={vehicle.image} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070809] via-[#070809]/30 to-[#070809]/70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#070809]/60 via-transparent to-transparent rtl:bg-gradient-to-l" />
      <div className="pointer-events-none absolute inset-0 opacity-80" style={{ background: `radial-gradient(60% 55% at 78% 18%, ${vehicle.accent}30, transparent 70%)` }} />

      {/* ghost brand */}
      <div className="fade-late pointer-events-none absolute inset-x-0 top-[16%] overflow-hidden" aria-hidden="true" dir="ltr">
        <p className="keep-tracking whitespace-nowrap font-display text-[clamp(5rem,24vw,22rem)] font-black uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.14)]">
          {vehicle.brand}
        </p>
      </div>

      <div className="ch-content relative z-10 mx-auto flex min-h-[94svh] w-full max-w-[1400px] flex-col justify-between px-4 pb-8 pt-24 sm:px-6 sm:pt-28 lg:px-10 lg:pb-12">
        <div className="ch-in flex flex-wrap items-center gap-3">
          <Link href="/explore" className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-[0.8rem] text-white transition-colors duration-300 hover:border-white/70 lg:backdrop-blur-md">
            <Back className="size-4 transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:translate-x-1" strokeWidth={2.2} />
            {t(C.car.back)}
          </Link>
          <span className="rounded-full border border-white/25 bg-black/40 px-3 py-1.5 text-[0.7rem] text-white/85">{t(CATEGORY_LABELS[vehicle.category])}</span>
          <span className="numeral rounded-full border border-white/20 px-3 py-1.5 text-[0.7rem] text-white/70">{vehicle.year}</span>
        </div>

        <div>
          <p className="ch-in eyebrow mb-3" style={{ color: vehicle.accent }}>{vehicle.brand}</p>
          <ModelName name={vehicle.model} />
          <p className="ch-in mt-4 max-w-md text-[1rem] leading-relaxed text-white/75 sm:text-lg">{t(vehicle.tagline)}</p>

          <div className="mt-7 grid gap-6 lg:mt-10 lg:grid-cols-12 lg:items-end">
            <div ref={priceRef} className="ch-in lg:col-span-3">
              <p className="text-[0.72rem] uppercase tracking-[0.2em] text-white/55">{t(C.carPage.price)}</p>
              <p className="numeral mt-1 font-display text-[clamp(2.2rem,6vw,3.6rem)] font-semibold leading-none" dir="ltr">
                ${Math.round(price).toLocaleString("en-US")}
              </p>
            </div>

            <div className="ch-in flex flex-wrap items-center gap-3 lg:col-span-5">
              <a
                href={`mailto:${C.contactInfo.email}?subject=${subject}`}
                className="shine group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-white px-6 text-[0.88rem] font-semibold text-[#070809] transition-transform duration-300 hover:scale-[1.03] sm:px-7"
              >
                <Mail className="size-4" aria-hidden="true" />
                {t(C.carPage.enquire)}
              </a>
              <Link
                href="/contact"
                className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/30 px-6 text-[0.88rem] font-medium text-white transition-colors duration-300 hover:border-white hover:bg-white/10 sm:px-7"
              >
                {t(C.carPage.testDrive)}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" strokeWidth={2.2} />
              </Link>
            </div>

            <dl className="ch-in flex flex-wrap gap-x-8 gap-y-3 border-s border-white/25 ps-4 sm:ps-6 lg:col-span-4">
              {chips.map((s) => (
                <div key={s.label.en}>
                  <dt className="text-[0.6rem] uppercase tracking-[0.16em] text-white/55">{t(s.label)}</dt>
                  <dd className="mt-1 whitespace-nowrap font-display text-[0.9rem] font-semibold leading-tight sm:text-base">{specValue(s.value, lang)}</dd>
                </div>
              ))}
              {chips.length < 3 && (
                <div className="min-w-0">
                  <dt className="text-[0.6rem] uppercase tracking-[0.16em] text-white/55">{t(C.carPage.hp)}</dt>
                  <dd className="mt-1 font-display text-[0.9rem] font-semibold sm:text-base" dir="ltr">{perf.hp} {t(C.carPage.hpUnit)}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToId("car-overview")}
        aria-label={lang === "ar" ? "انزل" : "Scroll"}
        className="absolute bottom-5 start-1/2 z-10 hidden size-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white hover:text-white lg:inline-flex rtl:translate-x-1/2"
      >
        <ChevronDown className="size-5" />
      </button>
    </section>
  );
}
