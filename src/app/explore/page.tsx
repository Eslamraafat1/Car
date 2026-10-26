import type { Metadata } from "next";
import ExploreView from "@/components/pages/ExploreView";
import { C } from "@/lib/content";

export const metadata: Metadata = {
  title: "استعرض كل موديل · Explore Every Model",
  description: `${C.pages.explore.body.ar} — ${C.pages.explore.body.en}`,
  openGraph: {
    title: "AURELIS · Explore Every Model",
    description: C.pages.explore.body.en,
  },
};

export default function ExplorePage() {
  return <ExploreView />;
}
