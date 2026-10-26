"use client";

import Image from "next/image";
import PageHeader from "@/components/automotive/PageHeader";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import Reveal from "@/components/ui/Reveal";
import Timeline from "@/components/automotive/Timeline";
import VisionMission from "@/components/automotive/VisionMission";
import Team from "@/components/automotive/Team";
import Partners from "@/components/automotive/Partners";

export default function AboutView() {
  const { t } = useLang();

  return (
    <>
      <PageHeader
        eyebrow={C.pages.about.eyebrow}
        title={C.pages.about.title}
        body={C.pages.about.body}
      />

      <section className="about-principles relative isolate overflow-hidden bg-ink py-16 lg:py-24" aria-label={t(C.pages.about.eyebrow)}>
        <div className="pointer-events-none absolute start-[12%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#d7b078]/40 to-transparent lg:block" aria-hidden="true" />
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="mb-8 flex items-end justify-between gap-4 border-b border-line pb-5">
            <div><p className="eyebrow text-[#d7b078]">{t(C.pages.about.eyebrow)}</p><h2 className="display mt-3 text-[clamp(1.8rem,4vw,3.4rem)] text-fog">{t(C.pages.about.believe)}</h2></div>
            <span className="numeral hidden text-[0.68rem] tracking-[0.22em] text-dim sm:block">01—03</span>
          </div>
          <ul className="grid gap-3 lg:grid-cols-3">
            {C.pages.about.points.map((point, index) => (
              <li key={point.title.en}>
              <Reveal delay={index * 0.1} className="h-full">
              <div
                className="group relative min-h-64 overflow-hidden border-t border-[#d7b078]/45 bg-gradient-to-b from-white/[0.035] to-transparent p-6 transition-all duration-500 hover:-translate-y-1 hover:from-[#d7b078]/[0.09] lg:p-8"
              >
                <span className="pointer-events-none absolute -end-2 -top-8 font-display text-[12rem] font-black leading-none text-fog/[0.04] transition-colors duration-500 group-hover:text-[#d7b078]/[0.08]" aria-hidden="true">0{index + 1}</span>
                <span className="numeral inline-flex size-10 items-center justify-center border border-[#d7b078]/45 text-[0.72rem] tracking-[0.12em] text-[#d7b078]">
                  0{index + 1}
                </span>
                <h3 className="relative mt-8 max-w-[18ch] font-display text-2xl font-semibold text-fog">
                  {t(point.title)}
                </h3>
                <p className="relative mt-3 max-w-[40ch] text-[0.9rem] leading-relaxed text-mist">{t(point.body)}</p>
              </div>
              </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <VisionMission />

      <Timeline />

      <section className="border-t border-line bg-ink-2 py-16 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1400px] gap-6 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
          <figure className="relative overflow-hidden rounded-[24px] hairline lg:col-span-7">
            <div className="relative aspect-[16/10]">
              <Image
                src="/media/images/design-profile.jpg"
                alt={t({
                  ar: "خط جانبي كامل لسيارة في استوديو معتم",
                  en: "Full side profile of a car in a darkened studio",
                })}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-5 text-[0.8rem] text-white/80">
              {t({ ar: "استوديو العرض الخاص بنا", en: "Our showroom studio" })}
            </figcaption>
          </figure>

          <figure className="relative overflow-hidden rounded-[24px] hairline lg:col-span-5">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full">
              <Image
                src="/media/images/detail-interior.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-5 text-[0.8rem] text-white/80">
              {t({ ar: "مقصورة بتفاصيل مختارة", en: "Cabins finished to the last detail" })}
            </figcaption>
          </figure>
        </div>
      </section>
      <Team />
      <Partners />
    </>
  );
}