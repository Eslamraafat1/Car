"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  /** Toggles with an optional origin point for the circular reveal. */
  toggleTheme: (origin?: { x: number; y: number }) => void;
  setTheme: (theme: Theme, origin?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "aurelis-theme";

function readStoredTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    /* storage blocked — fall through to default */
  }
  return "light";
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener(STORAGE_KEY, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(STORAGE_KEY, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

const getServerSnapshot = (): Theme => "light";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Applies a theme, optionally revealing it as a circle expanding from `origin`. */
function commitWithReveal(commit: (next: Theme) => void, next: Theme, origin?: { x: number; y: number }) {
  const canAnimate =
    typeof document.startViewTransition === "function" && !prefersReducedMotion();

  if (!canAnimate) {
    commit(next);
    return;
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const transition = document.startViewTransition(() => commit(next));
  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 650,
          easing: "cubic-bezier(0.32, 0.72, 0, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {
      /* transition aborted — theme already applied */
    });
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readStoredTheme, getServerSnapshot);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    window.dispatchEvent(new CustomEvent<Theme>("aurelis:themechange", { detail: theme }));
  }, [theme]);

  // Applies the theme class synchronously so View Transitions captures the NEW
  // state inside startViewTransition's callback. (A React effect would run too
  // late — the reveal would animate the old theme, then hard-flash to the new.)
  const commit = useCallback((next: Theme) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
    window.dispatchEvent(new Event(STORAGE_KEY));
  }, []);

  const setTheme = useCallback(
    (next: Theme, origin?: { x: number; y: number }) => {
      if (next === theme) return;
      commitWithReveal(commit, next, origin);
    },
    [commit, theme],
  );

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      commitWithReveal(commit, theme === "dark" ? "light" : "dark", origin);
    },
    [commit, theme],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
