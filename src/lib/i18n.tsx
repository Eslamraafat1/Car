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
import type { BiStr } from "@/lib/content";

export type Lang = "ar" | "en";
export type Dir = "rtl" | "ltr";

interface LangContextValue {
  lang: Lang;
  dir: Dir;
  t: (value: BiStr) => string;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "evay-lang";

function readStoredLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "en" ? "en" : "ar";
  } catch {
    /* storage blocked — fall through to default */
  }
  return "ar";
}

function subscribe(onStoreChange: () => void): () => void {
  const handler = () => onStoreChange();
  window.addEventListener(STORAGE_KEY, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(STORAGE_KEY, handler);
    window.removeEventListener("storage", handler);
  };
}

const getServerSnapshot = (): Lang => "ar";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readStoredLang, getServerSnapshot);

  const setLang = useCallback((next: Lang) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event(STORAGE_KEY));
  }, []);

  const toggleLang = useCallback(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setLang(stored === "en" ? "ar" : "en");
  }, [setLang]);

  useEffect(() => {
    const dir: Dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    window.dispatchEvent(new CustomEvent<Lang>("evay:langchange", { detail: lang }));
  }, [lang]);

  const t = useCallback((value: BiStr) => value[lang], [lang]);

  const value = useMemo<LangContextValue>(
    () => ({ lang, dir: lang === "ar" ? "rtl" : "ltr", t, setLang, toggleLang }),
    [lang, t, setLang, toggleLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
