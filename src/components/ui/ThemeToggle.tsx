"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

const LABELS = {
  toDark: { ar: "الوضع الداكن", en: "Dark mode" },
  toLight: { ar: "الوضع الفاتح", en: "Light mode" },
};

interface ThemeToggleProps {
  /** `overlay` keeps the control readable over dark media (e.g. the hero). */
  variant?: "surface" | "overlay";
  className?: string;
}

export default function ThemeToggle({ variant = "surface", className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLang();

  const tone =
    variant === "overlay"
      ? "border-white/30 text-white hover:border-white/70 hover:text-white"
      : "border-line text-fog hover:border-volt hover:text-volt";

  return (
    <button
      type="button"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      aria-label={t(theme === "dark" ? LABELS.toLight : LABELS.toDark)}
      title={t(theme === "dark" ? LABELS.toLight : LABELS.toDark)}
      className={`group relative inline-flex size-10 items-center justify-center overflow-hidden rounded-full border transition-colors duration-300 ${tone} ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -110, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 110, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {theme === "dark" ? (
            <Moon className="size-[1.05rem]" strokeWidth={1.9} />
          ) : (
            <Sun className="size-[1.05rem]" strokeWidth={1.9} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
