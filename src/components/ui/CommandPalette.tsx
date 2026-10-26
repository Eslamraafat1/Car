"use client";

import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Car, CornerDownLeft, Gauge, Home, Info, Mail, Search, Zap } from "lucide-react";
import { C } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { getLenis } from "@/lib/smooth-scroll";
import { OPEN_SEARCH_EVENT } from "@/lib/search";
import { CATEGORY_LABELS, VEHICLES } from "@/lib/vehicles";

const PAGES = [
  { href: "/", label: C.nav.home, Icon: Home },
  { href: "/explore", label: C.nav.explore, Icon: Car },
  { href: "/electric", label: C.nav.electric, Icon: Zap },
  { href: "/performance", label: C.nav.performance, Icon: Gauge },
  { href: "/about", label: C.nav.about, Icon: Info },
  { href: "/contact", label: C.nav.contact, Icon: Mail },
] as const;

const LABELS = {
  title: { ar: "البحث السريع", en: "Quick search" },
  placeholder: { ar: "دوّر على موديل أو صفحة…", en: "Search a model or page…" },
  pages: { ar: "الصفحات", en: "Pages" },
  models: { ar: "الموديلات", en: "Models" },
  empty: { ar: "مفيش نتائج للبحث ده.", en: "Nothing matched that search." },
  hintKeys: { ar: "تنقّل", en: "Navigate" },
  hintGo: { ar: "افتح", en: "Open" },
  hintClose: { ar: "إغلاق", en: "Close" },
  trigger: { ar: "بحث", en: "Search" },
};

interface Result {
  id: string;
  href: string;
  title: string;
  subtitle: string;
  Icon: typeof Home;
  group: "pages" | "models";
}

export default function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
    setQuery("");
  }

  const [prevQuery, setPrevQuery] = useState(query);
  if (prevQuery !== query) {
    setPrevQuery(query);
    setActive(0);
  }

  const results = useMemo<Result[]>(() => {
    const needle = query.trim().toLowerCase();

    const pages: Result[] = PAGES.map(({ href, label, Icon }) => ({
      id: `page-${href}`,
      href,
      title: t(label),
      subtitle: href === "/" ? C.brand.name : href,
      Icon,
      group: "pages" as const,
    }));

    const models: Result[] = VEHICLES.map((vehicle) => ({
      id: `car-${vehicle.slug}`,
      href: `/cars/${vehicle.slug}`,
      title: `${vehicle.brand} ${vehicle.model}`,
      subtitle: `${t(CATEGORY_LABELS[vehicle.category])} · ${vehicle.year}`,
      Icon: Car,
      group: "models" as const,
    }));

    const matches = (items: Result[]) =>
      needle
        ? items.filter((item) => `${item.title} ${item.subtitle}`.toLowerCase().includes(needle))
        : items;

    return [...matches(pages), ...matches(models)].slice(0, 12);
  }, [query, t]);

  useEffect(() => {
    const openSearch = () => setOpen(true);
    window.addEventListener(OPEN_SEARCH_EVENT, openSearch);
    return () => window.removeEventListener(OPEN_SEARCH_EVENT, openSearch);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }
      if (event.key === "/" && !typing && !open) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const lenis = getLenis();
    lenis?.stop();
    restoreRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      restoreRef.current?.focus();
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  const onKeyDownInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (results.length === 0 ? 0 : (index + 1) % results.length));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (results.length === 0 ? 0 : (index - 1 + results.length) % results.length));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const pick = results[active];
      if (pick) go(pick.href);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  let lastGroup: Result["group"] | null = null;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t(LABELS.title)}
            className="fixed inset-0 z-[96] flex items-start justify-center px-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label={t(LABELS.hintClose)}
              onClick={() => setOpen(false)}
              className="absolute inset-0 cursor-default bg-black/45 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="relative w-full max-w-xl overflow-hidden rounded-[22px] border border-line bg-ink-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center gap-3 border-b border-line px-5">
                <Search className="size-4 shrink-0 text-dim" strokeWidth={2} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={onKeyDownInput}
                  placeholder={t(LABELS.placeholder)}
                  aria-label={t(LABELS.title)}
                  aria-controls="command-results"
                  aria-activedescendant={results[active] ? `command-${results[active].id}` : undefined}
                  role="combobox"
                  aria-expanded="true"
                  autoComplete="off"
                  className="h-14 w-full bg-transparent text-[0.95rem] text-fog outline-none placeholder:text-dim"
                />
                <kbd className="numeral hidden shrink-0 rounded-md border border-line px-1.5 py-0.5 text-[0.62rem] text-dim sm:block">
                  ESC
                </kbd>
              </div>

              <div id="command-results" role="listbox" aria-label={t(LABELS.title)} className="max-h-[52vh] overflow-y-auto p-2">
                {results.length === 0 && (
                  <p className="px-3 py-8 text-center text-sm text-dim">{t(LABELS.empty)}</p>
                )}

                {results.map((result, index) => {
                  const header =
                    result.group !== lastGroup ? (
                      <p className="eyebrow px-3 pb-1 pt-3 text-dim">
                        {t(result.group === "pages" ? LABELS.pages : LABELS.models)}
                      </p>
                    ) : null;
                  lastGroup = result.group;

                  return (
                    <div key={result.id}>
                      {header}
                      <button
                        id={`command-${result.id}`}
                        role="option"
                        aria-selected={index === active}
                        type="button"
                        onMouseMove={() => setActive(index)}
                        onClick={() => go(result.href)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-colors duration-150 ${
                          index === active ? "bg-ink-3 text-fog" : "text-mist"
                        }`}
                      >
                        <span
                          className={`inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-line ${
                            index === active ? "text-volt" : "text-dim"
                          }`}
                        >
                          <result.Icon className="size-4" strokeWidth={1.9} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[0.88rem] font-medium">
                            {result.title}
                          </span>
                          <span className="numeral block truncate text-[0.68rem] text-dim">
                            {result.subtitle}
                          </span>
                        </span>
                        {index === active && (
                          <CornerDownLeft className="size-3.5 shrink-0 text-dim rtl:-scale-x-100" strokeWidth={2} />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 border-t border-line px-5 py-2.5 text-[0.68rem] text-dim">
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="numeral rounded border border-line px-1">↑↓</kbd>
                  {t(LABELS.hintKeys)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="numeral rounded border border-line px-1">↵</kbd>
                  {t(LABELS.hintGo)}
                </span>
                <span className="ms-auto inline-flex items-center gap-1.5">
                  <kbd className="numeral rounded border border-line px-1">esc</kbd>
                  {t(LABELS.hintClose)}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
