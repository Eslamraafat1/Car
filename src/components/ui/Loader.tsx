"use client";

import { useEffect, useRef } from "react";
import { C } from "@/lib/content";

const BODY =
  "M30 98 L28 84 C28 77 35 73 46 71 L100 65 C128 56 158 47 188 43 C214 40 244 41 268 49 L304 66 L366 74 C386 77 402 82 406 91 L406 98 L343 98 A27 27 0 0 0 289 98 L137 98 A27 27 0 0 0 83 98 Z";

/**
 * First-visit intro (once per session, ~1s): a technical line drawing of a
 * coupe is traced, a single highlight runs the outline, the wheels spin up and
 * a hairline counter reaches 100 before the screen fades. Colours follow the
 * active theme. The `has-loader` class is set by an inline script before first
 * paint, so there is no flash and returning visitors never see it.
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
    const safety = window.setTimeout(done, 2200);
    const counter = root.querySelector<HTMLElement>("[data-count]");

    import("animejs")
      .then(({ createTimeline, animate, svg, stagger }) => {
        if (cancelled) return;
        const state = { n: 0 };
        const tl = createTimeline({ defaults: { ease: "outQuart" } });
        tl.add(svg.createDrawable(root.querySelectorAll("[data-draw]")), { draw: ["0 0", "0 1"], duration: 600, delay: stagger(70) }, 0)
          .add(root.querySelectorAll("[data-wheel]"), { opacity: [0, 1], scale: [0.7, 1], duration: 380, delay: stagger(60) }, 250)
          .add(root.querySelectorAll("[data-spin]"), { rotate: [0, 360], duration: 800, ease: "outCubic" }, 250)
          .add(root.querySelector("[data-run]") as Element, { strokeDashoffset: [0, -1000], opacity: [0, 1, 1, 0], duration: 750, ease: "inOutQuad" }, 300)
          .add(root.querySelectorAll("[data-letter]"), { opacity: [0, 1], translateY: [10, 0], duration: 380, delay: stagger(40) }, 120)
          .add(state, { n: 100, duration: 750, ease: "inOutQuad", onUpdate: () => { if (counter) counter.textContent = String(Math.round(state.n)); } }, 150)
          .add(root.querySelector("[data-bar]") as Element, { scaleX: [0, 1], duration: 750, ease: "inOutQuad" }, 150);

        tl.then(() => {
          if (cancelled) return;
          window.clearTimeout(safety);
          animate(root, { opacity: [1, 0], duration: 300, ease: "inQuad", onComplete: done });
        });
      })
      .catch((e) => {
        console.error("loader", e);
        done();
      });

    return () => {
      cancelled = true;
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="evay-loader fixed inset-0 z-[200] items-center justify-center bg-ink text-fog"
      dir="ltr"
      aria-hidden="true"
    >
      <div className="w-[min(88vw,34rem)]">
        <svg viewBox="0 0 420 130" fill="none" className="block w-full overflow-visible">
          <path d="M0 124 L420 124" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
          <path data-draw d={BODY} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path data-draw d="M124 64 C146 52 176 47 200 47 C220 47 238 54 254 63 Z" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.7" strokeLinejoin="round" />
          <path data-draw d="M58 73 L362 78" stroke="currentColor" strokeWidth="1" strokeOpacity="0.45" />
          <path data-draw d="M388 80 L404 86" stroke="currentColor" strokeWidth="1.4" />
          <path data-run d={BODY} pathLength="1000" stroke="var(--c-volt)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="70 930" opacity="0" />
          {[110, 316].map((cx) => (
            <g key={cx} data-wheel opacity="0" style={{ transformOrigin: `${cx}px 98px`, transformBox: "view-box" }}>
              <circle cx={cx} cy="98" r="24" stroke="currentColor" strokeWidth="1.5" />
              <circle cx={cx} cy="98" r="14" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
              <g data-spin style={{ transformOrigin: `${cx}px 98px`, transformBox: "view-box" }}>
                {[0, 72, 144, 216, 288].map((a) => (
                  <line key={a} x1={cx} y1="98" x2={cx + 13 * Math.cos((a * Math.PI) / 180)} y2={98 + 13 * Math.sin((a * Math.PI) / 180)} stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.7" />
                ))}
              </g>
              <circle cx={cx} cy="98" r="2.4" fill="var(--c-volt)" />
            </g>
          ))}
        </svg>

        <div className="mt-8 flex items-center justify-between">
          <p className="keep-tracking flex font-display text-[0.8rem] font-semibold tracking-[0.42em]">
            {C.brand.name.split("").map((l, i) => (
              <span key={i} data-letter className="inline-block opacity-0">{l}</span>
            ))}
          </p>
          <p className="numeral font-display text-[0.8rem] tabular-nums text-mist">
            <span data-count>0</span>
            <span className="text-volt">%</span>
          </p>
        </div>
        <span className="mt-3 block h-px w-full overflow-hidden bg-line">
          <span data-bar className="block h-full origin-left bg-volt" style={{ transform: "scaleX(0)" }} />
        </span>
      </div>
    </div>
  );
}
