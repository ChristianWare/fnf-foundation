import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

// Served at /manifest.webmanifest — Next.js injects the <link rel="manifest"> tag.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name.length > 12 ? SITE.name.split(" ")[0] : SITE.name,
    description: `${SITE.name} – ${SITE.tagline}`,
    start_url: "/",
    display: "standalone",
    background_color: SITE.themeColor,
    theme_color: SITE.themeColor,
    orientation: "portrait-primary",
    icons: [
      { src: "/icons/pwa-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/pwa-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Admin Dashboard", url: "/admin", description: "Open admin dashboard" },
      { name: "Driver Dashboard", url: "/driver-dashboard", description: "Open driver dashboard" },
    ],
  };
}
