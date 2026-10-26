"use client";

import Image from "next/image";
import { useRef } from "react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, useReducedMotion } from "@/lib/motion";

/** Scene B — the profile sweeps across the frame while details arrive. */
export default function DesignScene() {
  const rootRef = useRef<HTMLElement | null>(null);
  const { t, lang } = useLang();
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      const sign = lang === "ar" ? -1 : 1;

      gsap.set(".design-car", { xPercent: -14 * sign, opacity: 0.35 });
      gsap.set([".design-title", ".design-body"], { autoAlpha: 0, y: 36 });
      gsap.set(".design-callout", { autoAlpha: 0, y: 30 });
      gsap.set(".design-glow", { autoAlpha: 0, xPercent: -18 * sign });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });

      tl.to(".design-title", { autoAlpha: 1, y: 0, duration: 0.16 }, 0.03)
        .to(".design-car", { xPercent: 8 * sign, opacity: 1, duration: 0.7 }, 0)
        .to(".design-glow", { autoAlpha: 1, xPercent: 14 * sign, duration: 0.65 }, 0.08)
        .to(".design-body", { autoAlpha: 1, y: 0, duration: 0.16 }, 0.18)
        .to(".design-callout", { autoAlpha: 1, y: 0, duration: 0.16, stagger: 0.08 }, 0.3)
        .to(".design-caption", { autoAlpha: 1, duration: 0.14 }, 0.6)
        .to(".design-car", { xPercent: 16 * sign, opacity: 0.5, duration: 0.25 }, 0.7);
    },
    { scope: rootRef, dependencies: [reduced, lang], revertOnUpdate: true },
  );

  return (
    <section
      id="design"
      ref={rootRef}
      className="cinema relative h-[130svh] bg-ink lg:h-[150svh]"
      aria-labelledby="design-title"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="design-glow pointer-events-none absolute inset-0 bg-[radial-gradient(58%_46%_at_50%_62%,rgba(77,163,255,0.18),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-2/90 via-ink/70 to-ink" />
        <div className="pointer-events-none absolute inset-0 grain" />

        <div className="relative flex h-full flex-col px-4 pb-10 pt-24 sm:px-6 lg:px-10 lg:pb-14">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4">
            <div className="flex items-center justify-between gap-6">
              <p className="eyebrow text-volt">{t(C.design.scene)}</p>
              <span className="design-caption text-[0.72rem] tracking-wider text-dim">
                {t(C.design.caption)}
              </span>
            </div>
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <h2 id="design-title" className="design-title display h-section text-fog">
                  {t(C.design.title)}
                </h2>
              </div>
              <p className="design-body text-[0.95rem] leading-relaxed text-mist lg:col-span-5">
                {t(C.design.body)}
              </p>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center">
            <div className="design-car relative mx-auto w-full max-w-[1500px] will-change-transform">
              <div className="relative aspect-[16/7] w-full sm:aspect-[16/6] lg:aspect-[21/7]">
                <Image
                  src="/media/images/design-profile.jpg"
                  alt={
                    lang === "ar"
                      ? "الخط الجانبي الكامل لسيارة على خلفية داكنة"
                      : "Full side profile of a car on a dark backdrop"
                  }
                  fill
                  sizes="(min-width: 1500px) 1500px, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <ul className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-3 sm:grid-cols-3">
            {C.design.callouts.map((callout) => (
              <li
                key={callout.en}
                className="design-callout border-t border-line pt-3 text-[0.8rem] tracking-wide text-mist"
              >
                {t(callout)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
