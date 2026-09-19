import type { Metadata } from "next";
import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
import { guides } from "@/lib/pageGuides";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE.name}: who we are, our chauffeurs, our fleet, and our standards.`,
};

export default function Page() {
  return (
    <PagePlaceholder {...guides.about}></PagePlaceholder>
  );
}
