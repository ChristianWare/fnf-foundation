import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
import { guides } from "@/lib/pageGuides";
import { SITE } from "@/config/site";
import { fleetData } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams() {
  return fleetData.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = fleetData.find((e) => e.slug === slug);
  if (!entry) return { title: "Not found" };
  return { title: entry.name, description: `${entry.name}: ${entry.passengers} passengers, ${entry.luggage} bags. ${SITE.name}.` };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = fleetData.find((e) => e.slug === slug);
  if (!entry) notFound();
  return <PagePlaceholder {...guides.fleetDetail} heading={entry.name} />;
}
