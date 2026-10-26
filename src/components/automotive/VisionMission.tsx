"use client";

import { useRef } from "react";
import { Eye, Rocket } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, usePrefersReducedMotion } from "@/lib/motion";
import KineticHeading from "@/components/ui/KineticHeading";

/** Home / About — vision, mission and core values; the two panels glide in from opposite sides. */
export default function VisionMission() {
  const { t } = useLang();
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const v = C.vision;

  useGSAP(
    () => {
      if (reduced) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(".vm-a", { xPercent: 14, opacity: 0.2 }, { xPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: ".vm-grid", start: "top 90%", end: "top 40%", scrub: 0.6 } });
        gsap.fromTo(".vm-b", { xPercent: -14, opacity: 0.2 }, { xPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: ".vm-grid", start: "top 90%", end: "top 40%", scrub: 0.6 } });
      });
      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray<HTMLElement>(".vm-a, .vm-b, .vm-value").forEach((el) => {
          gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%", end: "top 62%", scrub: 0.5 } });
        });
      });
      gsap.fromTo(".vm-value", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".vm-values", start: "top 88%", toggleActions: "play none none reverse" } });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-ink-2 py-20 lg:py-32" aria-labelledby="vm-title">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <p className="eyebrow text-volt">{t(v.eyebrow)}</p>
        <KineticHeading id="vm-title" text={{ ar: "ما الذي يحرّكنا؟", en: "WHAT DRIVES US." }} className="display h-section mt-4 text-fog" />

        <div className="vm-grid mt-10 grid gap-4 lg:grid-cols-2 lg:gap-6">
          {[
            { k: "vision", Icon: Eye, cls: "vm-a", data: v.vision, tone: "from-volt/15" },
            { k: "mission", Icon: Rocket, cls: "vm-b", data: v.mission, tone: "from-[#ff6a2b]/15" },
          ].map(({ k, Icon, cls, data, tone }) => (
            <article key={k} className={`${cls} group relative overflow-hidden rounded-[28px] hairline bg-ink p-7 sm:p-10`}>
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tone} to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100`} aria-hidden="true" />
              <span className="relative inline-flex size-12 items-center justify-center rounded-2xl bg-fog text-ink transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <Icon className="size-5" strokeWidth={1.8} />
              </span>
              <h3 className="display relative mt-6 text-3xl text-fog sm:text-4xl">{t(data.label)}</h3>
              <p className="relative mt-4 max-w-lg text-[1.02rem] leading-[1.9] text-mist">{t(data.text)}</p>
              <span className="numeral pointer-events-none absolute -bottom-6 end-4 font-display text-[9rem] font-black leading-none text-fog/[0.04]" aria-hidden="true">{k === "vision" ? "01" : "02"}</span>
            </article>
          ))}
        </div>

        <ul className="vm-values mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:mt-6">
          {v.values.map((val, i) => (
            <li key={val.title.en} className="vm-value group relative rounded-2xl hairline bg-ink p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-volt/60 sm:p-6">
              <span className="numeral text-[0.72rem] text-volt">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-fog sm:text-xl">{t(val.title)}</h3>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-mist">{t(val.body)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
