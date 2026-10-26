"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import KineticHeading from "@/components/ui/KineticHeading";

export default function ExperienceSelector() {
  const { t, lang } = useLang();
  const [active, setActive] = useState(0);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const items = C.experience.items;
  const current = items[active];

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = items.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;

    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-ink-2 py-20 lg:py-32"
      aria-labelledby="experience-title"
    >
      <div className="pointer-events-none absolute -start-12 top-16 select-none font-display text-[clamp(18rem,42vw,44rem)] font-black leading-none text-white/[0.018]" aria-hidden="true">0{active + 1}</div>
      <div className="pointer-events-none absolute end-0 top-0 h-px w-2/3 bg-gradient-to-l from-transparent via-white/10 to-transparent" aria-hidden="true" />
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 border-b border-line pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-volt">{t(C.experience.eyebrow)}</p>
            <KineticHeading
              id="experience-title"
              text={C.experience.title}
              className="display h-section mt-4 text-fog"
            />
          </div>
          <p className="text-[0.95rem] leading-relaxed text-mist lg:col-span-5">
            {t(C.experience.body)}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div
            role="tablist"
            aria-label={t(C.experience.title)}
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {items.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.key}
                  ref={(node) => {
                    tabsRef.current[index] = node;
                  }}
                  id={`experience-tab-${item.key}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="experience-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={`relative flex min-w-[180px] flex-1 items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-start transition-colors duration-300 lg:min-w-0 ${
                    selected
                      ? "border-white/25 bg-ink shadow-[0_12px_40px_rgba(0,0,0,.2)]"
                      : "border-line/70 bg-transparent hover:border-white/20 hover:bg-ink/60"
                  }`}
                >
                  <span className="flex flex-col gap-1">
                    <span className="numeral text-[0.68rem] tracking-[0.28em] text-dim">
                      0{index + 1}
                    </span>
                    <span className="font-display text-lg font-semibold text-fog">
                      {t(item.title)}
                    </span>
                    <span className="text-[0.74rem] text-mist">{t(item.tag)}</span>
                  </span>
                  <span
                    className="relative flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500"
                    style={{ borderColor: selected ? `${item.accent}99` : "rgba(255,255,255,.12)", color: item.accent, boxShadow: selected ? `0 0 24px ${item.accent}33` : "none" }}
                    aria-hidden="true"
                  ><span className="size-2 rotate-45" style={{ backgroundColor: item.accent }} /></span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8">
            <div
              id="experience-panel"
              role="tabpanel"
              aria-labelledby={`experience-tab-${current.key}`}
              tabIndex={0}
              className="relative overflow-hidden rounded-[26px] hairline focus-visible:outline-offset-4"
            >
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:aspect-[16/9]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.key}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={current.image}
                      alt={t(current.alt)}
                      fill
                      sizes="(min-width: 1024px) 66vw, 100vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                </AnimatePresence>

                <div
                  className="pointer-events-none absolute inset-0 transition-colors duration-700"
                  style={{
                    background: `linear-gradient(to top, rgba(7,8,9,0.94) 4%, ${current.accent}22 55%, transparent 100%)`,
                  }}
                />
                <div className="pointer-events-none absolute inset-0 grain" />
                <div className="pointer-events-none absolute inset-4 rounded-[18px] border border-white/15 sm:inset-6" aria-hidden="true">
                  <span className="absolute -start-px -top-px size-8 border-s-2 border-t-2" style={{ borderColor: current.accent }} />
                  <span className="absolute -end-px -bottom-px size-8 border-e-2 border-b-2" style={{ borderColor: current.accent }} />
                </div>
                <div className="absolute inset-x-8 top-8 flex items-center justify-between sm:inset-x-10 sm:top-10">
                  <span className="eyebrow text-white/70">AURELIS / EXPERIENCE</span>
                  <span className="font-display text-sm tracking-[0.2em] text-white/70">0{active + 1}<span className="text-white/35"> / 0{items.length}</span></span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10 lg:p-12">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={current.key}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                    >
                      <span className="inline-flex items-center gap-2 eyebrow" style={{ color: current.accent }}>
                        <span className="size-1.5 rounded-full" style={{ backgroundColor: current.accent }} />
                        {t(current.tag)}
                      </span>
                      <h3 className="display mt-2 text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.045em] text-white">
                        {t(current.title)}
                      </h3>
                      <p className="mt-2 max-w-lg text-[0.88rem] leading-relaxed text-white/75">
                        {t(current.body)}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <p className="mt-4 text-[0.74rem] text-dim">
              {lang === "ar"
                ? "الصور توضيحية وليست عروضًا قابلة للحجز."
                : "Imagery is illustrative and not a reservable offer."}
            </p>
            <div className="mt-5 flex gap-1.5" aria-hidden="true">
              {items.map((item, index) => <span key={item.key} className="h-1 rounded-full transition-all duration-500" style={{ width: index === active ? 44 : 12, backgroundColor: index === active ? item.accent : "rgba(255,255,255,.18)" }} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
