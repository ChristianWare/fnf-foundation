import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
import { guides } from "@/lib/pageGuides";
import { SITE } from "@/config/site";
import { airportsData } from "@/lib/airports";

type Params = { slug: string };

export function generateStaticParams() {
  return airportsData.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = airportsData.find((e) => e.slug === slug);
  if (!entry) return { title: "Not found" };
  return { title: `${entry.name} Car Service`, description: `Car service to and from ${entry.name} (${entry.code}) with ${SITE.name}.` };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = airportsData.find((e) => e.slug === slug);
  if (!entry) notFound();
  return <PagePlaceholder {...guides.airportDetail} heading={`${entry.name} Car Service`} />;
}
