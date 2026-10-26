"use client";

import { useState } from "react";
import { Power, RotateCcw } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import {
  FinaleActions,
  FinaleBody,
  FinaleEyebrow,
  FinaleShell,
  FinaleTitle,
  useHold,
} from "./finale-kit";

const TICKS = 28;
const RING_RADIUS = 88;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/** Home — the finale is a start button: hold it and the whole stage ignites. */
export default function IgnitionFinale({ accent = "#4da3ff" }: { accent?: string }) {
  const { t, lang } = useLang();
  const reduced = usePrefersReducedMotion();
  const [ignitions, setIgnitions] = useState(0);

  const hold = useHold({
    duration: 1500,
    decay: true,
    latch: true,
    onComplete: () => setIgnitions((count) => count + 1),
  });

  const live = hold.fired;
  const status = live
    ? t(C.finale.home.live)
    : hold.holding
      ? t(C.finale.home.spooling)
      : t(C.finale.home.idle);

  return (
    <FinaleShell
      page="home"
      accent={accent}
      ghost="AURELIS"
      image="/media/images/car-warehouse.jpg"
      imageAlt={{
        ar: "سيارة في صالة تخزين بإضاءة سينمائية",
        en: "Car inside a cinematic storage hall",
      }}
    >
      <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <FinaleEyebrow>{t(C.finale.home.eyebrow)}</FinaleEyebrow>
          <FinaleTitle>{t(C.finale.home.title)}</FinaleTitle>
          <FinaleBody>{t(C.finalCta.body)}</FinaleBody>
          <FinaleActions />
          <p className="mt-6 text-[0.78rem] text-dim">{t(C.finale.home.hint)}</p>
        </div>

        <div className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.03] p-7 backdrop-blur-md">
            {!reduced && live && (
              <span
                key={ignitions}
                className="finale-flash pointer-events-none absolute inset-0 bg-white/85"
                aria-hidden="true"
              />
            )}

            <div className="flex items-center justify-between gap-4">
              <span className="numeral text-[0.66rem] tracking-[0.26em] text-white/55">
                AURELIS / IGNITION
              </span>
              <span
                className={`numeral rounded-full border px-3 py-1 text-[0.62rem] tracking-[0.18em] transition-colors duration-500 ${
                  live ? "border-volt/60 text-volt" : "border-white/20 text-white/60"
                }`}
              >
                {status}
              </span>
            </div>

            {/* RPM-style fill bar */}
            <div className="mt-6 flex h-8 items-end gap-[3px]" aria-hidden="true">
              {Array.from({ length: TICKS }).map((_, index) => {
                const lit = hold.progress * TICKS > index;
                const hot = index > TICKS - 6;
                return (
                  <span
                    key={index}
                    className="flex-1 rounded-full transition-[background-color,box-shadow] duration-100"
                    style={{
                      height: `${38 + ((index * 7) % 46)}%`,
                      backgroundColor: lit
                        ? hot
                          ? "#ff6a2b"
                          : accent
                        : "rgba(255,255,255,.12)",
                      boxShadow: lit ? `0 0 10px ${hot ? "#ff6a2b" : accent}66` : "none",
                    }}
                  />
                );
              })}
            </div>

            <div className="mt-7 flex flex-col items-center">
              <button
                type="button"
                onClick={live ? () => { hold.reset(); setIgnitions(0); } : undefined}
                {...(live ? {} : hold.bind)}
                aria-label={live ? t(C.finale.home.reset) : `${t(C.finale.home.hold)} — ${t(C.finale.home.hint)}`}
                className="group relative size-40 touch-none select-none rounded-full outline-offset-8 sm:size-48"
              >
                <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-90" aria-hidden="true">
                  <circle
                    cx="100"
                    cy="100"
                    r={RING_RADIUS}
                    fill="none"
                    stroke="rgba(255,255,255,.14)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r={RING_RADIUS}
                    fill="none"
                    stroke={live ? "#7CFFB2" : accent}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={RING_CIRCUMFERENCE}
                    strokeDashoffset={RING_CIRCUMFERENCE * (1 - hold.progress)}
                    style={{ filter: `drop-shadow(0 0 8px ${accent})` }}
                  />
                </svg>
                <span className="absolute inset-4 rounded-full border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent transition-transform duration-300 group-active:scale-[0.97]" />
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-fog">
                  <Power
                    className={`size-9 transition-all duration-500 ${live ? "scale-110" : "group-hover:scale-105"}`}
                    strokeWidth={1.6}
                    style={{ color: live ? "#7CFFB2" : accent }}
                  />
                  <span className="eyebrow text-[0.6rem] text-white/70">
                    {live ? t(C.finale.home.reset) : t(C.finale.home.hold)}
                  </span>
                </span>
                {live && !reduced && (
                  <span
                    key={`ring-${ignitions}`}
                    className="finale-pulse pointer-events-none absolute inset-0 rounded-full border-2"
                    style={{ borderColor: "#7CFFB2" }}
                    aria-hidden="true"
                  />
                )}
              </button>

              <p className="mt-5 min-h-5 text-center text-[0.76rem] text-dim">
                {live ? t(C.finale.home.hint) : status}
              </p>
              {live && (
                <button
                  type="button"
                  onClick={() => {
                    hold.reset();
                    setIgnitions(0);
                  }}
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[0.72rem] text-white/70 transition-colors duration-300 hover:border-white/60 hover:text-white"
                >
                  <RotateCcw className="size-3.5" aria-hidden="true" />
                  {t(C.finale.home.reset)}
                </button>
              )}
            </div>

            {/* Live systems readout */}
            <ul className="mt-7 grid gap-2 border-t border-white/10 pt-5">
              {C.finale.home.status.map((label, index) => {
                const revealed = live;
                return (
                  <li
                    key={label.en}
                    className="flex items-center justify-between gap-3 text-[0.72rem] transition-all duration-500"
                    style={{
                      opacity: revealed ? 1 : 0.35,
                      transform: revealed ? "none" : "translateY(6px)",
                      transitionDelay: `${reduced ? 0 : index * 110}ms`,
                    }}
                  >
                    <span className="tracking-wide text-white/60">{t(label)}</span>
                    <span className="flex items-center gap-2">
                      <span className="numeral text-white/85">OK</span>
                      <span
                        className="size-1.5 rounded-full"
                        style={{
                          backgroundColor: revealed ? "#7CFFB2" : "rgba(255,255,255,.25)",
                          boxShadow: revealed ? "0 0 10px rgba(124,255,178,.8)" : "none",
                        }}
                      />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="mt-4 text-center text-[0.68rem] text-dim lg:text-end">
            {lang === "ar"
              ? "أرقام توضيحية للعرض فقط."
              : "Illustrative readouts for presentation only."}
          </p>
        </div>
      </div>
    </FinaleShell>
  );
}
