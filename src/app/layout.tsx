import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Footer from "@/components/shared/Footer/Footer";
import SessionProviderWrap from "@/components/Providers/SessionProvider";
import ToastsProvider from "@/components/Providers/ToastsProvider";
import ScrollToTop from "@/components/shared/ScrollToTop/ScrollToTop";
import PlausibleProvider from "next-plausible";
import { SITE } from "@/config/site";
import { buildBusinessSchema } from "@/lib/schema";
import { getCompanySettings } from "../../actions/admin/companySettings";

// Inter, served from src/app/fonts so the build never depends on downloading
// Google Fonts (a failed download breaks the Vercel build). To change the
// font per client: drop the .woff2 files in src/app/fonts and update the
// paths below, keeping the "--inter" variable name or updating globals.css.
const inter = localFont({
  variable: "--inter",
  display: "swap",
  src: [
    {
      path: "./fonts/inter-latin-300-normal.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/inter-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/inter-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/inter-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/inter-latin-800-normal.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/inter-latin-900-normal.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    images: [
      {
        url: `${SITE.url}${SITE.ogImage}`,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: [`${SITE.url}${SITE.ogImage}`],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Same settings the footer reads; its profile URLs feed `sameAs`/`hasMap`.
  // If the database can't be reached, the schema falls back to site config.
  const settings = await getCompanySettings().catch(() => ({}));
  const businessSchema = buildBusinessSchema(settings);

  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://plausible.io' />
        <link
          rel='preconnect'
          href='https://res.cloudinary.com'
          crossOrigin='anonymous'
        />

        {/* ── PWA ── */}
        <meta name='theme-color' content={SITE.themeColor} />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'
        />
        <meta name='apple-mobile-web-app-title' content={SITE.name} />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
      </head>
      <body className={`${inter.variable} `}>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema),
          }}
        />
        <ScrollToTop />
        <PlausibleProvider
          domain={SITE.domain}
          trackLocalhost={false}
          enabled={true}
        >
          <SessionProviderWrap>
            <ToastsProvider />
            {children}
            <Footer />
          </SessionProviderWrap>
        </PlausibleProvider>
      </body>
    </html>
  );
}
