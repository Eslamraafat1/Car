"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/motion";
import KineticHeading from "@/components/ui/KineticHeading";
import { useCountUp, useInView } from "@/lib/showcase-hooks";
import CinematicVideo, { type VideoHandle } from "@/components/automotive/CinematicVideo";

/** A stat tile whose number counts up as it enters the viewport. */
function StatCell({ stat, lang }: { stat: (typeof C.future.stats)[number]; lang: "ar" | "en" }) {
  const { t } = useLang();
  const [ref, inView] = useInView<HTMLLIElement>(0.4);
  const counted = useCountUp(Number(stat.value), inView, 1500);
  const latin = Math.round(counted).toLocaleString("en-US");
  const display = lang === "ar" ? latin.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]) : latin;

  return (
    <li
      ref={ref}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-3 pt-4 sm:p-4 sm:pt-5"
    >
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-volt/70 to-transparent" aria-hidden="true" />
      <p className="flex flex-wrap items-baseline gap-x-1.5">
        <span className="numeral text-2xl font-semibold text-fog sm:text-3xl lg:text-4xl">
          {display}
        </span>
        <span className="text-[0.62rem] text-volt sm:text-[0.72rem]">{t(stat.unit)}</span>
      </p>
      <p className="mt-2 text-[0.68rem] leading-snug text-mist sm:text-[0.76rem]">{t(stat.label)}</p>
    </li>
  );
}

export default function FutureMobilitySection() {
  const { t, lang } = useLang();
  const reduced = useReducedMotion();
  const handle = useRef<VideoHandle | null>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="electric-horizon"
      className="relative overflow-hidden bg-ink py-20 lg:py-32"
      aria-labelledby="future-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_80%_20%,rgba(77,163,255,0.18),transparent_70%),radial-gradient(45%_35%_at_0%_80%,rgba(115,84,255,0.08),transparent_70%)]" />
      <div className="pointer-events-none absolute end-0 top-16 select-none font-display text-[clamp(9rem,22vw,25rem)] font-black leading-none tracking-[-.08em] text-white/[0.018]" aria-hidden="true">E</div>

      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3"><span className="relative flex size-3 items-center justify-center"><span className="absolute size-3 animate-ping rounded-full bg-volt/40" /><span className="relative size-1.5 rounded-full bg-volt" /></span><p className="eyebrow text-volt">{t(C.future.eyebrow)}</p></div>
            <KineticHeading
              id="future-title"
              text={C.future.title}
              className="display mt-4 text-[clamp(2.7rem,6vw,5.8rem)] leading-[0.95] tracking-[-0.05em] text-fog"
            />
            <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-mist">
              {t(C.future.body)}
            </p>

            <ul className="mt-9 grid grid-cols-3 gap-2 sm:gap-3">
              {C.future.stats.map((stat) => (
                <StatCell key={stat.label.en} stat={stat} lang={lang} />
              ))}
            </ul>

            <p className="mt-4 text-[0.72rem] text-dim">{t(C.future.note)}</p>

            <Link
              href="/electric"
              className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-volt px-7 text-[0.88rem] font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              {t(C.future.cta)}
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                strokeWidth={2.2}
              />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <figure className="group relative aspect-[4/3] overflow-hidden rounded-[26px] border border-white/10 bg-ink-2 sm:aspect-[16/10] lg:aspect-[16/11]">
              <CinematicVideo
                src="/media/video/coastal-drive.mp4"
                poster="/media/images/night-city.jpg"
                alt={
                  lang === "ar"
                    ? "سيارة تنطلق على طريق ساحلي"
                    : "Car running along a coastal road"
                }
                handleRef={handle}
                onPlayingChange={setPlaying}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 transition-colors duration-700 group-hover:from-black/75" />
              <div className="pointer-events-none absolute inset-0 grain" />
              <div className="pointer-events-none absolute inset-4 rounded-[18px] border border-white/20 sm:inset-6" aria-hidden="true">
                <span className="absolute -start-px -top-px size-8 border-s-2 border-t-2 border-volt" />
                <span className="absolute -end-px -bottom-px size-8 border-e-2 border-b-2 border-volt" />
              </div>

              <div className="absolute inset-x-8 top-8 flex items-center justify-between sm:inset-x-10 sm:top-10">
                <span className="rounded-full border border-white/20 bg-black/35 px-3 py-2 text-[0.6rem] tracking-[0.18em] text-white/80 backdrop-blur-md">AURELIS / ELECTRIC</span>
                <span className="hidden items-center gap-2 text-[0.62rem] tracking-[0.14em] text-white/65 sm:flex"><span className="size-1.5 rounded-full bg-volt shadow-[0_0_14px_rgba(77,163,255,.9)]" />{lang === "ar" ? "بث سينمائي" : "CINEMATIC FEED"}</span>
              </div>

              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-8 sm:p-10">
                <span className="eyebrow text-white/75">
                  {lang === "ar" ? "لقطة ميدانية" : "Field footage"}
                </span>
                {!reduced && (
                  <button
                    type="button"
                    onClick={() => handle.current?.toggle()}
                    aria-pressed={!playing}
                    aria-label={playing ? t(C.hero.pause) : t(C.hero.play)}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/60"
                  >
                    {playing ? (
                      <Pause className="size-4" fill="currentColor" />
                    ) : (
                      <Play className="size-4" fill="currentColor" />
                    )}
                  </button>
                )}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
