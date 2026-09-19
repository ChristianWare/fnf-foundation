import type { Metadata } from "next";
    import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
    import { guides } from "@/lib/pageGuides";
    import { SITE } from "@/config/site";
    import Link from "next/link";
import { serviceAreaCities } from "@/lib/cities";

    export const metadata: Metadata = {
      title: "Service Areas",
      description: `Cities and areas served by ${SITE.name}.`,
    };

    export default function Page() {
      return (
        <PagePlaceholder {...guides.locations}>
          <h2>Cities (from src/lib/cities.ts)</h2>
          <ul>
            {serviceAreaCities.map((c) => (
              <li key={c.slug}>
                <Link href={`/locations/${c.slug}`}>{c.name}</Link> — {c.note}
              </li>
            ))}
          </ul>
        </PagePlaceholder>
      );
    }
