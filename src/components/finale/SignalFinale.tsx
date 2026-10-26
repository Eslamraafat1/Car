"use client";

import { useState } from "react";
import { Mail, Radio } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/motion";
import { FinaleActions, FinaleBody, FinaleEyebrow, FinaleShell, FinaleTitle } from "./finale-kit";

const CONTACT_EMAIL = "hello@aurelis.example";
const ACCENT = "#75d6c3";

interface Node {
  key: string;
  label: { ar: string; en: string };
  value: string;
  href?: string;
  left: string;
  top: string;
}

const NODES: Node[] = [
  {
    key: "email",
    label: { ar: "البريد", en: "Email" },
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    left: "50%",
    top: "11%",
  },
  {
    key: "studio",
    label: C.pages.contact.studio,
    value: "", // filled from content below
    left: "84%",
    top: "68%",
  },
  {
    key: "hours",
    label: C.pages.contact.hours,
    value: "",
    left: "16%",
    top: "68%",
  },
];

function localizeDigits(value: string, arabic: boolean) {
  if (!arabic) return value;
  return value.replace(/\d/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[Number(digit)]);
}

/** Contact — the finale is an open channel: a sonar screen with live nodes. */
export default function SignalFinale({ accent = ACCENT }: { accent?: string }) {
  const { t, lang } = useLang();
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [signals, setSignals] = useState(0);
  const [lastSent, setLastSent] = useState(false);

  const nodes: Node[] = NODES.map((node) =>
    node.key === "studio"
      ? { ...node, value: t(C.pages.contact.studioValue) }
      : node.key === "hours"
        ? { ...node, value: t(C.pages.contact.hoursValue) }
        : node,
  );
  const current = nodes[active];

  const ping = () => {
    setSignals((count) => count + 1);
    setLastSent(true);
  };

  return (
    <FinaleShell page="contact" accent={accent} ghost="ON AIR">
      <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <FinaleEyebrow>{t(C.finale.contact.eyebrow)}</FinaleEyebrow>
          <FinaleTitle>{t(C.finale.contact.title)}</FinaleTitle>
          <FinaleBody>{t(C.finale.contact.hint)}</FinaleBody>
          <FinaleActions />

          {/* Active channel card */}
          <div className="mt-9 rounded-[22px] border border-white/12 bg-white/[0.03] p-5 backdrop-blur-md">
            <div className="flex items-center justify-between gap-4">
              <span className="eyebrow text-[0.6rem] text-white/45">{t(C.finale.contact.channel)}</span>
              <span className="size-1.5 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }} />
            </div>
            <p className="mt-3 font-display text-lg font-semibold text-fog">{t(current.label)}</p>
            {current.href ? (
              <a
                href={current.href}
                className="mt-1 inline-flex items-center gap-2 text-[0.88rem] transition-colors duration-300 hover:opacity-80"
                style={{ color: accent }}
              >
                <Mail className="size-4" aria-hidden="true" />
                {current.value}
              </a>
            ) : (
              <p className="mt-1 text-[0.88rem] text-white/75">{current.value}</p>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={ping}
              className="group inline-flex min-h-12 items-center gap-2 rounded-full px-7 text-[0.88rem] font-semibold text-ink transition-transform duration-300 hover:scale-[1.02]"
              style={{ backgroundColor: accent }}
            >
              <Radio className="size-4 transition-transform duration-500 group-active:rotate-12" aria-hidden="true" />
              {t(C.finale.contact.ping)}
            </button>
            <p className="numeral text-[0.72rem] tracking-[0.2em] text-white/55" role="status" aria-live="polite">
              {lastSent && (
                <span className="text-white/80">
                  {t(C.finale.contact.sent)} · {localizeDigits(String(signals).padStart(2, "0"), lang === "ar")}{" "}
                </span>
              )}
              {t(C.finale.contact.signals)}
            </p>
          </div>
        </div>

        {/* The sonar screen */}
        <div className="lg:col-span-7">
          <div className="relative mx-auto aspect-square w-full max-w-[27rem]">
            <div className="absolute inset-0 rounded-full border border-white/12" aria-hidden="true" />
            <div className="absolute inset-[14%] rounded-full border border-white/10" aria-hidden="true" />
            <div className="absolute inset-[30%] rounded-full border border-white/[0.08]" aria-hidden="true" />
            <div className="absolute inset-[46%] rounded-full border border-white/[0.07]" aria-hidden="true" />
            <div className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 -translate-y-1/2 bg-white/[0.06]" aria-hidden="true" />
            <div className="absolute left-1/2 top-1/2 h-full w-px -translate-x-1/2 -translate-y-1/2 bg-white/[0.06]" aria-hidden="true" />

            {/* Rotating sweep */}
            <div className="absolute inset-0 overflow-hidden rounded-full" aria-hidden="true">
              <div
                className={`absolute inset-0 ${reduced ? "" : "sonar-sweep"}`}
                style={{
                  background: `conic-gradient(from 0deg, ${accent}00 0deg 268deg, ${accent}22 320deg, ${accent}66 358deg, ${accent}00 360deg)`,
                  maskImage: "radial-gradient(circle, black 8%, transparent 94%)",
                  WebkitMaskImage: "radial-gradient(circle, black 8%, transparent 94%)",
                }}
              />
            </div>

            {/* Pings */}
            {signals > 0 && !reduced && (
              <span
                key={signals}
                className="sonar-ping pointer-events-none absolute inset-0 rounded-full border-2"
                style={{ borderColor: accent }}
                aria-hidden="true"
              />
            )}

            {/* Centre */}
            <span
              className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ backgroundColor: accent, boxShadow: `0 0 20px ${accent}` }}
              aria-hidden="true"
            />

            {/* Nodes */}
            {nodes.map((node, index) => {
              const selected = index === active;
              return (
                <button
                  key={node.key}
                  type="button"
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  aria-pressed={selected}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: node.left, top: node.top }}
                >
                  <span
                    className="flex items-center gap-2 rounded-full border px-3 py-2 text-[0.68rem] whitespace-nowrap backdrop-blur-md transition-all duration-300"
                    style={{
                      borderColor: selected ? accent : "rgba(255,255,255,.18)",
                      backgroundColor: selected ? `${accent}22` : "rgba(0,0,0,.55)",
                      color: selected ? accent : "rgba(255,255,255,.8)",
                      boxShadow: selected ? `0 0 24px ${accent}44` : "none",
                    }}
                  >
                    <span
                      className="size-1.5 rounded-full"
                      style={{ backgroundColor: selected ? accent : "rgba(255,255,255,.5)" }}
                    />
                    {t(node.label)}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-center text-[0.68rem] text-dim">
            {t({
              ar: "الرادار توضيحي — القنوات الحقيقية بتتفتح من الاستمارة فوق.",
              en: "The radar is illustrative — real channels open from the form above.",
            })}
          </p>
        </div>
      </div>
    </FinaleShell>
  );
}
