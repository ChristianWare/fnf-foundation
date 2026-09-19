import type { Metadata } from "next";
import PagePlaceholder from "@/components/shared/PagePlaceholder/PagePlaceholder";
import { guides } from "@/lib/pageGuides";
import { SITE } from "@/config/site";
import ContactForm from "@/components/shared/SimpleForms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE.name} by phone, email, or the form.`,
};

export default function Page() {
  return (
    <PagePlaceholder {...guides.contact}>
      <h2>Contact details (from src/config/site.ts)</h2>
      <p>
        <a href={`tel:${SITE.phone.tel}`}>{SITE.phone.display}</a>
        <br />
        <a href={`mailto:${SITE.email.info}`}>{SITE.email.info}</a>
        <br />
        {SITE.address.street}, {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
      </p>
      <h2>Send a message</h2>
      <ContactForm />
    </PagePlaceholder>
  );
}
