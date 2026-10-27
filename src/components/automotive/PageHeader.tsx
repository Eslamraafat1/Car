"use client";

import Image from "next/image";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { BiStr } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { gsap, useGSAP, useReducedMotion } from "@/lib/motion";
import KineticHeading from "@/components/ui/KineticHeading";
import dynamic from "next/dynamic";

const ShaderImage = dynamic(() => import("@/components/three/ShaderImage"), { ssr: false });

interface PageHeaderProps {
  eyebrow: BiStr;
  title: BiStr;
  body?: BiStr;
  children?: ReactNode;
}

const pageArt = {
  explore: {
    image: "/media/images/car-warehouse.jpg",
    accent: "#b7a1ff",
    mark: "01 / THE COLLECTION",
    note: { ar: "مجموعة مختارة بعناية", en: "THE CURATED COLLECTION" },
  },
  about: {
    image: "/media/images/lab-tech.jpg",
    accent: "#d7b078",
    mark: "02 / THE STORY",
    note: { ar: "القصة وراء كل اختيار", en: "THE STORY BEHIND THE CHOICE" },
  },
  contact: {
    image: "/media/images/car-amg-harbor.jpg",
    accent: "#75d6c3",
    mark: "03 / THE STUDIO",
    note: { ar: "نقطة البداية لكل رحلة", en: "WHERE EVERY STORY BEGINS" },
  },
  blog: {
    image: "/media/images/night-city.jpg",
    accent: "#ff8a5c",
    mark: "04 / THE JOURNAL",
    note: { ar: "أفكار من عالم السيارات", en: "NOTES FROM THE CAR WORLD" },
  },
} as const;

/** Each destination gets its own art direction while sharing accessible page semantics. */
export default function PageHeader({ eyebrow, title, body, children }: PageHeaderProps) {
  const { t, lang } = useLang();
  const pathname = usePathname();
  const rootRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ".page-masthead-parallax",
        { yPercent: -4, scale: 1.08 },
        {
          yPercent: 4,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      gsap.to(".page-masthead-glow", {
        y: 110,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: rootRef, dependencies: [reduced], revertOnUpdate: true },
  );

  const page = pathname.startsWith("/about")
    ? "about"
    : pathname.startsWith("/contact")
      ? "contact"
      : pathname.startsWith("/blog")
        ? "blog"
        : "explore";
  const art = pageArt[page];
  const style = { "--page-accent": art.accent } as CSSProperties & { "--page-accent": string };

  return (
    <header
      ref={rootRef}
      data-page-header={page}
      style={style}
      className="page-masthead relative isolate overflow-hidden border-b border-line bg-ink"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="page-masthead-glow absolute -top-48 end-[-10%] size-[36rem] rounded-full" />
        <div className="page-masthead-grid absolute inset-0 opacity-30" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1500px] items-center gap-10 px-4 pb-12 pt-28 sm:px-6 sm:pb-16 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:pb-20 lg:pt-36">
        <div className={`relative z-10 lg:col-span-7`}>
          <div className="flex items-center gap-3">
            <span className="page-masthead-diamond size-2 rotate-45" />
            <p className="eyebrow page-masthead-eyebrow">{t(eyebrow)}</p>
          </div>
          <KineticHeading
            level={1}
            text={title}
            className="display h-hero mt-5 max-w-5xl text-fog"
          />
          {body && <p className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-mist lg:text-[1.05rem]">{t(body)}</p>}
          {children}
          <div className="mt-8 flex items-center gap-3">
            <span className="page-masthead-rule h-px w-12" />
            <span className="numeral text-[0.62rem] tracking-[0.2em] text-dim">{art.mark}</span>
          </div>
        </div>

        <div className={`relative lg:col-span-5`}>
          <figure className={`page-masthead-art page-masthead-art--${page} group relative isolate overflow-hidden border border-white/10 bg-ink-2`}>
            <div className="page-masthead-parallax absolute inset-0 will-change-transform">
              <Image
                src={art.image}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="page-masthead-image object-cover"
              />
              <ShaderImage src={art.image} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />
            <div className="page-masthead-art-grid absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
              <figcaption className="eyebrow max-w-[22ch] text-white/80">{t(art.note)}</figcaption>
              <span className="page-masthead-index numeral text-[clamp(2.2rem,5vw,4.5rem)] leading-none text-white/70">0{["explore", "about", "contact", "blog"].indexOf(page) + 1}</span>
            </div>
            <span className="page-masthead-corner absolute start-4 top-4 size-8 border-s-2 border-t-2 sm:start-6 sm:top-6" />
            <span className="page-masthead-corner absolute end-4 bottom-4 size-8 rotate-180 border-s-2 border-t-2 sm:end-6 sm:bottom-6" />
          </figure>


          <span className="absolute -bottom-4 end-5 z-10 hidden bg-ink px-3 py-1 font-display text-[0.62rem] tracking-[0.2em] text-dim sm:block">{lang === "ar" ? "إطار مختار" : "EVAY / FRAME"}</span>
        </div>
      </div>
    </header>
  );
}
