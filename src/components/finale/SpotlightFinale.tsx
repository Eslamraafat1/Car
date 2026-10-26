"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ScanSearch } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import type { Vehicle } from "@/lib/vehicles";
import { FinaleActions, FinaleBody, FinaleEyebrow, FinaleShell, FinaleTitle } from "./finale-kit";

/**
 * Car detail — the finale is a spotlight: the machine sits in darkness until
 * your pointer carries the light across the frame.
 */
export default function SpotlightFinale({ vehicle }: { vehicle: Vehicle }) {
  const { t } = useLang();
  const reduced = usePrefersReducedMotion();
  const frameRef = useRef<HTMLDivElement | null>(null);
  const hoveringRef = useRef(false);
  const [hovering, setHovering] = useState(false);
  const accent = vehicle.accent;

  const setLight = (x: number, y: number) => {
    const el = frameRef.current;
    if (!el) return;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  // Idle drift: a slow lissajous sweep so the frame stays alive untouched.
  useEffect(() => {
    if (reduced || hovering) return;
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      if (hoveringRef.current) return;
      const seconds = (now - start) / 1000;
      setLight(50 + 27 * Math.sin(seconds * 0.42), 44 + 12 * Math.cos(seconds * 0.31));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced, hovering]);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setLight(
      ((event.clientX - rect.left) / rect.width) * 100,
      ((event.clientY - rect.top) / rect.height) * 100,
    );
  };

  return (
    <FinaleShell page="car" accent={accent} ghost={vehicle.brand.toUpperCase()}>
      <div className="grid w-full items-end gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <FinaleEyebrow>{t(C.finale.car.eyebrow)}</FinaleEyebrow>
          <FinaleTitle>{t(C.finale.car.title)}</FinaleTitle>
          <FinaleBody>{t(C.finale.car.hint)}</FinaleBody>
          <FinaleActions />
          <p className="mt-6 text-[0.78rem] text-dim">
            {t({ ar: "الموديل ده تجريبي للعرض — مش مخزون متاح.", en: "This machine is a demo listing — not available inventory." })}
          </p>
        </div>

        <div className="lg:col-span-7">
          <div
            ref={frameRef}
            onPointerMove={onPointerMove}
            onPointerEnter={() => {
              hoveringRef.current = true;
              setHovering(true);
            }}
            onPointerLeave={() => {
              hoveringRef.current = false;
              setHovering(false);
            }}
            style={{ "--mx": "50%", "--my": "42%" } as React.CSSProperties & Record<`--${string}`, string>}
            className="spotlight-frame relative aspect-[4/3] w-full cursor-crosshair overflow-hidden rounded-[26px] border border-white/12 sm:aspect-[16/10]"
          >
            {/* darkened base */}
            <Image
              src={vehicle.image}
              alt={t(vehicle.alt)}
              fill
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover brightness-[0.28] saturate-[0.6]"
              loading="lazy"
            />
            {/* lit copy, masked to the light */}
            <div
              className="absolute inset-0"
              style={{
                maskImage: "radial-gradient(circle at var(--mx) var(--my), black 0%, black 16%, transparent 42%)",
                WebkitMaskImage: "radial-gradient(circle at var(--mx) var(--my), black 0%, black 16%, transparent 42%)",
              }}
              aria-hidden="true"
            >
              <Image
                src={vehicle.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover"
                loading="lazy"
              />
            </div>

            {/* accent haze around the beam */}
            <div
              className="pointer-events-none absolute inset-0 mix-blend-screen"
              style={{
                background: `radial-gradient(circle at var(--mx) var(--my), ${accent}40, transparent 44%)`,
              }}
              aria-hidden="true"
            />

            {/* the lamp itself */}
            <div
              className="pointer-events-none absolute size-44 -translate-x-1/2 -translate-y-1/2 sm:size-56"
              style={{ left: "var(--mx)", top: "var(--my)" }}
              aria-hidden="true"
            >
              <span
                className="absolute inset-0 rounded-full border transition-colors duration-300"
                style={{ borderColor: `${accent}66` }}
              />
              <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2" style={{ backgroundColor: accent }} />
              <span className="absolute left-1/2 bottom-0 h-3 w-px -translate-x-1/2" style={{ backgroundColor: accent }} />
              <span className="absolute top-1/2 left-0 w-3 h-px -translate-y-1/2" style={{ backgroundColor: accent }} />
              <span className="absolute top-1/2 right-0 w-3 h-px -translate-y-1/2" style={{ backgroundColor: accent }} />
            </div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/45" />
            <div className="pointer-events-none absolute inset-0 grain" />

            {/* caption bar */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
              <div>
                <span className="eyebrow" style={{ color: accent }}>
                  {vehicle.brand}
                </span>
                <p className="mt-2 font-display text-[clamp(1.6rem,4vw,2.8rem)] font-bold leading-none text-white">
                  {vehicle.model}
                </p>
                <p className="numeral mt-2 text-[0.72rem] tracking-[0.2em] text-white/60">
                  {vehicle.year} · {vehicle.price}
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.62rem] tracking-[0.18em] backdrop-blur-sm transition-colors duration-300 ${
                  hovering ? "text-white/90" : "text-white/60"
                }`}
                style={{ borderColor: hovering ? `${accent}88` : "rgba(255,255,255,.22)", backgroundColor: "rgba(0,0,0,.45)" }}
              >
                <ScanSearch className="size-3.5" aria-hidden="true" />
                {t(C.finale.car.tracking)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </FinaleShell>
  );
}
