/**
 * Example service-area cities. One entry = one /locations/[city] page.
 * Only add cities you can write locally specific content for.
 */
export type CityEntry = {
  slug: string;
  name: string;
  /** One line shown on the hub and in llms.txt */
  note: string;
  /**
   * 4–5 questions written for THIS city: drive time to its airport, the
   * venues and events riders go to, the communities you pick up in. Every
   * answer must differ from every other city's. Render them with FAQPage
   * schema. City pages without their own FAQs looked like copies of each
   * other and Google left them out of the index.
   */
  faqs?: readonly {
    q: string;
    a: string;
    /** Optional link under the answer, to a route, airport or service page */
    link?: { href: string; label: string };
  }[];
  /** One promo for the ride this city books most (its airport or route page). */
  routePromo?: { href: string; anchor: string; blurb: string };
  /** Slugs of 3–5 neighboring city pages, linked as "Car service in X". */
  nearby?: readonly string[];
};

export const serviceAreaCities: readonly CityEntry[] = [
  { slug: "phoenix", name: "Phoenix", note: "Primary market. Downtown, Biltmore, Arcadia, and Sky Harbor." },
  { slug: "scottsdale", name: "Scottsdale", note: "Resorts, Old Town, and the most common airport route." },
  { slug: "tempe", name: "Tempe", note: "ASU, Mill Avenue, and corporate offices along the 101." },
];
