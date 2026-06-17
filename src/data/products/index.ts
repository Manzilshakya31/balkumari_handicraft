import { Product, Category } from "./types";

export const ALL_PRODUCTS: Product[] = [
  // Products will be added incrementally
  {
    id: "001",
    slug: "bajrasatwo-statue-18inch",
    name: "Bajrasatwo Statue 18 Inch",
    category: "buddha-statues",
    shortDescription: "Handcrafted 18-inch Bajrasatwo statue from Lalitpur, Nepal",
    fullDescription: "A masterfully handcrafted Bajrasatwo statue made by skilled Newari artisans in Lalitpur, Nepal using traditional techniques passed down through generations.",
    material: "Copper with gold plating",
    dimensions: "18 inches height",
    finish: "Gold plated",
    origin: "Handcrafted in Lalitpur, Nepal",
    images: [
      "https://res.cloudinary.com/dih61cvcx/image/upload/Bajrasatwo_18inch_tjadje"
    ],
    inStock: true,
    featured: true,
    keywords: [
      "Bajrasatwo statue Nepal",
      "handmade Buddha statue Lalitpur",
      "copper deity statue Nepal"
    ],
    dateAdded: "2025-01-01",
  },
];

export function getFeaturedProducts(limit: number = 8): Product[] {
  return ALL_PRODUCTS
    .filter((p) => p.featured && p.inStock)
    .slice(0, limit);
}

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return ALL_PRODUCTS.filter(
    (p) => p.category === category && p.inStock
  );
}

export function getRelatedProducts(
  currentSlug: string,
  category: Category,
  limit: number = 4
): Product[] {
  return ALL_PRODUCTS
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}

export function getAllProductSlugs(): string[] {
  return ALL_PRODUCTS.map((p) => p.slug);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return ALL_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.keywords.some((k) => k.toLowerCase().includes(q))
  );
}

