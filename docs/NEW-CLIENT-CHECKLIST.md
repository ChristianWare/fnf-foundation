# New Client Checklist

Target: platform running for the client in under a day, before any design work.
`acme-limo` is the placeholder client name below.

## 1. Clone (5 min)

```bash
git clone https://github.com/ChristianWare/fnf-foundation.git acme-limo
cd acme-limo
git remote rename origin upstream          # "upstream" = the foundation
# create an EMPTY repo on GitHub called acme-limo (no README, no .gitignore), then:
git remote add origin https://github.com/ChristianWare/acme-limo.git
git push -u origin main
npm install
```

Later, when the foundation gets a fix: `git fetch upstream && git merge upstream/main`.
Never patch platform code inside a client repo — fix it in the foundation and merge down.

## 2. Provision (30–60 min, mostly waiting on verifications)

| Service | What to create | Goes in |
|---|---|---|
| Postgres (Neon / Supabase) | New project + database | `DATABASE_URL` |
| Stripe | The **client's own** account, test keys first | `STRIPE_*`, or Admin → Earnings → Payment Settings |
| Resend | Add + verify the client's domain | `RESEND_API_KEY`, `RESEND_FROM` |
| Google Cloud | Maps JS + Places + Distance Matrix + Directions enabled; browser key restricted to their domain, server key restricted by API | `NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY`, `GOOGLE_MAPS_SERVER_KEY` |
| Google Cloud (optional) | OAuth client for Google sign-in | `GOOGLE_CLIENT_ID/SECRET` |
| Cloudinary | Use your account; uploads are namespaced by `SITE.slug` | `CLOUDINARY_*` |
| Web push (optional) | `npx web-push generate-vapid-keys` | `VAPID_*` |
| Secrets | `openssl rand -base64 32` (AUTH_SECRET), `openssl rand -hex 32` (ENCRYPTION_KEY), `openssl rand -hex 24` (CRON_SECRET) | `.env` |

```bash
cp .env.example .env    # fill it in
```

## 3. Configure (30 min)

- [ ] `src/config/site.ts` — every field. `url` decides whether www or apex is canonical.
- [ ] `src/config/site.ts` → `booking` — the client's lead time, hourly minimum, stop fee, free wait times, cancellation window and meet & greet. The booking tools, prices and policy copy all read these.
- [ ] `src/config/site.ts` → `partnerVehicles` — only if the client has a partner booking page (a hotel or club with its own booking tool)
- [ ] `src/app/layout.tsx` — the font is served from `src/app/fonts`; swap the files to change it
- [ ] `src/app/globals.css` — `:root` color tokens.
- [ ] `public/brand/logo.png`, `public/brand/og-image.png` (1200×630)
- [ ] `src/app/favicon.ico`, `src/app/apple-touch-icon.png` (180×180), `public/icons/pwa-*.png`
- [ ] `public/sw.js` — nothing to change (brand-neutral), but bump `CACHE_NAME` if you edit it

## 4. Database (5 min)

```bash
npm run db:push
npm run db:seed        # admin login + company settings from SITE + default services/vehicles/airports
npm run dev            # log in at /login, check Admin → Company Settings
```

Then in the admin: Airports (replace the Phoenix examples), Services & pricing,
Vehicle categories + photos, Drivers (invite), office hours.

## 5. Content (this is the real work — the design phase)

- [ ] `src/lib/services.ts` — the client's services (one entry = one `/services/[slug]` page)
- [ ] `src/lib/cities.ts` — service-area cities (one entry = one `/locations/[city]` page). Only cities you can make locally real: each needs its own 4–5 FAQs, a route promo and nearby-city links before it goes live.
- [ ] `src/lib/routes.ts` — "[Suburb] to [Airport]" route pages
- [ ] `src/lib/airports.ts` — airports served (match Admin → Airports)
- [ ] `src/lib/data.ts` — home page copy, testimonials, FAQs, stats
- [ ] `content/blog/*.mdx` — replace the sample post
- [ ] `public/images/**` — drop the client's photos in over the placeholders, **same filenames**
- [ ] Public pages — each renders `PagePlaceholder` with a section list. Build the real page in its place; keep the working forms/lists it wraps.
- [ ] Legal pages (`/privacy`, `/terms`) — read once; business terms may differ

## 6. Deploy (20 min)

- [ ] Vercel project → import the client repo → add every `.env` value (use production Stripe keys when ready)
- [ ] Domain → set `APP_URL`, `NEXT_PUBLIC_APP_URL`, `BASE_URL` to the real origin
- [ ] Stripe webhook → `https://<domain>/api/stripe/webhook` → paste secret into `STRIPE_WEBHOOK_SECRET`
- [ ] `GOOGLE_REVIEW_URL` → the client's Google review link (turns on post-ride review emails and the `/review` short link)
- [ ] Cron → `vercel.json` already schedules `/api/internal/notifications/process` (every 5 min) and `/api/cron/purge-trash` (daily); `CRON_SECRET` must be set
- [ ] Google OAuth redirect URI (if used) → `https://<domain>/api/auth/callback/google`

## 7. Smoke test (15 min)

- [ ] Book a ride end to end on the live site (test card `4242…`)
- [ ] Admin: booking appears → assign a driver → status changes
- [ ] Driver: logs in, sees the trip, updates status
- [ ] Customer: sees the trip in `/dashboard`
- [ ] Emails: booking confirmation, driver assignment, admin alert all arrive
- [ ] Create + send one invoice; open the PDF (check the default "from"
      address is the client's, then try a custom address and a bill-to address)
- [ ] Click the pay link in the invoice email — it must open the live domain,
      not localhost (`APP_URL` set in production)
- [ ] `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/manifest.webmanifest` render with the client's name
- [ ] Pay a deposit on a test booking → the balance-due email arrives with the right amount and due date
- [ ] Mark a test trip En route as the driver → the rider gets the trip-update email
- [ ] `/login`, `/register` and `/corporate` are `noindex` (view source → `<meta name="robots"`)
- [ ] Run a Lighthouse pass on mobile

## 8. Hand-off

- [ ] Admin → Company Settings filled in by the operator (hours, dispatch phone, socials)
- [ ] Operator has their admin login; you keep a separate admin account
- [ ] `Search the repo for "example.com"` — should return nothing

## 9. Search, first month

- [ ] Google Search Console → add the domain → submit `/sitemap.xml`
- [ ] URL Inspection → Request indexing for the home page, each service, airport and route page, then the city pages, about 10 a day
- [ ] One booking keyword per page: home owns "black car service [metro]", each airport page owns "[airport] car service", each city page owns "car service [city]". Check that no other page's title uses the same phrase
- [ ] After 2–3 weeks, Pages report → "Crawled – currently not indexed": `/_next/static` files and redirected URLs are normal; a real page there usually needs more content of its own

