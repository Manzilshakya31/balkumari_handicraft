"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Crown,
  Flame,
  Hammer,
  Music,
  Palette,
  Sparkles,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { createClient } from "@/lib/supabase";
import { getCategorySlug, type CategorySlug } from "@/lib/categories";
import { cn } from "@/lib/utils";

type ProductImage = {
  url: string;
  sort_order: number;
};

type CategoryProduct = {
  category: string | null;
  product_images: ProductImage[];
};

type CategoryStats = {
  count: number;
  imageUrl?: string;
};

const CATEGORY_DETAILS: Record<
  CategorySlug,
  {
    icon: typeof Crown;
    short: string;
    intent: string;
    gradient: string;
  }
> = {
  "buddha-statues": {
    icon: Crown,
    short: "Copper and bronze figures for shrines, collectors, and ceremonial spaces.",
    intent: "Most collected",
    gradient: "from-[#2c140c] via-[#5b2514]/90 to-[#120806]",
  },
  "hindu-deities": {
    icon: Sparkles,
    short: "Newari-made deity statues with detailed ornament, posture, and finish work.",
    intent: "Devotional pieces",
    gradient: "from-[#3a0f12] via-[#741d1d]/90 to-[#160607]",
  },
  "metal-crafts": {
    icon: Hammer,
    short: "Decorative metalwork, repoussé details, and handmade Nepali objects.",
    intent: "Home accents",
    gradient: "from-[#271b0b] via-[#5a4216]/90 to-[#100b05]",
  },
};

const FALLBACK_IMAGE = "/images/heri-bg.png";

function formatProductCount(count: number): string {
  return `${count} product${count === 1 ? "" : "s"}`;
}

function firstImage(images: ProductImage[] | undefined): string | undefined {
  return [...(images ?? [])].sort((a, b) => a.sort_order - b.sort_order)[0]?.url;
}

export function CategoryGrid() {
  const [stats, setStats] = useState<Partial<Record<CategorySlug, CategoryStats>>>({});

  useEffect(() => {
    let isMounted = true;

    async function loadCategoryStats() {
      const supabase = createClient();
      const { data } = await supabase
        .from("products")
        .select("category, product_images(url, sort_order)")
        .eq("status", "active");

      if (!isMounted || !data) return;

      const nextStats: Partial<Record<CategorySlug, CategoryStats>> = {};
      for (const product of data as CategoryProduct[]) {
        const slug = getCategorySlug(product.category);
        if (!slug) continue;

        const current = nextStats[slug] ?? { count: 0 };
        nextStats[slug] = {
          count: current.count + 1,
          imageUrl: current.imageUrl ?? firstImage(product.product_images),
        };
      }

      setStats(nextStats);
    }

    loadCategoryStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(
    () =>
      SITE_CONFIG.categories.map((category) => ({
        ...category,
        ...CATEGORY_DETAILS[category.slug],
        stats: stats[category.slug],
      })),
    [stats]
  );

  const featured = categories[0];
  const secondary = categories.slice(1);
  const FeaturedIcon = featured.icon;

  return (
    <section
      className="section-padding bg-gradient-to-b from-white to-brand-cream/60 border-y border-brand-gold/10"
      aria-labelledby="categories-heading"
    >
      <div className="container-custom">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-3" aria-hidden="true">
              <div className="h-px w-8 bg-brand-gold" />
              <span className="text-brand-gold text-xs font-semibold tracking-[0.2em] uppercase">
                Browse by category
              </span>
            </div>
            <h2
              id="categories-heading"
              className="font-serif font-bold text-brand-brown leading-tight mb-3"
              style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)" }}
            >
              Find the right <span className="text-brand-maroon">craft tradition</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              Start with the object type, then narrow by material, size, and finish in the shop.
              Each collection is handmade in Lalitpur by skilled Newari artisans.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-brand-maroon px-5 text-sm font-semibold text-brand-maroon transition-colors hover:bg-brand-maroon hover:text-white lg:flex-shrink-0"
          >
            View all products
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_1.9fr] lg:gap-5">
          <Link
            href={`/shop?category=${featured.slug}`}
            className="group relative min-h-[360px] overflow-hidden rounded-lg bg-brand-brown text-white shadow-xl shadow-brand-brown/10 transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
            aria-label={`Browse ${featured.label}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featured.stats?.imageUrl ?? FALLBACK_IMAGE}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
              aria-hidden="true"
            />
            <div className={cn("absolute inset-0 bg-gradient-to-br", featured.gradient)} aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" aria-hidden="true" />

            <div className="relative flex h-full min-h-[360px] flex-col justify-between p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-brand-gold/30 bg-black/20 text-brand-gold backdrop-blur-sm">
                  <FeaturedIcon size={20} />
                </span>
                <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
                  {featured.intent}
                </span>
              </div>

              <div className="max-w-sm">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
                  {featured.stats?.count ? formatProductCount(featured.stats.count) : "Signature collection"}
                </p>
                <h3 className="mb-3 font-serif text-3xl font-bold leading-tight text-white md:text-4xl">
                  {featured.label}
                </h3>
                <p className="mb-6 max-w-[18rem] text-sm leading-relaxed text-white/70">
                  {featured.short}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-gold transition-all group-hover:gap-3">
                  Explore collection
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </Link>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {secondary.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.slug}
                  href={`/shop?category=${category.slug}`}
                  className="group relative min-h-[210px] overflow-hidden rounded-lg border border-brand-gold/15 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold/40 hover:shadow-xl hover:shadow-brand-brown/10 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
                  aria-label={`Browse ${category.label}`}
                >
                  <div className="absolute inset-x-0 top-0 h-24 overflow-hidden" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={category.stats?.imageUrl ?? FALLBACK_IMAGE}
                      alt=""
                      className="h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className={cn("absolute inset-0 bg-gradient-to-r", category.gradient)} />
                  </div>

                  <div className="relative flex min-h-[210px] flex-col justify-between p-5 pt-20">
                    <div>
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-gold/20 bg-white text-brand-gold-dark shadow-sm">
                          <Icon size={17} />
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">
                          {category.stats?.count ? formatProductCount(category.stats.count) : category.intent}
                        </span>
                      </div>

                      <h3 className="mb-2 font-serif text-xl font-bold leading-tight text-brand-brown transition-colors group-hover:text-brand-maroon">
                        {category.label}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {category.short}
                      </p>
                    </div>

                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-gold-dark transition-all group-hover:gap-3">
                      Browse
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}