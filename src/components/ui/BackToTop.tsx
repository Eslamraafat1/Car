"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/motion";
import { getLenis } from "@/lib/smooth-scroll";

export default function BackToTop() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const { dir } = useLang();
  const reduced = useReducedMotion();

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = progress > 0.45;
    if (next !== visible) setVisible(next);
  });

  const label = dir === "rtl" ? "العودة للأعلى" : "Back to top";

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => {
            const lenis = getLenis();
            if (lenis) lenis.scrollTo(0, { immediate: Boolean(reduced) });
            else window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
          }}
          aria-label={label}
          title={label}
          initial={{ opacity: 0, y: 18, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.85 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="fixed bottom-6 end-6 z-[80] inline-flex size-12 items-center justify-center rounded-full bg-fog text-ink shadow-[0_14px_40px_-18px_rgba(0,0,0,0.5)] transition-colors duration-300 hover:text-volt focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt lg:bottom-10 lg:end-10"
        >
          <ArrowUp className="size-5" strokeWidth={2.2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
