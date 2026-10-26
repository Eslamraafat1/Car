import type { Metadata } from "next";
import AboutView from "@/components/pages/AboutView";
import { C } from "@/lib/content";

export const metadata: Metadata = {
  title: "عن أوريليس · About Aurelis",
  description: `${C.pages.about.body.ar} — ${C.pages.about.body.en}`,
  openGraph: {
    title: "AURELIS · About",
    description: C.pages.about.body.en,
  },
};

export default function AboutPage() {
  return <AboutView />;
}
