import type { Metadata } from "next";
import AboutView from "@/components/pages/AboutView";
import { C } from "@/lib/content";

export const metadata: Metadata = {
  title: "عن إيفاي · About Evay",
  description: `${C.pages.about.body.ar} — ${C.pages.about.body.en}`,
  openGraph: {
    title: "EVAY · About",
    description: C.pages.about.body.en,
  },
};

export default function AboutPage() {
  return <AboutView />;
}
