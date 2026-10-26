import PageHeader from "@/components/automotive/PageHeader";
import VehicleCollection from "@/components/automotive/VehicleCollection";
import FinalCTA from "@/components/automotive/FinalCTA";
import ShowcaseSections from "@/components/automotive/ShowcaseSections";
import { C } from "@/lib/content";
import { VEHICLES } from "@/lib/vehicles";

const ELECTRIC = VEHICLES.filter((vehicle) => vehicle.category === "electric");

export default function ElectricView() {
  return (
    <>
      <PageHeader
        eyebrow={C.pages.electric.eyebrow}
        title={C.pages.electric.title}
        body={C.pages.electric.body}
      />
      <VehicleCollection
        vehicles={ELECTRIC}
        variant="electric"
        withHeader={false}
        withFilters={false}
        title={C.pages.electric.listTitle}
      />
      <ShowcaseSections page="electric" />
      <FinalCTA />
    </>
  );
}
