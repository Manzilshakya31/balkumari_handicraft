import { SITE_CONFIG } from "@/data/site-config";

export type CategorySlug = (typeof SITE_CONFIG.categories)[number]["slug"];

const CATEGORY_ALIASES: Record<CategorySlug, string[]> = {
  "buddha-statues": ["buddha statues", "buddha statue"],
  "hindu-deities": [
    "hindu deities",
    "hindu deity",
    "hindu deity statues",
    "hindu deities statues",
  ],
  "metal-crafts": ["metal crafts", "metal craft"],
};

function normalizeCategory(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function getCategorySlug(value: string | null | undefined): CategorySlug | null {
  if (!value) return null;

  const normalized = normalizeCategory(value);

  for (const category of SITE_CONFIG.categories) {
    if (normalized === normalizeCategory(category.slug)) return category.slug;
    if (normalized === normalizeCategory(category.label)) return category.slug;
    if (CATEGORY_ALIASES[category.slug].includes(normalized)) return category.slug;
  }

  return null;
}

export function getCategoryLabel(value: string | null | undefined): string {
  const slug = getCategorySlug(value);
  return SITE_CONFIG.categories.find((category) => category.slug === slug)?.label ?? value ?? "";
}