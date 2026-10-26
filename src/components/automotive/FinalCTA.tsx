"use client";

import { usePathname } from "next/navigation";
import IgnitionFinale from "@/components/finale/IgnitionFinale";
import DrawFinale from "@/components/finale/DrawFinale";
import ChargeFinale from "@/components/finale/ChargeFinale";
import LaunchFinale from "@/components/finale/LaunchFinale";
import CreditsFinale from "@/components/finale/CreditsFinale";
import SignalFinale from "@/components/finale/SignalFinale";
import SpotlightFinale from "@/components/finale/SpotlightFinale";
import type { FinalePage } from "@/components/finale/finale-kit";
import { getVehicle } from "@/lib/vehicles";

const PAGE_ACCENTS: Record<FinalePage, string> = {
  home: "#4da3ff",
  explore: "#b7a1ff",
  electric: "#6fe7df",
  performance: "#ff6848",
  about: "#d7b078",
  contact: "#75d6c3",
  car: "#ff9c61",
};

function pageForPathname(pathname: string): FinalePage {
  if (pathname.startsWith("/cars/")) return "car";
  if (pathname === "/electric") return "electric";
  if (pathname === "/performance") return "performance";
  if (pathname === "/about") return "about";
  if (pathname === "/contact") return "contact";
  if (pathname === "/explore") return "explore";
  return "home";
}

/**
 * Every page ends on its own finale instead of one shared CTA: the home page
 * ignites, explore draws a model, electric charges, performance revs to the
 * redline, about rolls its credits, contact pings a sonar, and a car page gets
 * its own spotlight.
 */
export default function FinalCTA() {
  const pathname = usePathname();
  const page = pageForPathname(pathname);
  const vehicle = page === "car" ? getVehicle(pathname.split("/")[2] ?? "") : undefined;

  switch (page) {
    case "explore":
      return <DrawFinale accent={PAGE_ACCENTS.explore} />;
    case "electric":
      return <ChargeFinale accent={PAGE_ACCENTS.electric} />;
    case "performance":
      return <LaunchFinale accent={PAGE_ACCENTS.performance} />;
    case "about":
      return <CreditsFinale accent={PAGE_ACCENTS.about} />;
    case "contact":
      return <SignalFinale accent={PAGE_ACCENTS.contact} />;
    case "car":
      return vehicle ? <SpotlightFinale vehicle={vehicle} /> : <DrawFinale accent={PAGE_ACCENTS.car} />;
    default:
      return <IgnitionFinale accent={PAGE_ACCENTS.home} />;
  }
}
