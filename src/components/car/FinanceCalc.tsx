"use client";

import { useState } from "react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import type { Vehicle } from "@/lib/vehicles";
import { priceNumber } from "@/lib/vehicle-extra";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";

const APR = 0.059;
const TERMS = [12, 24, 36, 48, 60];
const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/** Car page — an illustrative monthly-payment estimate with a down-payment slider and term chips. */
export default function FinanceCalc({ vehicle }: { vehicle: Vehicle }) {
  const { t } = useLang();
  const [down, setDown] = useState(20);
  const [term, setTerm] = useState(36);
  const price = priceNumber(vehicle);
  const principal = price * (1 - down / 100);
  const r = APR / 12;
  const monthly = (principal * r * Math.pow(1 + r, term)) / (Math.pow(1 + r, term) - 1);
  const total = monthly * term + price * (down / 100);
  const interest = monthly * term - principal;
  const accent = vehicle.accent;

  return (
    <section className="relative overflow-hidden bg-ink-2 py-20 lg:py-28" aria-labelledby="fin-title">
      <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-5">
          <Reveal><p className="eyebrow" style={{ color: accent }}>{t(C.carPage.finEyebrow)}</p></Reveal>
          <KineticHeading id="fin-title" text={C.carPage.finTitle} className="display h-section mt-4 text-fog" />
          <p className="mt-5 max-w-sm text-[0.8rem] leading-relaxed text-dim">{t(C.carPage.finNote)}</p>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="rounded-[28px] hairline bg-ink p-6 sm:p-9">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="fin-down" className="text-[0.82rem] text-mist">{t(C.carPage.down)}</label>
              <span className="numeral font-display text-lg font-semibold text-fog" dir="ltr">{down}% · {money(price * (down / 100))}</span>
            </div>
            <input
              id="fin-down"
              type="range"
              min={0}
              max={50}
              step={5}
              value={down}
              onChange={(e) => setDown(Number(e.target.value))}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-line"
              style={{ accentColor: accent, background: `linear-gradient(to right, ${accent} ${down * 2}%, var(--c-line) ${down * 2}%)` }}
              dir="ltr"
            />

            <p className="mt-8 text-[0.82rem] text-mist">{t(C.carPage.term)}</p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={t(C.carPage.term)}>
              {TERMS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setTerm(m)}
                  aria-pressed={term === m}
                  className={`numeral h-11 min-w-[4.2rem] rounded-full border px-4 text-[0.85rem] font-medium transition-all duration-300 ${term === m ? "border-transparent text-white" : "border-line text-mist hover:border-fog hover:text-fog"}`}
                  style={term === m ? { background: accent } : undefined}
                >
                  {m} <span className="text-[0.7em] opacity-80">{t(C.carPage.months)}</span>
                </button>
              ))}
            </div>

            <div className="mt-9 grid gap-5 border-t border-line pt-7 sm:grid-cols-5">
              <div className="sm:col-span-3">
                <p className="text-[0.78rem] text-dim">{t(C.carPage.monthly)}</p>
                <p className="numeral mt-1 font-display text-[clamp(2.6rem,8vw,4.4rem)] font-bold leading-none text-fog" dir="ltr" aria-live="polite">
                  {money(monthly)}
                  <span className="ms-1 text-[0.32em] font-medium text-mist">/{lang(t)}</span>
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-4 sm:col-span-2 sm:grid-cols-1">
                <div><dt className="text-[0.72rem] text-dim">{t(C.carPage.total)}</dt><dd className="numeral mt-0.5 font-display text-[1.05rem] font-semibold text-fog" dir="ltr">{money(total)}</dd></div>
                <div><dt className="text-[0.72rem] text-dim">{t(C.carPage.interest)}</dt><dd className="numeral mt-0.5 font-display text-[1.05rem] font-semibold text-fog" dir="ltr">{money(interest)}</dd></div>
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const lang = (t: (v: { ar: string; en: string }) => string) => t({ ar: "شهر", en: "mo" });
