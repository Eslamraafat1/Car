"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { Clock, HeartHandshake, MapPin, ShieldCheck, Tag } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { useCountUp, useInView } from "@/lib/showcase-hooks";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";

type Item = (typeof C.why.items)[number];

function Tile({ className = "", children, delay = 0 }: { className?: string; children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Reveal delay={delay} className={`h-full ${className}`}>
      <div
        ref={ref}
        onPointerMove={onMove}
        className="group relative h-full overflow-hidden rounded-[26px] hairline bg-ink-2 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-volt/50 sm:p-7"
        style={{ "--mx": "50%", "--my": "0%" } as CSSProperties}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(320px circle at var(--mx) var(--my), color-mix(in srgb, var(--c-volt) 18%, transparent), transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative flex h-full flex-col">{children}</div>
      </div>
    </Reveal>
  );
}

function Figure({ item, size = "md" }: { item: Item; size?: "md" | "xl" }) {
  const { t } = useLang();
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const v = useCountUp(item.value, seen, 1800);
  return (
    <div ref={ref}>
      <p className={`numeral font-display font-bold leading-none text-fog ${size === "xl" ? "text-[clamp(4rem,12vw,9rem)]" : "text-[clamp(2.4rem,6vw,4rem)]"}`} dir="ltr">
        {Math.round(v)}
        <span className="text-volt">{item.suffix}</span>
      </p>
      <p className="mt-2 text-[0.82rem] font-medium text-fog sm:text-[0.9rem]">{t(item.label)}</p>
      <p className="mt-1.5 text-[0.8rem] leading-relaxed text-mist">{t(item.body)}</p>
    </div>
  );
}

const find = (key: string) => C.why.items.find((i) => i.key === key)!;

/** Home — a bento grid of reasons, each tile alive in its own way. */
export default function WhyEvay() {
  const { t } = useLang();
  const inspect = find("inspect");
  const [ringRef, ringSeen] = useInView<HTMLDivElement>(0.3);

  return (
    <section className="relative bg-ink py-20 lg:py-32" aria-labelledby="why-title">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal><p className="eyebrow text-volt">{t(C.why.eyebrow)}</p></Reveal>
        <KineticHeading id="why-title" text={C.why.title} className="display h-section mt-4 max-w-3xl text-fog" />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-14 lg:grid-cols-4 lg:grid-rows-3">
          {/* big: inspection ring */}
          <Tile className="col-span-2 lg:row-span-2" delay={0}>
            <div ref={ringRef} className="relative mx-auto mt-2 aspect-square w-[min(60%,16rem)] sm:w-[min(52%,18rem)]">
              <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90" aria-hidden="true">
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--c-line)" strokeWidth="5" />
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--c-volt)" strokeWidth="5" strokeLinecap="round" strokeDasharray="327" strokeDashoffset={ringSeen ? 20 : 327} style={{ transition: "stroke-dashoffset 2.2s cubic-bezier(.2,.8,.1,1)" }} />
                <circle cx="60" cy="60" r="42" fill="none" stroke="var(--c-line)" strokeWidth="1" strokeDasharray="2 5" className="spin-slow origin-center" />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <ShieldCheck className="size-10 text-volt sm:size-14" strokeWidth={1.4} />
              </div>
            </div>
            <div className="mt-auto pt-6"><Figure item={inspect} size="xl" /></div>
          </Tile>

          <Tile delay={0.08}>
            <ShieldCheck className="size-7 text-volt transition-transform duration-500 group-hover:scale-110" strokeWidth={1.6} />
            <div className="mt-auto pt-6"><Figure item={find("warranty")} /></div>
          </Tile>

          <Tile delay={0.14}>
            <span className="relative inline-flex size-7 items-center justify-center text-volt">
              <Clock className="size-7" strokeWidth={1.6} />
              <span className="spin-slow absolute inset-0 origin-center [animation-duration:6s]"><span className="absolute left-1/2 top-[10%] h-[34%] w-px -translate-x-1/2 bg-volt" /></span>
            </span>
            <div className="mt-auto pt-6"><Figure item={find("response")} /></div>
          </Tile>

          <Tile delay={0.2}>
            <Tag className="size-7 text-volt transition-transform duration-500 group-hover:-rotate-12" strokeWidth={1.6} />
            <div className="mt-auto pt-6"><Figure item={find("pricing")} /></div>
          </Tile>

          <Tile delay={0.26}>
            <span className="relative inline-flex size-7 text-volt">
              <MapPin className="size-7" strokeWidth={1.6} />
              <span className="absolute -inset-2 animate-ping rounded-full border border-volt/40" />
            </span>
            <div className="mt-auto pt-6"><Figure item={find("cities")} /></div>
          </Tile>

          <Tile className="col-span-2 lg:col-span-4" delay={0.1}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <HeartHandshake className="size-9 shrink-0 text-volt transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                <Figure item={find("care")} />
              </div>
              <ul className="flex flex-wrap gap-2" aria-hidden="true">
                {[{ ar: "صيانة دورية", en: "Regular servicing" }, { ar: "ضمان ممتد", en: "Extended warranty" }, { ar: "استبدال سريع", en: "Fast replacement" }, { ar: "دعم الطوارئ", en: "Roadside help" }].map((c, i) => (
                  <li key={c.en} className="rounded-full border border-line px-4 py-2 text-[0.8rem] text-mist transition-all duration-500 hover:border-volt hover:text-fog" style={{ transitionDelay: `${i * 40}ms` }}>{t(c)}</li>
                ))}
              </ul>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}
