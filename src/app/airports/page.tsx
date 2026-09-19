import type { Metadata } from "next";
    import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
    import { guides } from "@/lib/pageGuides";
    import { SITE } from "@/config/site";
    import Link from "next/link";
import { airportsData } from "@/lib/airports";

    export const metadata: Metadata = {
      title: "Airports",
      description: `Airport car service from ${SITE.name}: meet-and-greet, flight tracking, flat rates.`,
    };

    export default function Page() {
      return (
        <PagePlaceholder {...guides.airports}>
          <h2>Airports served (from src/lib/airports.ts)</h2>
          <ul>
            {airportsData.map((a) => (
              <li key={a.slug}>
                <Link href={`/airports/${a.slug}`}>{a.name} ({a.code})</Link> — {a.note}
              </li>
            ))}
            <li>
              <Link href="/airports/private-aviation">Private aviation</Link>
            </li>
          </ul>
        </PagePlaceholder>
      );
    }
