"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, usePrefersReducedMotion } from "@/lib/motion";
import { useCountUp } from "@/lib/showcase-hooks";

function Stat({ value, suffix, label, seen }: { value: number; suffix: string; label: string; seen: boolean }) {
  const shown = useCountUp(value, seen, 1800);
  return (
    <div className="intro-stat rounded-2xl hairline bg-ink-2 p-4 sm:p-6">
      <p className="numeral font-display text-[clamp(1.9rem,5vw,3.2rem)] font-semibold leading-none tracking-tight text-fog" dir="ltr">
        {Math.round(shown)}
        <span className="text-volt">{suffix}</span>
      </p>
      <p className="mt-2.5 text-[0.8rem] leading-snug text-mist sm:text-[0.86rem]">{label}</p>
    </div>
  );
}

/**
 * Home — "who we are", pinned: the statement lights up word by word as you
 * scroll, the photograph opens from a small window, and the numbers land last.
 */
export default function CompanyIntro() {
  const { t, lang } = useLang();
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const statsSeen = useRef(false);
  const [seenState, setSeen] = useState(false);
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const words = t(C.intro.big).split(/\s+/);

  useGSAP(
    () => {
      if (reduced) {
        setSeen(true);
        return;
      }
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            if (self.progress > 0.62 && !statsSeen.current) {
              statsSeen.current = true;
              setSeen(true);
            }
          },
        },
      });
      tl.fromTo(".intro-word", { opacity: 0.14 }, { opacity: 1, stagger: 0.06, duration: 0.5 }, 0)
        .fromTo(".intro-frame", { clipPath: "inset(18% 18% 18% 18% round 28px)", scale: 0.92 }, { clipPath: "inset(0% 0% 0% 0% round 28px)", scale: 1, duration: 0.5 }, 0)
        .fromTo(".intro-img", { scale: 1.3 }, { scale: 1.05, duration: 1 }, 0)
        .fromTo(".intro-stat", { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.14, ease: "power2.out" }, 0.62)
        .fromTo(".intro-cta", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.12, ease: "power2.out" }, 0.8);
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section id="story" ref={rootRef} className="relative h-[280svh] bg-ink sm:h-[300svh]" aria-labelledby="intro-title">
      <div className="sticky top-0 flex h-svh flex-col justify-start overflow-hidden pt-24 sm:justify-center sm:pt-24">
        <div className="pointer-events-none absolute -start-32 top-10 size-[26rem] rounded-full glow" aria-hidden="true" />
        <div className="mx-auto grid w-full max-w-[1400px] items-center gap-6 px-4 sm:gap-8 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-10">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="size-2 rotate-45 bg-volt shadow-[0_0_18px_rgba(77,163,255,.8)]" />
              <p className="eyebrow text-volt">{t(C.intro.eyebrow)}</p>
            </div>
            <h2 id="intro-title" className="sr-only">{t(C.intro.title)}</h2>
            <p className="mt-4 text-[clamp(1.12rem,3.5vw,2.9rem)] font-semibold leading-[1.5] text-fog sm:mt-6 lg:leading-[1.4]" aria-hidden="true">
              {words.map((w, i) => (
                <Fragment key={`${w}-${i}`}>
                  <span className="intro-word">{w}</span>{" "}
                </Fragment>
              ))}
            </p>
            <p className="sr-only">{t(C.intro.big)}</p>
            <div className="intro-cta mt-6 hidden sm:mt-8 sm:block">
              <Link href="/about" className="shine group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-fog px-7 text-[0.88rem] font-semibold text-ink transition-colors duration-300 hover:bg-volt hover:text-white">
                {t(C.intro.cta)}
                <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={2.2} />
              </Link>
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="intro-frame relative aspect-[4/5] overflow-hidden rounded-[28px] hairline bg-ink-2">
              <Image src="/media/images/design-profile.jpg" alt={lang === "ar" ? "سيارة في استوديو العرض" : "A car in the showroom studio"} fill sizes="40vw" className="intro-img object-cover will-change-transform" loading="lazy" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-5 start-5 rounded-full border border-white/25 bg-black/50 px-4 py-2 text-[0.7rem] text-white/90 lg:backdrop-blur-md">
                EVAY · {lang === "ar" ? "منذ ٢٠١٢" : "SINCE 2012"}
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 w-full max-w-[1400px] px-4 sm:mt-10 sm:px-6 lg:px-10">
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {C.intro.stats.map((stat) => (
              <li key={stat.label.en}>
                <Stat value={stat.value} suffix={stat.suffix} label={t(stat.label)} seen={seenState} />
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[0.7rem] text-dim">{t(C.intro.note)}</p>
        </div>
      </div>
    </section>
  );
}

