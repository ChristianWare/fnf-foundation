# Port Notes — from nier-final to the foundation

## Removed

- **Twilio.** `src/lib/sms/sendSms.ts`, `/api/test/sms`, the `twilio` package,
  `TWILIO_*` env vars, `CompanySettings.smsFromNumber`, and customer status SMS
  (`customerNotifications.ts`, called from the driver status action).
  The admin text-alert feature stays: it sends through carrier email gateways
  (`sendSmsViaEmailGateway`), which needs no provider. The cron retry path
  (`worker.ts`, `process.ts`) was switched from Twilio to the gateway sender —
  in nier-final those retries would have failed, since the job's `to` is a
  gateway email address.
- **Sanity.** `src/sanity/`, `/studio`, `sanity.config.ts`, `sanity.cli.ts`, the
  four Sanity packages, the `cdn.sanity.io` image domain, the dead
  `BlogPage/BlogSection` component, an unused `urlFor` import. The blog was
  already rendering from `content/blog/*.mdx` via `src/lib/blog.ts`.
- **`styled-components`** — installed but never used (everything is CSS Modules).
- **Nier-only pages:** `/denu-hotel`, `/wekopa`, `/charter-bus-rental-phoenix`,
  `/book/map-test`, their components, their home-page sections, the We-Ko-Pa
  special cases in the admin booking list/detail, and `wekopaQuestions` /
  `denuQuestions` in `data.ts`.
- **Nier's legacy redirects** in `next.config.ts` (old blog slugs, combo-matrix
  teardown). Replaced by one config-driven canonical-host redirect.
- **Middleware session logging** (`console.log` of the full auth object on every request).
- **Nier's photos and videos** (234 MB) → same-name placeholders (3.5 MB). Nine
  unreferenced videos deleted.

## Added

- `src/config/site.ts` — single brand source. 367 hardcoded references across
  106 files (name, domain, six email addresses, phone in five formats, street
  address, owner name) now resolve to `SITE.*`. Strings became template
  literals, JSX text became `{SITE.name}`, comments became neutral.
- `src/lib/site.ts` is now a shim re-exporting `SITE_URL = SITE.url` for the
  pages that imported it.
- `CompanySettings` fallbacks (`actions/admin/companySettings.ts`) read from `SITE`.
- Nav `Partners` dropdown is driven by `SITE.nav.partners`; empty list hides it.
- JSON-LD `sameAs` reads `SITE.social`; `address` blocks read `SITE.address`.
- `src/app/manifest.ts` replaces `public/manifest.json`.
- `src/app/llms.txt/route.ts` replaces `public/llms.txt` (generated from config + content).
- `prisma/seed.ts` + `npm run db:seed`; `npm run typecheck`, `db:push`, `db:studio`.
- `.env.example` (and `.gitignore` now allows it — it previously ignored `.env*`).
- `dotenv` added to devDependencies (`prisma.config.ts` imported it without declaring it).
- `prisma.config.ts` no longer uses Prisma's strict `env()` helper for `DATABASE_URL`:
  it threw during `npm install` (postinstall → `prisma generate`) on a fresh clone with
  no `.env` yet. It now falls back to a placeholder URL; anything that connects still
  fails clearly if `.env` is missing.
- Typo fix: `.btnContanier` → `.btnContainer`.
- `BRAND_NAME`, `CLIENT_NAME`, `CLIENT_SLUG` env vars are gone; use `SITE.name` / `SITE.slug`.

## Synced from nier-final on 2026-09-16 (commit 83c197b "Delete bulk added")

- **Bookings trash + bulk delete.** `Booking.deletedAt` / `deletedById` (soft
  delete), `actions/admin/bookingTrash.ts` (trash / restore / delete forever),
  `BulkSelect` + `BulkConfirmModal` on the admin bookings list, `TrashBanner`
  on the booking detail page, a Trash view, and `/api/cron/purge-trash`
  (runs daily at 09:00 UTC via `vercel.json`, permanently deletes bookings
  trashed more than 7 days ago, gated by `CRON_SECRET`).
- `src/lib/db.ts` now wraps the Prisma client in a `$extends` that excludes
  trashed bookings from every `findMany / findFirst / count / aggregate /
  groupBy` unless the query mentions `deletedAt`. `findUnique` is not
  filtered so trashed bookings still open on the detail page.
- Small CSS updates to `Nav.module.css` and `AdminRecentBookingRequests`.
- The one nier-only change in that commit (`DenuPricing`) was not ported —
  that page doesn't exist here.

## Marketing teardown (2026-09-18)

- Every public page now renders `PagePlaceholder` with guidance from
  `src/lib/pageGuides.ts` instead of Nier's design. Deleted:
  `components/{HomePage,AboutPage,ServicesPage,ServiceCityPage,LocationCityPage,FleetpAge,ContactPage,BlogPage}`,
  the corporate marketing sections, and the marketing-only shared components
  (`FinalCTA`, `Testimonials`, `Stats`, `HowItWorks`, `ImageMarquee`,
  `ServicesMarquee`, `Marquee`, `StarCluster`, `RelatedLinks`, `Breadcrumbs`,
  `BlogSection`, `ContactSection`, `NotFoundPageIntro`, `LogoClip`, `UserButton`,
  `ClearHash`, `ScrollToSectionButton`).
- Nav rewritten: text wordmark, plain links, Book, Log in / Dashboard / Log out.
  Same `NavProps` so dashboard layouts and booking pages compile unchanged.
- Footer rewritten: contact from Company Settings, three link columns.
- Contact and corporate-inquiry forms rewritten with plain styling
  (`shared/SimpleForms`), same server contracts (`/api/contact`,
  `submitCorporateInquiry`).
