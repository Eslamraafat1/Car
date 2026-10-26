"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Search, ArrowUpRight } from "lucide-react";
import { C, type BiStr } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { getLenis } from "@/lib/smooth-scroll";
import { openSearch } from "@/lib/search";
import ThemeToggle from "@/components/ui/ThemeToggle";

type NavItem = { label: BiStr; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: C.nav.home, href: "/" },
  { label: C.nav.explore, href: "/explore" },
  { label: C.nav.electric, href: "/electric" },
  { label: C.nav.performance, href: "/performance" },
  { label: C.nav.about, href: "/about" },
  { label: C.nav.contact, href: "/contact" },
];

/**
 * Contextual primary CTA — deterministic per route so SSR and client always
 * render the exact same label (no per-page text divergence/flicker).
 *
 * Content pages (about / contact) nudge into the fleet; everything else
 * (home + product/browsing pages) pushes the booking action.
 */
function getNavCta(pathname: string): { label: BiStr; href: string } {
  if (pathname === "/about" || pathname === "/contact") {
    return { label: C.nav.ctaBrowse, href: "/explore" };
  }
  return { label: C.nav.cta, href: "/contact" };
}

export default function AutomotiveNavbar() {
  const pathname = usePathname();
  const { t, lang, toggleLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const [activePath, setActivePath] = useState(pathname);
  if (activePath !== pathname) {
    setActivePath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const lenis = getLenis();
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const menuButton = menuButtonRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      menuButton?.focus();
    };
  }, [open]);

  // Only the homepage has the full-bleed dark video hero. Sub-pages open with
  // a theme-surface PageHeader, so the white overlay tone must not apply there
  // (it would be white-on-white in the light theme).
  const overHero = !scrolled && pathname === "/";
  const navCta = getNavCta(pathname);

  return (
    <>
      <div ref={sentinelRef} className="pointer-events-none absolute top-0 h-px w-full" aria-hidden />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
          scrolled
            ? "glass border-b border-line shadow-[0_18px_50px_-30px_rgba(0,0,0,0.35)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-10">
          <Link
            href="/"
            className={`group flex items-center gap-2.5 rounded-sm transition-colors duration-300 ${
              overHero ? "text-white" : "text-fog"
            }`}
            aria-label={`${C.brand.name} — ${t(C.nav.home)}`}
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true" className="shrink-0">
              <path
                d="M3 20.5 11.2 5.5a1.9 1.9 0 0 1 3.4 0L22.8 20.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path d="M7.6 16.2h10.9" stroke="var(--c-volt)" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            <span className="font-display text-[0.98rem] font-semibold tracking-[0.34em]">
              {lang === "ar" ? C.brand.nameAr : C.brand.name}
            </span>
          </Link>

          <nav aria-label={lang === "ar" ? "التنقل الرئيسي" : "Main navigation"} className="mx-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href === "/explore" && pathname.startsWith("/cars/"));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative inline-flex items-center rounded-full px-3.5 py-2 text-[0.82rem] tracking-wide transition-colors duration-300 ${
                        overHero
                          ? active
                            ? "text-white"
                            : "text-white/80 hover:text-white"
                          : active
                            ? "text-fog"
                            : "text-mist hover:text-fog"
                      }`}
                    >
                      {t(item.label)}
                      <span
                        className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-center bg-volt transition-transform duration-300 ${
                          active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ms-auto flex items-center gap-2 lg:ms-0">
            <button
              type="button"
              onClick={openSearch}
              aria-label={t(C.nav.search)}
              aria-haspopup="dialog"
              className={`hidden h-9 items-center gap-2 rounded-full border px-3.5 text-[0.78rem] font-medium transition-colors duration-300 lg:inline-flex ${
                overHero
                  ? "border-white/30 text-white/90 hover:border-white/70 hover:text-white"
                  : "border-line text-mist hover:border-volt hover:text-fog"
              }`}
            >
              <Search className="size-3.5" strokeWidth={2} />
              <span>{t(C.nav.search)}</span>
              <kbd className="numeral rounded-md border border-line px-1.5 py-px text-[0.62rem] text-dim">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={toggleLang}
              aria-label={t(C.nav.langLabel)}
              className={`hidden h-9 items-center gap-1.5 rounded-full border px-3.5 text-[0.78rem] font-medium tracking-wider transition-colors duration-300 sm:inline-flex ${
                overHero
                  ? "border-white/30 text-white/90 hover:border-white/70 hover:text-white"
                  : "border-line text-mist hover:border-volt hover:text-fog"
              }`}
            >
              {lang === "ar" ? "EN" : "ع"}
            </button>

            <ThemeToggle
              variant={overHero ? "overlay" : "surface"}
              className="hidden sm:inline-flex"
            />

            <Link
              href={navCta.href}
              className="hidden h-9 items-center gap-1.5 rounded-full bg-fog px-4 text-[0.8rem] font-semibold text-ink transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
            >
              {t(navCta.label)}
              <ArrowUpRight className="size-3.5" strokeWidth={2.4} />
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-haspopup="dialog"
              aria-label={t(C.nav.menu)}
              className={`inline-flex size-10 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden ${
                overHero ? "border-white/30 text-white hover:border-white/70" : "border-line text-fog"
              }`}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t(C.nav.menu)}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="flex h-16 items-center px-4 sm:px-6">
              <span className="font-display text-[0.98rem] font-semibold tracking-[0.34em] text-fog">
                {lang === "ar" ? C.brand.nameAr : C.brand.name}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t(C.nav.close)}
                className="ms-auto inline-flex size-10 items-center justify-center rounded-full border border-line text-fog"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav aria-label={lang === "ar" ? "قائمة الجوال" : "Mobile navigation"} className="flex-1 overflow-y-auto px-6 pb-10">
              <ul className="mt-6 flex flex-col gap-1">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.055, duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                    className="border-b border-line"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={
                        pathname === item.href ||
                        (item.href === "/explore" && pathname.startsWith("/cars/"))
                          ? "page"
                          : undefined
                      }
                      className={`flex items-center justify-between py-4 font-display text-2xl font-semibold transition-colors ${
                        pathname === item.href ||
                        (item.href === "/explore" && pathname.startsWith("/cars/"))
                          ? "text-volt"
                          : "text-fog"
                      }`}
                    >
                      {t(item.label)}
                      <ArrowUpRight
                        className={`size-5 ${
                          pathname === item.href ||
                          (item.href === "/explore" && pathname.startsWith("/cars/"))
                            ? "text-volt"
                            : "text-mist"
                        }`}
                        strokeWidth={1.8}
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleLang}
                  aria-label={t(C.nav.langLabel)}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-line text-sm font-medium text-fog"
                >
                  {t(C.nav.switchTo)}
                </button>
                <ThemeToggle className="size-11 shrink-0" />
                <Link
                  href={navCta.href}
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-volt text-sm font-semibold text-white"
                >
                  {t(navCta.label)}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
