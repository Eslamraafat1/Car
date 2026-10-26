"use client";

import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";
import VelocityMarquee from "@/components/ui/VelocityMarquee";

/** A tiny geometric glyph per partner — temporary stand-ins for real logos. */
function Glyph({ i }: { i: number }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const shapes = [
    <circle key="a" cx="16" cy="16" r="10" {...common} />,
    <path key="b" d="M16 5 28 26H4Z" {...common} />,
    <rect key="c" x="6" y="6" width="20" height="20" rx="5" {...common} />,
    <path key="d" d="M16 4 28 16 16 28 4 16Z" {...common} />,
    <path key="e" d="M6 10h20M6 16h14M6 22h20" {...common} />,
    <g key="f"><circle cx="16" cy="16" r="11" {...common} /><circle cx="16" cy="16" r="4" {...common} /></g>,
    <path key="g" d="M8 24 16 6l8 18M11 18h10" {...common} />,
    <path key="h" d="M6 16h20M16 6v20" {...common} />,
  ];
  return <svg viewBox="0 0 32 32" className="size-7 shrink-0 sm:size-8" aria-hidden="true">{shapes[i % shapes.length]}</svg>;
}

function Logo({ name, i }: { name: string; i: number }) {
  return (
    <li className="group mx-2 flex h-16 w-44 shrink-0 items-center justify-center gap-2.5 rounded-2xl border border-line bg-ink px-4 text-mist transition-all duration-500 hover:-translate-y-1 hover:border-volt/60 hover:text-fog sm:mx-3 sm:h-20 sm:w-56 sm:gap-3">
      <Glyph i={i} />
      <span className="keep-tracking font-display text-[0.85rem] font-bold tracking-[0.2em] sm:text-[0.95rem]">{name}</span>
    </li>
  );
}

export default function Partners() {
  const { t } = useLang();
  const names = C.partners.names;
  const rowA = names.slice(0, 6);
  const rowB = names.slice(6);

  return (
    <section className="relative overflow-hidden bg-ink-2 py-20 lg:py-28" aria-labelledby="partners-title">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal><p className="eyebrow text-volt">{t(C.partners.eyebrow)}</p></Reveal>
            <KineticHeading id="partners-title" text={C.partners.title} className="display h-section mt-4 text-fog" />
          </div>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="text-[0.98rem] leading-relaxed text-mist">{t(C.partners.body)}</p>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-12 space-y-3 sm:space-y-4" aria-label={t(C.partners.title)}>
        <VelocityMarquee duration={46}>
          <ul className="flex items-center">{rowA.map((n, i) => <Logo key={n} name={n} i={i} />)}</ul>
        </VelocityMarquee>
        <VelocityMarquee reverse duration={52}>
          <ul className="flex items-center">{rowB.map((n, i) => <Logo key={n} name={n} i={i + 3} />)}</ul>
        </VelocityMarquee>
        <div className="pointer-events-none absolute inset-y-0 start-0 w-16 bg-gradient-to-r from-ink-2 to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 end-0 w-16 bg-gradient-to-l from-ink-2 to-transparent sm:w-40" />
      </div>
      <p className="mx-auto mt-6 w-full max-w-[1400px] px-4 text-[0.72rem] text-dim sm:px-6 lg:px-10">{t(C.partners.note)}</p>
    </section>
  );
}
