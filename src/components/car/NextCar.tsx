"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { VEHICLES, type Vehicle } from "@/lib/vehicles";

/** Car page — a full-bleed "next car" door at the bottom, in the order of the collection. */
export default function NextCar({ vehicle }: { vehicle: Vehicle }) {
  const { t, lang } = useLang();
  const i = VEHICLES.findIndex((v) => v.slug === vehicle.slug);
  const next = VEHICLES[(i + 1) % VEHICLES.length];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-ink" aria-label={t(C.carPage.next)}>
      <Link href={`/cars/${next.slug}`} className="group relative block min-h-[22rem] overflow-hidden bg-[#070809] text-white sm:min-h-[30rem] lg:min-h-[36rem]">
        <Image src={next.image} alt="" fill sizes="100vw" quality={65} loading="lazy" className="object-cover opacity-70 transition-[transform,opacity] duration-[1400ms] ease-out group-hover:scale-[1.06] group-hover:opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070809] via-[#070809]/30 to-[#070809]/60" />
        <div className="relative mx-auto flex min-h-[22rem] w-full max-w-[1400px] flex-col justify-end px-4 pb-8 sm:min-h-[30rem] sm:px-6 lg:min-h-[36rem] lg:px-10 lg:pb-12">
          <p className="eyebrow" style={{ color: next.accent }}>{t(C.carPage.next)} · {next.brand}</p>
          <div className="mt-2 flex items-end justify-between gap-6">
            <p className="keep-tracking font-display text-[clamp(2.4rem,10vw,8.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.045em]" dir="ltr">{next.model}</p>
            <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-full border border-white/40 transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-[#070809] sm:size-20">
              <Arrow className="size-6 transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 sm:size-8" strokeWidth={1.6} />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
