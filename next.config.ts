import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import { SITE } from "./src/config/site";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  async redirects() {
    // Canonical host only. SITE.url decides whether "www" or the apex domain is
    // canonical; the other one 301s to it. Per-client legacy-URL redirects (old
    // blog slugs, retired pages) go below this rule, most specific first.
    const canonical = new URL(SITE.url);
    const host = canonical.host;
    const other = host.startsWith("www.") ? host.slice(4) : `www.${host}`;
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: other }],
        destination: `${canonical.origin}/:path*`,
        permanent: true,
      },
    ];
  },

  experimental: {
    optimizeCss: true,
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },

  compiler: {
    styledComponents: true,
  },

  ...(isProd ? {} : { turbopack: {} }),
};

export default withBundleAnalyzer(nextConfig);
