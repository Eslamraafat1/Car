"use client";

import { useState } from "react";
import { BatteryCharging, RotateCcw, Zap } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { FinaleActions, FinaleBody, FinaleEyebrow, FinaleShell, FinaleTitle, useHold } from "./finale-kit";

const CELLS = 40;

function localizeDigits(value: string, arabic: boolean) {
  if (!arabic) return value;
  return value.replace(/\d/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[Number(digit)]);
}

/** Electric — the finale is a battery: hold the pad until the pack reads 100%. */
export default function ChargeFinale({ accent = "#6fe7df" }: { accent?: string }) {
  const { t, lang } = useLang();
  const reduced = usePrefersReducedMotion();
  const [charges, setCharges] = useState(0);

  const hold = useHold({
    duration: 4200,
    decay: false,
    onComplete: () => setCharges((count) => count + 1),
  });

  const percent = Math.round(hold.progress * 100);
  const full = hold.progress >= 1;
  const status = full
    ? t(C.finale.electric.full)
    : hold.holding
      ? t(C.finale.electric.charging)
      : t(C.finale.electric.hint);

  return (
    <FinaleShell page="electric" accent={accent} ghost="VOLT">
      {/* Ambient charge bloom that rises with the pack */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: 0.25 + hold.progress * 0.75,
          background: `radial-gradient(70% 60% at 50% 62%, ${accent}33, transparent 72%)`,
        }}
        aria-hidden="true"
      />

      <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <FinaleEyebrow>{t(C.finale.electric.eyebrow)}</FinaleEyebrow>
          <FinaleTitle>{t(C.finale.electric.title)}</FinaleTitle>
          <FinaleBody>{t(C.finalCta.body)}</FinaleBody>
          <FinaleActions />
        </div>

        <div className="lg:col-span-6">
          <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.03] p-6 backdrop-blur-md sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="numeral text-[0.66rem] tracking-[0.26em] text-white/55">
                AURELIS / PACK 100kWh
              </span>
              <span
                className={`numeral rounded-full border px-3 py-1 text-[0.62rem] tracking-[0.18em] transition-colors duration-500 ${
                  full ? "border-volt/60 text-volt" : "border-white/20 text-white/60"
                }`}
              >
                {status}
              </span>
            </div>

            <div className="mt-6 flex items-end justify-between gap-4">
              <p
                className="numeral h-stat font-semibold leading-none text-fog"
                style={{ textShadow: full ? `0 0 34px ${accent}80` : "none" }}
              >
                {localizeDigits(String(percent), lang === "ar")}
                <span className="ms-1 text-[0.32em] tracking-[0.1em]" style={{ color: accent }}>
                  %
                </span>
              </p>
              <BatteryCharging
                className="size-10 transition-all duration-500"
                style={{
                  color: accent,
                  transform: hold.holding && !reduced ? "scale(1.08)" : "none",
                  filter: `drop-shadow(0 0 12px ${accent}99)`,
                }}
                strokeWidth={1.4}
                aria-hidden="true"
              />
            </div>

            {/* The pack: 40 cells filling left → right */}
            <div className="mt-6 flex h-16 items-stretch gap-[3px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-1.5" aria-hidden="true">
              {Array.from({ length: CELLS }).map((_, index) => {
                const lit = hold.progress * CELLS > index;
                return (
                  <span
                    key={index}
                    className="relative flex-1 overflow-hidden rounded-[4px] transition-colors duration-150"
                    style={{
                      backgroundColor: lit ? accent : "rgba(255,255,255,.06)",
                      boxShadow: lit ? `0 0 10px ${accent}55` : "none",
                    }}
                  >
                    {lit && !reduced && hold.holding && (
                      <span className="charge-flow absolute inset-0" aria-hidden="true" />
                    )}
                  </span>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                {...hold.bind}
                aria-label={`${t(C.finale.electric.hint)}`}
                className="group inline-flex min-h-12 touch-none select-none items-center justify-center gap-2 rounded-full px-7 text-[0.88rem] font-semibold text-ink transition-transform duration-300 hover:scale-[1.02]"
                style={{ backgroundColor: accent }}
              >
                <Zap
                  className="size-4 transition-transform duration-300 group-active:scale-90"
                  aria-hidden="true"
                />
                {hold.holding ? t(C.finale.electric.charging) : t(C.finale.electric.hint)}
              </button>

              {full && (
                <button
                  type="button"
                  onClick={() => {
                    hold.reset();
                    setCharges(0);
                  }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-[0.78rem] text-white/75 transition-colors duration-300 hover:border-white/60 hover:text-white"
                >
                  <RotateCcw className="size-3.5" aria-hidden="true" />
                  {t(C.finale.electric.reset)}
                </button>
              )}
            </div>

            {/* Range readout, lit at full charge */}
            <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
              {C.future.stats.map((stat, index) => (
                <div
                  key={stat.label.en}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-3 transition-all duration-500"
                  style={{
                    opacity: full ? 1 : 0.3,
                    transform: full ? "none" : "translateY(8px)",
                    transitionDelay: `${reduced ? 0 : index * 120}ms`,
                    borderColor: full ? `${accent}55` : "rgba(255,255,255,.1)",
                  }}
                >
                  <dt className="text-[0.66rem] leading-snug text-white/55">{t(stat.label)}</dt>
                  <dd className="numeral mt-1 text-xl font-semibold text-fog sm:text-2xl">
                    {localizeDigits(stat.value, lang === "ar")}
                    <span className="ms-1 text-[0.6rem] font-normal" style={{ color: accent }}>
                      {t(stat.unit)}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-4 text-[0.68rem] text-dim">
              {full
                ? t(C.finale.electric.rangeNote)
                : t({ ar: "أمسك الزر… الشحن بيمشي لوحده بعد كده.", en: "Hold the pad — the pack keeps charging after that." })}
            </p>

            {full && !reduced && (
              <span
                key={charges}
                className="finale-flash pointer-events-none absolute inset-0"
                style={{ background: `linear-gradient(120deg, transparent, ${accent}55, transparent)` }}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>
    </FinaleShell>
  );
}
