import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/data/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.businessName,
    short_name: SITE_CONFIG.businessName,
    description: SITE_CONFIG.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111827",
    icons: [
      {
        src: SITE_CONFIG.seo.icon192,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: SITE_CONFIG.seo.icon512,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}