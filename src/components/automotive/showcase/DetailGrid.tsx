"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import Reveal from "@/components/ui/Reveal";
import KineticHeading from "@/components/ui/KineticHeading";
import type { DetailContent, DetailItem } from "@/lib/showcase-types";

function DetailPlate({
  item,
  featured = false,
  accent,
  onOpen,
}: {
  item: DetailItem;
  featured?: boolean;
  accent: string;
  onOpen: (trigger: HTMLButtonElement) => void;
}) {
  const { t, lang } = useLang();

  return (
    <figure
      className={`group relative isolate h-full min-h-0 overflow-hidden rounded-[1.35rem] border border-white/10 bg-ink-2 ${
        featured ? "aspect-[4/3] sm:aspect-[16/8] lg:aspect-auto lg:min-h-[34rem]" : "aspect-[16/10]"
      }`}
    >
      <Image
        src={item.image}
        alt={t(item.alt)}
        fill
        sizes={featured ? "(min-width:1024px) 58vw, 100vw" : "(min-width:1024px) 38vw, 100vw"}
        className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
      />
      <button
        type="button"
        onClick={(event) => onOpen(event.currentTarget)}
        aria-label={lang === "ar" ? `تكبير ${t(item.label)}` : `Expand ${t(item.label)}`}
        className="absolute inset-0 z-[1] cursor-zoom-in focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-white"
      >
        <span className="absolute end-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white opacity-100 shadow-lg backdrop-blur-md transition-all duration-300 sm:opacity-0 sm:group-hover:opacity-100">
          <Search className="size-4" strokeWidth={1.8} />
        </span>
      </button>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-black/10 transition-opacity duration-500 group-hover:from-black/75" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />

      <span
        className={`numeral pointer-events-none absolute start-4 top-4 inline-flex items-center justify-center border border-white/30 bg-black/25 font-medium text-white/90 backdrop-blur-md sm:start-6 sm:top-6 ${
          featured ? "size-11 text-[0.72rem] sm:size-14 sm:text-[0.82rem]" : "size-10 text-[0.68rem]"
        }`}
      >
        {item.num}
      </span>

      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-6">
        <div>
          <span className="mb-2 block h-px w-8" style={{ background: accent }} />
          <span className={`font-medium text-white ${featured ? "text-base sm:text-xl" : "text-sm sm:text-base"}`}>
            {t(item.label)}
          </span>
        </div>
        <span className="numeral text-[0.62rem] tracking-[0.22em] text-white/50">
          {featured ? "FEATURED" : "DETAIL"}
        </span>
      </figcaption>
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-start scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
        style={{ background: accent }}
      />
    </figure>
  );
}

