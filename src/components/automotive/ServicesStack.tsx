"use client";

import Image from "next/image";
import { useRef } from "react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, usePrefersReducedMotion } from "@/lib/motion";
import KineticHeading from "@/components/ui/KineticHeading";

/**
 * Home — services as a stack of full-width cards. Each card sticks under the
 * header and the next one slides over it while the one below recedes (scale +
 * dim), driven by scroll. Works on every width; no pinning maths on phones.
 */
export default function ServicesStack() {
  const { t } = useLang();
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const tiles = C.engineering.tiles;

  useGSAP(
    () => {
      if (reduced) return;
      const cards = gsap.utils.toArray<HTMLElement>(".svc-card");
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        const inner = card.querySelector<HTMLElement>(".svc-inner");
        const img = card.querySelector<HTMLElement>(".svc-img");
        if (img) {
          gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } });
        }
        if (next && inner) {
          gsap.to(inner, { scale: 0.92, opacity: 0.45, ease: "none", scrollTrigger: { trigger: next, start: "top 85%", end: "top 18%", scrub: true } });
        }
      });
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section ref={rootRef} className="relative bg-ink py-20 lg:py-32" aria-labelledby="services-title">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-volt">{t(C.engineering.eyebrow)}</p>
            <KineticHeading id="services-title" text={C.engineering.title} className="display h-section mt-4 text-fog" />
          </div>
          <p className="text-[0.98rem] leading-relaxed text-mist lg:col-span-5">{t(C.engineering.body)}</p>
        </div>

        <ol className="mt-10 space-y-5 lg:mt-14">
          {tiles.map((tile, i) => (
            <li
              key={tile.title.en}
              className="svc-card sticky"
              style={{ top: `calc(5.5rem + ${i * 14}px)` }}
            >
              <article className="svc-inner grid overflow-hidden rounded-[28px] hairline bg-ink-2 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.5)] will-change-transform lg:min-h-[28rem] lg:grid-cols-12">
                <div className={`relative aspect-[16/10] overflow-hidden lg:col-span-6 lg:aspect-auto ${i % 2 ? "lg:order-2" : ""}`}>
                  <Image
                    src={tile.image}
                    alt={t(tile.alt)}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="svc-img scale-[1.18] object-cover"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute bottom-4 start-4 rounded-full border border-white/25 bg-black/50 px-3.5 py-1.5 text-[0.72rem] text-white/90 backdrop-blur-md">{t(tile.tag)}</span>
                </div>
                <div className="relative flex flex-col justify-center p-6 sm:p-10 lg:col-span-6 lg:p-14">
                  <span className="numeral font-display text-[clamp(3.5rem,9vw,7rem)] font-bold leading-none text-fog/[0.08]" aria-hidden="true">0{i + 1}</span>
                  <h3 className="display -mt-2 text-[clamp(1.5rem,3.2vw,2.6rem)] text-fog sm:-mt-4">{t(tile.title)}</h3>
                  <p className="mt-4 max-w-md text-[0.98rem] leading-[1.9] text-mist">{t(tile.body)}</p>
                  <span className="mt-8 h-px w-16 bg-volt" aria-hidden="true" />
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
