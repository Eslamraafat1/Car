"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, usePrefersReducedMotion } from "@/lib/motion";
import { scrollToId } from "@/lib/smooth-scroll";
import { getVehicle, specValue, type Vehicle } from "@/lib/vehicles";
import type { CarouselApi } from "@/components/three/HeroCarouselScene";

const HeroCarouselScene = dynamic(() => import("@/components/three/HeroCarouselScene"), { ssr: false });

const SLIDES: { slug: string; hero: string }[] = [
  { slug: "ferrari-f8-tributo", hero: "/media/hero/f8.webp" },
  { slug: "dodge-challenger", hero: "/media/hero/challenger.webp" },
  { slug: "mercedes-amg-c63", hero: "/media/hero/c63.webp" },
  { slug: "tesla-roadster", hero: "/media/hero/roadster.webp" },
  { slug: "lamborghini-huracan-evo", hero: "/media/hero/huracan.webp" },
];
const AUTOPLAY_MS = 7000;

type Mode = "gl" | "dom";

function canWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Home — the opening carousel. WebGL sweeps one car out and the next one in
 * (motion blur, RGB split, a blade of light), while the model name, specs and
 * a ghost brand word glide in sync. Autoplays, swipes, supports arrows and
 * keys, and falls back to a plain cross-fade without WebGL.
 */
