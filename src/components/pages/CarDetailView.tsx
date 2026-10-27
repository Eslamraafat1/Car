"use client";

import { Mail } from "lucide-react";
import VehicleCollection from "@/components/automotive/VehicleCollection";
import SpecsStory from "@/components/automotive/SpecsStory";
import CarHero from "@/components/car/CarHero";
import PerformanceGauges from "@/components/car/PerformanceGauges";
import LaunchSequence from "@/components/car/LaunchSequence";
import SpecBand from "@/components/car/SpecBand";
import CarHighlights from "@/components/car/CarHighlights";
import DayStory from "@/components/car/DayStory";
import StickyBuyBar from "@/components/car/StickyBuyBar";
import NextCar from "@/components/car/NextCar";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { type Vehicle, specValue } from "@/lib/vehicles";

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
      <CarHero vehicle={vehicle} />
      <SpecBand vehicle={vehicle} />

      <section id="car-overview" className="relative bg-ink py-16 lg:py-24" aria-label={t(C.car.detail)}>
        <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <div className="lg:col-span-7">
            <p className="eyebrow" style={{ color: vehicle.accent }}>{t(C.car.detail)}</p>
            <KineticHeading text={vehicle.tagline} className="display h-section mt-4 text-fog" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-[1.02rem] leading-[1.95] text-mist">{t(vehicle.description)}</p>
              <p className="mt-6 max-w-2xl border-s-2 ps-3 text-[0.78rem] leading-relaxed text-dim" style={{ borderColor: vehicle.accent }}>
                {t(C.car.demoBody)}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="rounded-[28px] hairline bg-ink-2 p-6 lg:p-8">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-5">
                <span className="text-[0.72rem] tracking-wider text-dim">{t(C.car.priceLabel)}</span>
                <span className="numeral font-display text-xl font-semibold text-fog" dir="ltr">{vehicle.price}</span>
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
                href={`mailto:${C.contactInfo.email}?subject=${enquireSubject}`}
                className="shine group relative mt-7 inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-[0.88rem] font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
                style={{ background: vehicle.accent }}
              >
                <Mail className="size-4" aria-hidden="true" />
                {t(C.car.inquire)}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <PerformanceGauges vehicle={vehicle} />
      <LaunchSequence vehicle={vehicle} />
      <SpecsStory vehicle={vehicle} />
      <CarHighlights vehicle={vehicle} />
      <DayStory vehicle={vehicle} />

      {related.length > 0 && (
        <VehicleCollection vehicles={related} variant="related" withHeader={false} withFilters={false} title={C.car.related} />
      )}

      <NextCar vehicle={vehicle} />
      <StickyBuyBar vehicle={vehicle} />
    </>
  );
}
