"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Download, Printer } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { getVehicle, type Vehicle } from "@/lib/vehicles";

const W = 794;
const H = 1123;
const ACCENT = "#1f6fe0";
const INK = "#0a0b0d";
const MUTE = "#5a606b";

const CARS = ["ferrari-f8-tributo", "porsche-911-turbo-s", "mercedes-amg-c63", "tesla-roadster", "lamborghini-huracan-evo", "bmw-i8"]
  .map((s) => getVehicle(s))
  .filter((v): v is Vehicle => Boolean(v));

/** One A4 sheet. On screen it scales to fit the viewport; when printed it is exactly A4. */
function Sheet({ children, scale, dark = false }: { children: ReactNode; scale: number; dark?: boolean }) {
  return (
    <div className="profile-sheet-wrap mx-auto overflow-hidden" style={{ width: W * scale, height: H * scale }}>
      <div
        className="profile-page relative overflow-hidden shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5)]"
        style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left", background: dark ? "#0b0d12" : "#ffffff", color: dark ? "#fff" : INK }}
      >
        {children}
      </div>
    </div>
  );
}

function Mark({ size = 34 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true"><rect width="32" height="32" rx="9" fill="#2f7bff" /><path d="M9 10h14M9 16h10M9 22h14" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" fill="none" /></svg>
  );
}

function Head({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-end justify-between border-b pb-4" style={{ borderColor: "#e4e6ea" }}>
      <div className="flex items-center gap-3"><Mark size={28} /><span className="keep-tracking font-display text-[15px] font-bold tracking-[0.22em]">EVAY</span></div>
      <div className="text-end">
        <p className="text-[11px] tracking-[0.2em]" style={{ color: ACCENT }} dir="ltr">{n}</p>
        <p className="text-[13px]" style={{ color: MUTE }}>{title}</p>
      </div>
    </div>
  );
}

