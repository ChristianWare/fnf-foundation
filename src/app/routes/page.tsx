import type { Metadata } from "next";
    import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
    import { guides } from "@/lib/pageGuides";
    import { SITE } from "@/config/site";
    import Link from "next/link";
import { routesData } from "@/lib/routes";

    export const metadata: Metadata = {
      title: "Routes",
      description: `Flat-rate routes from ${SITE.name}, including suburb-to-airport transfers.`,
    };

    export default function Page() {
      return (
        <PagePlaceholder {...guides.routes}>
          <h2>Routes (from src/lib/routes.ts)</h2>
          <ul>
            {routesData.map((r) => (
              <li key={r.slug}>
                <Link href={`/routes/${r.slug}`}>{r.origin} to {r.destination}</Link>
              </li>
            ))}
          </ul>
        </PagePlaceholder>
      );
    }
