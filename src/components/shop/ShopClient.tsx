"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/data/site-config";
import { cn } from "@/lib/utils";

export type SupabaseShopProduct = {
  id: string;
  sku: string | null;
  name: string;
  category: string | null;
  price: number | null;
  material: string | null;
  is_available: boolean;
  product_images: { url: string; alt_text: string | null; sort_order: number }[];
};

interface ShopClientProps {
  products: SupabaseShopProduct[];
  initialCategory?: string;
  initialSearch?: string;
}

export function ShopClient({
  products,
  initialCategory,
  initialSearch,
}: ShopClientProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || "all");
  const [searchQuery, setSearchQuery] = useState(initialSearch || "");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        activeCategory === "all" || p.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        (p.material ?? "").toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="container-custom py-8 md:py-10">

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white
              border border-brand-gold/20 rounded-full
              focus:outline-none focus:border-brand-gold
              focus:ring-2 focus:ring-brand-gold/20
              placeholder:text-muted-foreground/60"
            aria-label="Search products"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2
                text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center text-sm text-muted-foreground sm:ml-auto">
          <SlidersHorizontal size={14} className="mr-2" aria-hidden="true" />
          {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Category filters */}
      <div
        className="flex gap-2 flex-wrap mb-8"
        role="group"
        aria-label="Filter by category"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveCategory("all")}
          className={cn(
            "rounded-full px-4 h-8 text-xs font-semibold",
            "border transition-all duration-200",
            activeCategory === "all"
              ? "bg-brand-maroon text-white border-brand-maroon"
              : "bg-white text-muted-foreground border-brand-gold/20 hover:border-brand-gold hover:text-brand-maroon"
          )}
          aria-pressed={activeCategory === "all"}
        >
          All Products
        </Button>

        {SITE_CONFIG.categories.map((cat) => (
          <Button
            key={cat.slug}
            variant="ghost"
            size="sm"
            onClick={() => setActiveCategory(cat.label)}
            className={cn(
              "rounded-full px-4 h-8 text-xs font-semibold",
              "border transition-all duration-200",
              activeCategory === cat.label
                ? "bg-brand-maroon text-white border-brand-maroon"
                : "bg-white text-muted-foreground border-brand-gold/20 hover:border-brand-gold hover:text-brand-maroon"
            )}
            aria-pressed={activeCategory === cat.label}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Products grid */}
      {filteredProducts.length > 0 ? (
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
          aria-label="Product listing"
        >
          {filteredProducts.map((product) => {
            const thumb = [...(product.product_images ?? [])]
              .sort((a, b) => a.sort_order - b.sort_order)[0];
            const href = `/shop/${product.sku ?? product.id}`;
            const whatsappMessage = encodeURIComponent(
              `Hello, I am interested in: ${product.name}. Can you provide more details?`
            );

            return (
              <article
                key={product.id}
                className={cn(
                  "group bg-white rounded-xl overflow-hidden border",
                  "border-brand-gold/10 hover:border-brand-gold/30",
                  "hover:shadow-lg hover:shadow-brand-gold/10",
                  "transition-all duration-300"
                )}
                aria-label={product.name}
              >
                {/* Product image */}
                <Link
                  href={href}
                  className="block relative overflow-hidden bg-brand-cream"
                  style={{ aspectRatio: "4/3" }}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumb.url}
                      alt={thumb.alt_text ?? product.name}
                      className="w-full h-full object-cover transition-transform
                        duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-muted-foreground text-xs">No image</span>
                    </div>
                  )}

                  {!product.is_available && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-white/90 text-brand-brown text-xs
                        font-semibold px-3 py-1 rounded-full">
                        Currently Unavailable
                      </span>
                    </div>
                  )}
                </Link>

                {/* Product info */}
                <div className="p-4">
                  {product.category && (
                    <span className="inline-block text-[10px] font-medium
                      bg-brand-cream text-brand-gold-dark px-2 py-0.5
                      rounded-full mb-2">
                      {product.category}
                    </span>
                  )}

                  <Link href={href}>
                    <h3 className="font-serif font-semibold text-brand-brown
                      leading-snug mb-1 line-clamp-2 group-hover:text-brand-maroon
                      transition-colors text-sm md:text-base">
                      {product.name}
                    </h3>
                  </Link>

                  {product.material && (
                    <p className="text-xs text-muted-foreground mb-3">
                      {product.material}
                    </p>
                  )}

                  {product.price != null && (
                    <p className="text-sm font-semibold text-brand-brown mb-3">
                      NPR {product.price.toLocaleString()}
                    </p>
                  )}

                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full
                      bg-brand-gold/10 hover:bg-brand-gold text-brand-gold-dark
                      hover:text-white border border-brand-gold/30
                      hover:border-brand-gold rounded-lg py-2 text-xs
                      font-semibold transition-all duration-200"
                    aria-label={`Inquire about ${product.name} on WhatsApp`}
                  >
                    <MessageCircle size={13} />
                    Inquire on WhatsApp
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-4" aria-hidden="true">🔍</p>
          <h2 className="font-serif text-xl text-brand-brown mb-2">
            No products found
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Try a different category or search term.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
            }}
            className="rounded-full border-brand-maroon
              text-brand-maroon hover:bg-brand-maroon hover:text-white"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
