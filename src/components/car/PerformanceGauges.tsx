"use client";

import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { useCountUp, useInView } from "@/lib/showcase-hooks";
import type { Vehicle } from "@/lib/vehicles";
import { perfOf } from "@/lib/vehicle-extra";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";

const ARC = 251.3; // length of the half-circle path below

/** A half-circle dial: the arc fills and the needle sweeps once it scrolls into view. */
function Gauge({ pct, value, decimals = 0, unit, label, accent, delay }: { pct: number; value: number; decimals?: number; unit: string; label: string; accent: string; delay: number }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const shown = useCountUp(value, seen, 1900);
  const p = Math.max(0.02, Math.min(1, pct));
  return (
    <div ref={ref} className="group relative rounded-[28px] hairline bg-ink-2 p-5 sm:p-7">
      <svg viewBox="0 0 200 122" className="mx-auto block w-full max-w-[22rem]" role="img" aria-label={`${label}: ${value}`}>
        <defs>
          <linearGradient id={`g-${label}`} x1="0" x2="1">
            <stop offset="0" stopColor={accent} stopOpacity="0.35" />
            <stop offset="1" stopColor={accent} />
          </linearGradient>
        </defs>
        {/* ticks */}
        {Array.from({ length: 21 }, (_, i) => {
          const a = Math.PI - (i / 20) * Math.PI;
          const r1 = 92, r2 = i % 5 === 0 ? 84 : 88;
          return <line key={i} x1={100 + r1 * Math.cos(a)} y1={104 - r1 * Math.sin(a)} x2={100 + r2 * Math.cos(a)} y2={104 - r2 * Math.sin(a)} stroke="var(--c-fog)" strokeOpacity={i % 5 === 0 ? 0.5 : 0.22} strokeWidth="1.2" />;
        })}
        <path d="M20 104 A80 80 0 0 1 180 104" fill="none" stroke="var(--c-line)" strokeWidth="9" strokeLinecap="round" />
        <path
          d="M20 104 A80 80 0 0 1 180 104"
          fill="none"
          stroke={`url(#g-${label})`}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={ARC}
          strokeDashoffset={seen ? ARC * (1 - p) : ARC}
          style={{ transition: `stroke-dashoffset 1.9s cubic-bezier(.2,.8,.1,1) ${delay}s` }}
        />
        {/* needle */}
        <g style={{ transformOrigin: "100px 104px", transform: `rotate(${seen ? -90 + p * 180 : -90}deg)`, transition: `transform 1.9s cubic-bezier(.2,.8,.1,1) ${delay}s` }}>
          <line x1="100" y1="104" x2="100" y2="34" stroke="var(--c-fog)" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="100" cy="104" r="6" fill="var(--c-fog)" />
          <circle cx="100" cy="104" r="2.4" fill={accent} />
        </g>
      </svg>
      <div className="-mt-3 text-center">
        <p className="numeral font-display text-[clamp(2.4rem,7vw,3.6rem)] font-bold leading-none text-fog" dir="ltr">
          {shown.toFixed(decimals)}
          <span className="ms-1.5 text-[0.4em] font-semibold text-mist">{unit}</span>
        </p>
        <p className="mt-2 text-[0.82rem] text-mist">{label}</p>
      </div>
    </div>
  );
}

/** Car page — three dials for power, acceleration and top speed (plus range when electric). */
export default function PerformanceGauges({ vehicle }: { vehicle: Vehicle }) {
  const { t } = useLang();
  const perf = perfOf(vehicle);
  const gauges = [
    { pct: perf.hp / 1100, value: perf.hp, decimals: 0, unit: t(C.carPage.hpUnit), label: t(C.carPage.hp) },
    { pct: 1 - (perf.accel - 1.5) / 6.5, value: perf.accel, decimals: 1, unit: t(C.carPage.accelUnit), label: t(C.carPage.accel) },
    { pct: perf.top / 400, value: perf.top, decimals: 0, unit: t(C.carPage.topUnit), label: t(C.carPage.top) },
    ...(perf.range ? [{ pct: perf.range / 1000, value: perf.range, decimals: 0, unit: t(C.carPage.rangeUnit), label: t(C.carPage.range) }] : []),
  ];

  return (
    <section className="relative overflow-hidden bg-ink py-20 lg:py-32" aria-labelledby="perf-title">
      <div className="pointer-events-none absolute -start-24 top-10 size-[34rem] glow" style={{ ["--glow" as string]: vehicle.accent, ["--glow-a" as string]: "16%" }} aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal><p className="eyebrow" style={{ color: vehicle.accent }}>{t(C.carPage.perfEyebrow)}</p></Reveal>
        <KineticHeading id="perf-title" text={C.carPage.perfTitle} className="display h-section mt-4 text-fog" />
        <div className={`mt-10 grid gap-4 sm:grid-cols-2 ${gauges.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {gauges.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.1} className="h-full">
              <Gauge {...g} accent={vehicle.accent} delay={i * 0.15} />
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-[0.72rem] text-dim">{t(C.carPage.perfNote)}</p>
      </div>
    </section>
  );
}
