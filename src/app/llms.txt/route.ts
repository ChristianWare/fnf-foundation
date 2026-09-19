import { SITE } from "@/config/site";
import { servicesData } from "@/lib/services";
import { serviceAreaCities } from "@/lib/cities";
import { routesData } from "@/lib/routes";

// /llms.txt — a plain-text index that AI search engines can read.
// Generated from config + content so it never goes stale.
export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description} Book online or call ${SITE.phone.display}.`,
    "",
    "## Services",
    "",
    ...servicesData.map((s) => `- [${s.title}](${SITE.url}/services/${s.slug}): ${s.copy}`),
    `- [All Services](${SITE.url}/services)`,
    "",
    "## Service Areas",
    "",
    ...serviceAreaCities.map((c) => `- [${c.name}](${SITE.url}/locations/${c.slug}): ${c.note}`),
    `- [All Service Areas](${SITE.url}/locations)`,
    "",
    "## Popular Routes",
    "",
    ...routesData.map((r) => `- [${r.origin} to ${r.destination}](${SITE.url}/routes/${r.slug})`),
    "",
    "## Fleet",
    "",
    `- [Full Fleet](${SITE.url}/fleet)`,
    "",
    "## Book",
    "",
    `- [Book Online](${SITE.url}/book)`,
    `- [Contact](${SITE.url}/contact)`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
