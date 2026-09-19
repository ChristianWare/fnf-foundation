/**
 * Example routes. One entry = one /routes/[slug] page. "[Suburb] to [Airport]"
 * is the most common booking search pattern in the niche.
 */
export type RouteEntry = {
  slug: string;
  origin: string;
  destination: string;
  /** Slug of the airport page this route lands at, if any */
  airportSlug?: string;
};

export const routesData: readonly RouteEntry[] = [
  { slug: "scottsdale-to-phx-sky-harbor", origin: "Scottsdale", destination: "PHX Sky Harbor", airportSlug: "phx-sky-harbor" },
  { slug: "phoenix-to-scottsdale-airport", origin: "Phoenix", destination: "Scottsdale Airport", airportSlug: "scottsdale-airport" },
  { slug: "phoenix-to-tucson", origin: "Phoenix", destination: "Tucson" },
];
