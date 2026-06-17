import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Product } from "@/data/products/types";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) {
    return (
      <section
        className="section-padding bg-brand-cream"
        aria-labelledby="featured-heading"
      >
        <div className="container-custom">
          <SectionHeading
            eyebrow="Handpicked for You"
            title="Featured"
            titleHighlight="Products"
            description="Our most popular handcrafted pieces, loved by collectors
              and enthusiasts worldwide."
          />
          {/* Empty state — shown until products are added */}
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            aria-label="Featured products — coming soon"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden
                  border border-brand-gold/10"
                aria-hidden="true"
              >
                <div
                  className="bg-brand-cream animate-pulse"
                  style={{ aspectRatio: "4/3" }}
                />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-brand-cream rounded animate-pulse w-1/3" />
                  <div className="h-4 bg-brand-cream rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-brand-cream rounded animate-pulse w-1/2" />
                  <div className="h-8 bg-brand-cream rounded animate-pulse mt-3" />
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm mt-8">
            Products coming soon — check back shortly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="section-padding bg-brand-cream"
      aria-labelledby="featured-heading"
    >
      <div className="container-custom">
        <SectionHeading
          eyebrow="Handpicked for You"
          title="Featured"
          titleHighlight="Products"
          description="Our most popular handcrafted pieces, loved by collectors
            and enthusiasts worldwide."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 4}
            />
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-10">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 h-11 border-brand-maroon
              text-brand-maroon hover:bg-brand-maroon hover:text-white
              font-semibold gap-2 transition-all duration-200"
          >
            <Link href="/shop">
              View All Products
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
