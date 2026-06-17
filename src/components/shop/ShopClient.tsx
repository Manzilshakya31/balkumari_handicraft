"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products/types";
import { SITE_CONFIG } from "@/data/site-config";
import { cn } from "@/lib/utils";

interface ShopClientProps {
  products: Product[];
  initialCategory?: string;
  initialSearch?: string;
}

export function ShopClient({
  products,
  initialCategory,
  initialSearch,
}: ShopClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>(
    initialCategory || "all"
  );
  const [searchQuery, setSearchQuery] = useState(initialSearch || "");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        activeCategory === "all" || p.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.keywords.some((k) =>
          k.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch && p.inStock;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="container-custom py-8 md:py-10">

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">

        {/* Search input */}
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

        {/* Product count */}
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
            onClick={() => setActiveCategory(cat.slug)}
            className={cn(
              "rounded-full px-4 h-8 text-xs font-semibold",
              "border transition-all duration-200",
              activeCategory === cat.slug
                ? "bg-brand-maroon text-white border-brand-maroon"
                : "bg-white text-muted-foreground border-brand-gold/20 hover:border-brand-gold hover:text-brand-maroon"
            )}
            aria-pressed={activeCategory === cat.slug}
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
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 8}
            />
          ))}
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
