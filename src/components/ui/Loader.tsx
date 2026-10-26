"use client";

import { useEffect, useRef } from "react";
import { C } from "@/lib/content";

/**
 * First-visit intro (once per session): the mark draws itself, a counter runs
 * to 100, then the curtain lifts. The `has-loader` class is set by an inline
 * script before first paint, so there is no flash and returning visitors never
 * see it. Driven by anime.js, loaded lazily.
 */
export default function Loader() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const html = document.documentElement;
    if (!root || !html.classList.contains("has-loader")) return;

    const done = () => {
      try {
        sessionStorage.setItem("evay-loaded", "1");
      } catch {
        /* storage blocked */
      }
      html.classList.remove("has-loader");
      root.style.display = "none";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      done();
      return;
    }

    let cancelled = false;
    let safety = window.setTimeout(done, 3800);
    const counter = root.querySelector<HTMLElement>("[data-count]");

    import("animejs").then(({ createTimeline, animate, svg, stagger }) => {
      if (cancelled) return;
      const state = { n: 0 };
      const paths = svg.createDrawable(root.querySelectorAll("[data-draw]"));

      const tl = createTimeline({ defaults: { ease: "outExpo" } });
      tl.add(paths, { draw: ["0 0", "0 1"], duration: 900, delay: stagger(140) }, 0)
        .add(root.querySelector("[data-tile]") as Element, { scale: [0.7, 1], opacity: [0, 1], duration: 700 }, 0)
        .add(root.querySelectorAll("[data-letter]"), { translateY: ["110%", "0%"], opacity: [0, 1], duration: 800, delay: stagger(70) }, 300)
        .add(state, { n: 100, duration: 1300, ease: "inOutQuad", onUpdate: () => { if (counter) counter.textContent = String(Math.round(state.n)); } }, 100)
        .add(root.querySelector("[data-bar]") as Element, { scaleX: [0, 1], duration: 1300, ease: "inOutQuad" }, 100)
        .add(root.querySelector("[data-content]") as Element, { opacity: 0, translateY: -24, duration: 380, ease: "inQuad" }, 1550);

      tl.then(() => {
        if (cancelled) return;
        window.clearTimeout(safety);
        animate(root, { translateY: ["0%", "-100%"], duration: 750, ease: "inOutExpo", onComplete: done });
      });
    }).catch((e) => { console.error("loader", e); done(); });

    return () => {
      cancelled = true;
      window.clearTimeout(safety);
      safety = 0;
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="evay-loader fixed inset-0 z-[200] items-center justify-center bg-[#070809] text-white"
      aria-hidden="true"
    >
      <div data-content className="flex flex-col items-center">
        <svg data-tile viewBox="0 0 32 32" className="size-20 sm:size-24" fill="none">
          <rect width="32" height="32" rx="9" fill="#2f7bff" />
          <path data-draw d="M9 10h14" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
          <path data-draw d="M9 16h10" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
          <path data-draw d="M9 22h14" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
        <p className="keep-tracking mt-7 flex overflow-hidden font-display text-3xl font-bold tracking-[0.32em] sm:text-4xl" dir="ltr">
          {C.brand.name.split("").map((l, i) => (
            <span key={i} data-letter className="inline-block">{l}</span>
          ))}
        </p>
        <div className="mt-8 flex w-56 items-center gap-3 sm:w-72" dir="ltr">
          <span className="h-px flex-1 overflow-hidden bg-white/15">
            <span data-bar className="block h-full origin-left bg-[#4da3ff]" style={{ transform: "scaleX(0)" }} />
          </span>
          <span className="numeral w-10 text-end text-[0.78rem] tabular-nums text-white/70">
            <span data-count>0</span>%
          </span>
        </div>
      </div>
    </div>
  );
}
