"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, usePrefersReducedMotion } from "@/lib/motion";
import { useCountUp, useInView } from "@/lib/showcase-hooks";
import KineticHeading from "@/components/ui/KineticHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";

function Stat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const shown = useCountUp(value, seen, 1800);
  return (
    <Reveal delay={delay} y={26}>
      <div ref={ref} className="group relative overflow-hidden rounded-2xl hairline bg-ink-2 p-5 transition-transform duration-500 hover:-translate-y-1.5 sm:p-6">
        <span className="pointer-events-none absolute -end-6 -top-6 size-24 rounded-full bg-volt/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
        <p className="numeral font-display text-[clamp(2.2rem,5vw,3.4rem)] font-semibold leading-none tracking-tight text-fog" dir="ltr">
          {Math.round(shown)}
          <span className="text-volt">{suffix}</span>
        </p>
        <p className="mt-3 text-[0.82rem] leading-snug text-mist">{label}</p>
      </div>
    </Reveal>
  );
}

/** Home — who we are: parallax image, kinetic title and count-up numbers. */
export default function CompanyIntro() {
  const { t, lang } = useLang();
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ".intro-frame",
        { clipPath: "inset(14% 14% 14% 14% round 28px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 28px)",
          ease: "none",
          scrollTrigger: { trigger: ".intro-frame", start: "top 92%", end: "top 35%", scrub: 0.4 },
        },
      );
      gsap.fromTo(
        ".intro-img",
        { yPercent: -7, scale: 1.12 },
        {
          yPercent: 7,
          scale: 1.12,
          ease: "none",
          scrollTrigger: { trigger: ".intro-frame", start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      gsap.to(".intro-badge", { yPercent: -18, ease: "none", scrollTrigger: { trigger: ".intro-frame", start: "top bottom", end: "bottom top", scrub: true } });
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section id="story" ref={rootRef} className="relative isolate overflow-hidden bg-ink py-20 lg:py-32" aria-labelledby="intro-title">
      <div className="float-slow pointer-events-none absolute -start-32 top-10 -z-10 size-[26rem] rounded-full bg-volt/10 blur-[110px]" aria-hidden="true" />
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-6">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="size-2 rotate-45 bg-volt shadow-[0_0_18px_rgba(77,163,255,.8)]" />
              <p className="eyebrow text-volt">{t(C.intro.eyebrow)}</p>
            </div>
          </Reveal>
          <KineticHeading id="intro-title" text={C.intro.title} className="display h-section mt-5 text-fog" />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-mist">{t(C.intro.body)}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8">
              <MagneticButton>
                <Link
                  href="/about"
                  className="shine group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-fog px-7 text-[0.88rem] font-semibold text-ink transition-colors duration-300 hover:bg-volt hover:text-white"
                >
                  {t(C.intro.cta)}
                  <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={2.2} />
                </Link>
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <div className="intro-frame relative aspect-[4/3] overflow-hidden rounded-[28px] hairline bg-ink-2">
            <Image
              src="/media/images/design-profile.jpg"
              alt={lang === "ar" ? "سيارة في استوديو العرض" : "A car in the showroom studio"}
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="intro-img object-cover will-change-transform"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="intro-badge absolute bottom-5 start-5 rounded-full border border-white/25 bg-black/50 px-4 py-2 text-[0.7rem] tracking-[0.18em] text-white/90 backdrop-blur-md">
              EVAY · {lang === "ar" ? "منذ ٢٠١٢" : "SINCE 2012"}
            </span>
          </div>
        </div>

        <div className="lg:col-span-12">
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {C.intro.stats.map((stat, index) => (
              <li key={stat.label.en}>
                <Stat value={stat.value} suffix={stat.suffix} label={t(stat.label)} delay={index * 0.08} />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.72rem] text-dim">{t(C.intro.note)}</p>
        </div>
      </div>
    </section>
  );
}
