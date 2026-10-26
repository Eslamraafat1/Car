import CinematicHero from "@/components/automotive/CinematicHero";
import CompanyIntro from "@/components/automotive/CompanyIntro";
import MarqueeStrip from "@/components/automotive/MarqueeStrip";
import EngineeringSection from "@/components/automotive/EngineeringSection";
import ProcessSection from "@/components/automotive/ProcessSection";
import AutomotiveShowcase from "@/components/automotive/AutomotiveShowcase";
import Testimonials from "@/components/automotive/Testimonials";
import FinalCTA from "@/components/automotive/FinalCTA";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <CompanyIntro />
      <MarqueeStrip />
      <EngineeringSection />
      <ProcessSection />
      <AutomotiveShowcase />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
