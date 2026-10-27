"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { OPEN_SEARCH_EVENT } from "@/lib/search";

const CommandPalette = dynamic(() => import("@/components/ui/CommandPalette"), { ssr: false });

/**
 * The quick-search overlay is only needed once someone opens it, so its code
 * (and the vehicle index it carries) loads after first paint — or immediately
 * if the visitor asks for it first.
 */
export default function LazyCommandPalette() {
  const [load, setLoad] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    const start = () => {
      loaded.current = true;
      setLoad(true);
    };
    const timer = window.setTimeout(start, 4000);
    const onOpen = () => {
      if (loaded.current) return;
      start();
      // the palette mounts after this event, so replay it once it is ready
      window.setTimeout(() => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT)), 350);
    };
    window.addEventListener(OPEN_SEARCH_EVENT, onOpen, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpen);
    };
  }, []);

  return load ? <CommandPalette /> : null;
}
