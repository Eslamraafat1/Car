"use client";

import { useSyncExternalStore } from "react";
import { useLang } from "@/lib/i18n";

/** Working week of the showroom: Sun–Thu, 09:00–18:00 in Riyadh (UTC+3). */
const OPEN_H = 9;
const CLOSE_H = 18;
const WORKDAYS = [0, 1, 2, 3, 4]; // Sun..Thu

function riyadhNow() {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Riyadh", weekday: "short", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const hour = Number(get("hour")) % 24;
  return { day, hour, minute: Number(get("minute")) };
}

function subscribe(cb: () => void) {
  const id = window.setInterval(cb, 60_000);
  return () => window.clearInterval(id);
}

/** Contact — a live "open now / closed" pill, computed in the showroom's timezone. */
export default function OpenNow() {
  const { lang } = useLang();
  const open = useSyncExternalStore(
    subscribe,
    () => {
      const { day, hour } = riyadhNow();
      const isOpen = WORKDAYS.includes(day) && hour >= OPEN_H && hour < CLOSE_H;
      return isOpen ? "open" : "closed";
    },
    () => "",
  );
  if (!open) return <div className="h-9" aria-hidden="true" />;

  const isOpen = open === "open";
  const label =
    lang === "ar"
      ? isOpen ? "مفتوح الآن · نغلق ٦ م" : "مغلق الآن · نفتح الأحد ٩ ص"
      : isOpen ? "Open now · closes 6 pm" : "Closed now · opens Sunday 9 am";

  return (
    <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-ink-2 px-4 py-2 text-[0.8rem] font-medium text-fog" role="status">
      <span className={`size-2 rounded-full ${isOpen ? "bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.2)]" : "bg-amber-500 shadow-[0_0_0_4px_rgba(245,158,11,0.2)]"}`} aria-hidden="true" />
      {label}
    </p>
  );
}
