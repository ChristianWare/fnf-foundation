import type { Metadata } from "next";
import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
import { guides } from "@/lib/pageGuides";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Private Aviation",
  description: `FBO and charter transportation from ${SITE.name}.`,
};

export default function Page() {
  return (
    <PagePlaceholder {...guides.privateAviation}></PagePlaceholder>
  );
}
