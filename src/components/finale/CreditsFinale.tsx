"use client";

import { useEffect, useRef, useState } from "react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { FinaleActions, FinaleBody, FinaleEyebrow, FinaleShell, FinaleTitle } from "./finale-kit";

const ACCENT = "#d7b078";

/** About — the finale is a film's end roll: the crew, in credits, on a loop. */
export default function CreditsFinale({ accent = ACCENT }: { accent?: string }) {
  const { t, lang } = useLang();
  const reduced = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);
  const [seenState, setSeen] = useState(false);
  const seen = reduced || seenState;
  const sigRef = useRef<HTMLDivElement | null>(null);
  const credits = C.finale.about.credits;

  useEffect(() => {
    if (reduced) return;
    const el = sigRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <FinaleShell page="about" accent={accent} ghost="MERCI">
      <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <FinaleEyebrow>{t(C.finale.about.eyebrow)}</FinaleEyebrow>
          <FinaleTitle>{t(C.finale.about.title)}</FinaleTitle>
          <FinaleBody>{t(C.finale.about.signature)}</FinaleBody>
          <FinaleActions />
          <p className="mt-6 text-[0.78rem] text-dim">{t(C.finale.about.hint)}</p>
        </div>

        <div className="lg:col-span-7">
          {/* Film leader: sprocket strips down both edges */}
          <div className="relative mx-auto w-full max-w-2xl rounded-[24px] border border-white/12 bg-black/55 p-3 backdrop-blur-md">
            <div className="pointer-events-none absolute inset-y-6 start-2 w-2.5 rounded-full bg-[repeating-linear-gradient(180deg,rgba(255,255,255,.14)_0_10px,transparent_10px_26px)]" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-6 end-2 w-2.5 rounded-full bg-[repeating-linear-gradient(180deg,rgba(255,255,255,.14)_0_10px,transparent_10px_26px)]" aria-hidden="true" />

            <div className="px-8 sm:px-12">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <span className="numeral text-[0.64rem] tracking-[0.26em] text-white/55">
                  AURELIS / {lang === "ar" ? "تتر النهاية" : "END ROLL"}
                </span>
                <span className="eyebrow text-[0.6rem]" style={{ color: accent }}>
                  {t(C.finale.about.creditsLabel)}
                </span>
              </div>

              <div className="relative h-[20rem] overflow-hidden sm:h-[24rem]"
                style={{
                  maskImage: "linear-gradient(to bottom, transparent, black 16%, black 84%, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent, black 16%, black 84%, transparent)",
                }}
              >
                <ul
                  className="credits-roll py-4"
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  style={{ animationPlayState: paused || reduced ? "paused" : "running" }}
                >
                  {[...credits, ...credits].map((credit, index) => (
                    <li key={index} className="pb-7 text-center" aria-hidden={index >= credits.length}>
                      <p className="eyebrow text-[0.6rem] text-white/45">{t(credit.role)}</p>
                      <p
                        className="mt-2 font-display text-[clamp(1.05rem,2.6vw,1.6rem)] font-semibold text-fog"
                        style={{ color: index % credits.length === credits.length - 1 ? accent : undefined }}
                      >
                        {t(credit.name)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Signature block */}
              <div ref={sigRef} className="border-t border-white/10 pt-6 text-center">
                <p className="font-display text-[clamp(1.6rem,4.6vw,2.8rem)] font-black tracking-[0.28em] text-fog">
                  {lang === "ar" ? C.brand.nameAr : C.brand.name}
                </p>
                <span
                  className={`credits-sign mx-auto mt-4 block h-px ${seen ? "credits-sign--draw" : ""}`}
                  style={{ backgroundColor: accent }}
                  aria-hidden="true"
                />
                <p className="mt-4 text-[0.72rem] text-dim">
                  {lang === "ar" ? "٢٠٢٦ — كل الحقوق للاختبار الجميل ده" : "2026 — all rights reserved for this lovely demo"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FinaleShell>
  );
}
