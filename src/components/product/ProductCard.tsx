import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import { Product } from "@/data/products/types";
import { SITE_CONFIG } from "@/data/site-config";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const categoryLabel =
    SITE_CONFIG.categories.find((c) => c.slug === product.category)?.label ??
    product.category;

  const whatsappMessage = encodeURIComponent(
    `Hello, I am interested in: ${product.name}. Can you provide more details?`
  );

  return (
    <article
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
        href={`/product/${product.slug}`}
        className="block relative overflow-hidden bg-brand-cream"
        style={{ aspectRatio: "4/3" }}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={product.images[0]}
          alt={`${product.name} — handcrafted ${product.material} from Lalitpur, Nepal`}
          fill
          className="object-cover transition-transform duration-500
            group-hover:scale-105"
          sizes="(max-width: 640px) 50vw,
                 (max-width: 1024px) 33vw,
                 25vw"
          priority={priority}
        />

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div
            className="absolute inset-0 bg-black/40 flex items-center
              justify-center"
          >
            <span
              className="bg-white/90 text-brand-brown text-xs font-semibold
                px-3 py-1 rounded-full"
            >
              Currently Unavailable
            </span>
          </div>
        )}
      </Link>

      {/* Product info */}
      <div className="p-4">
        {/* Category badge */}
        <Badge
          variant="secondary"
          className="text-[10px] font-medium bg-brand-cream
            text-brand-gold-dark border-0 mb-2 px-2 py-0.5"
        >
          {categoryLabel}
        </Badge>

        {/* Product name */}
        <Link href={`/product/${product.slug}`}>
          <h3
            className="font-serif font-semibold text-brand-brown
              leading-snug mb-1 line-clamp-2 group-hover:text-brand-maroon
              transition-colors text-sm md:text-base"
          >
            {product.name}
          </h3>
        </Link>

        {/* Material */}
        <p className="text-xs text-muted-foreground mb-3">
          {product.material}
          {product.dimensions ? ` · ${product.dimensions}` : ""}
        </p>

        {/* Inquire CTA */}
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
}
