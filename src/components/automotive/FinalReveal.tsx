"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, useReducedMotion } from "@/lib/motion";

/** Scene E — the finale: the background transforms, the car holds the frame. */
export default function FinalReveal() {
  const rootRef = useRef<HTMLElement | null>(null);
  const { t, lang } = useLang();
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      gsap.set(".final-bg-warm", { autoAlpha: 0 });
      gsap.set(".final-bg-cool", { autoAlpha: 1 });
      gsap.set(".final-car", { y: 60, scale: 1.06 });
      gsap.set([".final-title", ".final-body", ".final-actions", ".final-scene"], {
        autoAlpha: 0,
        y: 34,
      });

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        })
        .to(".final-bg-cool", { autoAlpha: 0, duration: 0.75 }, 0)
        .to(".final-bg-warm", { autoAlpha: 1, duration: 0.75 }, 0)
        .to(".final-car", { y: 0, scale: 1, duration: 0.55 }, 0)
        .to(".final-scene", { autoAlpha: 1, y: 0, duration: 0.16 }, 0.12)
        .to(".final-title", { autoAlpha: 1, y: 0, duration: 0.2 }, 0.2)
        .to(".final-body", { autoAlpha: 1, y: 0, duration: 0.18 }, 0.34)
        .to(".final-actions", { autoAlpha: 1, y: 0, duration: 0.18 }, 0.46)
        .to(".final-car", { scale: 1.04, duration: 0.3 }, 0.7);
    },
    { scope: rootRef, dependencies: [reduced, lang], revertOnUpdate: true },
  );

  return (
    <section
      ref={rootRef}
      className="cinema relative h-[185svh] bg-ink lg:h-[225svh]"
      aria-labelledby="final-title"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="final-bg-cool pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_100%,rgba(28,52,86,0.85),rgba(7,8,9,1)_70%)]" />
        <div className="final-bg-warm pointer-events-none absolute inset-0 bg-[radial-gradient(90%_75%_at_50%_100%,rgba(140,78,32,0.75),rgba(7,8,9,1)_72%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 grain" />

        <div className="final-car absolute inset-x-0 bottom-[16svh] will-change-transform">
          <div className="relative mx-auto aspect-[16/9] w-full max-w-[1500px] sm:aspect-[21/9]">
            <Image
              src="/media/images/final-reveal.jpg"
              alt={
                lang === "ar"
                  ? "سيارة رياضية في ضوء الغروب على طريق مفتوح"
                  : "Sports car in sunset light on an open road"
              }
              fill
              sizes="(min-width: 1500px) 1500px, 100vw"
              className="object-contain"
            />
          </div>
        </div>

        <div className="relative flex h-full flex-col justify-between px-4 pb-[34svh] pt-24 sm:px-6 lg:px-10 lg:pb-[36svh]">
          <div className="final-scene mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6">
            <p className="eyebrow text-volt">{t(C.final.scene)}</p>
            <span className="numeral text-[0.7rem] tracking-[0.3em] text-dim">05 — 05</span>
          </div>

          <div className="mx-auto w-full max-w-[1400px]">
            <h2 id="final-title" className="final-title display h-section max-w-[14ch] text-fog">
              {t(C.final.title)}
            </h2>
            <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <p className="final-body max-w-lg text-[0.95rem] leading-relaxed text-mist">
                {t(C.final.body)}
              </p>
              <div className="final-actions flex flex-wrap gap-3">
                <Link
                  href="/explore"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-fog px-7 text-[0.88rem] font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
                >
                  {t(C.final.cta)}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                    strokeWidth={2.2}
                  />
                </Link>
                <Link
                  href="/explore"
                  className="inline-flex h-12 items-center rounded-full border border-white/25 px-7 text-[0.88rem] font-medium text-white transition-colors duration-300 hover:border-white/60 hover:bg-white/5"
                >
                  {t(C.final.secondary)}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
