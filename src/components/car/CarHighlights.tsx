"use client";

import { useRef, type CSSProperties } from "react";
import { Armchair, Cpu, Gauge, Layers, Leaf, Mountain, Route, ShieldCheck, Sparkles, Users, Wind, Zap, type LucideIcon } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import type { Vehicle } from "@/lib/vehicles";
import { HIGHLIGHTS, type Highlight } from "@/lib/vehicle-extra";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";

const ICONS: Record<Highlight["icon"], LucideIcon> = { gauge: Gauge, zap: Zap, shield: ShieldCheck, sparkles: Sparkles, leaf: Leaf, mountain: Mountain, wind: Wind, cpu: Cpu, armchair: Armchair, route: Route, layers: Layers, users: Users };

function Card({ h, accent, i }: { h: Highlight; accent: string; i: number }) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement | null>(null);
  const Icon = ICONS[h.icon];
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Reveal delay={i * 0.08} className="h-full">
      <div ref={ref} onPointerMove={onMove} className="group relative h-full overflow-hidden rounded-[24px] hairline bg-ink-2 p-6 transition-all duration-500 hover:-translate-y-1.5 sm:p-7" style={{ "--mx": "50%", "--my": "0%" } as CSSProperties}>
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(300px circle at var(--mx) var(--my), ${accent}2b, transparent 70%)` }} aria-hidden="true" />
        <span className="relative inline-flex size-12 items-center justify-center rounded-2xl text-white transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" style={{ background: accent }}>
          <Icon className="size-5" strokeWidth={1.8} />
        </span>
        <span className="numeral pointer-events-none absolute -end-1 -top-3 font-display text-[6rem] font-black leading-none text-fog/[0.05]" aria-hidden="true">0{i + 1}</span>
        <h3 className="relative mt-6 font-display text-lg font-semibold text-fog">{t(h.title)}</h3>
        <p className="relative mt-2 text-[0.88rem] leading-[1.8] text-mist">{t(h.body)}</p>
      </div>
    </Reveal>
  );
}

/** Car page — four category-specific strengths as spotlight cards. */
export default function CarHighlights({ vehicle }: { vehicle: Vehicle }) {
  const { t } = useLang();
  return (
    <section className="relative bg-ink py-20 lg:py-28" aria-labelledby="why-car-title">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal><p className="eyebrow" style={{ color: vehicle.accent }}>{t(C.carPage.whyEyebrow)}</p></Reveal>
        <KineticHeading id="why-car-title" text={C.carPage.whyTitle} className="display h-section mt-4 text-fog" />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {HIGHLIGHTS[vehicle.category].map((h, i) => <Card key={h.title.en} h={h} accent={vehicle.accent} i={i} />)}
        </div>
      </div>
    </section>
  );
}
