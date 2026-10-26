"use client";

import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import KineticHeading from "@/components/ui/KineticHeading";
import Reveal from "@/components/ui/Reveal";

const TONES = ["from-[#1f7bff] to-[#7a5cff]", "from-[#ff6a2b] to-[#ff3d81]", "from-[#17b3a6] to-[#1f7bff]", "from-[#d7b078] to-[#ff6a2b]"];

/** About — team cards with generated avatars (placeholders until real portraits arrive). */
export default function Team() {
  const { t } = useLang();
  return (
    <section className="relative bg-ink py-20 lg:py-28" aria-labelledby="team-title">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal><p className="eyebrow text-volt">{t(C.team.eyebrow)}</p></Reveal>
        <KineticHeading id="team-title" text={C.team.title} className="display h-section mt-4 max-w-3xl text-fog" />
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {C.team.members.map((m, i) => (
            <li key={m.name.en}>
              <Reveal delay={i * 0.08} className="h-full">
                <article className="group h-full overflow-hidden rounded-[24px] hairline bg-ink-2 transition-all duration-500 hover:-translate-y-2 hover:border-volt/50">
                  <div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${TONES[i % TONES.length]}`}>
                    <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_20%,#fff,transparent_55%)]" />
                    <span className="absolute inset-0 grid place-items-center font-display text-[clamp(3rem,9vw,5.5rem)] font-bold text-white/90 transition-transform duration-700 group-hover:scale-110">
                      {m.name.en.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                    </span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-display text-[1rem] font-semibold text-fog sm:text-lg">{t(m.name)}</h3>
                    <p className="mt-1 text-[0.8rem] text-mist sm:text-[0.86rem]">{t(m.role)}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[0.72rem] text-dim">{t(C.team.note)}</p>
      </div>
    </section>
  );
}
