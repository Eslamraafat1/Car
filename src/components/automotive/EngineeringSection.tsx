"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";

export default function EngineeringSection() {
  const { t, lang } = useLang();

  return (
    <section
      className="relative bg-ink py-20 lg:py-32"
      aria-labelledby="engineering-title"
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 border-b border-line pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-volt">{t(C.engineering.eyebrow)}</p>
            <h2 id="engineering-title" className="display h-section mt-4 text-fog">
              {t(C.engineering.title)}
            </h2>
          </div>
          <p className="text-[0.95rem] leading-relaxed text-mist lg:col-span-5">
            {t(C.engineering.body)}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {C.engineering.tiles.map((tile, index) => (
            <motion.article
              key={tile.title.en}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.75, delay: index * 0.09, ease: [0.32, 0.72, 0, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-3xl hairline bg-ink-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={tile.image}
                  alt={t(tile.alt)}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/20 to-transparent" />
                <span className="absolute bottom-4 start-4 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-[0.7rem] tracking-wide text-white/85 backdrop-blur-sm">
                  {t(tile.tag)}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 lg:p-7">
                <span className="numeral text-[0.7rem] tracking-[0.3em] text-volt">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-fog">
                  {t(tile.title)}
                </h3>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-mist">{t(tile.body)}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-[0.75rem] text-dim">
          {lang === "ar"
            ? "الأرقام الواردة توضيحية لأغراض العرض."
            : "Figures shown here are illustrative and for presentation only."}
        </p>
      </div>
    </section>
  );
}
