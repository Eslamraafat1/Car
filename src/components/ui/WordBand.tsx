"use client";

import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import VelocityMarquee from "@/components/ui/VelocityMarquee";

/** A band of giant outlined words that races with the scroll — a section break with attitude. */
export default function WordBand({ reverse = false }: { reverse?: boolean }) {
  const { t } = useLang();
  const words = C.marquee.items;
  return (
    <div className="overflow-hidden border-y border-line bg-ink py-6 sm:py-9" aria-label={t(C.marquee.note)}>
      <VelocityMarquee reverse={reverse} duration={55}>
        <ul className="flex items-center">
          {words.map((w, i) => (
            <li key={w.en} className="flex items-center">
              <span
                className={`font-display text-[clamp(2.6rem,8vw,6.5rem)] font-bold uppercase leading-none ${i % 2 ? "text-fog" : "text-transparent"}`}
                style={i % 2 ? undefined : { WebkitTextStroke: "1.5px var(--c-fog)" }}
                dir="auto"
              >
                {t(w)}
              </span>
              <span className="mx-6 size-3 shrink-0 rotate-45 bg-volt sm:mx-10 sm:size-4" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </VelocityMarquee>
    </div>
  );
}
