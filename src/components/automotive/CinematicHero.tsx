"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, useReducedMotion } from "@/lib/motion";
import { scrollToId } from "@/lib/smooth-scroll";
import Image from "next/image";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

export default function CinematicHero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const { t, lang } = useLang();
  const reduced = useReducedMotion();

  const words = t(C.hero.title).split(" ");

  useGSAP(
    () => {
      if (reduced) return;

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".hero-media", { scale: 1.14, duration: 2.6, ease: "power2.out" }, 0)
        .from(".hero-word", { yPercent: 115, duration: 1.15, stagger: 0.075 }, 0.15)
        .from(".hero-eyebrow", { autoAlpha: 0, y: 18, duration: 0.8 }, 0.5)
        .from(".hero-sub", { autoAlpha: 0, y: 22, duration: 0.9 }, 0.75)
        .from(".hero-actions", { autoAlpha: 0, y: 22, duration: 0.9 }, 0.9)
        .from(".hero-hint", { autoAlpha: 0, duration: 0.8 }, 1.2);

      gsap
        .timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.25,
        },
        })
        .to(".hero-content", { yPercent: -32, autoAlpha: 0, ease: "none" }, 0)
        .to(".hero-media", { scale: 1.1, ease: "none" }, 0)
        .to(".hero-dim", { autoAlpha: 1, ease: "none" }, 0);
    },
    { scope: rootRef, dependencies: [reduced, lang] },
  );

  useGSAP(
    () => {
      if (reduced) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;

      const media = rootRef.current?.querySelector<HTMLElement>(".hero-media");
      if (!media) return;

      const xTo = gsap.quickTo(media, "x", { duration: 1.1, ease: "power3.out" });
      const yTo = gsap.quickTo(media, "y", { duration: 1.1, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        xTo(nx * 18);
        yTo(ny * 12);
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: rootRef, dependencies: [reduced] },
  );

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative isolate flex h-[100svh] min-h-[620px] flex-col overflow-hidden bg-ink"
      aria-label={lang === "ar" ? "المشهد الافتتاحي" : "Opening scene"}
    >
      <div className="hero-media absolute inset-0 will-change-transform">
        <Image
          src="/media/hero/f8.webp"
          alt={lang === "ar" ? "فيراري إف ٨ حمراء عند الغروب" : "Red Ferrari F8 at sunset"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <HeroScene src="/media/hero/f8.webp" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/5 to-black/85" />
      <div className="pointer-events-none absolute inset-0 scrim-edges opacity-90" />
      <div className="hero-dim pointer-events-none absolute inset-0 bg-ink opacity-0" />
      <div className="pointer-events-none absolute inset-0 grain" />

      <div className="pointer-events-none absolute inset-x-0 top-[22%] h-px overflow-hidden">
        <span className="streak start-[8%] top-0" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-[38%] h-px overflow-hidden">
        <span className="streak start-[30%] top-0" style={{ animationDelay: "2.4s" }} />
      </div>

      <div className="hero-content relative z-10 mt-auto w-full px-4 pb-24 pt-28 sm:px-6 lg:px-10 lg:pb-28">
        <div className="mx-auto w-full max-w-[1400px]">
          <p className="hero-eyebrow eyebrow text-[#4da3ff]">{t(C.hero.eyebrow)}</p>

          <h1 className="display h-hero mt-5 max-w-[16ch] text-white">
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="me-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom"
                aria-hidden="true"
              >
                <span className="hero-word inline-block will-change-transform">{word}</span>
              </span>
            ))}
            <span className="sr-only">{t(C.hero.title)}</span>
          </h1>

          <div className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="hero-sub max-w-md text-[0.98rem] leading-relaxed text-white/75">
              {t(C.hero.sub)}
            </p>

            <div className="hero-actions flex flex-wrap items-center gap-3">
              <Link
                href="/explore"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-fog px-7 text-[0.88rem] font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
              >
                {t(C.hero.primary)}
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  strokeWidth={2.2}
                />
              </Link>
              <button
                type="button"
                onClick={() => scrollToId("story")}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 px-7 text-[0.88rem] font-medium text-white transition-colors duration-300 hover:border-white/60 hover:bg-white/5"
              >
                {t(C.hero.secondary)}
                <ArrowDown className="size-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-badge pointer-events-none absolute end-6 top-32 z-10 hidden size-32 items-center justify-center lg:flex xl:end-12" aria-hidden="true">
        <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 size-full text-white/70">
          <defs>
            <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <text fill="currentColor" fontSize="9.2" letterSpacing="3.4" className="keep-tracking font-display">
            <textPath href="#badge-circle">EVAY · PREMIUM CARS · SINCE 2012 · </textPath>
          </text>
        </svg>
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md">
          <ArrowDown className="size-5" strokeWidth={1.8} />
        </span>
      </div>

      <div className="hero-hint pointer-events-none absolute bottom-6 end-4 z-10 hidden items-center gap-3 sm:flex lg:end-10">
        <span className="eyebrow text-white/60">{t(C.hero.scroll)}</span>
        <span className="scroll-hint block h-10 w-px bg-gradient-to-b from-white/70 to-transparent" />
      </div>
    </section>
  );
}
