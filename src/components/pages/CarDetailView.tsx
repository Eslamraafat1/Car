"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import VehicleCollection from "@/components/automotive/VehicleCollection";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { CATEGORY_LABELS, type Vehicle, specValue } from "@/lib/vehicles";

interface CarDetailViewProps {
  vehicle: Vehicle;
  related: Vehicle[];
}

export default function CarDetailView({ vehicle, related }: CarDetailViewProps) {
  const { t, lang } = useLang();
  const specs = vehicle.specs.filter((spec) => spec.value !== vehicle.price);
  const enquireSubject = encodeURIComponent(`${C.brand.name} — ${vehicle.brand} ${vehicle.model}`);

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src={vehicle.image}
            alt={t(vehicle.alt)}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(55% 60% at 80% 15%, ${vehicle.accent}26, transparent 70%)`,
            }}
          />
          <div className="pointer-events-none absolute inset-0 grain" />

          <div className="absolute inset-0 flex flex-col justify-between px-4 pb-8 pt-20 sm:px-6 lg:px-10 lg:pb-12">
            <div className="mx-auto w-full max-w-[1400px]">
              <Link
                href="/explore"
                className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/55 px-4 py-2 text-[0.8rem] text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt"
              >
                {lang === "ar" ? (
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={2.2} />
                ) : (
                  <ArrowLeft className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.2} />
                )}
                {t(C.car.back)}
              </Link>
            </div>

            <div className="mx-auto w-full max-w-[1400px]">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/25 bg-black/60 px-3 py-1 text-[0.68rem] tracking-[0.16em] text-white/85 backdrop-blur-sm">
                  {t(CATEGORY_LABELS[vehicle.category])}
                </span>
                <span className="numeral rounded-full border border-white/20 px-3 py-1 text-[0.68rem] tracking-[0.16em] text-white/70 backdrop-blur-sm">
                  {vehicle.year}
                </span>
                <span className="rounded-full border border-ember/40 bg-ember/15 px-3 py-1 text-[0.68rem] tracking-[0.14em] text-ember">
                  {t(C.car.demo)}
                </span>
              </div>
              <p className="eyebrow mt-5" style={{ color: vehicle.accent }}>
                {vehicle.brand}
              </p>
              <h1 className="display h-hero mt-2 text-white">{vehicle.model}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ink py-14 lg:py-20" aria-label={t(C.car.detail)}>
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="font-display text-xl font-medium leading-relaxed text-fog lg:text-2xl">
                {t(vehicle.tagline)}
              </p>
              <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-mist">
                {t(vehicle.description)}
              </p>
              <p className="mt-6 max-w-2xl border-s-2 border-ember/60 ps-3 text-[0.78rem] leading-relaxed text-dim">
                {t(C.car.demoBody)}
              </p>
            </div>

            <div className="rounded-[24px] hairline bg-ink-2 p-6 lg:col-span-5 lg:p-8">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-5">
                <span className="text-[0.72rem] tracking-wider text-dim">
                  {t(C.car.priceLabel)}
                </span>
                <span className="numeral font-display text-lg font-semibold text-fog">
                  {vehicle.price}
                </span>
              </div>

              <p className="eyebrow mt-6 text-mist">{t(C.car.specs)}</p>
              <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">
                {specs.map((spec) => (
                  <div key={spec.label.en} className="border-t border-line pt-3">
                    <dt className="text-[0.7rem] tracking-wider text-dim">{t(spec.label)}</dt>
                    <dd className="mt-1 font-display text-[0.92rem] text-fog">{specValue(spec.value, lang)}</dd>
                  </div>
                ))}
              </dl>

              <a
                href={`mailto:hello@evay.example?subject=${enquireSubject}`}
                className="group mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-fog px-7 text-[0.88rem] font-semibold text-ink transition-transform duration-300 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt"
              >
                <Mail className="size-4" aria-hidden="true" />
                {t(C.car.inquire)}
              </a>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <VehicleCollection
          vehicles={related}
          variant="related"
          withHeader={false}
          withFilters={false}
          title={C.car.related}
        />
      )}
    </>
  );
}
