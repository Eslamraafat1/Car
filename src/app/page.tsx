import CinematicHero from "@/components/automotive/CinematicHero";
import CompanyIntro from "@/components/automotive/CompanyIntro";
import MarqueeStrip from "@/components/automotive/MarqueeStrip";
import EngineeringSection from "@/components/automotive/EngineeringSection";
import AutomotiveShowcase from "@/components/automotive/AutomotiveShowcase";
import FinalCTA from "@/components/automotive/FinalCTA";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <CompanyIntro />
      <MarqueeStrip />
      <EngineeringSection />
      <AutomotiveShowcase />
      <FinalCTA />
    </>
  );
}
