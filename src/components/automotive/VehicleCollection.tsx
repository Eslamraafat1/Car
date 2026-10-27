"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState, useSyncExternalStore, type ReactNode, useEffect } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { FILTER_EVENT } from "@/components/automotive/ExploreCategories";
import { C, type BiStr } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import KineticHeading from "@/components/ui/KineticHeading";
import { CATEGORY_LABELS, VEHICLES, type Category, type Vehicle } from "@/lib/vehicles";

type FilterKey = "all" | Category | "favorites";
const FAVORITES_KEY = "evay-saved-vehicles";
const EMPTY_FAVORITES: ReadonlySet<string> = new Set();
let favoritesSnapshot: ReadonlySet<string> = EMPTY_FAVORITES;
let favoritesLoaded = false;
const favoritesSubscribers = new Set<() => void>();

function loadFavorites() {
  if (favoritesLoaded || typeof window === "undefined") return;
  favoritesLoaded = true;
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(FAVORITES_KEY) ?? "[]");
    favoritesSnapshot = new Set(Array.isArray(stored) ? stored.filter((slug): slug is string => typeof slug === "string") : []);
  } catch {
    favoritesSnapshot = EMPTY_FAVORITES;
  }
}

function getFavoritesSnapshot() {
  return favoritesSnapshot;
}

function subscribeToFavorites(notify: () => void) {
  favoritesSubscribers.add(notify);
  loadFavorites();
  const onStorage = (event: StorageEvent) => {
    if (event.key !== FAVORITES_KEY) return;
    try {
      const stored: unknown = JSON.parse(event.newValue ?? "[]");
      favoritesSnapshot = new Set(Array.isArray(stored) ? stored.filter((slug): slug is string => typeof slug === "string") : []);
    } catch {
      favoritesSnapshot = EMPTY_FAVORITES;
    }
    favoritesSubscribers.forEach((subscriber) => subscriber());
  };
  window.addEventListener("storage", onStorage);
  return () => {
    favoritesSubscribers.delete(notify);
    window.removeEventListener("storage", onStorage);
  };
}

function saveFavorites(next: Set<string>) {
  favoritesLoaded = true;
  favoritesSnapshot = next;
  try {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify([...next]));
  } catch {
    // Favorites remain available for this page session if storage is blocked.
  }
  favoritesSubscribers.forEach((subscriber) => subscriber());
}

/** Subtle 3D tilt for fine pointers; no-op on touch. Rect is cached on enter
 *  (no layout reads during move) and tracking is instant — a CSS transition
 *  on transform during pointermove would smear/lag the tilt behind the cursor. */
function TiltShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const onEnter = () => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    el.style.transition = "none";
    rectRef.current = el.getBoundingClientRect();
  };

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    const rect = rectRef.current;
    if (!el || !rect || rect.width === 0) return;
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(950px) rotateX(${(-py * 4.5).toFixed(2)}deg) rotateY(${(px * 5.5).toFixed(2)}deg) translateY(-3px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.45s cubic-bezier(0.32, 0.72, 0, 1)";
    el.style.transform = "";
    rectRef.current = null;
  };

  return (
    <div
      ref={ref}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="h-full will-change-transform"
    >
      {children}
    </div>
  );
}

interface VehicleCollectionProps {
  vehicles?: Vehicle[];
  variant?: "showroom" | "related";
  /** Full editorial header (eyebrow + title + body). */
  withHeader?: boolean;
  /** Simple section heading shown above the grid. */
  title?: BiStr;
  /** Category filter pills — hidden on single-category pages. */
  withFilters?: boolean;
  className?: string;
}

