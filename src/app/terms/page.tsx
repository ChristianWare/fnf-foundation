import type { Metadata } from "next";
import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
import { guides } from "@/lib/pageGuides";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Booking terms, cancellation policy, and fees for ${SITE.name}.`,
};

export default function Page() {
  return (
    <PagePlaceholder {...guides.terms}></PagePlaceholder>
  );
}