- Content data files reduced to typed example skeletons (`services`, `cities`,
  `routes`, `airports`, `data.fleetData`); `arizonaAirports.ts` deleted.
  `homeQuestions` kept because the booking success page uses it.
- Blog: five Phoenix posts deleted, one sample post added; post page is a
  minimal MDX render (no TOC, no sidebar).
- Images: 129 placeholders reduced to the seven the auth/booking/verification
  pages import (`public/images/*.jpg`); all videos deleted.
- Root metadata uses `SITE.tagline` / `SITE.description` with a `%s | name`
  template; JSON-LD `areaServed` comes from `cities.ts`.
- Kept as-is (platform, not restyled): dashboards, booking flow (`/book`, `/pay`),
  auth pages, `shared/{Button,Modal,Faq,AboutNumbers,WhatHappensNext,...}` that
  those pages use.

## Synced from nier-final on 2026-10-14 (commits fe977d8 → 1bc295e, invoice addresses)

- **Invoice sender address.** New invoices offer *Use default address* (the
  Company Settings office address, which falls back to `SITE.address`) or *Use
  a different address* (street / city / state dropdown / ZIP). Either way the
  address is saved on the invoice (`Invoice.fromAddress`,
  `fromAddressCustom`), so later Company Settings edits don't rewrite issued
  invoices. Invoices created before this change have no saved copy and keep
  reading the live settings.
- **Optional bill-to address** (`Invoice.billToAddress`), same four fields,
  printed under the customer's name in BILL TO. Blank = not shown; a partly
  filled address shows a warning and isn't saved.
- **Edit addresses** on any unpaid, non-void invoice from an Addresses card on
  `/admin/invoices/[id]` (`adminUpdateInvoiceAddresses` in
  `actions/admin/invoices/invoiceActions.ts`). Each edit logs an
  `ADDRESS_UPDATED` invoice event with before/after values.
- Shared rules in `src/lib/invoice/invoiceAddress.ts`; shared fields in
  `src/app/admin/invoices/InvoiceAddressFields/`. The PDF builder feeds the
  admin download and both invoice emails, so all three pick this up.
- Guest phone on the new-invoice form formats as `(555) 555-5555` while typing.
- Schema: three nullable/defaulted columns on `Invoice` — run `npx prisma db push`.
- Placeholders in the address fields made neutral (`City`, `12345`).

## Synced from nier-final on 2026-11-06 — Patch A (payments, emails, reviews, trip updates)

From nier-final commits 4482b91 (Oct 11), 33d4e33 (Oct 26), e4eb6d8 (Nov 2) and
81971d2 (Nov 4).

- **Deposit received → balance due.** When a deposit is paid, the rider gets a
  balance-due email with the amount still owed and its due date
  (`src/lib/email/sendBalanceDueEmail.ts`). The pay page and checkout show the
  balance after a deposit; the Stripe webhook, `checkoutCharge.ts`, the
  deposit-link and payment-confirmation emails, the admin "Send payment link"
  button and "Send balance reminder" all follow. Due dates are worked out in
  the company's time zone by `src/lib/booking/dueDates.ts`.
- **Due-date reminders** run in `src/lib/reminders/rideReminders.ts` (same
  cron as the other ride reminders) and show on the admin booking page under
  Reminders sent.
- **Google review requests.** About 2 hours after a ride is completed the rider
  gets one review-request email (`src/lib/reminders/reviewRequests.ts`, run
  from `/api/internal/notifications/process`). Off until `GOOGLE_REVIEW_URL`
  is set. Never sent between 9 pm and 8 am company time, at most once per
  rider every 90 days, only after the last leg of a multi-leg trip, and not for
  corporate-account rides. Each request shows on the booking's timeline and in
  Reminders sent.
- **`/review`** redirects to `GOOGLE_REVIEW_URL` (homepage until it's set), for
  QR codes and receipts.
- **Rider trip updates by email.** When the driver marks a trip En route,
  Arrived or No-show, the rider gets an email
  (`src/lib/notifications/customerNotifications.ts`, called from
  `actions/driver-dashboard/driverUpdateTripStatus.ts`). This replaces the
  Twilio customer texts removed in the original port. Riders still get no texts.
- **Sender address.** Reminder, admin-notification and test emails now use
  `RESEND_FROM` first, then `EMAIL_FROM`, then `SITE.email.noReply`, so every
  email goes out from the one verified sender.
- New time-zone fallbacks read `SITE.timezone` instead of a fixed zone.
- No schema changes.

## Known follow-ups (not blocking)

- Marketing copy in `HomePage`, `AboutPage`, `Stats`, etc. is Nier's story with
  the name swapped ("since 2004", "25,000 clients"). Rewrite per client.
- `src/lib/cities.ts` line ~102 mentions being headquartered "on Via Linda" — example copy.
- `SITE.founded` and `SITE.owner` exist in config but are only used in the blog
  author card and JSON-LD; wire them into the About page when you redesign it.
- Two notification processors exist (`/api/cron/process-notifications` → `worker.ts`
  and `/api/internal/notifications/process` → `process.ts`). `vercel.json` uses the
  latter. Consolidate eventually.
- Three URL env vars (`APP_URL`, `BASE_URL`, `NEXT_PUBLIC_APP_URL`) could collapse
  into `SITE.url` + one override.
- No `prisma/migrations` folder yet — the repo uses `db push`. Start migrations
  before the first client has real data.
- `/account` page exists alongside `/dashboard/profile`; check if it's still needed.
