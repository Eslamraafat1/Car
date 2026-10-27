"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { label: C.nav.about, href: "/about" },
  { label: C.nav.blog, href: "/blog" },
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
  if (pathname === "/about" || pathname === "/contact" || pathname.startsWith("/blog")) {
    return { label: C.nav.ctaBrowse, href: "/explore" };
  }
  return { label: C.nav.cta, href: "/contact" };
}

/** The Evay mark: a rounded tile with three speed bars forming an "E". */
export function EvayMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="9" fill="var(--c-volt)" />
      <path d="M9 10h14M9 16h10M9 22h14" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export default function AutomotiveNavbar() {
  const pathname = usePathname();
  const { t, lang, toggleLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const pillRef = useRef<HTMLSpanElement | null>(null);
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
  const litKey = hovered ?? NAV_ITEMS.find((i) => pathname === i.href || (i.href === "/explore" && pathname.startsWith("/cars/")))?.href ?? null;

  /* The highlight pill glides to the hovered (or current) link — plain DOM writes, no animation library. */
  useEffect(() => {
    const pill = pillRef.current;
    const li = litKey ? itemRefs.current[litKey] : null;
    if (!pill) return;
    if (!li) {
      pill.style.opacity = "0";
      return;
    }
    pill.style.width = `${li.offsetWidth}px`;
    pill.style.transform = `translateX(${li.offsetLeft}px)`;
    pill.style.opacity = "1";
  }, [litKey, lang, overHero]);
  const isActive = (href: string) =>
    pathname === href ||
    (href === "/explore" && pathname.startsWith("/cars/")) ||
    (href === "/blog" && pathname.startsWith("/blog/"));
  const navCta = getNavCta(pathname);

  return (
    <>
      <div ref={sentinelRef} className="pointer-events-none absolute top-0 h-px w-full" aria-hidden />
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <div
          className={`mx-auto flex h-14 max-w-[1240px] items-center gap-2 rounded-full border ps-4 pe-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 sm:ps-5 lg:h-16 ${
            overHero
              ? "border-white/15 bg-black/30 lg:backdrop-blur-xl"
              : "glass border-line shadow-[0_18px_50px_-28px_rgba(0,0,0,0.45)]"
          }`}
        >
          <Link
            href="/"
            className={`group flex shrink-0 items-center gap-2.5 rounded-full transition-colors duration-300 ${
              overHero ? "text-white" : "text-fog"
            }`}
            aria-label={`${C.brand.name} — ${t(C.nav.home)}`}
          >
            <EvayMark className="size-8 shrink-0 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" />
            <span className="keep-tracking font-display text-[1.05rem] font-bold tracking-[0.22em]">{C.brand.name}</span>
          </Link>

          <nav
            aria-label={lang === "ar" ? "التنقل الرئيسي" : "Main navigation"}
            className="mx-auto hidden lg:block"
            onPointerLeave={() => setHovered(null)}
          >
            <ul className="relative flex items-center gap-0.5">
              <span
                ref={pillRef}
                aria-hidden="true"
                className={`pointer-events-none absolute inset-y-0 left-0 rounded-full opacity-0 transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(.32,.72,0,1)] ${overHero ? "bg-white/15" : "bg-fog/[0.08]"}`}
              />
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                const lit = litKey === item.href;
                return (
                  <li key={item.href} ref={(el) => { itemRefs.current[item.href] = el; }} className="relative">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onPointerEnter={() => setHovered(item.href)}
                      onFocus={() => setHovered(item.href)}
                      onBlur={() => setHovered(null)}
                      className={`relative inline-flex h-10 items-center rounded-full px-5 text-[0.88rem] font-medium transition-colors duration-300 ${
                        overHero
                          ? lit ? "text-white" : "text-white/75"
                          : lit ? "text-fog" : "text-mist"
                      }`}
                    >
                      {t(item.label)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ms-auto flex items-center gap-1.5 lg:ms-0">
            <button
              type="button"
              onClick={openSearch}
              aria-label={t(C.nav.search)}
              aria-haspopup="dialog"
              className={`hidden size-10 items-center justify-center rounded-full transition-colors duration-300 sm:inline-flex ${
                overHero ? "text-white/85 hover:bg-white/15" : "text-mist hover:bg-fog/[0.08] hover:text-fog"
              }`}
            >
              <Search className="size-[1.05rem]" strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={toggleLang}
              aria-label={t(C.nav.langLabel)}
              className={`keep-tracking hidden h-10 min-w-10 items-center justify-center rounded-full px-3 text-[0.8rem] font-semibold transition-colors duration-300 sm:inline-flex ${
                overHero ? "text-white/85 hover:bg-white/15" : "text-mist hover:bg-fog/[0.08] hover:text-fog"
              }`}
            >
              {lang === "ar" ? "EN" : "عربي"}
            </button>

            <ThemeToggle variant={overHero ? "overlay" : "surface"} className="hidden sm:inline-flex" />

            <Link
              href={navCta.href}
              className="shine group relative ms-1 hidden h-10 items-center gap-1.5 overflow-hidden rounded-full bg-volt px-5 text-[0.84rem] font-semibold text-white transition-transform duration-300 hover:scale-[1.04] md:inline-flex"
            >
              {t(navCta.label)}
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" strokeWidth={2.4} />
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-haspopup="dialog"
              aria-label={t(C.nav.menu)}
              className={`inline-flex size-10 items-center justify-center rounded-full transition-colors duration-300 lg:hidden ${
                overHero ? "bg-white/15 text-white" : "bg-fog/[0.08] text-fog"
              }`}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {open && (
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t(C.nav.menu)}
            className="menu-panel fixed inset-0 z-[60] flex flex-col bg-ink/[0.98] lg:hidden"
          >
            <div className="flex h-16 items-center px-4 sm:px-6">
              <span className="flex items-center gap-2.5 text-fog">
                <EvayMark className="size-8" />
                <span className="keep-tracking font-display text-[1.05rem] font-bold tracking-[0.22em]">{C.brand.name}</span>
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
                  <li
                    key={item.href}
                    className="menu-item border-b border-line"
                    style={{ animationDelay: `${0.05 + index * 0.055}s` }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={
                        isActive(item.href)
                          ? "page"
                          : undefined
                      }
                      className={`flex items-center justify-between py-4 font-display text-2xl font-semibold transition-colors ${
                        isActive(item.href)
                          ? "text-volt"
                          : "text-fog"
                      }`}
                    >
                      {t(item.label)}
                      <ArrowUpRight
                        className={`size-5 ${
                          isActive(item.href)
                            ? "text-volt"
                            : "text-mist"
                        }`}
                        strokeWidth={1.8}
                      />
                    </Link>
                  </li>
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
          </div>
      )}
    </>
  );
}
