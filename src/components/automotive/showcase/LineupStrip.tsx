"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import Reveal from "@/components/ui/Reveal";
import KineticHeading from "@/components/ui/KineticHeading";
import type { LineupContent } from "@/lib/showcase-types";

/** A horizontally scrolling range strip with snap points. */
export default function LineupStrip({ content }: { content: LineupContent }) {
  const { t, lang } = useLang();
  const accent = content.accent ?? "var(--c-volt)";
  const trackRef = useRef<HTMLUListElement | null>(null);
  const dragRef = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [progress, setProgress] = useState(0);

  const scrollTrack = (direction: "next" | "previous") => {
    const track = trackRef.current;
    const firstItem = track?.querySelector("li");
    if (!track || !firstItem) return;
    const step = firstItem.getBoundingClientRect().width + 16;
    const towardEnd = direction === "next" ? 1 : -1;
    track.scrollBy({
      left: towardEnd * (lang === "ar" ? -step : step),
      behavior: "smooth",
    });
  };

  const onTrackScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setProgress(max > 0 ? Math.min(1, Math.abs(track.scrollLeft) / max) : 0);
  };

  /* Mouse-drag panning: content follows the pointer; a real click after a
     drag is suppressed so cards don't navigate by accident. */
  const onDragStart = (event: React.PointerEvent<HTMLUListElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    track.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, left: track.scrollLeft, moved: false };
  };

  const onDragMove = (event: React.PointerEvent<HTMLUListElement>) => {
    const track = trackRef.current;
    const drag = dragRef.current;
    if (!track || !drag) return;
    const dx = event.clientX - drag.x;
    if (Math.abs(dx) > 6) drag.moved = true;
    track.scrollLeft = drag.left - dx;
  };

  const onDragEnd = (event: React.PointerEvent<HTMLUListElement>) => {
    const track = trackRef.current;
    if (track?.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    window.setTimeout(() => {
      dragRef.current = null;
    }, 0);
  };

  const onTrackClickCapture = (event: React.MouseEvent<HTMLUListElement>) => {
    if (dragRef.current?.moved) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <section className="relative overflow-hidden bg-ink-2 py-16 sm:py-20 lg:py-24" aria-label={t(content.eyebrow)}>
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
          <Reveal>
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-10" style={{ background: accent }} />
                <p className="eyebrow" style={{ color: accent }}>
                  {t(content.eyebrow)}
                </p>
              </div>
              <KineticHeading
                text={content.title}
                className="display mt-4 max-w-[22ch] text-[clamp(1.6rem,3.4vw,2.7rem)] leading-[1.06] text-fog"
              />
            </div>
          </Reveal>
          <div className="flex items-center gap-3">
            <span className="numeral hidden text-[0.7rem] tracking-[0.2em] text-dim sm:inline">
              {String(content.items.length).padStart(2, "0")} — {lang === "ar" ? "موديلات" : "MODELS"}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTrack("previous")}
                aria-label={lang === "ar" ? "الموديلات السابقة" : "Previous models"}
                className="inline-flex size-10 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-volt hover:text-fog focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
              >
                {lang === "ar" ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
              </button>
              <button
                type="button"
                onClick={() => scrollTrack("next")}
                aria-label={lang === "ar" ? "الموديلات التالية" : "Next models"}
                className="inline-flex size-10 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-volt hover:text-fog focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
              >
                {lang === "ar" ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Reveal y={36}>
        <ul
          ref={trackRef}
          tabIndex={0}
          aria-label={lang === "ar" ? "تصفّح موديلات السيارات" : "Browse car models"}
          onScroll={onTrackScroll}
          onPointerDown={onDragStart}
          onPointerMove={onDragMove}
          onPointerUp={onDragEnd}
          onPointerCancel={onDragEnd}
          onClickCapture={onTrackClickCapture}
          className="mt-8 flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-volt active:cursor-grabbing sm:px-6 lg:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {content.items.map((item, i) => {
            const body = (
              <>
                <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[1.25rem] border border-white/10 bg-ink">
                  <Image
                    src={item.image}
                    alt={t(item.alt)}
                    fill
                    sizes="(min-width:1024px) 24rem, 80vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-transparent" />
                  <span className="numeral absolute start-4 top-4 inline-flex size-9 items-center justify-center border border-white/25 bg-black/25 text-[0.65rem] text-white/80 backdrop-blur-md">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <span className="display block text-[1.15rem] font-semibold leading-tight text-white sm:text-[1.35rem]">
                      {item.name}
                    </span>
                    {item.tag && (
                      <span className="mt-2 flex items-center gap-2 text-[0.72rem] text-white/70">
                        <span className="h-px w-5 bg-volt" />
                        {t(item.tag)}
                      </span>
                    )}
                  </span>
                </div>
                <span className="mt-3 block h-px w-full origin-start scale-x-25 bg-line transition-all duration-500 group-hover:scale-x-100 group-hover:bg-volt" />
              </>
            );

            return (
              <li
                key={item.name}
                className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[23rem]"
              >
                {item.href ? (
                  <Link href={item.href} className="group block focus-visible:outline-none">
                    {body}
                  </Link>
                ) : (
                  <div className="group">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Reveal>

      <div className="mx-auto mt-5 w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="relative h-px overflow-hidden bg-line" aria-hidden="true">
          <span
            className="absolute inset-y-0 start-0 transition-[width] duration-150 ease-out"
            style={{ width: `${Math.max(8, progress * 100)}%`, background: accent }}
          />
        </div>
      </div>
    </section>
  );
}
