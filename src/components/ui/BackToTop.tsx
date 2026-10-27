"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getLenis } from "@/lib/smooth-scroll";
import { prefersReducedMotion } from "@/lib/motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { dir } = useLang();

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(max > 0 && window.scrollY / max > 0.45);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const label = dir === "rtl" ? "العودة للأعلى" : "Back to top";

  return (
    <button
      type="button"
      onClick={() => {
        const lenis = getLenis();
        const instant = prefersReducedMotion();
        if (lenis) lenis.scrollTo(0, { immediate: instant });
        else window.scrollTo({ top: 0, behavior: instant ? "auto" : "smooth" });
      }}
      aria-label={label}
      title={label}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] end-5 z-[80] inline-flex size-12 items-center justify-center rounded-full bg-fog text-ink shadow-[0_14px_40px_-18px_rgba(0,0,0,0.5)] transition-all duration-300 hover:text-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt lg:bottom-10 lg:end-10 ${
        visible ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-90 opacity-0"
      }`}
    >
      <ArrowUp className="size-5" strokeWidth={2.2} />
    </button>
  );
}
