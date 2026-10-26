"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, usePrefersReducedMotion } from "@/lib/motion";
import { getVehicle, type Vehicle } from "@/lib/vehicles";
import KineticHeading from "@/components/ui/KineticHeading";

const SLUGS = ["ferrari-f8-tributo", "porsche-911-turbo-s", "mercedes-amg-c63", "tesla-roadster", "mercedes-g63", "bmw-i8"];
const CARS = SLUGS.map((s) => getVehicle(s)).filter((v): v is Vehicle => Boolean(v));

/**
 * Home — a gallery that scrolls sideways while the page is pinned on large
 * screens, and becomes a native swipe carousel on touch and small screens.
 */
export default function HorizontalGallery() {
  const { t, lang } = useLang();
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const track = rootRef.current?.querySelector<HTMLElement>(".gallery-track");
        const bar = rootRef.current?.querySelector<HTMLElement>(".gallery-bar");
        if (!track) return;
        const sign = lang === "ar" ? 1 : -1;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const tween = gsap.fromTo(
          track,
          { x: 0 },
          {
            x: () => sign * distance(),
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
              onUpdate: (self) => bar && gsap.set(bar, { scaleX: self.progress }),
            },
          },
        );
        gsap.utils.toArray<HTMLElement>(".gallery-img").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: sign * -6 },
            { xPercent: sign * 6, ease: "none", scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true } },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [reduced, lang], revertOnUpdate: true },
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-ink py-16 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0" aria-labelledby="gallery-title">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-volt">{t(C.gallery.eyebrow)}</p>
            <KineticHeading id="gallery-title" text={C.gallery.title} className="display h-section mt-3 text-fog" />
          </div>
          <p className="text-[0.8rem] text-mist lg:hidden">{t(C.gallery.drag)}</p>
        </div>
      </div>

      <div className="no-scrollbar mt-8 overflow-x-auto px-4 pb-4 [scroll-snap-type:x_mandatory] sm:px-6 lg:mt-10 lg:overflow-visible lg:px-10 lg:pb-0">
        <ul className="gallery-track flex w-max gap-4 will-change-transform sm:gap-5 lg:gap-6">
          {CARS.map((car, i) => (
            <li key={car.slug} className="w-[78vw] shrink-0 [scroll-snap-align:center] sm:w-[52vw] lg:w-[34vw] xl:w-[28vw]">
              <Link href={`/cars/${car.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-[28px] hairline bg-ink-2 lg:aspect-[4/5] lg:max-h-[56svh] lg:w-full">
                <Image
                  src={car.image}
                  alt={t(car.alt)}
                  fill
                  sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 34vw, (min-width: 640px) 52vw, 78vw"
                  className="gallery-img scale-[1.14] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.2]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />
                <span className="numeral absolute start-5 top-4 font-display text-5xl font-bold leading-none text-white/25">0{i + 1}</span>
                <span className="absolute end-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight className="size-4 rtl:-scale-x-100" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <p className="eyebrow" style={{ color: car.accent }}>{car.brand}</p>
                  <h3 className="mt-1 font-display text-2xl font-semibold">{car.model}</h3>
                  <p className="mt-1 text-[0.86rem] text-white/70">{t(car.tagline)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-8 hidden w-full max-w-[1400px] px-10 lg:block">
        <div className="h-px w-full bg-line">
          <div className="gallery-bar h-full origin-start bg-volt rtl:origin-right" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </section>
  );
}
