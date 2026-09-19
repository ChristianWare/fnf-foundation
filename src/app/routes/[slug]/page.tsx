import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
import { guides } from "@/lib/pageGuides";
import { SITE } from "@/config/site";
import { routesData } from "@/lib/routes";

type Params = { slug: string };

export function generateStaticParams() {
  return routesData.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = routesData.find((e) => e.slug === slug);
  if (!entry) return { title: "Not found" };
  return { title: `${entry.origin} to ${entry.destination} Car Service`, description: `Flat-rate car service from ${entry.origin} to ${entry.destination} with ${SITE.name}.` };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = routesData.find((e) => e.slug === slug);
  if (!entry) notFound();
  return <PagePlaceholder {...guides.routeDetail} heading={`${entry.origin} to ${entry.destination} Car Service`} />;
}
