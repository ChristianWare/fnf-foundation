/**
 * Example airports. One entry = one /airports/[slug] page. Keep in sync with
 * Admin → Airports (which drives booking and pricing).
 */
export type AirportEntry = {
  slug: string;
  name: string;
  code: string;
  note: string;
  /** Slugs of the 3–5 city pages closest to this airport, linked from it. */
  nearbyCities?: readonly string[];
  /** Blog guides about this airport (terminals, parking, airlines). */
  relatedPosts?: readonly { label: string; href: string }[];
};

export const airportsData: readonly AirportEntry[] = [
  { slug: "phx-sky-harbor", name: "Phoenix Sky Harbor International Airport", code: "PHX", note: "Main commercial airport, Terminals 3 and 4." },
  { slug: "scottsdale-airport", name: "Scottsdale Airport", code: "SDL", note: "Private and charter flights, several FBOs." },
  { slug: "phoenix-mesa-gateway", name: "Phoenix–Mesa Gateway Airport", code: "AZA", note: "Low-cost carriers, East Valley." },
];
