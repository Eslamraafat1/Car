"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import StackingCards from "@/components/automotive/StackingCards";

export default function StackingCarsSection() {
  const { t, lang } = useLang();
  const cards = C.stack.cards;

  return (
    <section
      id="lineup"
      className="relative overflow-hidden bg-ink-2 py-16 lg:py-24"
      aria-labelledby="lineup-title"
    >
      <div className="mx-auto mb-10 w-full max-w-[1400px] px-4 sm:px-6 lg:mb-16 lg:px-10">
        <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-volt">{t(C.stack.label)}</p>
            <h2 id="lineup-title" className="display h-section mt-4 text-fog">
              {t(C.stack.title)}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-mist">{t(C.stack.body)}</p>
        </div>
      </div>

      <StackingCards className="mx-auto w-full max-w-[1400px] px-3 sm:px-6 lg:px-10">
        {cards.map((card) => (
          <article
            key={card.index}
            className="stack-item sticky top-[7.5svh] h-[70svh] min-h-[400px] sm:h-[70svh] lg:h-[72svh]"
          >
            <div className="group relative h-full w-full overflow-hidden rounded-[22px] hairline lg:rounded-[32px]">
              <div className="stack-media absolute inset-[-7%]">
                <Image
                  src={card.image}
                  alt={t(card.alt)}
                  fill
                  sizes="(min-width: 1024px) 1360px, 100vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(65% 55% at 88% 12%, ${card.accent}40, transparent 68%)`,
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
              <div className="pointer-events-none absolute inset-0 grain" />

              <div className="relative flex h-full flex-col justify-between p-5 sm:p-7 lg:p-12">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="grid size-9 place-items-center rounded-full text-[0.72rem] font-semibold text-ink"
                      style={{ backgroundColor: card.accent }}
                    >
                      {card.index}
                    </span>
                    <span className="eyebrow text-white/75">{t(card.kicker)}</span>
                  </div>
                  <span className="numeral text-[0.72rem] tracking-[0.2em] text-white/45">
                    {t(C.stack.progress)} {card.index} / 0{cards.length}
                  </span>
                </div>

                <div className="max-w-2xl">
                  <span
                    className="mb-5 block h-px w-16 origin-left scale-x-100"
                    style={{ backgroundColor: card.accent }}
                  />
                  <h3 className="display h-card text-white [text-wrap:balance]">{t(card.title)}</h3>
                  <p className="mt-4 max-w-xl text-[0.9rem] leading-relaxed text-white/70 lg:text-[0.98rem]">
                    {t(card.body)}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-2.5">
                    <ul className="hidden flex-wrap gap-2 sm:flex">
                      {card.specs.map((spec) => (
                        <li
                          key={spec.en}
                          className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[0.7rem] tracking-wide text-white/75 backdrop-blur-sm lg:text-[0.76rem]"
                        >
                          {t(spec)}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/cars/${card.slug}`}
                      className="ms-auto inline-flex h-10 items-center gap-2 rounded-full px-5 text-[0.8rem] font-semibold text-ink transition-transform duration-300 hover:scale-[1.04] focus-visible:scale-[1.04]"
                      style={{ backgroundColor: card.accent }}
                    >
                      {t(C.stack.cta)}
                      <ArrowRight
                        className="size-3.5 rtl:rotate-180"
                        strokeWidth={2.4}
                      />
                      <span className="sr-only">
                        {lang === "ar" ? card.kicker.ar : card.kicker.en}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="stack-dim pointer-events-none absolute inset-0 bg-black opacity-0" />
            </div>
          </article>
        ))}
      </StackingCards>
    </section>
  );
}
