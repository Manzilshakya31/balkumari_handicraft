import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import {
  ShopClient,
  type SupabaseShopProduct,
} from "@/components/shop/ShopClient";
import { SITE_CONFIG } from "@/data/site-config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Shop Authentic Nepali Handicrafts",
  description:
    "Browse our full collection of handmade Nepali handicrafts including Buddha statues, Hindu deity statues and metal crafts from Lalitpur, Nepal.",
  keywords: [
    "buy Nepali handicrafts",
    "Buddha statue Nepal shop",
    "handmade crafts Lalitpur",
    "authentic Nepali crafts online",
    "metal crafts Nepal",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.domain}/shop`,
  },
  openGraph: {
    title: "Shop Authentic Nepali Handicrafts | Balkumari Handicraft",
    description:
      "Browse handmade Buddha statues, metal crafts and traditional Nepali handicrafts from Lalitpur, Nepal.",
    url: `${SITE_CONFIG.domain}/shop`,
  },
};

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

interface ShopPageProps {
  searchParams: { category?: string; search?: string };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const supabase = getSupabase();
  const { data } = await supabase
    .from("products")
    .select(
      "id, sku, name, category, price, material, is_available, product_images(url, alt_text, sort_order)",
    )
    .eq("status", "active")
    .order("sort_order", { referencedTable: "product_images", ascending: true })
    .order("created_at", { ascending: false });

  const products = (data ?? []) as SupabaseShopProduct[];

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
            Handcrafted by skilled Newari artisans in Lalitpur, Nepal. Each
            piece is unique and made using traditional techniques.
          </p>
        </div>
      </div>

      {/* Shop content */}
      <ShopClient
        products={products}
        initialCategory={searchParams.category}
        initialSearch={searchParams.search}
      />
    </div>
  );
}
