import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  MessageCircle,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductSchema } from "@/components/seo/ProductSchema";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductCard } from "@/components/product/ProductCard";
import {
  getProductBySlug,
  getAllProductSlugs,
  getRelatedProducts,
} from "@/data/products";
import { SITE_CONFIG } from "@/data/site-config";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};

  return {
    title: `${product.name} — Handcrafted in Nepal`,
    description: product.shortDescription,
    keywords: product.keywords,
    alternates: {
      canonical: `${SITE_CONFIG.domain}/product/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Balkumari Handicraft`,
      description: product.shortDescription,
      url: `${SITE_CONFIG.domain}/product/${product.slug}`,
      images: product.images[0]
        ? [
            {
              url: product.images[0],
              width: 1080,
              height: 1080,
              alt: `${product.name} — handcrafted ${product.material} from Lalitpur, Nepal`,
            },
          ]
        : [],
    },
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const relatedProducts = getRelatedProducts(product.slug, product.category, 4);

  const categoryLabel =
    SITE_CONFIG.categories.find((c) => c.slug === product.category)?.label ??
    product.category;

  const whatsappMessage = encodeURIComponent(
    `Hello, I am interested in purchasing: ${product.name}. Could you please provide more details about availability and pricing?`
  );

  return (
    <>
      <ProductSchema product={product} />

      <div className="min-h-screen bg-brand-cream">

        {/* Breadcrumb */}
        <nav
          className="bg-white border-b border-brand-gold/10"
          aria-label="Breadcrumb"
        >
          <div className="container-custom py-3">
            <ol
              className="flex items-center gap-2 text-xs text-muted-foreground"
              role="list"
            >
              <li>
                <Link href="/" className="hover:text-brand-maroon transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={12} />
              </li>
              <li>
                <Link href="/shop" className="hover:text-brand-maroon transition-colors">
                  Shop
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={12} />
              </li>
              <li>
                <Link
                  href={`/shop?category=${product.category}`}
                  className="hover:text-brand-maroon transition-colors"
                >
                  {categoryLabel}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={12} />
              </li>
              <li
                className="text-brand-brown font-medium truncate max-w-[200px]"
                aria-current="page"
              >
                {product.name}
              </li>
            </ol>
          </div>
        </nav>

        {/* Main product section */}
        <div className="container-custom py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

            {/* Left — Image gallery */}
            <ProductGallery
              images={product.images}
              productName={product.name}
            />

            {/* Right — Product info */}
            <div>
              {/* Category badge */}
              <Badge
                variant="secondary"
                className="text-xs font-medium bg-brand-cream
                  text-brand-gold-dark border-0 mb-3 px-3 py-1"
              >
                {categoryLabel}
              </Badge>

              {/* Product name — H1 for SEO */}
              <h1
                className="font-serif font-bold text-brand-brown leading-tight mb-4"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
              >
                {product.name}
              </h1>

              {/* Origin */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
                <MapPin size={14} className="text-brand-gold" />
                <span>{product.origin}</span>
              </div>

              {/* Short description */}
              <p
                className="text-muted-foreground leading-relaxed mb-6
                  pb-6 border-b border-brand-gold/15"
                style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
              >
                {product.shortDescription}
              </p>

              {/* Product details */}
              <div className="space-y-3 mb-6 pb-6 border-b border-brand-gold/15">
                {(
                  [
                    { label: "Material", value: product.material },
                    product.dimensions
                      ? { label: "Dimensions", value: product.dimensions }
                      : null,
                    product.finish
                      ? { label: "Finish", value: product.finish }
                      : null,
                    product.weight
                      ? { label: "Weight", value: product.weight }
                      : null,
                  ] as Array<{ label: string; value: string } | null>
                )
                  .filter(
                    (d): d is { label: string; value: string } => d !== null
                  )
                  .map((detail) => (
                    <div
                      key={detail.label}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="text-muted-foreground min-w-[90px] flex-shrink-0">
                        {detail.label}
                      </span>
                      <span className="font-medium text-brand-brown">
                        {detail.value}
                      </span>
                    </div>
                  ))}
              </div>

              {/* Stock status */}
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle
                  size={16}
                  className={product.inStock ? "text-green-600" : "text-muted-foreground"}
                />
                <span
                  className={`text-sm font-medium ${
                    product.inStock ? "text-green-600" : "text-muted-foreground"
                  }`}
                >
                  {product.inStock
                    ? "Available — Inquire for pricing"
                    : "Currently Unavailable"}
                </span>
              </div>

              {/* CTA buttons */}
              <div className="space-y-3 mb-8">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5
                    w-full bg-brand-gold hover:bg-brand-gold-dark
                    text-white rounded-xl py-3.5 text-sm font-semibold
                    transition-colors duration-200 shadow-lg
                    shadow-brand-gold/20"
                  aria-label={`Inquire about ${product.name} on WhatsApp`}
                >
                  <MessageCircle size={18} />
                  Inquire on WhatsApp
                </a>

                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center justify-center gap-2.5
                    w-full bg-white hover:bg-brand-cream
                    text-brand-brown border border-brand-gold/20
                    hover:border-brand-gold rounded-xl py-3.5
                    text-sm font-semibold transition-all duration-200"
                  aria-label={`Call Balkumari Handicraft about ${product.name}`}
                >
                  Call Us Directly
                </a>
              </div>

              {/* Trust signals */}
              <div className="bg-white rounded-xl p-4 border border-brand-gold/15 space-y-2.5">
                {[
                  "100% handcrafted by Newari artisans",
                  "Authentic origin — made in Lalitpur, Nepal",
                  "Carefully packaged for worldwide shipping",
                  "Direct from our workshop — no middlemen",
                ].map((signal) => (
                  <div
                    key={signal}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground"
                  >
                    <CheckCircle
                      size={14}
                      className="text-brand-gold flex-shrink-0"
                    />
                    <span>{signal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full description */}
          <div className="mt-14 pt-10 border-t border-brand-gold/15">
            <h2
              className="font-serif font-bold text-brand-brown mb-5"
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
            >
              About This Piece
            </h2>
            <div
              className="prose prose-stone max-w-3xl text-muted-foreground leading-relaxed"
              style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
            >
              <p>{product.fullDescription}</p>
            </div>
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <div className="mt-14 pt-10 border-t border-brand-gold/15">
              <h2
                className="font-serif font-bold text-brand-brown mb-8"
                style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
              >
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((related) => (
                  <ProductCard key={related.id} product={related} />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
