"use client";

import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import type { Vehicle } from "@/lib/vehicles";
import { perfOf } from "@/lib/vehicle-extra";
import VelocityMarquee from "@/components/ui/VelocityMarquee";

/** Car page — a belt of giant outlined/filled figures that races with the scroll. */
export default function SpecBand({ vehicle }: { vehicle: Vehicle }) {
  const { t } = useLang();
  const perf = perfOf(vehicle);
  const items = [
    `${vehicle.brand} ${vehicle.model}`,
    `${perf.hp} ${t(C.carPage.hpUnit)}`,
    `0–100 · ${perf.accel.toFixed(1)}s`,
    `${perf.top} ${t(C.carPage.topUnit)}`,
    ...(perf.range ? [`${perf.range} ${t(C.carPage.rangeUnit)}`] : []),
    String(vehicle.year),
  ];
  return (
    <div className="overflow-hidden border-y border-line bg-ink py-5 sm:py-8" aria-hidden="true">
      <VelocityMarquee duration={48}>
        <ul className="flex items-center">
          {items.map((txt, i) => (
            <li key={txt} className="flex items-center">
              <span
                className={`font-display text-[clamp(2.4rem,7vw,5.5rem)] font-bold uppercase leading-none ${i % 2 ? "text-fog" : "text-transparent"}`}
                style={i % 2 ? undefined : { WebkitTextStroke: "1.5px var(--c-fog)" }}
                dir="ltr"
              >
                {txt}
              </span>
              <span className="mx-6 size-3 shrink-0 rotate-45 sm:mx-10 sm:size-4" style={{ background: vehicle.accent }} />
            </li>
          ))}
        </ul>
      </VelocityMarquee>
    </div>
  );
}
