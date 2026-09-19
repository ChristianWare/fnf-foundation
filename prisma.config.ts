// Prisma 6 config. Loads .env so `prisma db push` / `db seed` see DATABASE_URL.
import "dotenv/config";
import { defineConfig } from "prisma/config";

// `prisma generate` runs on `npm install` (postinstall) and does NOT need a
// database. Prisma's strict env() helper throws if DATABASE_URL is missing,
// which broke a fresh clone before .env existed. So: read the variable
// directly and fall back to a placeholder. Anything that actually connects
// (db push, db seed, the app) fails fast with a clear "not configured" URL.
const DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://not-configured:copy-env-example-to-env@localhost:5432/app";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  engine: "classic",
  datasource: {
    url: DATABASE_URL,
  },
});
