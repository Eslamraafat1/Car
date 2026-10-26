import type { Metadata } from "next";
import PerformanceView from "@/components/pages/PerformanceView";
import { C } from "@/lib/content";

export const metadata: Metadata = {
  title: "أداء · Performance",
  description: `${C.pages.performance.body.ar} — ${C.pages.performance.body.en}`,
  openGraph: {
    title: "AURELIS · Performance",
    description: C.pages.performance.body.en,
  },
};

export default function PerformancePage() {
  return <PerformanceView />;
}
