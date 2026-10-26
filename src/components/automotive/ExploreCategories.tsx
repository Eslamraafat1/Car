"use client";

import Image from "next/image";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { CATEGORY_LABELS, VEHICLES, type Category } from "@/lib/vehicles";
import Reveal from "@/components/ui/Reveal";

export const FILTER_EVENT = "evay:filter";

const TILES: { key: Category; image: string }[] = [
  { key: "sports", image: "/media/images/car-f8-red.jpg" },
  { key: "luxury", image: "/media/images/car-amg-harbor.jpg" },
  { key: "suv", image: "/media/images/car-gwagon.jpg" },
  { key: "electric", image: "/media/images/car-roadster.jpg" },
];

/**
 * Explore — four category panels. On desktop they behave like an accordion:
 * the hovered (or focused) panel opens wide. Choosing one filters the grid.
 */
export default function ExploreCategories() {
  const { t, lang } = useLang();

  const choose = (key: Category) => {
    window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: key }));
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-ink py-12 lg:py-16" aria-label={t(C.collection.eyebrow)}>
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <ul className="group/tiles grid grid-cols-2 gap-3 lg:flex lg:h-[26rem] lg:gap-4">
          {TILES.map((tile, i) => {
            const count = VEHICLES.filter((v) => v.category === tile.key).length;
            return (
              <li key={tile.key} className="lg:flex-1 lg:transition-[flex] lg:duration-700 lg:ease-[cubic-bezier(.2,.8,.1,1)] lg:hover:flex-[2.6] lg:focus-within:flex-[2.6]">
                <Reveal delay={i * 0.08} className="h-full">
                  <button
                    type="button"
                    onClick={() => choose(tile.key)}
                    className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[24px] hairline bg-ink-2 text-start sm:aspect-[4/3] lg:aspect-auto lg:h-full"
                  >
                    <Image src={tile.image} alt="" fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/10 transition-colors duration-500 group-hover:from-black/70" />
                    <span className="numeral absolute start-4 top-3 font-display text-4xl font-bold text-white/30 lg:text-5xl">0{i + 1}</span>
                    <span className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
                      <span className="block font-display text-xl font-semibold sm:text-2xl lg:whitespace-nowrap">{t(CATEGORY_LABELS[tile.key])}</span>
                      <span className="mt-1 block text-[0.78rem] text-white/70">{count} {t(C.collection.count)}</span>
                      <span className="mt-3 hidden h-px w-10 bg-white/60 transition-all duration-500 group-hover:w-24 lg:block" />
                      <span className="mt-3 hidden translate-y-2 text-[0.8rem] text-white/80 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 lg:block">
                        {lang === "ar" ? "عرض السيارات" : "View these cars"} →
                      </span>
                    </span>
                  </button>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
