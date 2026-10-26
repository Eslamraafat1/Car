"use client";

import { useEffect, useMemo, useRef } from "react";
import { C } from "@/lib/content";

/** Deterministic skyline so server and client markup always match. */
function skyline(seed: number, count: number, min: number, max: number) {
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  let x = 0;
  const items: { x: number; w: number; h: number; lit: { x: number; y: number }[] }[] = [];
  for (let i = 0; i < count; i++) {
    const w = 26 + rnd() * 46;
    const h = min + rnd() * (max - min);
    const lit = Array.from({ length: Math.floor(rnd() * 5) }, () => ({ x: 5 + rnd() * (w - 10), y: 8 + rnd() * (h - 16) }));
    items.push({ x, w, h, lit });
    x += w + 3 + rnd() * 10;
  }
  return { items, width: x };
}

function Skyline({ seed, min, max, fill, lit, className }: { seed: number; min: number; max: number; fill: string; lit: string; className: string }) {
  const sk = useMemo(() => skyline(seed, 34, min, max), [seed, min, max]);
  const one = (
    <svg viewBox={`0 0 ${sk.width} 140`} preserveAspectRatio="xMinYMax slice" className="h-full w-auto shrink-0" aria-hidden="true">
      {sk.items.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={140 - b.h} width={b.w} height={b.h} fill={fill} />
          {b.lit.map((l, j) => <rect key={j} x={b.x + l.x} y={140 - b.h + l.y} width="3" height="4" fill={lit} opacity="0.7" />)}
        </g>
      ))}
    </svg>
  );
  return (
    <div className={`ld-sky absolute inset-x-0 bottom-[27%] overflow-hidden ${className}`} aria-hidden="true">
      <div className="ld-scroll flex h-full w-max">{one}{one}</div>
    </div>
  );
}

/** A stylised side-on sports car with spinning wheels, headlight beam and tail light. */
function Car() {
  return (
    <svg viewBox="0 0 300 110" className="ld-car-svg block w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="ld-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d8bff" />
          <stop offset="0.55" stopColor="#1f5fd1" />
          <stop offset="1" stopColor="#0d2a66" />
        </linearGradient>
        <linearGradient id="ld-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#bcd8ff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#bcd8ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="150" cy="104" rx="132" ry="5" fill="#000" opacity="0.55" />
      <path className="ld-beam" d="M290 74 L520 26 L520 122 Z" fill="url(#ld-beam)" />
      <path d="M12 87 C10 77 16 71 32 67 L72 61 C90 46 114 38 142 37 L170 38 C194 40 214 50 230 62 L270 66 C282 68 290 74 290 83 L290 89 L12 89 Z" fill="url(#ld-body)" />
      <path d="M18 66 L8 60 L40 58 L44 62 Z" fill="#0d2a66" />
      <path d="M102 60 C114 49 128 43 144 42 L170 43 C186 45 200 52 212 60 Z" fill="#0a1830" />
      <path d="M110 57 C118 49 130 45 144 44" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M26 72 L268 74" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.5" />
      <path d="M274 70 L290 74 L274 77 Z" fill="#fff" />
      <path d="M14 72 L24 70 L24 77 L14 78 Z" fill="#ff3b4a" />
      <circle cx="70" cy="88" r="23" fill="#070809" />
      <circle cx="232" cy="88" r="23" fill="#070809" />
      {[70, 232].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="88" r="18" fill="#15171c" stroke="#2c3038" strokeWidth="2" />
          <g className="ld-spin" style={{ transformOrigin: `${cx}px 88px` }}>
            <circle cx={cx} cy="88" r="11" fill="#cfd5de" />
            {[0, 72, 144, 216, 288].map((a) => (
              <line key={a} x1={cx} y1="88" x2={cx + 10 * Math.cos((a * Math.PI) / 180)} y2={88 + 10 * Math.sin((a * Math.PI) / 180)} stroke="#6d7482" strokeWidth="2.2" strokeLinecap="round" />
            ))}
            <circle cx={cx} cy="88" r="3" fill="#2f7bff" />
          </g>
        </g>
      ))}
    </svg>
  );
}

