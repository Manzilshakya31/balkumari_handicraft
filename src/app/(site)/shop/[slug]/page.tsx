import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { MapPin, MessageCircle, ChevronRight, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SITE_CONFIG } from "@/data/site-config";

export const dynamic = "force-dynamic";

// ── Types ──────────────────────────────────────────────────────

type ProductImage = {
  id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
};

type SupabaseProduct = {
  id: string;
  sku: string | null;
  name: string;
  description: string | null;
  price: number | null;
  category: string | null;
  material: string | null;
  dimensions: string | null;
  origin: string | null;
  stock: number;
  status: string;
  is_available: boolean;
  product_images: ProductImage[];
};

type RelatedProduct = {
  id: string;
  sku: string | null;
  name: string;
  price: number | null;
  product_images: Pick<ProductImage, "url" | "alt_text" | "sort_order">[];
};

// ── Supabase client (server-side, anon key) ────────────────────

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// UUID v4 detection
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function getProduct(slug: string): Promise<SupabaseProduct | null> {
  const supabase = getSupabase();
  const isUUID = UUID_RE.test(slug);

  const base = supabase
    .from("products")
    .select(
      "id, sku, name, description, price, category, material, dimensions, origin, stock, status, is_available, created_at, product_images(id, url, alt_text, sort_order)"
    );

  const { data, error } = isUUID
    ? await base.eq("id", slug).single()
    : await base.eq("sku", slug).single();

  if (error || !data) return null;
  return data as SupabaseProduct;
}

// ── Metadata ───────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return {};

  const firstImg = [...(product.product_images ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)[0];

  const canonical = `${SITE_CONFIG.domain}/shop/${product.sku ?? product.id}`;

  return {
    title: `${product.name} — Handcrafted in Nepal`,
    description:
      product.description ??
      `${product.name} — handcrafted ${product.material ?? "craft"} from Lalitpur, Nepal.`,
    alternates: { canonical },
    openGraph: {
      title: `${product.name} | Balkumari Handicraft`,
      description: product.description ?? "",
      url: canonical,
      images: firstImg ? [{ url: firstImg.url, alt: product.name }] : [],
    },
  };
}

// ── Page ───────────────────────────────────────────────────────