export default function ProfileView() {
  const { t, lang } = useLang();
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const measure = () => setScale(Math.min(1, (el.clientWidth - 8) / W));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const info = C.contactInfo;
  const stats = C.intro.stats;

  return (
    <div className="profile-doc bg-ink-2 pb-16 pt-24 print:p-0">
      <div className="mx-auto mb-8 flex w-full max-w-[860px] flex-wrap items-center justify-between gap-3 px-4 print:hidden">
        <div>
          <p className="eyebrow text-volt">{t(C.profileCta.eyebrow)}</p>
          <h1 className="display mt-2 text-3xl text-fog sm:text-4xl">{t(C.profileCta.cover)} 2026</h1>
        </div>
        <div className="flex gap-2">
          <a href={`/evay-company-profile-${lang}.pdf`} download className="inline-flex h-11 items-center gap-2 rounded-full bg-volt px-5 text-[0.85rem] font-semibold text-white"><Download className="size-4" />{t(C.profileCta.download)}</a>
          <button type="button" onClick={() => window.print()} className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-[0.85rem] font-medium text-fog"><Printer className="size-4" />{lang === "ar" ? "طباعة" : "Print"}</button>
        </div>
      </div>

      <div ref={hostRef} className="mx-auto w-full max-w-[860px] space-y-8 px-2 print:max-w-none print:space-y-0 print:px-0">
        {/* 1 — cover */}
        <Sheet scale={scale} dark>
          <Image src="/media/hero/f8.webp" alt="" fill sizes="794px" className="object-cover opacity-70" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,13,18,.7), rgba(11,13,18,.15) 40%, rgba(11,13,18,.95))" }} />
          <div className="relative flex h-full flex-col justify-between p-14">
            <div className="flex items-center gap-3"><Mark size={44} /><span className="keep-tracking font-display text-[26px] font-bold tracking-[0.24em]">EVAY</span></div>
            <div>
              <p className="text-[13px] tracking-[0.3em]" style={{ color: "#7db4ff" }} dir="ltr">2026</p>
              <h1 className="display mt-4 text-[64px] leading-[1.1]">{t(C.profileCta.cover)}</h1>
              <span className="mt-6 block h-[3px] w-24" style={{ background: "#4da3ff" }} />
              <p className="mt-6 max-w-[460px] text-[17px] leading-relaxed" style={{ color: "rgba(255,255,255,.78)" }}>{t(C.hero.sub)}</p>
            </div>
            <div className="flex justify-between text-[13px]" style={{ color: "rgba(255,255,255,.6)" }}>
              <span dir="ltr">{info.email}</span><span dir="ltr">{info.phone.en}</span>
            </div>
          </div>
        </Sheet>

        {/* 2 — about */}
        <Sheet scale={scale}>
          <div className="flex h-full flex-col p-12">
            <Head n="01" title={t(C.intro.eyebrow)} />
            <h2 className="display mt-8 text-[34px] leading-[1.25]">{t(C.intro.title)}</h2>
            <p className="mt-4 text-[15px] leading-[1.9]" style={{ color: MUTE }}>{t(C.intro.big)}</p>
            <p className="mt-3 text-[15px] leading-[1.9]" style={{ color: MUTE }}>{t(C.intro.body)}</p>
            <div className="mt-7 grid grid-cols-4 gap-3">
              {stats.map((s) => (
                <div key={s.label.en} className="rounded-xl border p-4" style={{ borderColor: "#e4e6ea" }}>
                  <p className="numeral font-display text-[30px] font-bold leading-none" dir="ltr">{s.value}<span style={{ color: ACCENT }}>{s.suffix}</span></p>
                  <p className="mt-2 text-[11.5px] leading-snug" style={{ color: MUTE }}>{t(s.label)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[C.vision.vision, C.vision.mission].map((v) => (
                <div key={v.label.en} className="rounded-2xl p-6" style={{ background: "#f3f6fb" }}>
                  <p className="font-display text-[18px] font-semibold" style={{ color: ACCENT }}>{t(v.label)}</p>
                  <p className="mt-2 text-[14px] leading-[1.85]" style={{ color: INK }}>{t(v.text)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-4 gap-3">
              {C.vision.values.map((v, i) => (
                <div key={v.title.en} className="border-t-2 pt-3" style={{ borderColor: ACCENT }}>
                  <p className="text-[11px]" style={{ color: ACCENT }} dir="ltr">0{i + 1}</p>
                  <p className="mt-1 font-display text-[15px] font-semibold">{t(v.title)}</p>
                  <p className="mt-1 text-[12px] leading-relaxed" style={{ color: MUTE }}>{t(v.body)}</p>
                </div>
              ))}
            </div>
          </div>
        </Sheet>

        {/* 3 — services + process */}
        <Sheet scale={scale}>
          <div className="flex h-full flex-col p-12">
            <Head n="02" title={t(C.engineering.eyebrow)} />
            <h2 className="display mt-8 text-[34px] leading-[1.25]">{t(C.engineering.title)}</h2>
            <div className="mt-6 space-y-4">
              {C.engineering.tiles.map((tile, i) => (
                <div key={tile.title.en} className="flex gap-5 overflow-hidden rounded-2xl border" style={{ borderColor: "#e4e6ea" }}>
                  <div className="relative h-[150px] w-[210px] shrink-0">
                    <Image src={tile.image} alt="" fill sizes="210px" className="object-cover" loading="eager" />
                  </div>
                  <div className="py-5 pe-5">
                    <p className="numeral text-[11px]" style={{ color: ACCENT }} dir="ltr">0{i + 1}</p>
                    <p className="mt-1 font-display text-[19px] font-semibold">{t(tile.title)}</p>
                    <p className="mt-1.5 text-[13px] leading-[1.8]" style={{ color: MUTE }}>{t(tile.body)}</p>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="display mt-8 text-[24px]">{t(C.process.title)}</h3>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {C.process.steps.map((s, i) => (
                <div key={s.title.en} className="rounded-2xl p-4" style={{ background: "#f3f6fb" }}>
                  <span className="inline-flex size-9 items-center justify-center rounded-full text-[15px] font-bold text-white" style={{ background: ACCENT }} dir="ltr">{i + 1}</span>
                  <p className="mt-3 font-display text-[15px] font-semibold">{t(s.title)}</p>
                  <p className="mt-1 text-[12px] leading-relaxed" style={{ color: MUTE }}>{t(s.body)}</p>
                </div>
              ))}
            </div>
          </div>
        </Sheet>

        {/* 4 — portfolio, team, contact */}
        <Sheet scale={scale}>
          <div className="flex h-full flex-col p-12">
            <Head n="03" title={t(C.gallery.eyebrow)} />
            <h2 className="display mt-8 text-[30px]">{t(C.gallery.title)}</h2>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {CARS.map((v) => (
                <div key={v.slug} className="overflow-hidden rounded-xl border" style={{ borderColor: "#e4e6ea" }}>
                  <div className="relative h-[110px]"><Image src={v.image} alt="" fill sizes="240px" className="object-cover" loading="eager" /></div>
                  <div className="p-3">
                    <p className="text-[10.5px] tracking-[0.12em]" style={{ color: v.accent }} dir="ltr">{v.brand.toUpperCase()}</p>
                    <p className="font-display text-[14px] font-semibold" dir="ltr">{v.model}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-display text-[19px] font-semibold">{t(C.team.title)}</h3>
                <ul className="mt-3 space-y-2">
                  {C.team.members.map((m) => (
                    <li key={m.name.en} className="flex items-center justify-between border-b pb-2 text-[13px]" style={{ borderColor: "#e4e6ea" }}>
                      <span className="font-medium">{t(m.name)}</span><span style={{ color: MUTE }}>{t(m.role)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-[19px] font-semibold">{t(C.partners.eyebrow)}</h3>
                <ul className="mt-3 flex flex-wrap gap-2" dir="ltr">
                  {C.partners.names.map((n) => <li key={n} className="keep-tracking rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em]" style={{ borderColor: "#e4e6ea", color: MUTE }}>{n}</li>)}
                </ul>
              </div>
            </div>
            <div className="mt-auto rounded-2xl p-7 text-white" style={{ background: "#0b0d12" }}>
              <p className="display text-[26px]">{t({ ar: "لنبدأ رحلتك معًا.", en: "Let's start your journey." })}</p>
              <div className="mt-4 grid grid-cols-2 gap-y-3 text-[13.5px]" style={{ color: "rgba(255,255,255,.8)" }}>
                <p dir="ltr" className="text-start">{info.email}</p>
                <p dir="ltr" className="text-start">{info.phone.en}</p>
                <p>{t(info.address)}</p>
                <p>{t(C.pages.contact.hoursValue)}</p>
              </div>
            </div>
          </div>
        </Sheet>
      </div>
    </div>
  );
}
