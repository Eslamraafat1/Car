"use client";

import { Fragment, useRef } from "react";
import type { BiStr } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, usePrefersReducedMotion } from "@/lib/motion";

/**
 * A display heading whose words rise out of their own baseline one after
 * another as the section enters the viewport — the signature move of
 * award-site typography. Words stay readable to screen readers through a
 * visually-hidden duplicate, and under reduced motion the text simply renders.
 */
export default function KineticHeading({
  text,
  level = 2,
  className = "",
  id,
  delay = 0,
  stagger = 0.055,
}: {
  text: BiStr;
  level?: 1 | 2 | 3;
  className?: string;
  id?: string;
  delay?: number;
  stagger?: number;
}) {
  const { t, lang } = useLang();
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLHeadingElement | null>(null);
  const words = t(text).split(/\s+/).filter(Boolean);
  const Tag = (level === 1 ? "h1" : level === 3 ? "h3" : "h2") as "h2";

  useGSAP(
    () => {
      if (reduced) return;
      const cells = rootRef.current?.querySelectorAll<HTMLElement>(".kw");
      if (!cells?.length) return;
      gsap.fromTo(
        cells,
        { yPercent: 118, rotate: 2.5, opacity: 0 },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power4.out",
          stagger,
          delay,
          scrollTrigger: { trigger: rootRef.current, start: "top 88%", once: true },
        },
      );
    },
    { scope: rootRef, dependencies: [reduced, lang], revertOnUpdate: true },
  );

  if (reduced) {
    return (
      <Tag ref={rootRef} id={id} lang={lang} className={className}>
        {t(text)}
      </Tag>
    );
  }

  return (
    <Tag ref={rootRef} id={id} lang={lang} className={`kinetic ${className}`}>
      <span className="sr-only">{t(text)}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <span className="kw-wrap">
              <span className="kw">{word}</span>
            </span>
            {index < words.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
