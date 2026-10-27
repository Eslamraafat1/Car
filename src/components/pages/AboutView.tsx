"use client";

import Image from "next/image";
import PageHeader from "@/components/automotive/PageHeader";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import Timeline from "@/components/automotive/Timeline";
import ServicesStack from "@/components/automotive/ServicesStack";
import StatsBand from "@/components/automotive/StatsBand";
import WordBand from "@/components/ui/WordBand";
import VisionMission from "@/components/automotive/VisionMission";
import Awards from "@/components/automotive/Awards";
import ProfileCTA from "@/components/automotive/ProfileCTA";
import PhotoMosaic from "@/components/automotive/PhotoMosaic";
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

      <ServicesStack
        eyebrow={{ ar: "مبادئنا", en: "Our principles" }}
        title={C.pages.about.believe}
        body={C.pages.about.body}
        items={C.pages.about.points.map((point, i) => ({
          title: point.title,
          body: point.body,
          image: ["/media/images/lab-tech.jpg", "/media/images/detail-texture.jpg", "/media/images/detail-interior.jpg"][i],
          alt: point.title,
        }))}
      />

      <WordBand />

      <VisionMission />

      <Timeline />

      <StatsBand />

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
      <PhotoMosaic />
      <Awards />
      <Team />
      <Partners />
      <ProfileCTA />
    </>
  );
}