# Architecture

One line runs through the codebase: **platform** (never edited per client) vs.
**site** (the only thing you edit per client).

## Site layer (edit per client)

```
src/config/site.ts        brand: name, phone, emails, address, url, socials, owner, partners menu
src/app/globals.css       base styles (dashboards depend on these; add client tokens here)
src/app/layout.tsx        font (Inter), metadata template, Organization JSON-LD
src/lib/pageGuides.ts     what belongs on each public page (rendered by PagePlaceholder)
src/lib/services.ts       example services  → /services/[slug]
src/lib/cities.ts         example cities    → /locations/[city]
src/lib/routes.ts         example routes    → /routes/[slug]
src/lib/airports.ts       example airports  → /airports/[slug]
src/lib/data.ts           fleetData → /fleet/[slug]; homeQuestions (FAQ, also used on booking success)
content/blog/*.mdx        blog posts (one sample ships)
public/brand/             logo.png, og-image.png (placeholders)
public/images/            the seven photos the auth/booking pages use (placeholders)
src/app/{...public pages} each is `<PagePlaceholder {...guides.x} />` — replace with the real design
src/components/shared/PagePlaceholder   the scaffold
src/components/shared/Nav, Footer       minimal; keep or restyle
src/components/shared/SimpleForms       working contact + corporate-inquiry forms, plain styling
```

## Platform layer (fix once in the foundation)

```
prisma/schema.prisma      data model (users/roles, bookings, vehicles, services, airports,
                          payments, invoices, corporate accounts, notifications)
prisma/seed.ts            admin + defaults
actions/                  server actions, grouped by role (admin, auth, bookings, corporate,
                          driver-dashboard, payments, push, user)
auth.ts, auth.config.ts   NextAuth v5 (credentials + Google), Prisma adapter
middleware.ts             role gating: /admin, /driver-dashboard, /corporate, /dashboard
src/lib/                  booking, pricing, stripe, email, notifications, push, invoice,
                          flight, tripGroup, timezone, money, cloudinary, db
src/components/{admin,Driver,Dashboard,corporate,BookingPage,auth,loginPage,registerPage}
src/app/(auth)/           login, register, forgot/reset/set password, email verification
src/app/book/, pay/       booking wizard, success, tracking, pay-by-link, invoice pay
src/app/dashboard/        customer portal
src/app/driver-dashboard/ driver portal
src/app/corporate/        corporate portal
src/app/admin/            admin (bookings list has bulk select → trash / restore / delete forever)
src/app/api/              stripe webhook, checkout, maps, uploads, PDFs, push, cron, contact
src/app/manifest.ts       PWA manifest from SITE
src/app/llms.txt/route.ts AI-search index from SITE + content
src/app/sitemap.ts, robots.ts
public/sw.js              service worker (brand-neutral)
```

## Roles

| Role | Home | Can reach |
|---|---|---|
| USER | `/dashboard` | own trips, payments, profile |
| DRIVER | `/driver-dashboard` | assigned trips, schedule, earnings |
| CORPORATE | `/corporate` | account bookings, employees, invoices |
| ADMIN | `/admin` | everything, including all three portals |

Drivers and corporate contacts are invited by the admin and set a password via
emailed link; customers self-register or book as guests.

## Routes

**Public (placeholders):** `/` `/about` `/services` `/services/[slug]` `/fleet` `/fleet/[slug]`
`/airports` `/airports/[slug]` `/airports/private-aviation` `/locations`
`/locations/[city]` `/routes` `/routes/[slug]` `/corporate-accounts` `/contact`
`/blog` `/blog/[slug]` `/privacy` `/terms`

**Booking:** `/book` `/book/success` `/book/track` `/pay/[bookingId]`
`/pay/[bookingId]/success` `/pay/invoice/[id]` `/pay/invoice/[id]/success`

**Auth:** `/login` `/register` `/forgot-password` `/reset-password`
`/set-password` `/email-verification`

**Customer** `/dashboard`: `trips` `trips/[id]` `payments` `saved` `profile`
`notifications` `support`

**Driver** `/driver-dashboard`: `trips` `trips/[id]` `trips/[id]/greetsign`
`schedule` `schedule/[ymd]` `earnings` `profile` `notifications` `support`

**Corporate** `/corporate`: `bookings` `bookings/new` `bookings/[id]` `employees`
`billing` `reports` `settings`

**Admin** `/admin`: `bookings` (list/new/[id]) `calendar` (`[ymd]`,
`drivers/[driverId]/[ymd]`) `drivers` `users` (`[id]`) `vehicles` `vehicle-categories`
`services` `airports` `corporate` (accounts, `inquiries`, `invoices`) `invoices`
`earnings` `analytics` `reports` `notifications` `company` `assets`

**Cron (`vercel.json`):** `/api/internal/notifications/process` every 5 min;
`/api/cron/purge-trash` daily (permanently deletes bookings trashed > 7 days ago).

## Notifications

Admin alerts: email (Resend) + optional text via the carrier email-to-SMS gateway
(free, no provider) + web push. Jobs are queued in `NotificationJob` and retried by
the cron route. Customer/driver emails send directly. There is no Twilio.

## Brand resolution order

1. `SITE` (`src/config/site.ts`) — build-time defaults, used everywhere
2. `CompanySettings` row (Admin → Company Settings) — overrides at runtime for
   phone, hours, socials, logo upload, email sender, Stripe keys
3. `.env` — secrets and deployment URLs only
