import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
import { guides } from "@/lib/pageGuides";
import { SITE } from "@/config/site";
import { servicesData } from "@/lib/services";

type Params = { slug: string };

export function generateStaticParams() {
  return servicesData.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = servicesData.find((e) => e.slug === slug);
  if (!entry) return { title: "Not found" };
  return { title: `${entry.title} in ${SITE.market.city}`, description: `${entry.copy} ${SITE.name}.` };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = servicesData.find((e) => e.slug === slug);
  if (!entry) notFound();
  return <PagePlaceholder {...guides.serviceDetail} heading={`${entry.title} in ${SITE.market.city}`} />;
}
