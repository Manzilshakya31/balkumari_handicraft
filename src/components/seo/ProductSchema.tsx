import { Product } from "@/data/products/types";
import { SITE_CONFIG } from "@/data/site-config";

interface ProductSchemaProps {
  product: Product;
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.fullDescription,
    image: product.images,
    sku: product.id,
    mpn: product.id,
    brand: {
      "@type": "Brand",
      name: SITE_CONFIG.businessName,
    },
    manufacturer: {
      "@type": "Organization",
      name: SITE_CONFIG.businessName,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE_CONFIG.address.city,
        addressCountry: SITE_CONFIG.address.countryCode,
      },
    },
    material: product.material,
    countryOfOrigin: "Nepal",
    offers: {
      "@type": "Offer",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: SITE_CONFIG.businessName,
      },
      url: `${SITE_CONFIG.domain}/product/${product.slug}`,
    },
    keywords: product.keywords.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