export default function HeroCarousel() {
  const { t, lang } = useLang();
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLElement | null>(null);
  const apiRef = useRef<CarouselApi | null>(null);
  const glOk = useSyncExternalStore(() => () => {}, canWebGL, () => false);
  const [glReady, setGlReady] = useState(false);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [hover, setHover] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const rtl = lang === "ar";
  const Next = rtl ? ChevronLeft : ChevronRight;
  const Prev = rtl ? ChevronRight : ChevronLeft;
  const Arrow = rtl ? ArrowLeft : ArrowRight;

  const cars = useMemo(
    () => SLIDES.map((s) => ({ ...s, car: getVehicle(s.slug) })).filter((s): s is { slug: string; hero: string; car: Vehicle } => Boolean(s.car)),
    [],
  );
  const urls = useMemo(() => cars.map((c) => c.hero), [cars]);
  const n = cars.length;

  const mode: Mode = !reduced && glOk ? "gl" : "dom";
  const go = useCallback(
    (to: number, forward: boolean) => {
      const next = ((to % n) + n) % n;
      const d: 1 | -1 = forward ? 1 : -1;
      // "next" enters from the reading-end side: right in LTR, left in RTL
      const visual: 1 | -1 = rtl ? ((-d) as 1 | -1) : d;
      setDir(visual);
      setIndex(next);
      apiRef.current?.go(next, visual);
    },
    [n, rtl],
  );
  const next = useCallback(() => go(index + 1, true), [go, index]);
  const prev = useCallback(() => go(index - 1, false), [go, index]);

  // pause when off-screen or the tab is hidden
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const paused = hover || offscreen || hidden || reduced;

  // swipe
  const drag = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("a,button")) return;
    drag.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = drag.current;
    drag.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(e.clientY - s.y)) {
      // dragging toward the reading start means "next"
      const towardNext = rtl ? dx > 0 : dx < 0;
      if (towardNext) next();
      else prev();
    }
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") (rtl ? prev : next)();
    if (e.key === "ArrowLeft") (rtl ? next : prev)();
  };

  // entrance
  useGSAP(
    () => {
      if (reduced) return;
      gsap.from(".hc-intro", { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.2 });
    },
    { scope: rootRef, dependencies: [reduced] },
  );

  // scroll-away
  useGSAP(
    () => {
      if (reduced) return;
      gsap.to(".hc-content", { yPercent: -18, autoAlpha: 0, ease: "none", scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 0.3 } });
      gsap.to(".hc-stage", { scale: 1.08, ease: "none", scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: 0.3 } });
    },
    { scope: rootRef, dependencies: [reduced] },
  );

  const style = { "--i": index, "--dir": dir } as CSSProperties;

  return (
    <section
      ref={rootRef}
      id="hero"
      style={style}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (drag.current = null)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onKeyDown={onKeyDown}
      className="relative isolate flex h-[100svh] min-h-[600px] touch-pan-y flex-col overflow-hidden bg-[#070809] text-white"
      aria-roledescription="carousel"
      aria-label={t(C.hero.eyebrow)}
    >
      <h1 className="sr-only">{t(C.hero.title)}</h1>

      {/* stage */}
      <div className="hc-stage absolute inset-0 will-change-transform">
        {cars.map((c, i) => {
          const visible = mode === "dom" ? i === index : mode === "gl" && !glReady ? i === 0 : false;
          if (mode === "gl" && glReady) return null;
          if (!visible && !(i === 0)) return null;
          return (
            <Image
              key={c.slug}
              src={c.hero}
              alt={i === index ? t(c.car.alt) : ""}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
            />
          );
        })}
        {mode === "gl" && <HeroCarouselScene urls={urls} apiRef={apiRef} onReady={() => setGlReady(true)} />}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent rtl:bg-gradient-to-l" />
      <div className="pointer-events-none absolute inset-0 grain" />

      {/* ghost brand word */}
      <div className="pointer-events-none absolute inset-x-0 top-[18%] overflow-hidden" aria-hidden="true" dir="ltr">
        <p
          className="keep-tracking whitespace-nowrap font-display text-[clamp(6rem,23vw,24rem)] font-black uppercase leading-none text-transparent transition-transform duration-[1400ms] ease-[cubic-bezier(.2,.7,.1,1)] [-webkit-text-stroke:1px_rgba(255,255,255,0.16)]"
          style={{ transform: `translateX(calc(${(-index * 9).toFixed(1)}% + 6%))` }}
        >
          {cars.map((c) => c.car.brand).join(" · ")}
        </p>
      </div>

      {/* company statement */}
      <div className="hc-content relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between px-4 pb-6 pt-24 sm:px-6 sm:pt-28 lg:px-10 lg:pb-9">
        <div className="hc-intro flex items-start justify-between gap-4">
          <div className="max-w-xl">
            <p className="eyebrow inline-flex items-center gap-2 text-[#7db4ff]">
              <span className="size-1.5 animate-pulse rounded-full bg-[#4da3ff]" />
              {t(C.hero.eyebrow)}
            </p>
            <p className="hide-short mt-3 max-w-md text-[0.92rem] leading-relaxed text-white/75 sm:text-[1rem]">{t(C.hero.sub)}</p>
          </div>
          <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex" dir="ltr" aria-hidden="true">
            <span className="numeral font-display text-5xl font-light leading-none tracking-tight text-white lg:text-6xl">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="numeral text-[0.78rem] tracking-[0.3em] text-white/55">/ {String(n).padStart(2, "0")}</span>
          </div>
        </div>

        {/* slide copy */}
        <div className="relative mt-auto" aria-live="polite">
          <div className="relative grid">
            {cars.map((c, i) => {
              const active = i === index;
              const chars = c.car.model.split("");
              return (
                <div
                  key={c.slug}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} / ${n}`}
                  aria-hidden={!active}
                  className={`col-start-1 row-start-1 ${active ? "" : "pointer-events-none"}`}
                >
                  <p
                    className="eyebrow hc-line transition-all duration-700 ease-out"
                    data-on={active}
                    style={{ color: c.car.accent, transitionDelay: active ? "0.35s" : "0s" }}
                  >
                    {c.car.brand} · {c.car.year}
                  </p>
                  <h2
                    className="keep-tracking mt-2 flex max-w-[16ch] flex-wrap rtl:justify-end font-display text-[clamp(2.6rem,10.5vw,9.4rem)] font-bold uppercase leading-[0.92] tracking-[-0.045em] sm:mt-3"
                    dir="ltr"
                    aria-label={c.car.model}
                  >
                    {chars.map((ch, ci) => (
                      <span key={ci} className="hc-char-wrap inline-block overflow-hidden pb-[0.08em]" aria-hidden="true">
                        <span
                          className="hc-char inline-block"
                          data-on={active}
                          style={{ transitionDelay: active ? `${0.25 + ci * 0.04}s` : `${ci * 0.012}s` }}
                        >
                          {ch === " " ? " " : ch}
                        </span>
                      </span>
                    ))}
                  </h2>
                  <div className="hc-line mt-3 flex flex-col gap-5 transition-all duration-700 ease-out sm:mt-4 lg:flex-row lg:items-end lg:justify-between" data-on={active} style={{ transitionDelay: active ? "0.5s" : "0s" }}>
                    <p className="hide-short max-w-md text-[0.98rem] leading-relaxed text-white/80">{t(c.car.tagline)}</p>
                    <dl className="grid max-w-md grid-cols-3 gap-4 border-s border-white/25 ps-4 sm:gap-8 sm:ps-6 lg:max-w-lg">
                      {c.car.specs.filter((s) => s.label.en !== "Year" && s.label.en !== "Indicative price").slice(0, 3).map((s) => (
                        <div key={s.label.en} className="min-w-0">
                          <dt className="text-[0.62rem] uppercase tracking-[0.16em] text-white/55">{t(s.label)}</dt>
                          <dd className="mt-1 break-words font-display text-[0.9rem] font-semibold leading-tight sm:text-lg">{specValue(s.value, lang)}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hc-intro mt-5 flex flex-wrap items-center gap-3 sm:mt-7">
            <Link
              href={`/cars/${cars[index].slug}`}
              className="shine group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-white px-6 text-[0.88rem] font-semibold text-[#070809] transition-transform duration-300 hover:scale-[1.03] sm:px-7"
            >
              {t(C.showcase.view)}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" strokeWidth={2.2} />
            </Link>
            <Link
              href="/explore"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 px-6 text-[0.88rem] font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:border-white hover:bg-white/10 sm:px-7"
            >
              {t(C.hero.primary)}
              <Arrow className="size-4" strokeWidth={2.2} />
            </Link>
            <button
              type="button"
              onClick={() => scrollToId("story")}
              className="hide-short ms-auto hidden size-12 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white hover:text-white sm:inline-flex"
              aria-label={t(C.hero.secondary)}
            >
              <ArrowDown className="size-4" />
            </button>
          </div>
        </div>

        {/* controls */}
        <div className="hc-intro mt-5 flex items-center gap-3 sm:mt-7">
          <div className="flex gap-2">
            <button type="button" onClick={prev} aria-label={lang === "ar" ? "السابق" : "Previous"} className="inline-flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black">
              <Prev className="size-5" />
            </button>
            <button type="button" onClick={next} aria-label={lang === "ar" ? "التالي" : "Next"} className="inline-flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black">
              <Next className="size-5" />
            </button>
          </div>
          <ol className="flex flex-1 gap-2 sm:gap-3" aria-label="Slides">
            {cars.map((c, i) => (
              <li key={c.slug} className="min-w-0 flex-1">
                <button type="button" onClick={() => go(i, i > index)} aria-label={`${c.car.brand} ${c.car.model}`} aria-current={i === index} className="group block w-full text-start">
                  <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/25">
                    {i < index && <span className="absolute inset-0 bg-white" />}
                    {i === index && (
                      <span
                        key={`${index}-${paused}`}
                        className="hc-bar absolute inset-0 origin-start bg-white rtl:origin-right"
                        style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
                        onAnimationEnd={next}
                      />
                    )}
                  </span>
                  <span className={`mt-2 hidden truncate text-[0.72rem] transition-colors sm:block ${i === index ? "text-white" : "text-white/45 group-hover:text-white/80"}`} dir="ltr">
                    {c.car.model}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
