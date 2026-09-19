import type { Metadata } from "next";
    import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
    import { guides } from "@/lib/pageGuides";
    import { SITE } from "@/config/site";
    import Link from "next/link";
import { servicesData } from "@/lib/services";

    export const metadata: Metadata = {
      title: "Services",
      description: `Airport transfers, corporate travel, events, and hourly chauffeur service from ${SITE.name}.`,
    };

    export default function Page() {
      return (
        <PagePlaceholder {...guides.services}>
          <h2>Services (from src/lib/services.ts)</h2>
          <ul>
            {servicesData.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.title}</Link> — {s.copy}
              </li>
            ))}
          </ul>
        </PagePlaceholder>
      );
    }
