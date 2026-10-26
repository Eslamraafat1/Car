import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CarDetailView from "@/components/pages/CarDetailView";
import { C } from "@/lib/content";
import { getVehicle, VEHICLES } from "@/lib/vehicles";

interface CarPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return VEHICLES.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({ params }: CarPageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) return { title: C.pages.notFound.title.en };

  const title = `${vehicle.brand} ${vehicle.model} · ${vehicle.year}`;
  return {
    title,
    description: `${vehicle.description.ar} — ${vehicle.description.en}`,
    openGraph: {
      title: `AURELIS · ${title}`,
      description: vehicle.description.en,
      images: [{ url: vehicle.image, width: 2400, height: 1600 }],
    },
  };
}

/**
 * This segment may block on `params` (allowed by design): every known slug is
 * prerendered, and unknown ones throw `notFound()` before any content renders.
 * `dynamicParams` is intentionally not used — it is incompatible with
 * `cacheComponents` in this Next.js version.
 */
export const instant = false;

export default async function CarPage({ params }: CarPageProps) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();

  const related = VEHICLES.filter(
    (candidate) => candidate.category === vehicle.category && candidate.slug !== vehicle.slug,
  ).slice(0, 3);

  return <CarDetailView vehicle={vehicle} related={related} />;
}
