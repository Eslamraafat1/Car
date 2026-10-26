"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { C, type BiStr } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import MagneticButton from "@/components/ui/MagneticButton";

export type FinalePage =
  | "home"
  | "explore"
  | "electric"
  | "performance"
  | "about"
  | "contact"
  | "car";

type CSSVars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * The shared stage every page finale performs on: full-bleed dark set, edge
 * scrim, film grain, a ghost word and a centred content column.
 */
export function FinaleShell({
  page,
  accent,
  ghost,
  image,
  imageAlt,
  imageClassName = "",
  children,
}: {
  page: FinalePage;
  accent: string;
  ghost: string;
  image?: string;
  imageAlt?: BiStr;
  imageClassName?: string;
  children: ReactNode;
}) {
  const { t } = useLang();
  return (
    <section
      data-final-page={page}
      style={{ "--final-accent": accent } as CSSVars}
      className="finale cinema relative isolate flex min-h-[78svh] flex-col overflow-hidden bg-ink"
      aria-labelledby="finale-title"
    >
      {image && (
        <Image
          src={image}
          alt={imageAlt ? t(imageAlt) : ""}
          fill
          sizes="100vw"
          className={`object-cover ${imageClassName}`}
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/78 to-black" />
      <div className="absolute inset-0 scrim-edges opacity-80" />
      <div className="absolute inset-0 grain" />
      <div
        className="pointer-events-none absolute end-[-4vw] top-[6%] select-none font-display text-[clamp(6rem,18vw,20rem)] font-black leading-none tracking-[-.09em] text-white/[0.03]"
        aria-hidden="true"
      >
        {ghost}
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
        aria-hidden="true"
      />
      <div className="relative flex flex-1 flex-col justify-center px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto w-full max-w-[1400px]">{children}</div>
      </div>
    </section>
  );
}

export function FinaleEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-10 bg-volt" aria-hidden="true" />
      <p className="eyebrow text-volt">{children}</p>
    </div>
  );
}

export function FinaleTitle({ children }: { children: ReactNode }) {
  return (
    <h2 id="finale-title" className="display mt-6 max-w-[14ch] text-[clamp(2.3rem,6.2vw,5.4rem)] leading-[0.95] tracking-[-0.045em] text-fog">
      {children}
    </h2>
  );
}

export function FinaleBody({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-white/70">{children}</p>
  );
}

export function FinaleActions({ extra }: { extra?: ReactNode }) {
  const { t } = useLang();
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <MagneticButton>
        <Link
          href="/explore"
          className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-fog px-7 text-[0.88rem] font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
        >
          {t(C.finalCta.primary)}
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            strokeWidth={2.2}
          />
        </Link>
      </MagneticButton>
      <MagneticButton>
        <Link
          href="/contact"
          className="inline-flex min-h-12 items-center rounded-full border border-white/30 px-7 text-[0.88rem] font-medium text-white transition-colors duration-300 hover:border-white/70 hover:bg-white/5"
        >
          {t(C.finalCta.secondary)}
        </Link>
      </MagneticButton>
      {extra}
    </div>
  );
}

interface HoldOptions {
  /** Milliseconds of held press needed to reach 1. */
  duration?: number;
  /** Retreat towards 0 when released (rev-style) instead of freezing. */
  decay?: boolean;
  /** Stay pinned at 1 after completion until `reset()` (ignition-style). */
  latch?: boolean;
  onComplete?: () => void;
}

interface HoldController {
  progress: number;
  holding: boolean;
  fired: boolean;
  reset: () => void;
  bind: {
    onPointerDown: (event: React.PointerEvent<HTMLElement>) => void;
    onPointerUp: (event: React.PointerEvent<HTMLElement>) => void;
    onPointerLeave: (event: React.PointerEvent<HTMLElement>) => void;
    onPointerCancel: (event: React.PointerEvent<HTMLElement>) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
    onKeyUp: (event: React.KeyboardEvent<HTMLElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLElement>) => void;
  };
}

/**
 * Press-and-hold progress from 0 → 1, driven by one rAF loop that only runs
 * while something is actually moving. Works with pointer and keyboard, and is
 * deliberately forgiving: releasing early does not throw the progress away.
 */
export function useHold({ duration = 1600, decay = true, latch = false, onComplete }: HoldOptions = {}): HoldController {
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const [fired, setFired] = useState(false);

  const progressRef = useRef(0);
  const holdingRef = useRef(false);
  const firedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);

  const optsRef = useRef({ duration, decay, latch });
  useEffect(() => {
    optsRef.current = { duration, decay, latch };
  });

  const decayRef = useRef(decay);
  useEffect(() => {
    decayRef.current = decay;
  });

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  const tickRef = useRef<(now: number) => void>(() => {});
  useEffect(() => {
    tickRef.current = (now: number) => {
      const { duration, decay, latch } = optsRef.current;
      const dt = Math.min(now - lastRef.current, 80);
      lastRef.current = now;

      const prev = progressRef.current;
      let next: number;
      if (latch && firedRef.current) {
        next = 1;
      } else if (holdingRef.current) {
        next = prev + dt / duration;
      } else if (decay) {
        next = prev - dt / (duration * 0.55);
      } else {
        next = prev; // frozen where the finger left it
      }
      next = Math.max(0, Math.min(1, next));
      progressRef.current = next;
      setProgress(next);

      if (next >= 1 && !firedRef.current) {
        firedRef.current = true;
        setFired(true);
        onCompleteRef.current?.();
      }

      // Keep the loop alive only while held, or while decaying back down.
      const latchedAndDone = latch && firedRef.current && !holdingRef.current;
      const keepGoing = !latchedAndDone && (holdingRef.current || (decay && next > 0));
      if (!keepGoing) {
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(tickRef.current);
    };
  });

  const schedule = useCallback(() => {
    if (rafRef.current != null) return;
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame((now) => tickRef.current(now));
  }, []);

  const start = useCallback(() => {
    const { latch } = optsRef.current;
    if (latch && firedRef.current) return;
    if (!holdingRef.current) {
      holdingRef.current = true;
      setHolding(true);
    }
    schedule();
  }, [schedule]);

  const stop = useCallback(() => {
    if (!holdingRef.current) return;
    holdingRef.current = false;
    setHolding(false);
    // A released, decaying progress bar needs the loop again to fall back.
    if (decayRef.current && progressRef.current > 0 && progressRef.current < 1) {
      schedule();
    }
  }, [schedule]);

  const reset = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    holdingRef.current = false;
    firedRef.current = false;
    progressRef.current = 0;
    setHolding(false);
    setFired(false);
    setProgress(0);
  }, []);

  const bind: HoldController["bind"] = {
    onPointerDown: (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      start();
    },
    onPointerUp: stop,
    onPointerLeave: stop,
    onPointerCancel: stop,
    onKeyDown: (event) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        start();
      }
    },
    onKeyUp: (event) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        stop();
      }
    },
    onBlur: stop,
  };

  return { progress, holding, fired, reset, bind };
}
