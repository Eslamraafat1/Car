"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Power } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import KineticHeading from "@/components/ui/KineticHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { useHold } from "@/lib/use-hold";

const RING_RADIUS = 84;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/**
 * Lost in the dark: two headlight beams sweep the void while a starter pad
 * waits for a held press — hold it and the engine turns over back home.
 */
export default function NotFound() {
  const { t, lang } = useLang();
  const router = useRouter();
  const reduced = usePrefersReducedMotion();
  const [ignited, setIgnited] = useState(false);

  const hold = useHold({
    duration: 1400,
    decay: true,
    latch: true,
    onComplete: () => {
      setIgnited(true);
      router.push("/");
    },
  });

  const status = ignited
    ? t(C.pages.notFound.live)
    : hold.holding
      ? t(C.pages.notFound.cranking)
      : t(C.pages.notFound.hold);

  return (
    <section className="cinema relative isolate flex min-h-[92svh] items-center overflow-hidden bg-ink px-4 pb-24 pt-32 sm:px-6 lg:px-10">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(85%_65%_at_50%_78%,rgba(22,32,50,0.95),rgba(7,8,9,1)_72%)]" />
        {!reduced && (
          <>
            <span className="beam beam--a" />
            <span className="beam beam--b" />
          </>
        )}
        <div className="absolute inset-0 grain" />
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-volt" aria-hidden="true" />
            <p className="eyebrow text-volt">{t(C.pages.notFound.eyebrow)}</p>
          </div>
          <KineticHeading
            text={C.pages.notFound.title}
            className="display mt-6 max-w-[14ch] text-[clamp(2.4rem,6.4vw,5.6rem)] leading-[0.95] tracking-[-0.045em] text-fog"
          />
          <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-white/70">
            {t(C.pages.notFound.body)}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <Link
                href="/explore"
                className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-fog px-7 text-[0.88rem] font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
              >
                {t(C.pages.notFound.cta)}
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  strokeWidth={2.2}
                />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/"
                className="inline-flex min-h-12 items-center rounded-full border border-white/25 px-7 text-[0.88rem] font-medium text-white transition-colors duration-300 hover:border-white/70 hover:bg-white/5"
              >
                {t(C.nav.home)}
              </Link>
            </MagneticButton>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.03] p-7 lg:backdrop-blur-md">
            {!reduced && ignited && (
              <span
                className="finale-flash pointer-events-none absolute inset-0 bg-white/85"
                aria-hidden="true"
              />
            )}

            <div className="flex items-center justify-between gap-4">
              <span className="numeral text-[0.66rem] tracking-[0.26em] text-white/55">
                EVAY / 404
              </span>
              <span
                className={`numeral rounded-full border px-3 py-1 text-[0.62rem] tracking-[0.18em] transition-colors duration-500 ${
                  ignited ? "border-volt/60 text-volt" : "border-white/20 text-white/60"
                }`}
              >
                {status}
              </span>
            </div>

            <div className="mt-7 flex justify-center">
              <button
                type="button"
                {...hold.bind}
                aria-label={t(C.pages.notFound.hold)}
                className="group relative flex size-[220px] items-center justify-center rounded-full outline-offset-4 focus-visible:outline-2 focus-visible:outline-volt"
              >
                <svg viewBox="0 0 200 200" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
                  <circle
                    cx="100"
                    cy="100"
                    r={RING_RADIUS}
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r={RING_RADIUS}
                    fill="none"
                    stroke="var(--c-volt)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={RING_CIRCUMFERENCE}
                    strokeDashoffset={RING_CIRCUMFERENCE * (1 - hold.progress)}
                    style={{
                      transition: "stroke-dashoffset 60ms linear",
                      filter: "drop-shadow(0 0 10px color-mix(in srgb, var(--c-volt) 60%, transparent))",
                    }}
                  />
                </svg>
                <span className="absolute inset-3 rounded-full border border-dashed border-white/10" aria-hidden="true" />
                <span
                  className={`inline-flex size-24 flex-col items-center justify-center gap-1.5 rounded-full border text-[0.66rem] font-semibold tracking-[0.14em] transition-all duration-300 ${
                    hold.holding || ignited
                      ? "scale-105 border-volt/70 bg-volt/15 text-fog"
                      : "border-white/25 bg-white/[0.05] text-white/80 group-hover:border-white/50"
                  }`}
                >
                  <Power className="size-6" strokeWidth={1.8} />
                  <span>{lang === "ar" ? "اضغط" : "HOLD"}</span>
                </span>
              </button>
            </div>

            <p className="mt-6 text-center text-[0.74rem] text-dim">{t(C.pages.notFound.hint)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
