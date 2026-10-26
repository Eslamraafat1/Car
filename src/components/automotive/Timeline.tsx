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

/**
 * About — milestones. Large screens pin the section and slide the years
 * sideways with the scroll; phones get a vertical timeline whose line draws
 * itself.
 */
export default function Timeline() {
  const { t, lang } = useLang();
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const track = rootRef.current?.querySelector<HTMLElement>(".tl-track");
        const bar = rootRef.current?.querySelector<HTMLElement>(".tl-bar");
        if (!track) return;
        const sign = lang === "ar" ? 1 : -1;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 120);
        gsap.fromTo(
          track,
          { x: 0 },
          {
            x: () => sign * distance(),
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
              onUpdate: (self) => bar && gsap.set(bar, { scaleX: self.progress }),
            },
          },
        );
      });
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(".tl-line", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".tl-list", start: "top 70%", end: "bottom 70%", scrub: 0.4 } });
        gsap.utils.toArray<HTMLElement>(".tl-dot").forEach((dot) => {
          gsap.fromTo(dot, { scale: 0.4, backgroundColor: "transparent" }, { scale: 1, backgroundColor: "var(--c-volt)", duration: 0.5, ease: "back.out(2.4)", scrollTrigger: { trigger: dot, start: "top 72%", toggleActions: "play none none reverse" } });
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [reduced, lang], revertOnUpdate: true },
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden border-t border-line bg-ink py-16 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0" aria-labelledby="timeline-title">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <p className="eyebrow text-volt">{t(C.pages.about.journey)}</p>
        <KineticHeading id="timeline-title" text={C.pages.about.journeyTitle} className="display h-section mt-4 text-fog" />
      </div>

      {/* desktop: pinned horizontal track */}
      <div className="mt-12 hidden lg:block">
        <ol className="tl-track flex w-max items-stretch gap-6 px-10 will-change-transform">
          {MILESTONES.map((m) => (
            <li key={m.year} className="relative flex h-[22rem] w-[34vw] max-w-[34rem] shrink-0 flex-col justify-between overflow-hidden rounded-[28px] hairline bg-ink-2 p-8">
              <span className="numeral font-display text-[8rem] font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_var(--c-volt)]" dir="ltr">{m.year}</span>
              <div>
                <h3 className="font-display text-2xl font-semibold text-fog">{t(m.title)}</h3>
                <p className="mt-2 max-w-sm text-[0.95rem] leading-[1.85] text-mist">{t(m.body)}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mx-auto mt-8 w-full max-w-[1400px] px-10">
          <div className="h-px bg-line"><div className="tl-bar h-full origin-start bg-volt rtl:origin-right" style={{ transform: "scaleX(0)" }} /></div>
        </div>
      </div>

      {/* mobile + tablet: vertical */}
      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:hidden">
        <ol className="tl-list relative mt-10 space-y-10 ps-10 sm:ps-14">
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
