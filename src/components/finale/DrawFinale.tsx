"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Shuffle } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, usePrefersReducedMotion } from "@/lib/motion";
import { VEHICLES } from "@/lib/vehicles";
import { FinaleActions, FinaleBody, FinaleEyebrow, FinaleShell, FinaleTitle } from "./finale-kit";

const N = VEHICLES.length;
const REPS = 3;

/**
 * Explore — the finale is a draw: a film strip of the whole fleet decelerates
 * into a viewfinder and locks onto one machine, which you can then open.
 */
export default function DrawFinale({ accent = "#b7a1ff" }: { accent?: string }) {
  const { t, lang } = useLang();
  const reduced = usePrefersReducedMotion();

  const windowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cellRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef({ cellW: 240, gap: 16, windowW: 800 });
  const flatRef = useRef(N);
  const spinningRef = useRef(false);

  const [spinning, setSpinning] = useState(false);
  const [resultIndex, setResultIndex] = useState(0);
  const [spins, setSpins] = useState(0);

  const cells = useMemo(
    () => Array.from({ length: N * REPS }, (_, index) => VEHICLES[index % N]),
    [],
  );
  const result = VEHICLES[resultIndex];

  const measure = useCallback(() => {
    const track = trackRef.current;
    const cell = cellRef.current;
    const windowEl = windowRef.current;
    if (!track || !cell || !windowEl) return;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    metricsRef.current = {
      cellW: cell.offsetWidth,
      gap,
      windowW: windowEl.offsetWidth,
    };
  }, []);

  const xFor = useCallback((flat: number) => {
    const { cellW, gap, windowW } = metricsRef.current;
    return windowW / 2 - (flat * (cellW + gap) + cellW / 2);
  }, []);

  useEffect(() => {
    measure();
    gsap.set(trackRef.current, { x: xFor(flatRef.current) });
    const onResize = () => {
      measure();
      gsap.set(trackRef.current, { x: xFor(flatRef.current) });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure, xFor]);

  const spin = useCallback(() => {
    const track = trackRef.current;
    if (!track || spinningRef.current) return;

    const nextIndex = Math.floor(Math.random() * N);

    if (reduced) {
      flatRef.current = N + nextIndex;
      gsap.set(track, { x: xFor(flatRef.current), filter: "blur(0px)" });
      setResultIndex(nextIndex);
      setSpins((count) => count + 1);
      return;
    }

    spinningRef.current = true;
    setSpinning(true);

    // Always travel forward at least a full sweep, landing in the middle rep.
    const target = Math.max(2 * N + nextIndex, flatRef.current + N + 2);
    const targetIndex = target % N;

    gsap.killTweensOf(track);
    gsap.to(track, { filter: "blur(8px)", duration: 0.3, ease: "power2.out" });
    gsap.to(track, {
      x: xFor(target),
      duration: 2.4,
      ease: "power4.out",
      onComplete: () => {
        // Normalise back into the middle rep — visually identical, so invisible.
        flatRef.current = N + targetIndex;
        gsap.set(track, { x: xFor(flatRef.current) });
        gsap.to(track, { filter: "blur(0px)", duration: 0.35 });
        setResultIndex(targetIndex);
        setSpins((count) => count + 1);
        spinningRef.current = false;
        setSpinning(false);
      },
    });
  }, [reduced, xFor]);

  return (
    <FinaleShell page="explore" accent={accent} ghost="THE DRAW">
      <div className="grid w-full items-end gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <FinaleEyebrow>{t(C.finale.explore.eyebrow)}</FinaleEyebrow>
          <FinaleTitle>{t(C.finale.explore.title)}</FinaleTitle>
        </div>
        <div className="lg:col-span-5">
          <FinaleBody>{t(C.finale.explore.hint)}</FinaleBody>
          <FinaleActions />
        </div>
      </div>

      {/* The draw window */}
      <div className="relative mt-12 lg:mt-16">
        <div className="mb-3 flex items-center justify-between">
          <span className="numeral text-[0.64rem] tracking-[0.26em] text-white/50">
            AURELIS / {t(C.finale.explore.frame)}
          </span>
          <span className="numeral text-[0.64rem] tracking-[0.26em] text-white/50">
            {String(resultIndex + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </span>
        </div>

        <div
          ref={windowRef}
          className="relative h-[190px] overflow-hidden border-y border-white/12 bg-white/[0.02] sm:h-[230px]"
        >
          {/* viewfinder brackets */}
          <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
            <span className="absolute inset-y-0 start-0 w-24 bg-gradient-to-r from-black to-transparent sm:w-40" />
            <span className="absolute inset-y-0 end-0 w-24 bg-gradient-to-l from-black to-transparent sm:w-40" />
            <span className="absolute inset-y-6 start-1/2 w-px -translate-x-1/2 bg-white/25" />
            <span
              className="absolute inset-y-4 start-1/2 w-[min(300px,58vw)] -translate-x-1/2 border-x-2 transition-colors duration-500"
              style={{ borderColor: spinning ? "rgba(255,255,255,.85)" : accent }}
            />
            <span
              className="absolute start-1/2 top-3 size-2 -translate-x-1/2 rotate-45 transition-all duration-500"
              style={{
                backgroundColor: accent,
                boxShadow: `0 0 16px ${accent}`,
                transform: `translateX(-50%) rotate(45deg) scale(${spinning ? 1.6 : 1})`,
              }}
            />
          </div>

          <div ref={trackRef} dir="ltr" className="absolute inset-y-0 start-0 flex items-center gap-3 will-change-transform sm:gap-4" aria-hidden="true">
            {cells.map((vehicle, index) => (
              <div
                key={`${vehicle.slug}-${index}`}
                ref={index === 0 ? cellRef : undefined}
                className="relative aspect-[3/2] w-[42vw] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-ink-2 sm:w-[300px]"
              >
                <Image
                  src={vehicle.image}
                  alt=""
                  fill
                  sizes="300px"
                  className="object-cover opacity-80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="absolute inset-x-3 bottom-2 flex items-baseline justify-between gap-2">
                  <span className="truncate font-display text-[0.8rem] font-semibold text-white/90">
                    {vehicle.brand} {vehicle.model}
                  </span>
                  <span className="numeral text-[0.6rem] text-white/55">{vehicle.year}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[0.68rem] text-dim">{t(C.finale.explore.hint)}</span>
          <span className="numeral text-[0.64rem] tracking-[0.22em] text-white/45">
            {spinning ? t(C.finale.explore.spinning) : `${t(C.finale.explore.spin)} · ${String(spins).padStart(2, "0")}`}
          </span>
        </div>
      </div>

      {/* The lock-on card + spin control */}
      <div className="mt-10 grid w-full gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-[24px] border border-white/12 bg-white/[0.02]">
            <div className="relative aspect-[16/9]">
              <Image
                key={result.slug}
                src={result.image}
                alt={t(result.alt)}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              <div className="absolute inset-0 grain" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-7">
              <div>
                <span className="eyebrow flex items-center gap-2" style={{ color: accent }}>
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: accent }} />
                  {t(C.finale.explore.result)}
                </span>
                <p className="mt-2 font-display text-[clamp(1.4rem,3.4vw,2.4rem)] font-bold leading-tight text-white">
                  {result.brand} {result.model}
                </p>
                <p className="mt-1 max-w-[46ch] text-[0.8rem] leading-relaxed text-white/65">
                  {t(result.tagline)}
                </p>
              </div>
              <Link
                href={`/cars/${result.slug}`}
                className="inline-flex min-h-11 items-center rounded-full px-6 text-[0.82rem] font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
                style={{ backgroundColor: accent }}
              >
                {t(C.finale.explore.view)}
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-5 rounded-[24px] border border-white/12 bg-white/[0.02] p-6 lg:col-span-5">
          <div>
            <p className="numeral text-[0.64rem] tracking-[0.26em] text-white/50">
              {lang === "ar" ? "قرعة تجريبية" : "DEMO DRAW"}
            </p>
            <p className="mt-3 text-[0.86rem] leading-relaxed text-white/70">
              {t({
                ar: "القرعة بتلف على كل موديلات المجموعة — كل لفة بتقف على واحدة بس.",
                en: "The draw spins through the entire fleet — every spin settles on exactly one machine.",
              })}
            </p>
          </div>
          <button
            type="button"
            onClick={spin}
            disabled={spinning}
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-[0.88rem] font-semibold text-ink transition-transform duration-300 hover:scale-[1.02] disabled:cursor-wait disabled:opacity-70"
            style={{ backgroundColor: accent }}
          >
            <Shuffle className="size-4 transition-transform duration-500 group-hover:rotate-180" aria-hidden="true" />
            {spinning ? t(C.finale.explore.spinning) : t(C.finale.explore.spin)}
          </button>
        </div>
      </div>
    </FinaleShell>
  );
}
