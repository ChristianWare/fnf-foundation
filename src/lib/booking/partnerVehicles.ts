// src/lib/booking/partnerVehicles.ts
//
// Vehicles that belong to a partner's own booking page (a hotel or golf club
// with its own booking tool). They're booked only on that partner's page, so
// the public, corporate and admin booking tools never list them, and the
// website's fleet prices never include them.
//
// Which vehicles: SITE.partnerVehicles in src/config/site.ts, keyed by
// partner id, listed by their exact name in Admin → Vehicle Categories.
// Empty by default, which makes every active vehicle public.

import { SITE } from "@/config/site";

/** A partner id from SITE.partnerVehicles, e.g. "grand-hotel". */
export type PartnerTool = string;

export const PARTNER_VEHICLE_NAMES: string[] = Object.values(
  SITE.partnerVehicles,
).flat();

/** Which partner's booking tool a vehicle belongs to, or null for public. */
export function partnerToolForVehicleName(
  name: string | null | undefined,
): PartnerTool | null {
  if (!name) return null;
  for (const [tool, names] of Object.entries(SITE.partnerVehicles)) {
    if (names.includes(name)) return tool;
  }
  return null;
}

/**
 * Can this vehicle be booked from this tool? Partner vehicles only from their
 * own partner's tool (they're often marked inactive on purpose so the public
 * tools never list them); every other vehicle must be active and is never
 * bookable from a partner tool.
 */
export function vehicleAllowedForTool(
  vehicle: { name: string; active: boolean } | null | undefined,
  tool: PartnerTool | null | undefined,
): boolean {
  if (!vehicle) return false;
  const owner = partnerToolForVehicleName(vehicle.name);
  if (owner) return tool === owner;
  return vehicle.active && !tool;
}

/** Prisma filter for the general booking tools: active, not a partner's. */
export const PUBLIC_VEHICLE_WHERE = {
  active: true,
  name: { notIn: PARTNER_VEHICLE_NAMES },
};
