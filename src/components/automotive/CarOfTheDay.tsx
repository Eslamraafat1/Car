"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { useInView } from "@/lib/showcase-hooks";
import { CATEGORY_LABELS, VEHICLES } from "@/lib/vehicles";
import { perfOf } from "@/lib/vehicle-extra";
import Reveal from "@/components/ui/Reveal";

const LABEL = { ar: "سيارة اليوم", en: "Car of the day" };
const NOTE = { ar: "تتغيّر كل يوم", en: "A new pick every day" };

/** Index of today's pick (UTC day number), or -1 on the server so markup never mismatches. */
const dayIndex = () => Math.floor(Date.now() / 86_400_000) % VEHICLES.length;

function Bar({ label, pct, value, accent, seen, delay }: { label: string; pct: number; value: string; accent: string; seen: boolean; delay: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-[0.76rem]">
        <span className="text-white/60">{label}</span>
        <span className="numeral font-display font-semibold text-white" dir="ltr">{value}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full origin-left rounded-full rtl:origin-right"
          style={{ background: accent, transform: `scaleX(${seen ? Math.max(0.04, Math.min(1, pct)) : 0})`, transition: `transform 1.4s cubic-bezier(.2,.8,.1,1) ${delay}s` }}
        />
      </div>
    </div>
  );
}

/** Explore — a daily featured car on a card that tilts toward the pointer. */
export default function CarOfTheDay() {
  const { t, lang } = useLang();
  const i = useSyncExternalStore(() => () => {}, dayIndex, () => -1);
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  const v = i >= 0 ? VEHICLES[i] : null;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${(x * 10).toFixed(1)}deg) rotateX(${(-y * 8).toFixed(1)}deg)`;
  };
  const onLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "";
  };

  return (
    <section className="bg-ink py-10 lg:py-14" aria-label={t(LABEL)}>
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} style={{ perspective: "1600px" }}>
            {!v ? <div className="min-h-[26rem]" aria-hidden="true" /> : card(v)}
          </div>
        </Reveal>
      </div>
    </section>
  );

  function card(v: (typeof VEHICLES)[number]) {
    const perf = perfOf(v);
    return (
            <div ref={tiltRef} className="relative grid overflow-hidden rounded-[32px] bg-[#070809] text-white shadow-[0_40px_90px_-40px_rgba(0,0,0,0.55)] transition-transform duration-300 ease-out lg:grid-cols-12" style={{ transformStyle: "preserve-3d" }}>
              <div className="relative aspect-[4/3] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[28rem]">
                <Image src={v.image} alt={t(v.alt)} fill sizes="(min-width: 1024px) 58vw, 100vw" quality={70} className="object-cover transition-transform duration-[1600ms] ease-out hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070809] via-transparent to-transparent lg:bg-gradient-to-r lg:rtl:bg-gradient-to-l" />
                <span className="absolute start-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/50 px-3.5 py-1.5 text-[0.72rem] text-white lg:backdrop-blur-md">
                  <span className="size-1.5 rounded-full" style={{ background: v.accent }} />
                  {t(LABEL)} · {t(NOTE)}
                </span>
              </div>

              <div className="relative flex flex-col justify-center gap-6 p-6 sm:p-9 lg:col-span-5 lg:p-12">
                <div>
                  <p className="eyebrow" style={{ color: v.accent }}>{v.brand} · {t(CATEGORY_LABELS[v.category])}</p>
                  <p className="keep-tracking mt-2 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em]" dir="ltr">{v.model}</p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-white/70">{t(v.tagline)}</p>
                </div>
                <div className="space-y-3.5">
                  <Bar label={t(C.carPage.hp)} pct={perf.hp / 1100} value={`${perf.hp} ${t(C.carPage.hpUnit)}`} accent={v.accent} seen={seen} delay={0.1} />
                  <Bar label={t(C.carPage.accel)} pct={1 - (perf.accel - 1.5) / 6.5} value={`${perf.accel.toFixed(1)}s`} accent={v.accent} seen={seen} delay={0.22} />
                  <Bar label={t(C.carPage.top)} pct={perf.top / 400} value={`${perf.top} ${t(C.carPage.topUnit)}`} accent={v.accent} seen={seen} delay={0.34} />
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-white/15 pt-5">
                  <p className="numeral font-display text-2xl font-semibold" dir="ltr">{v.price}</p>
                  <Link href={`/cars/${v.slug}`} className="shine group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full px-6 text-[0.88rem] font-semibold text-[#070809] transition-transform duration-300 hover:scale-[1.04]" style={{ background: "#fff" }}>
                    {t(C.showcase.view)}
                    <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={2.2} />
                  </Link>
                </div>
              </div>
            </div>
    );
  }
}
