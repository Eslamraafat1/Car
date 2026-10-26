"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, usePrefersReducedMotion } from "@/lib/motion";
import KineticHeading from "@/components/ui/KineticHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";

/** One closing call-to-action shared by every page. */
export default function FinalCTA() {
  const { t, lang } = useLang();
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ".cta-bg",
        { yPercent: -8, scale: 1.12 },
        { yPercent: 8, scale: 1.12, ease: "none", scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section ref={rootRef} className="relative isolate overflow-hidden bg-[#070809] py-24 text-white lg:py-36" aria-labelledby="cta-title">
      <div className="cta-bg absolute inset-0 -z-20 will-change-transform">
        <Image src="/media/images/car-warehouse.jpg" alt="" fill sizes="100vw" className="object-cover opacity-45" loading="lazy" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#070809] via-[#070809]/55 to-[#070809]" aria-hidden="true" />
      <div className="float-slow absolute start-[8%] top-[18%] -z-10 size-72 rounded-full bg-[#4da3ff]/25 blur-[100px]" aria-hidden="true" />
      <div className="float-slow absolute bottom-[8%] end-[6%] -z-10 size-80 rounded-full bg-[#7a5cff]/20 blur-[110px] [animation-delay:-6s]" aria-hidden="true" />

      <div className="mx-auto w-full max-w-[1100px] px-4 text-center sm:px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow text-[#4da3ff]">{t(C.finalCta.eyebrow)}</p>
        </Reveal>
        <KineticHeading id="cta-title" text={C.finalCta.title} className="display h-section mx-auto mt-5 max-w-4xl text-white" />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-relaxed text-white/70">{t(C.finalCta.body)}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton>
              <Link href="/contact" className="shine group relative inline-flex h-13 items-center gap-2 overflow-hidden rounded-full bg-white px-8 text-[0.92rem] font-semibold text-[#070809] transition-colors duration-300 hover:bg-[#4da3ff] hover:text-white">
                <Mail className="size-4" aria-hidden="true" />
                {t(C.finalCta.secondary)}
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/explore" className="group inline-flex h-13 items-center gap-2 rounded-full border border-white/30 px-8 text-[0.92rem] font-medium text-white transition-colors duration-300 hover:border-white hover:bg-white/10">
                {t(C.finalCta.primary)}
                <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" strokeWidth={2.2} />
              </Link>
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
