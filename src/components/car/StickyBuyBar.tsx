"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import type { Vehicle } from "@/lib/vehicles";

/** Appears once the hero has scrolled away, keeping the price and the enquiry one tap away. */
export default function StickyBuyBar({ vehicle }: { vehicle: Vehicle }) {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const y = window.scrollY;
      const left = document.documentElement.scrollHeight - y - window.innerHeight;
      setShow(y > window.innerHeight * 0.75 && left > 700);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    check();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-buybar");
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("has-buybar", show);
  }, [show]);

  const subject = encodeURIComponent(`${C.brand.name} — ${vehicle.brand} ${vehicle.model}`);

  return (
    <div
      className={`fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[70] mx-auto flex max-w-xl items-center gap-3 rounded-full border border-line bg-ink-2/95 py-2 ps-5 pe-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] transition-all duration-500 ease-[cubic-bezier(.2,.8,.1,1)] lg:backdrop-blur-xl ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[140%] opacity-0"
      }`}
      aria-hidden={!show}
    >
      <span className="size-2 shrink-0 rounded-full" style={{ background: vehicle.accent }} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-[0.9rem] font-semibold text-fog" dir="ltr">{vehicle.brand} {vehicle.model}</p>
        <p className="numeral text-[0.74rem] text-mist" dir="ltr">{vehicle.price}</p>
      </div>
      <Link href="/contact" tabIndex={show ? 0 : -1} className="hidden h-11 items-center rounded-full border border-line px-5 text-[0.82rem] font-medium text-fog transition-colors hover:border-fog sm:inline-flex">
        {t(C.carPage.testDrive)}
      </Link>
      <a
        href={`mailto:${C.contactInfo.email}?subject=${subject}`}
        tabIndex={show ? 0 : -1}
        className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-[0.85rem] font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
        style={{ background: vehicle.accent }}
      >
        <Mail className="size-4" aria-hidden="true" />
        {t(C.carPage.enquire)}
      </a>
    </div>
  );
}
