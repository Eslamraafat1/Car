"use client";

import { useEffect, useRef, useState } from "react";
import type { BiStr } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * The breathing line between chapters: a hairline whose light runs across it
 * once when it enters the viewport, tagged with the chapter number. It gives
 * every long page a film-reel rhythm instead of a stack of anonymous blocks.
 */
export default function ChapterSweep({
  index,
  total,
  label,
  accent,
}: {
  index: number;
  total: number;
  label?: BiStr;
  accent?: string;
}) {
  const { t } = useLang();
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const num = String(index).padStart(2, "0");

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ "--sweep-accent": accent ?? "var(--c-volt)" } as React.CSSProperties}
      className={`chapter-sweep relative py-7 sm:py-9 ${on || reduced ? "is-on" : ""}`}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-4 px-4 sm:gap-5 sm:px-6 lg:px-10">
        <span className="numeral shrink-0 text-[0.6rem] tracking-[0.3em] text-dim">
          CH.{num}
          <span className="text-white/20"> / {String(total).padStart(2, "0")}</span>
        </span>
        <span className="relative h-px flex-1 overflow-hidden bg-line">
          <span className="chapter-sweep-run absolute inset-y-0 w-1/3" />
        </span>
        <span
          className="chapter-sweep-dot size-1.5 shrink-0 rotate-45"
          style={{ background: accent ?? "var(--c-volt)" }}
        />
        {label && (
          <span
            className="shrink-0 text-[0.68rem] tracking-[0.14em] text-mist"
            style={{ color: accent ?? undefined }}
          >
            {t(label)}
          </span>
        )}
      </div>
    </div>
  );
}
