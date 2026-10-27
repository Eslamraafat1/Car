"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Search } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import type { Vehicle } from "@/lib/vehicles";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";

const ZOOM = 2.4;

/**
 * Car page — a magnifier follows the pointer (or a finger dragged sideways)
 * over the photograph. The high-resolution layer is only requested on first touch.
 */
export default function ImageLens({ vehicle }: { vehicle: Vehicle }) {
  const { t, lang } = useLang();
  const boxRef = useRef<HTMLDivElement | null>(null);
  const lensRef = useRef<HTMLDivElement | null>(null);
  const [armed, setArmed] = useState(false);
  // same optimised URL the <Image> below already requests, so it is usually cached
  const hi = `/_next/image?url=${encodeURIComponent(vehicle.image)}&w=1920&q=75`;

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const box = boxRef.current;
    const lens = lensRef.current;
    if (!box || !lens) return;
    if (!armed) setArmed(true);
    const r = box.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const d = lens.offsetWidth;
    // the photo is drawn with object-fit: cover, so mirror that crop for the zoomed layer
    const img = box.querySelector("img");
    const nw = img?.naturalWidth || 3;
    const nh = img?.naturalHeight || 2;
    const scale = Math.max(r.width / nw, r.height / nh);
    const dw = nw * scale;
    const dh = nh * scale;
    const ox = (r.width - dw) / 2;
    const oy = (r.height - dh) / 2;
    lens.style.opacity = "1";
    lens.style.transform = `translate3d(${x - d / 2}px, ${y - d / 2}px, 0) scale(1)`;
    lens.style.backgroundSize = `${dw * ZOOM}px ${dh * ZOOM}px`;
    lens.style.backgroundPosition = `${-((x - ox) * ZOOM - d / 2)}px ${-((y - oy) * ZOOM - d / 2)}px`;
  };
  const leave = () => {
    const lens = lensRef.current;
    if (lens) {
      lens.style.opacity = "0";
      lens.style.transform = lens.style.transform.replace(/scale\([^)]*\)/, "scale(0.6)");
    }
  };

  return (
    <section className="relative bg-ink-2 py-20 lg:py-28" aria-labelledby="lens-title">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal><p className="eyebrow" style={{ color: vehicle.accent }}>{t(C.carPage.lensEyebrow)}</p></Reveal>
        <KineticHeading id="lens-title" text={C.carPage.lensTitle} className="display h-section mt-4 max-w-3xl text-fog" />

        <Reveal delay={0.1}>
          <div
            ref={boxRef}
            onPointerMove={move}
            onPointerDown={move}
            onPointerLeave={leave}
            onPointerUp={(e) => e.pointerType === "touch" && leave()}
            className="relative mt-8 aspect-[4/3] cursor-none touch-pan-y select-none overflow-hidden rounded-[28px] hairline bg-ink sm:aspect-[16/9] lg:mt-12"
          >
            <Image src={vehicle.image} alt={t(vehicle.alt)} fill sizes="(min-width: 1400px) 1320px, 100vw" className="object-cover" loading="lazy" draggable={false} />
            <div
              ref={lensRef}
              className="pointer-events-none absolute start-0 top-0 size-[8.5rem] rounded-full border-2 border-white/80 opacity-0 shadow-[0_18px_50px_-10px_rgba(0,0,0,0.6)] transition-[opacity] duration-200 sm:size-[11rem] lg:size-[13rem]"
              style={{ backgroundImage: armed ? `url(${hi})` : undefined, backgroundRepeat: "no-repeat", transform: "scale(0.6)" }}
              aria-hidden="true"
            />
            <span className="pointer-events-none absolute bottom-4 start-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/50 px-4 py-2 text-[0.74rem] text-white/90 lg:backdrop-blur-md">
              <Search className="size-3.5" />
              {t(C.carPage.lensHint)}
            </span>
          </div>
        </Reveal>
        <span className="sr-only">{lang === "ar" ? "صورة قابلة للتكبير" : "Zoomable photograph"}</span>
      </div>
    </section>
  );
}
