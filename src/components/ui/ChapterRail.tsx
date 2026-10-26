"use client";

import { useEffect, useState } from "react";
import type { BiStr } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { scrollToId } from "@/lib/smooth-scroll";

type Chapter = { id: string; num: string; label: BiStr };

/** The major narrative beats of the homepage scroll story (not every section). */
const CHAPTERS: Chapter[] = [
  { id: "hero", num: "01", label: { ar: "المقدمة", en: "Intro" } },
  { id: "story", num: "02", label: { ar: "الكشف", en: "The Reveal" } },
  { id: "design", num: "03", label: { ar: "التصميم", en: "Design" } },
  { id: "lineup", num: "04", label: { ar: "الموديلات", en: "Lineup" } },
  { id: "performance", num: "05", label: { ar: "الأداء", en: "Performance" } },
  { id: "collection", num: "06", label: { ar: "الأسطول", en: "The Fleet" } },
];

/**
 * A vertical chapter rail that tracks scroll position across the homepage's
 * narrative sections. Appears once the hero is off-screen, lights the beat
 * crossing the viewport centre, and expands its label. Purely additive and
 * desktop-only — it degrades to nothing on small screens.
 */
export default function ChapterRail() {
  const { t, lang } = useLang();
  const [active, setActive] = useState<string>("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );

    // Fade the rail in only after the hero has left the viewport.
    const visibility = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0,
    });
    if (hero) visibility.observe(hero);

    // Light whichever beat is crossing the vertical centre of the screen.
    const beats = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sections.forEach((section) => beats.observe(section));

    return () => {
      visibility.disconnect();
      beats.disconnect();
    };
  }, []);

  return (
    <nav
      aria-label={lang === "ar" ? "فصول الصفحة" : "Page chapters"}
      className={`fixed inset-y-0 z-40 hidden items-center ps-6 transition-opacity duration-500 lg:flex ${
        visible ? "opacity-100" : "pointer-events-none invisible opacity-0"
      }`}
    >
      <ul className="pointer-events-auto flex flex-col gap-4">
        {CHAPTERS.map((chapter) => {
          const isActive = active === chapter.id;
          return (
            <li key={chapter.id}>
              <button
                type="button"
                onClick={() => scrollToId(chapter.id)}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center gap-3"
              >
                <span
                  className={`h-px transition-all duration-300 ease-out ${
                    isActive
                      ? "w-10 bg-volt"
                      : "w-5 bg-line group-hover:w-8 group-hover:bg-mist"
                  }`}
                />
                <span
                  className={`text-[0.62rem] font-semibold tracking-[0.22em] transition-colors duration-300 ${
                    isActive ? "text-fog" : "text-dim group-hover:text-mist"
                  }`}
                >
                  {chapter.num}
                </span>
                <span
                  className={`overflow-hidden whitespace-nowrap text-[0.72rem] tracking-wide transition-all duration-300 ease-out ${
                    isActive ? "max-w-[9rem] opacity-100" : "max-w-0 opacity-0"
                  }`}
                >
                  <span className={isActive ? "text-volt" : "text-mist"}>{t(chapter.label)}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
