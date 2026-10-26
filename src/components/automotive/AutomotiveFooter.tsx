"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, usePrefersReducedMotion } from "@/lib/motion";
import DotGrid from "@/components/ui/DotGrid";
import KineticHeading from "@/components/ui/KineticHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { EvayMark } from "@/components/automotive/AutomotiveNavbar";

const FOOT_TITLE = { ar: "لنبدأ رحلتك معًا.", en: "LET'S START YOUR JOURNEY." };
const FOOT_EYEBROW = { ar: "هل أنت مستعد؟", en: "Ready when you are" };

export default function AutomotiveFooter() {
  const { t, toggleLang } = useLang();
  const pathname = usePathname();
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const info = C.contactInfo;
  const ctaHref = pathname === "/contact" ? `mailto:${info.email}` : "/contact";

  /* The wordmark fills with colour as the footer scrolls into view. */
  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ".foot-word",
        { backgroundPositionX: "0%" },
        { backgroundPositionX: "100%", ease: "none", scrollTrigger: { trigger: ".foot-word", start: "top 105%", end: "bottom 78%", scrub: 0.6 } },
      );
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true },
  );

  const linkClass = "group/link inline-flex items-center gap-1.5 text-[0.95rem] text-mist transition-colors duration-300 hover:text-fog";

  return (
    <footer ref={rootRef} className="relative isolate overflow-hidden bg-ink-3 text-fog">
      {/* call to action */}
      <div className="relative">
        <DotGrid className="absolute inset-0 -z-10 [mask-image:radial-gradient(70%_80%_at_50%_45%,#000,transparent)]" />
        <div className="float-slow pointer-events-none absolute start-[-8%] top-[10%] -z-10 size-[26rem] rounded-full bg-volt/20 blur-[120px]" aria-hidden="true" />
        <div className="mx-auto w-full max-w-[1400px] px-4 pb-20 pt-24 sm:px-6 lg:px-10 lg:pb-28 lg:pt-36">
          <p className="eyebrow text-volt">{t(FOOT_EYEBROW)}</p>
          <div className="mt-5 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <KineticHeading text={FOOT_TITLE} className="display max-w-4xl text-[clamp(2.4rem,7.4vw,6.6rem)] text-fog" />
            <MagneticButton limit={22}>
              <Link
                href={ctaHref}
                aria-label={t(C.finalCta.secondary)}
                className="shine group relative inline-flex size-28 items-center justify-center overflow-hidden rounded-full bg-[#2f7bff] text-white transition-transform duration-500 hover:scale-110 sm:size-36"
              >
                <span className="flex flex-col items-center gap-1 text-[0.84rem] font-semibold">
                  {t(C.finalCta.secondary)}
                  <ArrowUpRight className="size-6 transition-transform duration-500 group-hover:rotate-45 rtl:-scale-x-100" strokeWidth={1.8} />
                </span>
              </Link>
            </MagneticButton>
          </div>
          <a href={`mailto:${info.email}`} className="mt-10 inline-block break-all font-display text-[clamp(1.15rem,3vw,2rem)] text-mist underline decoration-fog/25 underline-offset-8 transition-colors duration-300 hover:text-fog hover:decoration-volt" dir="ltr">
            {info.email}
          </a>
        </div>
      </div>

      {/* directory */}
      <div className="border-t border-line">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-2 gap-x-6 gap-y-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-16">
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3" aria-label={C.brand.name}>
              <EvayMark className="size-10" />
              <span className="keep-tracking font-display text-xl font-bold tracking-[0.22em]">{C.brand.name}</span>
            </Link>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-mist">{t(C.footer.tagline)}</p>
            <div className="mt-6 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleLang}
                aria-label={t(C.nav.langLabel)}
                className="keep-tracking inline-flex h-10 items-center rounded-full border border-line px-4 text-[0.82rem] font-medium text-fog transition-colors hover:border-fog hover:text-fog"
              >
                {t(C.nav.switchTo)}
              </button>
              <ThemeToggle variant="surface" />
            </div>
          </div>

          {C.footer.columns.map((col) => (
            <nav key={col.title.en} aria-label={t(col.title)} className="lg:col-span-2">
              <h2 className="eyebrow text-dim">{t(col.title)}</h2>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkClass}>
                      <span className="relative">
                        {t(l.label)}
                        <span className="absolute inset-x-0 -bottom-0.5 h-px origin-start scale-x-0 bg-volt transition-transform duration-300 group-hover/link:scale-x-100 rtl:origin-right" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 lg:col-span-4">
            <h2 className="eyebrow text-dim">{t(C.pages.contact.eyebrow)}</h2>
            <ul className="mt-5 space-y-4 text-[0.95rem] text-mist">
              <li className="flex items-center gap-3"><Mail className="size-4 shrink-0 text-volt" /><a href={`mailto:${info.email}`} className="transition-colors hover:text-fog" dir="ltr">{info.email}</a></li>
              <li className="flex items-center gap-3"><Phone className="size-4 shrink-0 text-volt" /><a href={`tel:${info.phone.en.replace(/\s/g, "")}`} className="transition-colors hover:text-fog" dir="ltr">{t(info.phone)}</a></li>
              <li className="flex items-center gap-3"><MapPin className="size-4 shrink-0 text-volt" /><span>{t(info.address)}</span></li>
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2">
              {info.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="keep-tracking inline-flex h-9 items-center rounded-full border border-line px-4 text-[0.8rem] text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-volt hover:text-fog">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* wordmark + legal */}
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="foot-word keep-tracking select-none pt-2 text-center font-display font-bold leading-[0.8] tracking-[-0.04em]" aria-hidden="true" dir="ltr">
          {C.brand.name}
        </div>
        <div className="flex flex-col gap-4 border-t border-line py-7 text-[0.78rem] text-dim lg:flex-row lg:items-center lg:justify-between">
          <p>{t(C.footer.rights)}</p>
          <p className="max-w-xl leading-relaxed">{t(C.footer.disclaimer)}</p>
        </div>
      </div>
    </footer>
  );
}