export default function VehicleCollection({
  vehicles = VEHICLES,
  withHeader = true,
  title,
  withFilters = true,
  variant = "showroom",
  className = "",
}: VehicleCollectionProps) {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<FilterKey>("all");
  useEffect(() => {
    const onFilter = (e: Event) => setFilter((e as CustomEvent<FilterKey>).detail);
    window.addEventListener(FILTER_EVENT, onFilter);
    return () => window.removeEventListener(FILTER_EVENT, onFilter);
  }, []);
  const favorites = useSyncExternalStore(subscribeToFavorites, getFavoritesSnapshot, () => EMPTY_FAVORITES);

  const filters = [
    ...(C.collection.filters as unknown as { key: string; ar: string; en: string }[]),
    { key: "favorites", ar: "المفضلة", en: "Saved" },
  ];

  const visible = useMemo(
    () => {
      if (filter === "all") return vehicles;
      if (filter === "favorites") return vehicles.filter((vehicle) => favorites.has(vehicle.slug));
      return vehicles.filter((vehicle) => vehicle.category === filter);
    },
    [vehicles, filter, favorites],
  );

  const toggleFavorite = (slug: string) => {
    const next = new Set(favoritesSnapshot);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    saveFavorites(next);
  };

  const headingId = withHeader ? "collection-title" : title ? "collection-list-title" : undefined;

  return (
    <MotionConfig reducedMotion="user">
    <section
      id="collection"
      data-collection-variant={variant}
      className={`relative bg-ink-2 py-20 lg:py-32 ${className}`}
      aria-labelledby={headingId}
      aria-label={headingId ? undefined : t(C.collection.eyebrow)}
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {withHeader && (
          <div className="grid gap-6 border-b border-line pb-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-volt">{t(C.collection.eyebrow)}</p>
              <KineticHeading
                id="collection-title"
                text={C.collection.title}
                className="display h-section mt-4 text-fog"
              />
            </div>
            <p className="text-[0.95rem] leading-relaxed text-mist lg:col-span-5">
              {t(C.collection.body)}
            </p>
          </div>
        )}

        {!withHeader && title && (
          <KineticHeading
            id="collection-list-title"
            text={title}
            className="display h-section text-fog"
          />
        )}

        <div className="mt-8 flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-center lg:justify-between">
          {withFilters && (
            <div
              role="group"
              aria-label={t(C.collection.eyebrow)}
              className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
            >
              {filters.map((entry) => {
                const key = entry.key as FilterKey;
                const selected = filter === key;
                return (
                  <button
                    key={entry.key}
                    type="button"
                    onClick={() => setFilter(key)}
                    aria-pressed={selected}
                    className={`relative shrink-0 rounded-full px-4 py-2 text-[0.8rem] font-medium transition-colors duration-300 ${
                      selected ? "text-ink" : "text-mist hover:text-fog"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="collection-filter-pill"
                        className="absolute inset-0 rounded-full bg-fog"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{t(entry)}</span>
                  </button>
                );
              })}
            </div>
          )}

          <p
            className={`numeral shrink-0 text-[0.78rem] tracking-wider text-dim ${
              withFilters ? "" : "ms-auto"
            }`}
          >
            {visible.length} {t(C.collection.count)}
          </p>
        </div>

        <p className="mt-4 text-[0.75rem] text-dim">{t(C.collection.note)}</p>

        <motion.ul
          layout
          className={`mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((vehicle) => (
              <motion.li
                key={vehicle.slug}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
              >
                <TiltShell>
                  <article className={`group relative h-full overflow-hidden border transition-all duration-500 ${variant === "related" ? "rounded-[16px] border-line bg-ink" : "rounded-[22px] border-line bg-ink hover:border-volt/60"}`}>
                    <Link
                      href={`/cars/${vehicle.slug}`}
                      className="flex h-full flex-col focus-visible:outline-none"
                    >
                      <div className={`relative overflow-hidden aspect-[4/3]`}>
                        <Image
                          src={vehicle.image}
                          alt={t(vehicle.alt)}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                          loading="lazy"
                        />
                        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent`} />
                        <span className="absolute start-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[0.66rem] tracking-[0.16em] text-white/85 lg:backdrop-blur-sm">
                          {t(CATEGORY_LABELS[vehicle.category])}
                        </span>
                        <span
                          className="absolute bottom-0 start-0 h-0.5 w-0 transition-all duration-700 ease-out group-hover:w-full"
                          style={{ backgroundColor: vehicle.accent }}
                        />
                      </div>

                      <div className={`flex flex-1 flex-col p-5 lg:p-6 `}>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="eyebrow text-mist">{vehicle.brand}</p>
                            <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-fog">
                              {vehicle.model}
                            </h3>
                          </div>
                          <span className="numeral text-[0.74rem] text-dim">
                            {t(C.collection.year)} {vehicle.year}
                          </span>
                        </div>

                        <p className="mt-3 text-[0.84rem] leading-relaxed text-mist">
                          {t(vehicle.tagline)}
                        </p>


                        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
                          <span className="numeral text-[0.9rem] text-fog">
                            {vehicle.price}
                            <span className="ms-1.5 text-[0.66rem] text-dim">
                              {lang === "ar" ? " تقديري" : " indicative"}
                            </span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-[0.78rem] font-medium text-volt">
                            {t(C.collection.view)}
                            <ArrowRight
                              className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                              strokeWidth={2.4}
                            />
                          </span>
                        </div>
                      </div>
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(vehicle.slug)}
                      aria-pressed={favorites.has(vehicle.slug)}
                      aria-label={
                        favorites.has(vehicle.slug)
                          ? lang === "ar"
                            ? `إزالة ${vehicle.model} من المفضلة`
                            : `Remove ${vehicle.model} from saved cars`
                          : lang === "ar"
                            ? `إضافة ${vehicle.model} للمفضلة`
                            : `Save ${vehicle.model}`
                      }
                      className="absolute end-4 top-4 z-20 inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white shadow-lg lg:backdrop-blur-md transition-[background-color,color,transform] duration-300 hover:scale-105 hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <Heart
                        className={`size-[1.1rem] transition-colors ${favorites.has(vehicle.slug) ? "fill-rose-500 text-rose-500" : "text-white"}`}
                        strokeWidth={1.8}
                      />
                    </button>
                  </article>
                </TiltShell>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && (
          <p className="mt-10 rounded-2xl border border-dashed border-line p-8 text-center text-sm text-mist">
            {filter === "favorites"
              ? lang === "ar"
                ? "لم تحفظ أي سيارة بعد. اضغط على القلب لإضافتها إلى المفضلة."
                : "No saved cars yet. Tap a heart to add a car to your favorites."
              : t(C.collection.empty)}
          </p>
        )}
      </div>
    </section>
    </MotionConfig>
  );
}
