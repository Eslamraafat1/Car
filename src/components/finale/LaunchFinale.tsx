"use client";

import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { FinaleActions, FinaleBody, FinaleEyebrow, FinaleShell, FinaleTitle, useHold } from "./finale-kit";

const CX = 180;
const CY = 186;
const R = 148;
const SWEEP = 120; // degrees each side of vertical
const REDLINE_START = 0.76;
const MAX_RPM = 8500;
const LIGHTS = 8;

function polar(radius: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + radius * Math.sin(rad), y: CY - radius * Math.cos(rad) };
}

function arcPath(radius: number, from: number, to: number) {
  const start = polar(radius, from);
  const end = polar(radius, to);
  const largeArc = Math.abs(to - from) > 180 ? 1 : 0;
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

function localizeDigits(value: string, arabic: boolean) {
  if (!arabic) return value;
  return value.replace(/\d/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[Number(digit)]);
}

function useCountUp(target: number, decimals: number, run: boolean) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run || reduced) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1100;
    const loop = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [run, target, reduced]);

  const shown = !run ? 0 : reduced ? target : value;
  return decimals > 0 ? shown.toFixed(decimals) : String(Math.round(shown));
}

function TelemetryStat({ value, unit, label, run }: { value: string; unit: { ar: string; en: string }; label: { ar: string; en: string }; run: boolean }) {
  const { t, lang } = useLang();
  const decimals = value.includes(".") ? value.split(".")[1].length : 0;
  const counted = useCountUp(Number(value), decimals, run);

  return (
    <li className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6848]/70 to-transparent" aria-hidden="true" />
      <p className="flex items-baseline gap-1.5">
        <span className="numeral text-2xl font-semibold text-fog sm:text-3xl">
          {localizeDigits(counted, lang === "ar")}
        </span>
        <span className="text-[0.66rem] text-[#ff6848]">{t(unit)}</span>
      </p>
      <p className="mt-1.5 text-[0.72rem] leading-snug text-white/60">{t(label)}</p>
    </li>
  );
}

