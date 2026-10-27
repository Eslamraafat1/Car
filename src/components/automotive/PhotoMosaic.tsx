"use client";

import Image from "next/image";
import { useRef } from "react";
import type { BiStr } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, usePrefersReducedMotion } from "@/lib/motion";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";

const TITLE: BiStr = { ar: "من كواليس العمل.", en: "BEHIND THE SCENES." };
const EYEBROW: BiStr = { ar: "داخل إيفاي", en: "Inside Evay" };

const TILES: { src: string; cap: BiStr; cls: string; speed: number }[] = [
  { src: "/media/images/lab-tech.jpg", cap: { ar: "ورشة الفحص", en: "The inspection bay" }, cls: "col-span-2 row-span-2 aspect-[4/3] lg:aspect-auto", speed: 6 },
  { src: "/media/images/detail-interior.jpg", cap: { ar: "تفاصيل المقصورة", en: "Cabin detail" }, cls: "aspect-square", speed: -8 },
  { src: "/media/images/detail-texture.jpg", cap: { ar: "الخامات", en: "Materials" }, cls: "aspect-square", speed: 10 },
  { src: "/media/images/car-warehouse.jpg", cap: { ar: "قاعة العرض", en: "The showroom" }, cls: "col-span-2 aspect-[16/9]", speed: -6 },
  { src: "/media/images/night-city.jpg", cap: { ar: "تسليم في المساء", en: "Evening handover" }, cls: "aspect-[4/5] lg:aspect-square", speed: 8 },
  { src: "/media/images/car-amg-harbor.jpg", cap: { ar: "تجربة القيادة", en: "Test drive" }, cls: "aspect-[4/5] lg:aspect-square", speed: -10 },
];

/** About — an asymmetric photo wall whose tiles drift at different speeds on large screens. */
export default function PhotoMosaic() {
  const { t } = useLang();
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (pointer: fine)", () => {
        gsap.utils.toArray<HTMLElement>(".mz-tile").forEach((el) => {
          const speed = Number(el.dataset.speed || 0);
          gsap.fromTo(el, { yPercent: speed }, { yPercent: -speed, ease: "none", scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: 0.6 } });
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-ink py-20 lg:py-28" aria-labelledby="mosaic-title">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal><p className="eyebrow text-volt">{t(EYEBROW)}</p></Reveal>
        <KineticHeading id="mosaic-title" text={TITLE} className="display h-section mt-4 max-w-3xl text-fog" />
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:py-8">
          {TILES.map((tile) => (
            <li key={tile.src} data-speed={tile.speed} className={`mz-tile group relative overflow-hidden rounded-[22px] hairline bg-ink-2 ${tile.cls}`}>
              <Image src={tile.src} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" quality={70} loading="lazy" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-3 start-3 translate-y-1 text-[0.78rem] font-medium text-white opacity-90 transition-transform duration-500 group-hover:translate-y-0 sm:bottom-4 sm:start-4">{t(tile.cap)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
