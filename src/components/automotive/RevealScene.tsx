"use client";

import Image from "next/image";
import { useRef } from "react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, useReducedMotion } from "@/lib/motion";

/** Scene A — the car emerges from darkness as the visitor scrolls. */
export default function RevealScene() {
  const rootRef = useRef<HTMLElement | null>(null);
  const { t, lang } = useLang();
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      gsap.set(".reveal-veil", { opacity: 1 });
      gsap.set(".reveal-media", { scale: 1.24 });
      gsap.set([".reveal-title", ".reveal-body", ".reveal-stat"], { autoAlpha: 0, y: 34 });
      gsap.set(".reveal-content", { autoAlpha: 1, y: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });

      tl.to(".reveal-veil", { opacity: 0.18, duration: 0.4 }, 0)
        .to(".reveal-media", { scale: 1, duration: 0.65 }, 0)
        .to(".reveal-title", { autoAlpha: 1, y: 0, duration: 0.18 }, 0.1)
        .to(".reveal-body", { autoAlpha: 1, y: 0, duration: 0.16 }, 0.2)
        .to(".reveal-stat", { autoAlpha: 1, y: 0, duration: 0.16, stagger: 0.05 }, 0.3)
        .to(".reveal-media", { scale: 1.05, duration: 0.4 }, 0.6)
        .to(".reveal-content", { autoAlpha: 0, y: -40, duration: 0.25 }, 0.8);
    },
    { scope: rootRef, dependencies: [reduced, lang], revertOnUpdate: true },
  );

  return (
    <section
      ref={rootRef}
      id="story"
      className="cinema relative h-[130svh] bg-ink lg:h-[150svh]"
      aria-labelledby="reveal-title"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="reveal-media absolute inset-0 will-change-transform">
          <Image
            src="/media/images/reveal-car.jpg"
            alt={
              lang === "ar"
                ? "سيارة تنكشف تحت إضاءة نيون بنفسجية"
                : "Car emerging under violet neon light"
            }
            fill
            priority={false}
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="reveal-veil pointer-events-none absolute inset-0 bg-ink" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />
        <div className="pointer-events-none absolute inset-0 grain" />

        <div className="reveal-content relative flex h-full flex-col justify-between px-4 pb-10 pt-24 sm:px-6 lg:px-10 lg:pb-14">
          <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6">
            <p className="eyebrow text-volt">{t(C.reveal.scene)}</p>
            <span className="numeral text-[0.7rem] tracking-[0.3em] text-white/40">01 — 05</span>
          </div>

          <div className="mx-auto w-full max-w-[1400px]">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <h2 id="reveal-title" className="reveal-title display h-section text-fog">
                  {t(C.reveal.title)}
                </h2>
                <p className="reveal-body mt-5 max-w-lg text-[0.95rem] leading-relaxed text-mist">
                  {t(C.reveal.body)}
                </p>
              </div>

              <ul className="grid grid-cols-3 gap-4 lg:col-span-5">
                {[C.reveal.stat1, C.reveal.stat2, C.reveal.stat3].map((stat) => (
                  <li
                    key={stat.en}
                    className="reveal-stat border-t border-white/20 pt-3 text-[0.78rem] leading-snug text-white/70"
                  >
                    {t(stat)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
