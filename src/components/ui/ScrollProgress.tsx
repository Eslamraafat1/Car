"use client";

import { motion, useScroll } from "framer-motion";
import { useLang } from "@/lib/i18n";

/** Thin reading-progress line pinned to the leading edge of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const { dir } = useLang();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[95] h-[2px] bg-volt"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: dir === "rtl" ? "right" : "left",
      }}
    />
  );
}