/** An asymmetrical detail mosaic with one hero crop and two supporting macros. */
export default function DetailGrid({ content }: { content: DetailContent }) {
  const { t, lang } = useLang();
  const accent = content.accent ?? "var(--c-volt)";
  const [featured, ...rest] = content.items;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isOpen = selectedIndex !== null;
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const items = content.items;
  const openItem = (index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelectedIndex(index);
  };

  const finishSwipe = (endX: number) => {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX === null || selectedIndex === null || Math.abs(endX - startX) < 55) return;
    const direction = endX < startX ? 1 : -1;
    setSelectedIndex((selectedIndex + direction + items.length) % items.length);
  };

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const visualDirection = event.key === "ArrowRight" ? 1 : -1;
        const direction = lang === "ar" ? -visualDirection : visualDirection;
        setSelectedIndex((current) =>
          current === null ? 0 : (current + direction + items.length) % items.length,
        );
      } else if (event.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex="0"]',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [isOpen, items.length, lang]);

  return (
    <section className="relative isolate overflow-hidden bg-ink py-16 sm:py-20 lg:py-28" aria-label={t(content.eyebrow)}>
      <div className="pointer-events-none absolute inset-y-0 end-0 hidden w-px bg-gradient-to-b from-transparent via-line to-transparent lg:block" />
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="mb-8 grid gap-5 border-b border-line pb-6 sm:mb-10 sm:pb-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <div className="flex items-center gap-4">
              <span className="h-px w-10" style={{ background: accent }} />
              <p className="eyebrow" style={{ color: accent }}>{t(content.eyebrow)}</p>
            </div>
            <KineticHeading
              text={content.title}
              className="display mt-4 max-w-[20ch] text-[clamp(1.7rem,3.7vw,3.3rem)] leading-[1.05] text-fog"
            />
          </Reveal>
          <div className="flex items-center justify-between gap-4 lg:col-span-4 lg:justify-end">
            <span className="max-w-[13rem] text-[0.75rem] leading-relaxed text-dim sm:text-end">
              {lang === "ar" ? "اقترب من التفاصيل. كل زاوية تحكي شيئًا مختلفًا." : "Move closer. Every angle has something to say."}
            </span>
            <span className="numeral shrink-0 text-[0.7rem] tracking-[0.22em] text-mist">
              {String(content.items.length).padStart(2, "0")} <span className="text-volt">/</span> MACRO
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12 lg:grid-rows-2">
          <Reveal y={36} className="sm:col-span-2 lg:col-span-7 lg:row-span-2">
            <DetailPlate
              item={featured}
              featured
              accent={accent}
              onOpen={(trigger) => openItem(0, trigger)}
            />
          </Reveal>
          {rest.map((item, index) => (
            <Reveal
              key={item.num}
              y={30}
              delay={0.08 * (index + 1)}
              className="lg:col-span-5"
            >
              <DetailPlate
                item={item}
                accent={accent}
                onOpen={(trigger) => openItem(index + 1, trigger)}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
        {selectedIndex !== null && items[selectedIndex] && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={lang === "ar" ? "عرض تفاصيل السيارة" : "Car detail viewer"}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-3 backdrop-blur-xl sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedIndex(null);
            }}
          >
            <motion.div
              className="relative w-full max-w-6xl"
              initial={{ y: 18, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="mb-3 flex items-center justify-between gap-4 px-1 sm:mb-4">
                <div className="min-w-0">
                  <p className="eyebrow text-volt">{t(content.eyebrow)}</p>
                  <h3 className="mt-1 truncate font-display text-lg font-medium text-white sm:text-xl">
                    {t(items[selectedIndex].label)}
                  </h3>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  aria-label={lang === "ar" ? "إغلاق العرض" : "Close viewer"}
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white/70 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <X className="size-5" />
                </button>
              </div>

              <figure
                className="touch-pan-y overflow-hidden rounded-2xl border border-white/15 bg-[#090a0c]"
                onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
                onTouchEnd={(event) => { if (event.changedTouches[0]) finishSwipe(event.changedTouches[0].clientX); }}
              >
                <div className="relative aspect-[4/3] max-h-[72svh] w-full sm:aspect-[16/10]">
                  <Image
                    src={items[selectedIndex].image}
                    alt={t(items[selectedIndex].alt)}
                    fill
                    sizes="(min-width: 1280px) 1152px, 96vw"
                    className="object-contain"
                    priority
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-3 sm:px-6">
                  <span className="text-sm text-white/70">{t(items[selectedIndex].label)}</span>
                  <span className="numeral text-[0.72rem] tracking-[0.2em] text-white/45">
                    {String(selectedIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>

              <div className="mt-3 flex items-center justify-between sm:mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedIndex((selectedIndex - 1 + items.length) % items.length)}
                  aria-label={lang === "ar" ? "التفصيل السابق" : "Previous detail"}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-[0.8rem] text-white/80 transition-colors hover:border-white/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {lang === "ar" ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
                  <span>{lang === "ar" ? "السابق" : "Previous"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIndex((selectedIndex + 1) % items.length)}
                  aria-label={lang === "ar" ? "التفصيل التالي" : "Next detail"}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 text-[0.8rem] text-white/80 transition-colors hover:border-white/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>{lang === "ar" ? "التالي" : "Next"}</span>
                  {lang === "ar" ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
