"use client";

import { Fragment } from "react";
import { SECTIONS, type ShowcasePage } from "@/lib/showcase";
import type { ShowcaseSection } from "@/lib/showcase-types";
import ChapterSweep from "@/components/ui/ChapterSweep";
import CinematicStill from "./showcase/CinematicStill";
import StatSpotlight from "./showcase/StatSpotlight";
import DetailGrid from "./showcase/DetailGrid";
import EditorialSplit from "./showcase/EditorialSplit";
import FeaturePins from "./showcase/FeaturePins";
import LineupStrip from "./showcase/LineupStrip";

function Section({ data }: { data: ShowcaseSection }) {
  switch (data.kind) {
    case "still":
      return <CinematicStill content={data} />;
    case "stat":
      return <StatSpotlight content={data} />;
    case "detail":
      return <DetailGrid content={data} />;
    case "editorial":
      return <EditorialSplit content={data} />;
    case "pins":
      return <FeaturePins content={data} />;
    case "lineup":
      return <LineupStrip content={data} />;
    default:
      return null;
  }
}

/** Renders a page's four editorial, car-first showcase sections. */
export default function ShowcaseSections({ page }: { page: ShowcasePage }) {
  const sections = SECTIONS[page] ?? [];
  const accent: Partial<Record<ShowcasePage, string>> = {
    home: "#4da3ff",
    explore: "#b7a1ff",
    car: "#4da3ff",
    electric: "#6fe7df",
    performance: "#ff6848",
    about: "#d7b078",
    contact: "#75d6c3",
  };
  return (
    <div className="showcase-page" data-showcase-page={page}>
      {sections.map((data, i) => {
        const content = data.accent ? data : { ...data, accent: accent[page] };
        return (
          <Fragment key={`${page}-${i}`}>
            {i > 0 && (
              <ChapterSweep index={i + 1} total={sections.length} accent={accent[page]} />
            )}
            <div className="showcase-chapter" data-kind={data.kind} data-chapter={String(i + 1).padStart(2, "0")}>
              <Section data={content} />
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
