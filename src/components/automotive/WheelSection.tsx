"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { ScrollTrigger, useGSAP } from "@/lib/motion";
import type { WheelProgress } from "@/components/three/WheelScene";

const WheelScene = dynamic(() => import("@/components/three/WheelScene"), { ssr: false });

/** Home — pinned, scroll-driven 3D wheel that explodes into its parts and re-assembles. */
export default function WheelSection() {
  const { t } = useLang();
  const rootRef = useRef<HTMLElement | null>(null);
  const progress = useRef<WheelProgress>({ value: 0 });
  const [step, setStep] = useState(0);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          progress.current.value = self.progress;
          const next = self.progress < 0.27 ? 0 : self.progress < 0.7 ? 1 : 2;
          setStep((prev) => (prev === next ? prev : next));
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative h-[330svh] bg-ink text-fog" aria-labelledby="wheel-title">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute start-[10%] top-[15%] size-[34rem] rounded-full bg-[#1f7bff]/15 blur-[120px]" />
          <div className="absolute bottom-[-10%] end-[5%] size-[30rem] rounded-full bg-[#ff6a2b]/10 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--c-fog)_1px,transparent_1px),linear-gradient(90deg,var(--c-fog)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(60%_60%_at_60%_50%,#000,transparent)]" />
        </div>

        <div className="absolute inset-x-0 bottom-[44%] top-[5.5rem] sm:bottom-[40%] lg:inset-y-0 lg:start-[34%] lg:end-0">
          <WheelScene progress={progress} />
        </div>

        <div className="relative mx-auto flex h-full w-full max-w-[1400px] flex-col justify-end px-4 pb-8 sm:px-6 sm:pb-12 lg:justify-center lg:px-10 lg:pb-0">
          <div className="lg:w-[38%]">
            <p className="eyebrow text-volt">{t(C.wheel.eyebrow)}</p>
            <h2 id="wheel-title" className="display mt-3 text-[clamp(1.9rem,4.4vw,3.8rem)] text-fog">
              {t(C.wheel.title)}
            </h2>

            <div className="mt-5 grid min-h-[8.5rem] sm:min-h-[7rem]">
              {C.wheel.steps.map((s, i) => (
                <div
                  key={s.title.en}
                  className={`col-start-1 row-start-1 transition-all duration-700 ease-out ${
                    step === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
                  }`}
                  aria-hidden={step !== i}
                >
                  <h3 className="font-display text-lg font-semibold text-fog sm:text-xl">{t(s.title)}</h3>
                  <p className="mt-2 max-w-md text-[0.92rem] leading-relaxed text-mist">{t(s.body)}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3" aria-hidden="true">
              {C.wheel.steps.map((s, i) => (
                <span key={s.title.en} className={`h-1 rounded-full transition-all duration-500 ${step === i ? "w-10 bg-volt" : "w-4 bg-fog/20"}`} />
              ))}
              <span className="ms-3 hidden text-[0.72rem] text-dim sm:inline">{t(C.wheel.hint)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
