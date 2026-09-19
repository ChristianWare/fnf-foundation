/**
 * Example service-area cities. One entry = one /locations/[city] page.
 * Only add cities you can write locally specific content for.
 */
export type CityEntry = {
  slug: string;
  name: string;
  /** One line shown on the hub and in llms.txt */
  note: string;
};

export const serviceAreaCities: readonly CityEntry[] = [
  { slug: "phoenix", name: "Phoenix", note: "Primary market. Downtown, Biltmore, Arcadia, and Sky Harbor." },
  { slug: "scottsdale", name: "Scottsdale", note: "Resorts, Old Town, and the most common airport route." },
  { slug: "tempe", name: "Tempe", note: "ASU, Mill Avenue, and corporate offices along the 101." },
];
