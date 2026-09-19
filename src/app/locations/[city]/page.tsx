import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
import { guides } from "@/lib/pageGuides";
import { SITE } from "@/config/site";
import { serviceAreaCities } from "@/lib/cities";

type Params = { city: string };

export function generateStaticParams() {
  return serviceAreaCities.map((e) => ({ city: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city } = await params;
  const entry = serviceAreaCities.find((e) => e.slug === city);
  if (!entry) return { title: "Not found" };
  return { title: `Car Service in ${entry.name}`, description: `${SITE.name} in ${entry.name}: ${entry.note}` };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { city } = await params;
  const entry = serviceAreaCities.find((e) => e.slug === city);
  if (!entry) notFound();
  return <PagePlaceholder {...guides.cityDetail} heading={`Car Service in ${entry.name}`} />;
}