/** Performance — the finale is launch control: hold the rev pad to the redline. */
export default function LaunchFinale({ accent = "#ff6848" }: { accent?: string }) {
  const { t, lang } = useLang();
  const reduced = usePrefersReducedMotion();
  const [launches, setLaunches] = useState(0);

  const hold = useHold({
    duration: 2600,
    decay: true,
    onComplete: () => setLaunches((count) => count + 1),
  });

  const armed = hold.fired;
  const rpm = Math.round(hold.progress * MAX_RPM);
  const needle = -SWEEP + hold.progress * SWEEP * 2;

  return (
    <FinaleShell
      page="performance"
      accent={accent}
      ghost="REDLINE"
      image="/media/images/performance-car.jpg"
      imageAlt={{ ar: "سيارة رياضية عالية الأداء", en: "A high performance sports car" }}
      imageClassName="opacity-70 saturate-[1.1] contrast-[1.1]"
    >
      <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <FinaleEyebrow>{t(C.finale.performance.eyebrow)}</FinaleEyebrow>
          <FinaleTitle>{t(C.finale.performance.title)}</FinaleTitle>
          <FinaleBody>{t(C.finale.performance.hint)}</FinaleBody>
          <FinaleActions />

          {armed && (
            <div className="mt-9 rounded-[24px] border border-white/12 bg-black/50 p-5 backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="eyebrow text-[#ff6848]">{t(C.finale.performance.telemetry)}</span>
                <span className="numeral rounded-full border border-[#ff6848]/50 px-3 py-1 text-[0.6rem] tracking-[0.18em] text-[#ff6848]">
                  {t(C.finale.performance.armed)}
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {C.performance.stats.map((stat) => (
                  <TelemetryStat
                    key={stat.label.en}
                    value={stat.value}
                    unit={stat.unit}
                    label={stat.label}
                    run={armed}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="lg:col-span-6">
          <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[28px] border border-white/12 bg-black/55 p-6 backdrop-blur-md sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="numeral text-[0.66rem] tracking-[0.26em] text-white/55">
                AURELIS / LAUNCH CONTROL
              </span>
              <span
                className={`numeral rounded-full border px-3 py-1 text-[0.62rem] tracking-[0.18em] transition-colors duration-300 ${
                  armed ? "border-[#ff6848]/60 text-[#ff6848]" : "border-white/20 text-white/60"
                }`}
              >
                {armed ? t(C.finale.performance.redline) : t(C.finale.performance.ready)}
              </span>
            </div>

            {/* Shift lights */}
            <div className="mt-6 flex items-center justify-center gap-2 sm:gap-2.5" aria-hidden="true">
              {Array.from({ length: LIGHTS }).map((_, index) => {
                const lit = hold.progress * LIGHTS >= index + 1;
                const ratio = index / (LIGHTS - 1);
                const color = ratio > 0.82 ? "#ff3b2f" : ratio > 0.55 ? "#ffb05f" : "#6fe7df";
                return (
                  <span
                    key={index}
                    className="h-2.5 flex-1 rounded-full transition-all duration-100 sm:h-3"
                    style={{
                      backgroundColor: lit ? color : "rgba(255,255,255,.12)",
                      boxShadow: lit ? `0 0 14px ${color}` : "none",
                    }}
                  />
                );
              })}
            </div>

            <div className="relative mt-4">
              <svg viewBox="0 0 360 220" className="w-full" role="img" aria-label={`${t(C.finale.performance.title)} — ${rpm} RPM`}>
                <path d={arcPath(R, -SWEEP, SWEEP)} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="3" strokeLinecap="round" />
                <path
                  d={arcPath(R, SWEEP * REDLINE_START, SWEEP)}
                  fill="none"
                  stroke="#ff3b2f"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.9"
                />
                <path
                  d={arcPath(R, -SWEEP, needle)}
                  fill="none"
                  stroke={armed ? "#ff3b2f" : accent}
                  strokeWidth="5"
                  strokeLinecap="round"
                  style={{ filter: `drop-shadow(0 0 10px ${armed ? "#ff3b2f" : accent})` }}
                />

                {Array.from({ length: 25 }).map((_, index) => {
                  const deg = -SWEEP + (index / 24) * SWEEP * 2;
                  const major = index % 3 === 0;
                  const inRed = deg >= SWEEP * REDLINE_START;
                  const outer = polar(R - 12, deg);
                  const inner = polar(R - (major ? 30 : 22), deg);
                  return (
                    <line
                      key={index}
                      x1={outer.x}
                      y1={outer.y}
                      x2={inner.x}
                      y2={inner.y}
                      stroke={inRed ? "#ff3b2f" : "rgba(255,255,255,.5)"}
                      strokeWidth={major ? 2.4 : 1.2}
                    />
                  );
                })}

                {Array.from({ length: 9 }).map((_, index) => {
                  const deg = -SWEEP + (index / 8) * SWEEP * 2;
                  const pos = polar(R - 48, deg);
                  return (
                    <text
                      key={index}
                      x={pos.x}
                      y={pos.y + 6}
                      textAnchor="middle"
                      className="numeral"
                      fill="rgba(255,255,255,.55)"
                      fontSize="15"
                    >
                      {index}
                    </text>
                  );
                })}

                <line
                  x1={CX}
                  y1={CY}
                  x2={polar(R - 34, needle).x}
                  y2={polar(R - 34, needle).y}
                  stroke={armed ? "#ff3b2f" : accent}
                  strokeWidth="4"
                  strokeLinecap="round"
                  style={{
                    filter: `drop-shadow(0 0 8px ${armed ? "#ff3b2f" : accent})`,
                    transition: hold.holding ? "none" : "all .45s cubic-bezier(.22,.61,.36,1)",
                  }}
                />
                <circle cx={CX} cy={CY} r="12" fill="#0b0c0e" stroke="rgba(255,255,255,.35)" strokeWidth="2" />
                <circle cx={CX} cy={CY} r="4" fill={accent} />
              </svg>

              <div className="pointer-events-none absolute inset-x-0 bottom-1 text-center">
                <p className="numeral text-[clamp(2rem,6vw,3.2rem)] font-semibold leading-none text-fog">
                  {localizeDigits(String(rpm), lang === "ar")}
                </p>
                <p className="eyebrow mt-1 text-[0.6rem] text-white/50">RPM</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
              <button
                type="button"
                {...hold.bind}
                aria-label={t(C.finale.performance.hint)}
                className="group relative inline-flex min-h-12 w-full touch-none select-none items-center justify-center gap-2 rounded-full px-7 text-[0.88rem] font-semibold text-ink transition-transform duration-300 hover:scale-[1.02] sm:w-auto"
                style={{ backgroundColor: armed ? "#ff3b2f" : accent }}
              >
                {armed ? t(C.finale.performance.reset) : t(C.finale.performance.revving)}
              </button>
              {armed && (
                <button
                  type="button"
                  onClick={() => {
                    hold.reset();
                    setLaunches(0);
                  }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-[0.78rem] text-white/75 transition-colors duration-300 hover:border-white/60 hover:text-white"
                >
                  <RotateCcw className="size-3.5" aria-hidden="true" />
                  {t(C.finale.performance.reset)}
                </button>
              )}
            </div>

            <p className="mt-4 text-[0.68rem] leading-relaxed text-dim">{t(C.performance.disclaimer)}</p>

            {armed && !reduced && (
              <span
                key={launches}
                className="finale-flash pointer-events-none absolute inset-0 bg-[#ff6848]/30"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>
    </FinaleShell>
  );
}
