"use client";

import { useCallback, useEffect, useRef, useState } from "react";


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
