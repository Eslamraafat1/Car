import PageHeader from "@/components/automotive/PageHeader";
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
      <VehicleCollection withHeader={false} variant="showroom" />
    </>
  );
}
