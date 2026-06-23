export type Category =
  | "buddha-statues"
  | "hindu-deities"
  | "metal-crafts";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  subcategory?: string;
  shortDescription: string;
  fullDescription: string;
  material: string;
  dimensions?: string;
  weight?: string;
  finish?: string;
  origin: string;
  images: string[];
  inStock: boolean;
  featured: boolean;
  keywords: string[];
  dateAdded: string;
  tags?: string[];
}

export interface CategoryMeta {
  slug: Category;
  label: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
}
