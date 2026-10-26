import type { Metadata } from "next";
import ElectricView from "@/components/pages/ElectricView";
import { C } from "@/lib/content";

export const metadata: Metadata = {
  title: "كهربائي · Electric",
  description: `${C.pages.electric.body.ar} — ${C.pages.electric.body.en}`,
  openGraph: {
    title: "AURELIS · Electric",
    description: C.pages.electric.body.en,
  },
};

export default function ElectricPage() {
  return <ElectricView />;
}
