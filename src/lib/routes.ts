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
  /**
   * Heading when riders search this route with another word, e.g.
   * "Private Tucson to Phoenix Shuttle & Car Service". Put the same word in
   * the page title. Default: "[Origin] to [Destination] Car Service".
   */
  h1?: string;
  /**
   * Set on routes riders search with "shuttle" to show a private vs. shared
   * shuttle comparison table (pickup, drop-off, departure, stops, who rides,
   * price, best for). Don't quote other companies' prices.
   */
  shuttle?: { intro: string; sharedDropoff: string; privateDropoff: string };
};

export const routesData: readonly RouteEntry[] = [
  { slug: "scottsdale-to-phx-sky-harbor", origin: "Scottsdale", destination: "PHX Sky Harbor", airportSlug: "phx-sky-harbor" },
  { slug: "phoenix-to-scottsdale-airport", origin: "Phoenix", destination: "Scottsdale Airport", airportSlug: "scottsdale-airport" },
  { slug: "phoenix-to-tucson", origin: "Phoenix", destination: "Tucson" },
];
