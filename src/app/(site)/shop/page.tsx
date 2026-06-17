import type { Metadata } from "next";
import { ShopClient } from "@/components/shop/ShopClient";
import { ALL_PRODUCTS } from "@/data/products";
import { SITE_CONFIG } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Shop Authentic Nepali Handicrafts",
  description:
    "Browse our full collection of handmade Nepali handicrafts including Buddha statues, metal crafts, singing bowls, Hindu deity statues and thangka paintings from Lalitpur, Nepal.",
  keywords: [
    "buy Nepali handicrafts",
    "Buddha statue Nepal shop",
    "handmade crafts Lalitpur",
    "authentic Nepali crafts online",
    "metal crafts Nepal",
    "singing bowls buy Nepal",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.domain}/shop`,
  },
  openGraph: {
    title: "Shop Authentic Nepali Handicrafts | Balkumari Handicraft",
    description:
      "Browse handmade Buddha statues, metal crafts, singing bowls and traditional Nepali handicrafts from Lalitpur, Nepal.",
    url: `${SITE_CONFIG.domain}/shop`,
  },
};

interface ShopPageProps {
  searchParams: { category?: string; search?: string };
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Page header */}
      <div className="bg-brand-brown">
        <div className="container-custom py-12 md:py-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-brand-gold" aria-hidden="true" />
            <span className="text-brand-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Our Collection
            </span>
          </div>
          <h1
            className="font-serif font-bold text-white leading-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Authentic{" "}
            <span className="text-brand-gold">Nepali Handicrafts</span>
          </h1>
          <p
            className="text-white/55 mt-3 max-w-xl"
            style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
          >
            Handcrafted by skilled Newari artisans in Lalitpur, Nepal.
            Each piece is unique and made using traditional techniques.
          </p>
        </div>
      </div>

      {/* Shop content — client component handles filtering */}
      <ShopClient
        products={ALL_PRODUCTS}
        initialCategory={searchParams.category}
        initialSearch={searchParams.search}
      />
    </div>
  );
}