/**
 * First-visit intro (once per session): a car drives through a night city while
 * the counter climbs to 100, then it launches off-screen and the curtain lifts.
 * The `has-loader` class is set by an inline script before first paint, so there
 * is no flash and returning visitors never see it. Driven by anime.js.
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
    const safety = window.setTimeout(done, 4800);
    const counter = root.querySelector<HTMLElement>("[data-count]");

    import("animejs")
      .then(({ createTimeline, animate, stagger }) => {
        if (cancelled) return;
        const state = { n: 0 };
        const car = root.querySelector("[data-car]") as Element;
        const tl = createTimeline({ defaults: { ease: "outExpo" } });
        tl.add(root.querySelectorAll("[data-letter]"), { translateY: ["110%", "0%"], opacity: [0, 1], duration: 700, delay: stagger(70) }, 100)
          .add(car, { translateX: ["-60vw", "0vw"], duration: 1100 }, 0)
          .add(state, { n: 100, duration: 1500, ease: "inOutQuad", onUpdate: () => { if (counter) counter.textContent = String(Math.round(state.n)); } }, 150)
          .add(root.querySelector("[data-bar]") as Element, { scaleX: [0, 1], duration: 1500, ease: "inOutQuad" }, 150)
          .add(root.querySelectorAll("[data-streak]"), { opacity: [0, 0.9, 0], scaleX: [0.2, 1], duration: 600, delay: stagger(40) }, 1500)
          .add(car, { translateX: ["0vw", "130vw"], skewX: [0, -14], duration: 750, ease: "inExpo" }, 1650);

        tl.then(() => {
          if (cancelled) return;
          window.clearTimeout(safety);
          animate(root, { translateY: ["0%", "-100%"], duration: 700, ease: "inOutExpo", onComplete: done });
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
      className="evay-loader fixed inset-0 z-[200] overflow-hidden bg-[#070809] text-white"
      dir="ltr"
      aria-hidden="true"
    >
      {/* sky glow + stars */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_72%,rgba(47,123,255,0.22),transparent_70%)]" />
      <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(1px_1px_at_20%_18%,#fff,transparent),radial-gradient(1px_1px_at_70%_12%,#fff,transparent),radial-gradient(1.5px_1.5px_at_44%_28%,#bcd8ff,transparent),radial-gradient(1px_1px_at_88%_32%,#fff,transparent),radial-gradient(1px_1px_at_8%_40%,#fff,transparent)]" />

      <Skyline seed={11} min={46} max={104} fill="#0d1220" lit="#ffd98a" className="h-[26vh] opacity-80 [--ld-speed:38s]" />
      <Skyline seed={29} min={30} max={70} fill="#080b14" lit="#8ab8ff" className="h-[20vh] [--ld-speed:20s]" />

      {/* wordmark */}
      <div className="absolute inset-x-0 top-[13%] flex flex-col items-center">
        <p className="keep-tracking flex overflow-hidden font-display text-[clamp(2rem,8vw,4.4rem)] font-bold tracking-[0.34em]">
          {C.brand.name.split("").map((l, i) => (
            <span key={i} data-letter className="inline-block">{l}</span>
          ))}
        </p>
      </div>

      {/* road */}
      <div className="absolute inset-x-0 bottom-0 h-[27%] bg-gradient-to-b from-[#12151d] to-[#05060a]">
        <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
        <div className="ld-road absolute inset-x-0 top-[46%] h-[3px]" />
        <div className="absolute inset-x-0 bottom-[14%] h-px bg-white/10" />
      </div>

      {/* car */}
      <div data-car className="absolute bottom-[calc(27%-6px)] start-1/2 w-[clamp(190px,44vw,360px)] -translate-x-1/2 will-change-transform">
        <div className="ld-bounce relative">
          <Car />
          {[0, 1, 2, 3].map((i) => (
            <span key={i} data-streak className="absolute end-[96%] h-[2px] w-[60vw] origin-right bg-gradient-to-l from-[#7db4ff] to-transparent opacity-0" style={{ top: `${28 + i * 18}%` }} />
          ))}
        </div>
      </div>

      {/* progress */}
      <div className="absolute inset-x-0 bottom-[6%] flex flex-col items-center gap-3">
        <p className="numeral font-display text-[clamp(1.6rem,5vw,2.6rem)] font-semibold leading-none tabular-nums">
          <span data-count>0</span><span className="text-[#4da3ff]">%</span>
        </p>
        <span className="h-px w-[min(60vw,18rem)] overflow-hidden bg-white/15">
          <span data-bar className="block h-full origin-left bg-[#4da3ff]" style={{ transform: "scaleX(0)" }} />
        </span>
      </div>
    </div>
  );
}
