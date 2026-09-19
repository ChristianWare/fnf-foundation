import type { Metadata } from "next";
    import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
    import { guides } from "@/lib/pageGuides";
    import { SITE } from "@/config/site";
    import Link from "next/link";
import { fleetData } from "@/lib/data";

    export const metadata: Metadata = {
      title: "Fleet",
      description: `The ${SITE.name} fleet: sedans, SUVs, and Sprinters with passenger and luggage capacity.`,
    };

    export default function Page() {
      return (
        <PagePlaceholder {...guides.fleet}>
          <h2>Vehicles (from src/lib/data.ts)</h2>
          <ul>
            {fleetData.map((v) => (
              <li key={v.slug}>
                <Link href={`/fleet/${v.slug}`}>{v.name}</Link> — {v.passengers} passengers, {v.luggage} bags. {v.bestFor}.
              </li>
            ))}
          </ul>
        </PagePlaceholder>
      );
    }
