import CinematicHero from "@/components/automotive/CinematicHero";
import RevealScene from "@/components/automotive/RevealScene";
import DesignScene from "@/components/automotive/DesignScene";
import DetailsScene from "@/components/automotive/DetailsScene";
import StackingCarsSection from "@/components/automotive/StackingCarsSection";
import MarqueeStrip from "@/components/automotive/MarqueeStrip";
import PerformanceScene from "@/components/automotive/PerformanceScene";
import EngineeringSection from "@/components/automotive/EngineeringSection";
import AutomotiveShowcase from "@/components/automotive/AutomotiveShowcase";
import ExperienceSelector from "@/components/automotive/ExperienceSelector";
import VehicleCollection from "@/components/automotive/VehicleCollection";
import FutureMobilitySection from "@/components/automotive/FutureMobilitySection";
import FinalCTA from "@/components/automotive/FinalCTA";
import ShowcaseSections from "@/components/automotive/ShowcaseSections";
import ChapterRail from "@/components/ui/ChapterRail";

export default function HomePage() {
  return (
    <>
      <ChapterRail />
      <CinematicHero />
      <RevealScene />
      <DesignScene />
      <DetailsScene />
      <StackingCarsSection />
      <MarqueeStrip />
      <PerformanceScene />
      <EngineeringSection />
      <AutomotiveShowcase />
      <ExperienceSelector />
      <VehicleCollection />
      <FutureMobilitySection />
      <ShowcaseSections page="home" />
      <FinalCTA />
    </>
  );
}
