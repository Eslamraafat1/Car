"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { getLenis } from "@/lib/smooth-scroll";

export default function AutomotiveFooter() {
  const { t, lang, toggleLang } = useLang();
  const wordRef = useRef<HTMLDivElement | null>(null);
  const [wordOn, setWordOn] = useState(false);

  /* The wordmark fills with a light sweep the first time it enters view. */
  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWordOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-line bg-ink-2">
      <div className="mx-auto max-w-[1400px] px-4 pb-10 pt-16 sm:px-6 lg:px-10 lg:pt-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <p className="font-display text-xl font-semibold tracking-[0.3em] text-fog">
              {lang === "ar" ? C.brand.nameAr : C.brand.name}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-mist">{t(C.footer.tagline)}</p>
            <button
              type="button"
              onClick={toTop}
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[0.8rem] text-mist transition-colors duration-300 hover:border-volt hover:text-fog"
            >
              <ArrowUp className="size-4" />
              {lang === "ar" ? "لأعلى" : "Back to top"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-14">
            {C.footer.columns.map((column) => (
              <nav key={column.title.en} aria-label={t(column.title)}>
                <h2 className="eyebrow text-mist">{t(column.title)}</h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-mist transition-colors duration-300 hover:text-volt"
                      >
                        {t(link.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <h2 className="eyebrow text-mist">{t(C.nav.langLabel)}</h2>
              <button
                type="button"
                onClick={toggleLang}
                className="mt-4 inline-flex h-9 items-center rounded-full border border-line px-4 text-[0.8rem] text-mist transition-colors duration-300 hover:border-volt hover:text-fog"
              >
                {t(C.nav.switchTo)}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-[0.78rem] text-mist lg:flex-row lg:items-center lg:justify-between">
          <p>{t(C.footer.rights)}</p>
          <p className="max-w-2xl leading-relaxed">{t(C.footer.disclaimer)}</p>
          <p className="text-dim">{t(C.footer.credit)}</p>
        </div>

        <div
          ref={wordRef}
          className={`footer-wordmark mt-10 overflow-hidden ${wordOn ? "is-in" : ""}`}
          aria-hidden="true"
        >
          <span className="footer-wordmark-text">AURELIS</span>
        </div>
      </div>
    </footer>
  );
}
