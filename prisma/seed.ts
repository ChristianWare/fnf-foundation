/**
 * Seed — run once on a fresh database:  npm run db:seed
 *
 * Creates:
 *   1. The admin login          (SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD, or defaults below)
 *   2. Company settings          (from src/config/site.ts — editable later in Admin → Company)
 *   3. Default service types     (airport, point-to-point, hourly — prices are examples)
 *   4. Default vehicle categories (sedan, SUV, sprinter — prices are examples)
 *   5. Example airports          (Phoenix metro — replace per client in Admin → Airports)
 *
 * Every step is an upsert, so re-running is safe and never duplicates rows.
 * Prices are in cents. Change them in the admin, not here.
 */
import "dotenv/config";
import {
  PrismaClient,
  Role,
  ServicePricingStrategy,
  AirportLeg,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import { SITE } from "../src/config/site";

const db = new PrismaClient();

async function seedAdmin() {
  const email = (process.env.SEED_ADMIN_EMAIL ?? SITE.email.admin).toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";
  const hashed = await bcrypt.hash(password, 10);

  await db.user.upsert({
    where: { email },
    update: { roles: { set: [Role.ADMIN] } },
    create: {
      email,
      name: `${SITE.name} Admin`,
      password: hashed,
      roles: [Role.ADMIN],
      emailVerified: new Date(),
    },
  });
  console.log(`✓ admin user: ${email}  (password: ${process.env.SEED_ADMIN_PASSWORD ? "from env" : password})`);
}

async function seedCompanySettings() {
  const digits = SITE.phone.tel.replace(/\D/g, "");
  const raw = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;

  await db.companySettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      companyName: SITE.name,
      companyTagline: SITE.tagline,
      dispatchPhone: SITE.phone.display,
      dispatchPhoneRaw: raw,
      supportEmail: SITE.email.support,
      officeName: SITE.legalName,
      officeAddress: SITE.address.street,
      officeCity: `${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}`,
      timezone: SITE.timezone,
      websiteUrl: SITE.url,
      emailSenderName: SITE.name,
      emailReplyTo: SITE.email.reservations,
      checkPayableTo: SITE.legalName,
      checkMailingAddress: `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}`,
      instagramUrl: SITE.social.instagram || null,
      facebookUrl: SITE.social.facebook || null,
      linkedinUrl: SITE.social.linkedin || null,
      googleBusinessUrl: SITE.social.google || null,
      yelpUrl: SITE.social.yelp || null,
    },
  });
  console.log("✓ company settings");
}

async function seedServices() {
  const services = [
    {
      slug: "airport-pickup",
      name: "Airport Pickup",
      pricingStrategy: ServicePricingStrategy.POINT_TO_POINT,
      airportLeg: AirportLeg.PICKUP,
      minFareCents: 8500,
      baseFeeCents: 2500,
      perMileCents: 350,
      sortOrder: 1,
    },
    {
      slug: "airport-dropoff",
      name: "Airport Drop-off",
      pricingStrategy: ServicePricingStrategy.POINT_TO_POINT,
      airportLeg: AirportLeg.DROPOFF,
      minFareCents: 8500,
      baseFeeCents: 2500,
      perMileCents: 350,
      sortOrder: 2,
    },
    {
      slug: "point-to-point",
      name: "Point to Point",
      pricingStrategy: ServicePricingStrategy.POINT_TO_POINT,
      airportLeg: AirportLeg.NONE,
      minFareCents: 6500,
      baseFeeCents: 2000,
      perMileCents: 350,
      sortOrder: 3,
    },
    {
      slug: "hourly",
      name: "Hourly Chauffeur",
      pricingStrategy: ServicePricingStrategy.HOURLY,
      airportLeg: AirportLeg.NONE,
      minHours: 2,
      perHourCents: 9500,
      sortOrder: 4,
    },
  ];

  for (const s of services) {
    await db.serviceType.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
  }
  console.log(`✓ ${services.length} service types`);
}

async function seedVehicles() {
  const vehicles = [
    {
      name: "Luxury Sedan",
      description: "Up to 3 passengers. Executive sedan for airport runs and corporate travel.",
      capacity: 3,
      luggageCapacity: 3,
      baseFareCents: 0,
      perMileCents: 0,
      perHourCents: 0,
      sortOrder: 1,
    },
    {
      name: "Executive SUV",
      description: "Up to 6 passengers. Full-size SUV with room for luggage and groups.",
      capacity: 6,
      luggageCapacity: 6,
      baseFareCents: 1500,
      perMileCents: 50,
      perHourCents: 2000,
      sortOrder: 2,
    },
    {
      name: "Executive Sprinter",
      description: "Up to 12 passengers. Sprinter van for groups, events, and crew transfers.",
      capacity: 12,
      luggageCapacity: 12,
      baseFareCents: 5000,
      perMileCents: 150,
      perHourCents: 6000,
      sortOrder: 3,
    },
  ];

  for (const v of vehicles) {
    const existing = await db.vehicle.findFirst({ where: { name: v.name } });
    if (!existing) await db.vehicle.create({ data: v });
  }
  console.log(`✓ ${vehicles.length} vehicle categories`);
}

async function seedAirports() {
  // Example market. Replace in Admin → Airports (or edit here before first run).
  const airports = [
    {
      iata: "PHX",
      name: "Phoenix Sky Harbor International Airport",
      address: "3400 E Sky Harbor Blvd, Phoenix, AZ 85034",
      lat: 33.4373,
      lng: -112.0078,
      sortOrder: 1,
    },
    {
      iata: "SDL",
      name: "Scottsdale Airport",
      address: "15000 N Airport Dr, Scottsdale, AZ 85260",
      lat: 33.6229,
      lng: -111.9105,
      sortOrder: 2,
    },
    {
      iata: "AZA",
      name: "Phoenix–Mesa Gateway Airport",
      address: "6033 S Sossaman Rd, Mesa, AZ 85212",
      lat: 33.3078,
      lng: -111.6555,
      sortOrder: 3,
    },
  ];

  const airportServices = await db.serviceType.findMany({
    where: { airportLeg: { not: AirportLeg.NONE } },
    select: { id: true },
  });

  for (const a of airports) {
    await db.airport.upsert({
      where: { iata: a.iata },
      update: {},
      create: {
        ...a,
        services: { connect: airportServices },
      },
    });
  }
  console.log(`✓ ${airports.length} airports`);
}

async function main() {
  console.log(`Seeding ${SITE.name}…`);
  await seedAdmin();
  await seedCompanySettings();
  await seedServices();
  await seedVehicles();
  await seedAirports();
  console.log("Done. Log in at /login with the admin credentials above.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
