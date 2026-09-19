/**
 * ───────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — the one file you edit for every new client.
 * ───────────────────────────────────────────────────────────────────────────
 *  Every brand-specific value in the codebase reads from here: page titles,
 *  meta descriptions, JSON-LD, transactional emails, PDFs, the nav, the
 *  footer, the legal pages, the PWA manifest, llms.txt.
 *
 *  Values the OPERATOR can change later without a deploy (dispatch phone,
 *  office hours, social links, Stripe keys, logo upload) live in
 *  Admin → Company Settings and fall back to these values until filled in.
 *
 *  Search the repo for `SITE.` to see where each value lands.
 */

export type PartnerLink = {
  /** Menu label, e.g. "Grand Hotel & Spa" */
  text: string;
  /** Route of the partner landing page, e.g. "/partners/grand-hotel" */
  href: string;
  /** One-line description shown under the label in the dropdown */
  copy: string;
};

export interface SiteConfig {
  /** Display name used everywhere: "Skyline Black Car" */
  name: string;
  /** Legal entity for invoices, checks, terms: "Skyline Black Car LLC" */
  legalName: string;
  /** URL-safe id used for storage folders and cache keys: "skyline-black-car" */
  slug: string;
  /** Short positioning line used in titles and the manifest */
  tagline: string;
  /** Default meta description (≤160 chars) */
  description: string;
  /** Canonical origin, no trailing slash. Decides www vs apex (see next.config.ts) */
  url: string;
  /** Derived from url — do not edit */
  domain: string;
  email: {
    info: string;
    reservations: string;
    support: string;
    admin: string;
    corporate: string;
    noReply: string;
  };
  phone: {
    /** Human format shown on the site: "(480) 555-0100" */
    display: string;
    /** E.164 for tel: links and JSON-LD: "+14805550100" */
    tel: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  /** IANA timezone the business operates in */
  timezone: string;
  market: {
    /** Primary metro: "Phoenix" */
    city: string;
    /** "Arizona" */
    state: string;
    /** "AZ" */
    stateCode: string;
    /** How locals refer to the area: "the Valley" */
    region: string;
  };
  owner: {
    name: string;
    title: string;
  };
  /** Year founded, shown in about copy and JSON-LD */
  founded: string;
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
    google: string;
    yelp: string;
  };
  /** Paths under /public */
  logo: string;
  ogImage: string;
  /** PWA theme color */
  themeColor: string;
  nav: {
    /** Partner landing pages. Empty array hides the Partners menu. */
    partners: PartnerLink[];
  };
}

const url = "https://www.example.com";

export const SITE: SiteConfig = {
  name: "Your Company",
  legalName: "Your Company LLC",
  slug: "your-company",
  tagline: "Private black car service in Phoenix, Arizona",
  description:
    "Professional chauffeured transportation in Phoenix and Scottsdale. Flat-rate airport transfers, corporate accounts, and event transportation. Book online in under a minute.",
  url,
  domain: new URL(url).host,
  email: {
    info: "info@example.com",
    reservations: "reservations@example.com",
    support: "support@example.com",
    admin: "admin@example.com",
    corporate: "corporate@example.com",
    noReply: "no-reply@example.com",
  },
  phone: {
    display: "(000) 000-0000",
    tel: "+10000000000",
  },
  address: {
    street: "123 Main St, Suite 100",
    city: "Phoenix",
    state: "AZ",
    zip: "85004",
    country: "US",
  },
  timezone: "America/Phoenix",
  market: {
    city: "Phoenix",
    state: "Arizona",
    stateCode: "AZ",
    region: "the Valley",
  },
  owner: {
    name: "Owner Name",
    title: "Founder & Owner",
  },
  founded: "2020",
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    google: "",
    yelp: "",
  },
  logo: "/brand/logo.png",
  ogImage: "/brand/og-image.png",
  themeColor: "#000000",
  nav: {
    partners: [],
  },
};
