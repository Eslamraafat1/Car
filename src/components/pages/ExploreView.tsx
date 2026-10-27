import PageHeader from "@/components/automotive/PageHeader";
import CarOfTheDay from "@/components/automotive/CarOfTheDay";
import ExploreCategories from "@/components/automotive/ExploreCategories";
import WordBand from "@/components/ui/WordBand";
import VehicleCollection from "@/components/automotive/VehicleCollection";
import { C } from "@/lib/content";

export default function ExploreView() {
  return (
    <>
      <PageHeader
        eyebrow={C.pages.explore.eyebrow}
        title={C.pages.explore.title}
        body={C.pages.explore.body}
      />
      <CarOfTheDay />
      <ExploreCategories />
      <VehicleCollection withHeader={false} variant="showroom" />
      <WordBand reverse />
    </>
  );
}
