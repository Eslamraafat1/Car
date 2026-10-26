"use client";

import PageHeader from "@/components/automotive/PageHeader";
import VehicleCollection from "@/components/automotive/VehicleCollection";
import FinalCTA from "@/components/automotive/FinalCTA";
import ShowcaseSections from "@/components/automotive/ShowcaseSections";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { VEHICLES } from "@/lib/vehicles";

const SPORTS = VEHICLES.filter((vehicle) => vehicle.category === "sports");

function localizeDigits(value: string, arabic: boolean) {
  if (!arabic) return value;
  return value.replace(/\d/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[Number(digit)]);
}

export default function PerformanceView() {
  const { t, lang } = useLang();

  return (
    <>
      <PageHeader
        eyebrow={C.pages.performance.eyebrow}
        title={C.pages.performance.title}
        body={C.pages.performance.body}
      />

      <section className="performance-specbar cinema relative isolate overflow-hidden border-b border-line bg-ink py-16 lg:py-24" aria-label={t(C.performance.scene)}>
        <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(120deg, transparent 0 52px, rgba(255,104,72,.08) 53px, transparent 54px)" }} aria-hidden="true" />
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="mb-7 flex items-center justify-between border-b border-white/15 pb-4">
            <p className="eyebrow text-[#ff6848]">{t(C.performance.scene)}</p>
            <span className="numeral text-[0.65rem] tracking-[0.2em] text-white/45">TRACK / DATA</span>
          </div>
          <ul className="relative grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-4">
            {C.performance.stats.map((stat) => (
              <li key={stat.label.en} className="relative min-h-32 bg-[#0b0909] p-4 pt-5 transition-colors duration-500 hover:bg-[#1a100e] sm:p-6">
                <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6848]/70 to-transparent" aria-hidden="true" />
                <div className="flex items-baseline gap-2">
                  <span className="numeral h-stat font-semibold text-fog">
                    {localizeDigits(stat.value, lang === "ar")}
                  </span>
                  <span className="text-[0.8rem] tracking-wider text-[#ff6848]">{t(stat.unit)}</span>
                </div>
                <p className="mt-2 text-[0.82rem] text-mist">{t(stat.label)}</p>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-2xl border-s-2 border-[#ff6848]/70 ps-3 text-[0.75rem] leading-relaxed text-dim">
            {t(C.performance.disclaimer)}
          </p>
        </div>
      </section>

      <VehicleCollection
        vehicles={SPORTS}
      variant="performance"
        withHeader={false}
        withFilters={false}
        title={C.pages.performance.listTitle}
      />
      <ShowcaseSections page="performance" />
      <FinalCTA />
    </>
  );
}
