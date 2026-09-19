import type { Metadata } from "next";
import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
import { guides } from "@/lib/pageGuides";
import { SITE } from "@/config/site";
import CorporateInquiryForm from "@/components/shared/SimpleForms/CorporateInquiryForm";

export const metadata: Metadata = {
  title: "Corporate Accounts",
  description: `Corporate ground transportation accounts with ${SITE.name}: monthly billing, a booking portal, and consistent chauffeurs.`,
};

export default function Page() {
  return (
    <PagePlaceholder {...guides.corporateAccounts}>
      <h2>Request a corporate account</h2>
      <CorporateInquiryForm />
    </PagePlaceholder>
  );
}