export default async function ShopProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  // Sorted image URLs for ProductGallery
  const imageUrls = [...(product.product_images ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => img.url);

  const inStock = product.is_available;

  const whatsappMessage = encodeURIComponent(
    `Hello, I am interested in purchasing: ${product.name}${
      product.sku ? ` (SKU: ${product.sku})` : ""
    }. Could you please provide more details about availability and pricing?`
  );

  // Related products — same category, different product
  const supabase = getSupabase();
  const { data: relatedRaw } = await supabase
    .from("products")
    .select("id, sku, name, price, product_images(url, alt_text, sort_order)")
    .eq("category", product.category ?? "")
    .eq("status", "active")
    .neq("id", product.id)
    .limit(4);

  const related = (relatedRaw ?? []) as RelatedProduct[];

  return (
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
            <li aria-hidden="true"><ChevronRight size={12} /></li>
            <li>
              <Link href="/shop" className="hover:text-brand-maroon transition-colors">
                Shop
              </Link>
            </li>
            {product.category && (
              <>
                <li aria-hidden="true"><ChevronRight size={12} /></li>
                <li>
                  <Link
                    href={`/shop?category=${encodeURIComponent(product.category)}`}
                    className="hover:text-brand-maroon transition-colors"
                  >
                    {product.category}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true"><ChevronRight size={12} /></li>
            <li
              className="text-brand-brown font-medium truncate max-w-[180px]"
              aria-current="page"
            >
              {product.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* Main section */}
      <div className="container-custom py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Left — Image gallery */}
          {imageUrls.length > 0 ? (
            <ProductGallery images={imageUrls} productName={product.name} />
          ) : (
            <div
              className="w-full rounded-2xl bg-white border border-brand-gold/15
                flex items-center justify-center text-muted-foreground text-sm"
              style={{ aspectRatio: "1/1" }}
            >
              No images available
            </div>
          )}

          {/* Right — Product info */}
          <div>
            {/* SKU */}
            {product.sku && (
              <p className="text-xs font-mono text-muted-foreground mb-2 tracking-wide">
                SKU: {product.sku}
              </p>
            )}

            {/* Category badge */}
            {product.category && (
              <Badge
                variant="secondary"
                className="text-xs font-medium bg-brand-cream
                  text-brand-gold-dark border-0 mb-3 px-3 py-1"
              >
                {product.category}
              </Badge>
            )}

            {/* Product name */}
            <h1
              className="font-serif font-bold text-brand-brown leading-tight mb-4"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              {product.name}
            </h1>

            {/* Origin */}
            {product.origin && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <MapPin size={14} className="text-brand-gold" />
                <span>{product.origin}</span>
              </div>
            )}

            {/* Price */}
            {product.price != null && (
              <p className="text-2xl font-bold text-brand-brown mb-5">
                NPR {product.price.toLocaleString()}
              </p>
            )}

            {/* Description */}
            {product.description && (
              <p
                className="text-muted-foreground leading-relaxed mb-6
                  pb-6 border-b border-brand-gold/15"
                style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
              >
                {product.description}
              </p>
            )}

            {/* Details grid */}
            {(product.material || product.dimensions) && (
              <div className="space-y-3 mb-6 pb-6 border-b border-brand-gold/15">
                {product.material && (
                  <div className="flex items-start gap-3 text-sm">
                    <span className="text-muted-foreground min-w-[90px] flex-shrink-0">
                      Material
                    </span>
                    <span className="font-medium text-brand-brown">
                      {product.material}
                    </span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex items-start gap-3 text-sm">
                    <span className="text-muted-foreground min-w-[90px] flex-shrink-0">
                      Dimensions
                    </span>
                    <span className="font-medium text-brand-brown">
                      {product.dimensions}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Availability status */}
            <div className="mb-6">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                  inStock
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                <CheckCircle size={14} className="flex-shrink-0" />
                {inStock
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
                className="flex items-center justify-center gap-2.5 w-full
                  bg-brand-gold hover:bg-brand-gold-dark text-white
                  rounded-xl py-3.5 text-sm font-semibold
                  transition-colors duration-200 shadow-lg shadow-brand-gold/20"
                aria-label={`Inquire about ${product.name} on WhatsApp`}
              >
                <MessageCircle size={18} />
                Inquire on WhatsApp
              </a>

              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center justify-center gap-2.5 w-full
                  bg-white hover:bg-brand-cream text-brand-brown
                  border border-brand-gold/20 hover:border-brand-gold
                  rounded-xl py-3.5 text-sm font-semibold transition-all duration-200"
                aria-label="Call Balkumari Handicraft"
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
                  <CheckCircle size={14} className="text-brand-gold flex-shrink-0" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-14 pt-10 border-t border-brand-gold/15">
            <h2
              className="font-serif font-bold text-brand-brown mb-8"
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
            >
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((r) => {
                const thumb = [...(r.product_images ?? [])]
                  .sort((a, b) => a.sort_order - b.sort_order)[0];
                const href = `/shop/${r.sku ?? r.id}`;
                return (
                  <Link
                    key={r.id}
                    href={href}
                    className="group bg-white rounded-xl overflow-hidden border
                      border-brand-gold/10 hover:border-brand-gold/30
                      hover:shadow-lg hover:shadow-brand-gold/10
                      transition-all duration-300"
                  >
                    <div
                      className="relative bg-brand-cream overflow-hidden"
                      style={{ aspectRatio: "4/3" }}
                    >
                      {thumb ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={thumb.url}
                          alt={thumb.alt_text ?? r.name}
                          className="w-full h-full object-cover
                            group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center
                          text-muted-foreground text-xs">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="font-serif font-semibold text-brand-brown text-sm
                        line-clamp-2 group-hover:text-brand-maroon transition-colors">
                        {r.name}
                      </p>
                      {r.price != null && (
                        <p className="text-xs text-muted-foreground mt-1">
                          NPR {r.price.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
