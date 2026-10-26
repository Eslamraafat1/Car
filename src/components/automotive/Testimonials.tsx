"use client";

import { Quote } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";

/** Home — three client quotes. */
export default function Testimonials() {
  const { t } = useLang();

  return (
    <section className="relative isolate overflow-hidden bg-ink py-20 lg:py-32" aria-labelledby="testimonials-title">
      <div className="float-slow pointer-events-none absolute -end-24 top-1/3 -z-10 size-[24rem] rounded-full bg-volt/10 blur-[110px]" aria-hidden="true" />
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow text-volt">{t(C.testimonials.eyebrow)}</p>
        </Reveal>
        <KineticHeading id="testimonials-title" text={C.testimonials.title} className="display h-section mt-4 max-w-3xl text-fog" />

        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {C.testimonials.items.map((item, index) => (
            <li key={item.name.en}>
              <Reveal delay={index * 0.12} className="h-full">
                <figure className="group relative flex h-full flex-col rounded-3xl hairline bg-ink-2 p-7 transition-all duration-500 hover:-translate-y-2 hover:border-volt/50 lg:p-8">
                  <Quote className="size-8 text-volt transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" strokeWidth={1.6} aria-hidden="true" />
                  <blockquote className="mt-5 flex-1 text-[1.02rem] leading-[1.85] text-fog">{t(item.quote)}</blockquote>
                  <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-volt/15 font-display text-sm font-semibold text-volt" aria-hidden="true">
                      {item.name.en[0]}
                    </span>
                    <span>
                      <span className="block text-[0.92rem] font-semibold text-fog">{t(item.name)}</span>
                      <span className="block text-[0.78rem] text-mist">{t(item.role)}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[0.72rem] text-dim">{t(C.testimonials.note)}</p>
      </div>
    </section>
  );
}
