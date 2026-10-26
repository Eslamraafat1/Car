"use client";

import { Award, BadgeCheck, Medal, Star } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";

const ICONS = [Award, Medal, Star, BadgeCheck];

/** About — recognition cards with oversized outlined years. */
export default function Awards() {
  const { t } = useLang();
  return (
    <section className="relative bg-ink-2 py-20 lg:py-28" aria-labelledby="awards-title">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal><p className="eyebrow text-volt">{t(C.awards.eyebrow)}</p></Reveal>
        <KineticHeading id="awards-title" text={C.awards.title} className="display h-section mt-4 max-w-3xl text-fog" />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {C.awards.items.map((a, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li key={a.year}>
                <Reveal delay={i * 0.08} className="h-full">
                  <article className="group relative h-full overflow-hidden rounded-[24px] hairline bg-ink p-6 transition-all duration-500 hover:-translate-y-2 hover:border-volt/60">
                    <span className="numeral pointer-events-none absolute -end-3 -top-4 font-display text-[7rem] font-black leading-none text-transparent opacity-60 transition-opacity duration-500 [-webkit-text-stroke:1px_var(--c-line)] group-hover:opacity-100 group-hover:[-webkit-text-stroke:1px_var(--c-volt)]" dir="ltr" aria-hidden="true">{a.year}</span>
                    <Icon className="relative size-9 text-volt transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" strokeWidth={1.5} />
                    <h3 className="relative mt-10 font-display text-lg font-semibold text-fog">{t(a.title)}</h3>
                    <p className="relative mt-1.5 text-[0.84rem] text-mist">{t(a.by)}</p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 text-[0.72rem] text-dim">{t(C.awards.note)}</p>
      </div>
    </section>
  );
}
