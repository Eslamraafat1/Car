"use client";

import Image from "next/image";
import { useRef } from "react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, useReducedMotion } from "@/lib/motion";

const FRAMES = [
  { image: "/media/images/detail-headlight.jpg", ratio: "16 / 10", span: "lg:col-span-7" },
  { image: "/media/images/detail-wheel.jpg", ratio: "4 / 5", span: "lg:col-span-5" },
  { image: "/media/images/detail-grille.jpg", ratio: "4 / 3", span: "lg:col-span-4" },
  { image: "/media/images/detail-interior.jpg", ratio: "4 / 3", span: "lg:col-span-5" },
  { image: "/media/images/detail-cockpit.jpg", ratio: "4 / 3", span: "lg:col-span-3" },
];

/** Scene C — craftsmanship close-ups revealed through masks and parallax. */
export default function DetailsScene() {
  const rootRef = useRef<HTMLElement | null>(null);
  const { t, lang } = useLang();
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      const fromInset = lang === "ar" ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)";
      const cards = gsap.utils.toArray<HTMLElement>(".detail-card", rootRef.current);

      cards.forEach((card) => {
        const mask = card.querySelector<HTMLElement>(".detail-mask");
        const image = card.querySelector<HTMLElement>(".detail-img");
        const copy = card.querySelectorAll<HTMLElement>(".detail-copy");
        if (!mask || !image) return;

        gsap.set(mask, { clipPath: fromInset });
        gsap.set(image, { scale: 1.28, yPercent: -7 });
        if (copy.length) gsap.set(copy, { autoAlpha: 0, y: 26 });

        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: card, start: "top 84%", toggleActions: "play none none none" },
          })
          .to(mask, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" }, 0)
          .to(image, { scale: 1.08, duration: 1.3 }, 0)
          .to(copy, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.35);

        gsap.to(image, {
          yPercent: 7,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: rootRef, dependencies: [reduced, lang], revertOnUpdate: true },
  );

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-ink py-20 lg:py-32"
      aria-labelledby="details-title"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-line to-transparent" />
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 border-b border-line pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-volt">{t(C.details.scene)}</p>
            <h2 id="details-title" className="display h-section mt-4 text-fog">
              {t(C.details.title)}
            </h2>
          </div>
          <p className="text-[0.95rem] leading-relaxed text-mist lg:col-span-5">{t(C.details.body)}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-12">
          {C.details.items.map((item, index) => {
            const frame = FRAMES[index];
            return (
              <article key={item.title.en} className={`detail-card group ${frame.span}`}>
                <div
                  className="detail-mask relative overflow-hidden rounded-2xl hairline"
                  style={{ aspectRatio: frame.ratio }}
                >
                  <Image
                    src={frame.image}
                    alt={t(item.title)}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="detail-img object-cover will-change-transform"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="numeral absolute bottom-3 end-4 text-[0.7rem] tracking-[0.25em] text-white/55">
                    0{index + 1}
                  </span>
                </div>

                <div className="detail-copy mt-4 border-t border-line pt-3">
                  <h3 className="font-display text-[1.02rem] font-semibold tracking-tight text-fog">
                    {t(item.title)}
                  </h3>
                  <p className="mt-1.5 text-[0.86rem] leading-relaxed text-mist">{t(item.body)}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
