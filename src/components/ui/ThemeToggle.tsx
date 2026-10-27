"use client";

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
      <Moon className={`absolute size-[1.05rem] transition-all duration-300 ${theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`} strokeWidth={1.9} />
      <Sun className={`absolute size-[1.05rem] transition-all duration-300 ${theme === "dark" ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"}`} strokeWidth={1.9} />
    </button>
  );
}
