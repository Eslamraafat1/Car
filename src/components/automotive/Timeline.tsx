"use client";

import { useRef } from "react";
import { C, type BiStr } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, usePrefersReducedMotion } from "@/lib/motion";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";

const MILESTONES: { year: string; title: BiStr; body: BiStr }[] = [
  {
    year: "2012",
    title: { ar: "البداية", en: "The beginning" },
    body: { ar: "افتتحنا أول صالة عرض بفريق صغير وفكرة واضحة: الصراحة قبل البيع.", en: "We opened our first showroom with a small team and one clear idea: honesty before the sale." },
  },
  {
    year: "2016",
    title: { ar: "توسّع الخدمة", en: "Growing the service" },
    body: { ar: "أضفنا الفحص الشامل والضمان وخدمة ما بعد البيع.", en: "We added full inspections, warranty and after-sales care." },
  },
  {
    year: "2020",
    title: { ar: "عصر الكهرباء", en: "The electric era" },
    body: { ar: "دخلنا عالم السيارات الكهربائية وأقمنا شراكات مع مزوّدي خدمات الشحن.", en: "We entered electric mobility and built partnerships with charging providers." },
  },
  {
    year: "2026",
    title: { ar: "اليوم", en: "Today" },
    body: { ar: "ثلاث مدن وأكثر من ٨٥٠ عميلًا، وما زلنا في البداية.", en: "Three cities, 850+ clients — and we are only getting started." },
  },
];

/** About — milestones with a progress line that draws itself as you scroll. */
export default function Timeline() {
  const { t } = useLang();
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ".tl-line",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".tl-list", start: "top 70%", end: "bottom 70%", scrub: 0.4 } },
      );
      gsap.utils.toArray<HTMLElement>(".tl-dot").forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0.4, backgroundColor: "transparent" },
          { scale: 1, backgroundColor: "var(--c-volt)", duration: 0.5, ease: "back.out(2.4)", scrollTrigger: { trigger: dot, start: "top 72%", toggleActions: "play none none reverse" } },
        );
      });
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section ref={rootRef} className="border-t border-line bg-ink py-16 lg:py-24" aria-labelledby="timeline-title">
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-10">
        <p className="eyebrow text-volt">{t(C.pages.about.journey)}</p>
        <KineticHeading
          id="timeline-title"
          text={C.pages.about.journeyTitle}
          className="display h-section mt-4 text-fog"
        />
        <ol className="tl-list relative mt-12 space-y-10 ps-10 sm:ps-14">
          <span className="absolute inset-y-1 start-[11px] w-px bg-line sm:start-[15px]" aria-hidden="true" />
          <span className="tl-line absolute inset-y-1 start-[11px] w-px origin-top bg-volt sm:start-[15px]" aria-hidden="true" />
          {MILESTONES.map((m, index) => (
            <li key={m.year} className="relative">
              <span className="tl-dot absolute -start-10 top-1.5 size-[23px] rounded-full border-2 border-volt bg-ink sm:-start-14 sm:size-[31px]" aria-hidden="true" />
              <Reveal delay={index * 0.05}>
                <p className="numeral font-display text-3xl font-semibold text-volt sm:text-4xl">{m.year}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-fog">{t(m.title)}</h3>
                <p className="mt-2 max-w-xl text-[0.92rem] leading-relaxed text-mist">{t(m.body)}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
