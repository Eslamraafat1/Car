import type { Metadata } from "next";
import ContactView from "@/components/pages/ContactView";
import { C } from "@/lib/content";

export const metadata: Metadata = {
  title: "تواصل · Contact",
  description: `${C.pages.contact.body.ar} — ${C.pages.contact.body.en}`,
  openGraph: {
    title: "AURELIS · Contact",
    description: C.pages.contact.body.en,
  },
};

export default function ContactPage() {
  return <ContactView />;
}
