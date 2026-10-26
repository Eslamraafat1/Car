import CinematicHero from "@/components/automotive/CinematicHero";
import CompanyIntro from "@/components/automotive/CompanyIntro";
import MarqueeStrip from "@/components/automotive/MarqueeStrip";
import EngineeringSection from "@/components/automotive/EngineeringSection";
import WheelSection from "@/components/automotive/WheelSection";
import HorizontalGallery from "@/components/automotive/HorizontalGallery";
import ProcessSection from "@/components/automotive/ProcessSection";
import AutomotiveShowcase from "@/components/automotive/AutomotiveShowcase";
import Testimonials from "@/components/automotive/Testimonials";
import FaqSection from "@/components/automotive/FaqSection";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <CompanyIntro />
      <MarqueeStrip />
      <EngineeringSection />
      <WheelSection />
      <HorizontalGallery />
      <ProcessSection />
      <AutomotiveShowcase />
      <Testimonials />
      <FaqSection />
    </>
  );
}
