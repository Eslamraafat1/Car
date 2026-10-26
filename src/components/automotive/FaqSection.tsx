"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";

/** Home — accordion with smooth height animation (grid-rows trick, no layout JS). */
export default function FaqSection() {
  const { t } = useLang();
  const [open, setOpen] = useState(0);

  return (
    <section className="relative bg-ink-2 py-20 lg:py-32" aria-labelledby="faq-title">
      <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow text-volt">{t(C.faq.eyebrow)}</p>
          </Reveal>
          <KineticHeading id="faq-title" text={C.faq.title} className="display h-section mt-4 text-fog" />
        </div>
        <ul className="lg:col-span-8">
          {C.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q.en} className="border-b border-line first:border-t">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-start sm:py-6"
                  >
                    <span className={`font-display text-[1.05rem] font-semibold transition-colors duration-300 sm:text-xl ${isOpen ? "text-volt" : "text-fog group-hover:text-volt"}`}>
                      {t(item.q)}
                    </span>
                    <span className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-500 ${isOpen ? "rotate-45 border-volt bg-volt text-white" : "text-fog group-hover:border-volt"}`}>
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <div id={`faq-${i}`} role="region" className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 text-[0.95rem] leading-[1.9] text-mist">{t(item.a)}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
