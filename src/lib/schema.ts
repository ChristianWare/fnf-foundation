// src/lib/schema.ts
//
// The one business entity for structured data (JSON-LD).
//
// Rendered once, site-wide, from the root layout. Every other schema block
// (Service, Article, ItemList, FAQPage…) points at it with
// `provider: BUSINESS_REF` or `publisher: BUSINESS_REF` instead of repeating
// the name, phone and address. Google then sees one business, the same one as
// the Google Business Profile, instead of a dozen slightly different copies.
//
// Everything comes from src/config/site.ts and Admin → Company Settings.
// Name, address and phone must match the Google Business Profile, the footer,
// Yelp and every other listing character for character.

import { SITE } from "@/config/site";
import { serviceAreaCities } from "@/lib/cities";

export const BUSINESS_ID = `${SITE.url}/#business`;

/** Use as `provider`, `publisher` or `worksFor` in page-level schema. */
export const BUSINESS_REF = { "@id": BUSINESS_ID } as const;

/** Profile URLs saved in Admin → Company Settings (same ones the footer uses). */
export type BusinessProfileUrls = {
  googleBusinessUrl?: string | null;
  yelpUrl?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  tiktokUrl?: string | null;
  youtubeUrl?: string | null;
};

const clean = (u?: string | null) => (u ?? "").trim();

/**
 * The full business entity for the root layout. `hasMap` and the Google entry
 * in `sameAs` appear only once a Google Business URL is saved (Company
 * Settings or SITE.social.google), so nothing half-finished ships.
 */
export function buildBusinessSchema(urls: BusinessProfileUrls = {}) {
  const gbp = clean(urls.googleBusinessUrl) || clean(SITE.social.google);
  const sameAs = Array.from(
    new Set(
      [
        gbp,
        clean(urls.yelpUrl),
        clean(urls.instagramUrl),
        clean(urls.facebookUrl),
        clean(urls.linkedinUrl),
        clean(urls.twitterUrl),
        clean(urls.tiktokUrl),
        clean(urls.youtubeUrl),
        ...Object.values(SITE.social).map(clean),
      ]
        .filter((u) => /^https?:\/\//.test(u))
        .map((u) => u.replace(/\/+$/, "")),
    ),
  );

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}${SITE.logo}`,
    image: `${SITE.url}${SITE.ogImage}`,
    telephone: SITE.phone.tel,
    email: SITE.email.info,
    description: SITE.description,
    foundingDate: SITE.founded,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: SITE.address.country,
    },
    // Most black car operators dispatch around the clock. Change this if the
    // client keeps office hours.
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: serviceAreaCities.map((c) => ({
      "@type": "City",
      name: c.name,
      containedInPlace: { "@type": "State", name: SITE.market.state },
    })),
    ...(gbp && { hasMap: gbp }),
    sameAs,
  };
}
