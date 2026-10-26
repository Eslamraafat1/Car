import CinematicHero from "@/components/automotive/CinematicHero";
import CompanyIntro from "@/components/automotive/CompanyIntro";
import VisionMission from "@/components/automotive/VisionMission";
import ServicesStack from "@/components/automotive/ServicesStack";
import WheelSection from "@/components/automotive/WheelSection";
import HorizontalGallery from "@/components/automotive/HorizontalGallery";
import ProcessSection from "@/components/automotive/ProcessSection";
import Partners from "@/components/automotive/Partners";
import Testimonials from "@/components/automotive/Testimonials";
import FaqSection from "@/components/automotive/FaqSection";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <CompanyIntro />
      <VisionMission />
      <ServicesStack />
      <WheelSection />
      <HorizontalGallery />
      <ProcessSection />
      <Partners />
      <Testimonials />
      <FaqSection />
    </>
  );
}
