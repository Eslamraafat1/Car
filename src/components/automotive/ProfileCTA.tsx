"use client";

import Link from "next/link";
import { useRef } from "react";
import { Download, FileText } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

/** A tilting brochure mock-up that follows the pointer, beside the download call-to-action. */
export default function ProfileCTA() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${(-18 + x * 26).toFixed(1)}deg) rotateX(${(8 - y * 20).toFixed(1)}deg)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <section className="relative overflow-hidden bg-ink py-20 lg:py-28" aria-labelledby="profile-title">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-6">
          <Reveal><p className="eyebrow text-volt">{t(C.profileCta.eyebrow)}</p></Reveal>
          <KineticHeading id="profile-title" text={C.profileCta.title} className="display h-section mt-4 text-fog" />
          <Reveal delay={0.1}><p className="mt-5 max-w-md text-[1rem] leading-relaxed text-mist">{t(C.profileCta.body)}</p></Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton>
                <a
                  href={`/evay-company-profile-${lang}.pdf`}
                  download
                  className="shine group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-volt px-7 text-[0.9rem] font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
                >
                  <Download className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={2.2} />
                  {t(C.profileCta.download)}
                </a>
              </MagneticButton>
              <Link href="/profile" className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-6 text-[0.88rem] font-medium text-fog transition-colors duration-300 hover:border-volt hover:text-volt">
                <FileText className="size-4" strokeWidth={2} />
                {t(C.profileCta.web)}
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6" onPointerMove={onMove} onPointerLeave={onLeave} style={{ perspective: "1400px" }}>
          <div className="relative mx-auto aspect-[3/4] w-[min(70vw,22rem)] sm:w-[22rem]">
            <div ref={ref} className="absolute inset-0 transition-transform duration-300 ease-out [transform-style:preserve-3d]" style={{ transform: "rotateY(-18deg) rotateX(8deg)" }}>
              {/* back pages */}
              <div className="absolute inset-0 translate-x-3 translate-y-2 rounded-[10px] bg-fog/10 [transform:translateZ(-30px)]" />
              <div className="absolute inset-0 translate-x-1.5 translate-y-1 rounded-[10px] bg-fog/15 [transform:translateZ(-15px)]" />
              {/* cover */}
              <div className="absolute inset-0 overflow-hidden rounded-[10px] bg-[#0b0d12] p-6 text-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)]">
                <div className="absolute inset-0 bg-[url('/media/hero/f8.webp')] bg-cover bg-center opacity-55" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12] via-[#0b0d12]/40 to-[#0b0d12]/70" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true"><rect width="32" height="32" rx="9" fill="#2f7bff" /><path d="M9 10h14M9 16h10M9 22h14" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" fill="none" /></svg>
                    <span className="keep-tracking font-display text-lg font-bold tracking-[0.22em]">EVAY</span>
                  </div>
                  <div>
                    <p className="eyebrow text-[#7db4ff]">2026</p>
                    <p className="display mt-2 text-3xl leading-tight">{t(C.profileCta.cover)}</p>
                    <span className="mt-4 block h-px w-14 bg-[#4da3ff]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="float-slow absolute -end-6 -top-8 -z-10 size-44 rounded-full bg-volt/25 blur-[70px]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
