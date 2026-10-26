"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, useReducedMotion } from "@/lib/motion";

interface StackingCardsProps {
  children: ReactNode;
  className?: string;
  /** How far a receded card scales down (0.08 = 8%). */
  depth?: number;
}

/**
 * Sticky stacking deck.
 *
 * Cards are plain sticky siblings (no ScrollTrigger pinning, so the page never
 * traps the user), while GSAP only owns the depth feedback: as the next card
 * arrives, the current one scales back, drifts upward and dims.
 */
export default function StackingCards({ children, className = "", depth = 0.08 }: StackingCardsProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      const cards = gsap.utils.toArray<HTMLElement>(".stack-item", rootRef.current);
      const mm = gsap.matchMedia();

      const bind = (amount: number) => {
        cards.forEach((card, index) => {
          const next = cards[index + 1];
          if (!next) return;

          const media = card.querySelector(".stack-media");
          const dim = card.querySelector(".stack-dim");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top top+=88",
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          });

          tl.to(card, { scale: 1 - amount, yPercent: -3, ease: "none" }, 0);
          if (dim) tl.to(dim, { autoAlpha: 0.55, ease: "none" }, 0);
          if (media) tl.fromTo(media, { yPercent: -6 }, { yPercent: 6, ease: "none" }, 0);
        });
      };

      mm.add("(min-width: 1024px)", () => bind(depth));
      mm.add("(max-width: 1023px)", () => bind(depth * 0.55));

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [reduced, depth], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef} className={`relative flex flex-col gap-[3svh] ${className}`}>
      {children}
    </div>
  );
}
