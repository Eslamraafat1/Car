"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/motion";
import { registerLenis } from "@/lib/smooth-scroll";

/**
 * Global smooth scrolling. Lenis drives the scroll position and GSAP's ticker
 * keeps ScrollTrigger in sync. Disabled entirely for reduced-motion users.
 */
export default function SmoothScrollProvider() {
  const reduced = useReducedMotion();

  useEffect(() => {
    /* Touch devices already have native momentum scrolling — Lenis would only
       fight it and add per-frame work, so it is desktop-only. */
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) {
      registerLenis(null);
      const onLoad = () => ScrollTrigger.refresh();
      if (document.readyState === "complete") onLoad();
      else window.addEventListener("load", onLoad, { once: true });
      return () => window.removeEventListener("load", onLoad);
    }

    const lenis = new Lenis({
      lerp: 0.11,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      autoRaf: false,
    });

    registerLenis(lenis);

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => window.requestAnimationFrame(() => ScrollTrigger.refresh());
    window.addEventListener("load", onLoad);

    let fontsFrame = 0;
    if (document.fonts) {
      document.fonts.ready.then(() => {
        fontsFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    }

    return () => {
      window.removeEventListener("load", onLoad);
      window.cancelAnimationFrame(fontsFrame);
      gsap.ticker.remove(raf);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      registerLenis(null);
    };
  }, [reduced]);

  return null;
}
