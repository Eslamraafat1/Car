"use client";

import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { useCountUp, useInView } from "@/lib/showcase-hooks";

function Figure({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.5);
  const shown = useCountUp(value, seen, 2000);
  return (
    <div ref={ref} className="group relative px-2 py-6 text-center sm:py-10">
      <p className="numeral font-display text-[clamp(3rem,9vw,7rem)] font-bold leading-none text-fog transition-transform duration-500 group-hover:scale-105" dir="ltr">
        {Math.round(shown)}<span className="text-volt">{suffix}</span>
      </p>
      <p className="mt-3 text-[0.85rem] text-mist sm:text-[0.95rem]">{label}</p>
    </div>
  );
}

/** About — the numbers, large, counting up as they come into view. */
export default function StatsBand() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden border-y border-line bg-ink-2" aria-label={t(C.intro.eyebrow)}>
      <div className="pointer-events-none absolute start-1/2 top-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full glow" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-2 divide-line px-4 sm:px-6 lg:grid-cols-4 lg:divide-x lg:px-10">
        {C.intro.stats.map((s) => <Figure key={s.label.en} value={s.value} suffix={s.suffix} label={t(s.label)} />)}
      </div>
      <p className="relative mx-auto w-full max-w-[1400px] px-4 pb-4 text-[0.7rem] text-dim sm:px-6 lg:px-10">{t(C.intro.note)}</p>
    </section>
  );
}
