export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: BlogCategory;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  author: string;
  readingTime: number;
  keywords: string[];
  relatedProducts?: string[];
  published: boolean;
  content?: string;
}

export type BlogCategory =
  | "guides"
  | "culture"
  | "craftsmanship"
  | "travel"
  | "care-tips";

export const ALL_POSTS: BlogPost[] = [
  {
    slug: "how-to-identify-authentic-nepali-buddha-statues",
    title: "How to Identify Authentic Handmade Buddha Statues from Nepal",
    date: "2025-01-15",
    category: "guides",
    excerpt:
      "Not all Buddha statues sold online are genuinely handcrafted in Nepal. Here is exactly what to look for to ensure you are buying an authentic piece.",
    coverImage:
      "https://res.cloudinary.com/dih61cvcx/image/upload/Bajrasatwo_18inch_tjadje",
    coverImageAlt:
      "Authentic handcrafted copper Buddha statue from Balkumari Handicraft, Lalitpur Nepal",
    author: "Balkumari Handicraft",
    readingTime: 5,
    keywords: [
      "authentic Buddha statue Nepal",
      "genuine Nepali handicraft",
      "handmade Buddha statue",
      "how to buy Buddha statue Nepal",
    ],
    relatedProducts: ["bajrasatwo-statue-18inch"],
    published: true,
    content: `
Buying a Buddha statue is more than a purchase — it is an investment
in centuries of artistic tradition. But with so many mass-produced
imitations flooding the market, how do you know you are getting the
real thing?

## Look for Hand-Finished Details

Authentic handmade statues from Nepal show subtle irregularities that
machines cannot replicate. Each chisel mark, each curve of the robe,
each expression on the face is slightly unique. If every detail looks
perfectly uniform, it was likely machine-made.

## Check the Material

Genuine Nepali statues are typically made from copper, bronze, or brass
using the traditional lost-wax casting method. Ask the seller specifically
about the casting technique. A reputable artisan workshop will always
know exactly how their pieces are made.

## Ask About Origin

Authentic pieces come from specific regions — primarily Lalitpur
(Patan) and Bhaktapur in Nepal's Kathmandu Valley. These cities have
been centers of metal craft for over a thousand years. If a seller
cannot tell you exactly where a piece was made, that is a red flag.

## Buy Directly from Nepal

The most reliable way to get an authentic piece is to buy directly
from a workshop in Nepal. At Balkumari Handicraft, every statue in
our collection is made by our own artisans in Thapahiti, Lalitpur.
You can visit us in person or contact us directly on WhatsApp to
ask about any specific piece.

## Weight and Finish

Genuine copper and bronze statues are heavy for their size. They
also have a richness of surface detail — gold plating that is applied
by hand, inlaid gemstones, and fine engraving work that reflects
hours of skilled labor.

When in doubt, ask questions. A genuine artisan workshop is always
proud to explain their craft.
    `,
  },
];

export function getLatestPosts(limit: number = 3): BlogPost[] {
  return ALL_POSTS
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, limit);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_POSTS.find((p) => p.slug === slug && p.published);
}

export function getAllPostSlugs(): string[] {
  return ALL_POSTS
    .filter((p) => p.published)
    .map((p) => p.slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return ALL_POSTS.filter(
    (p) => p.category === category && p.published
  );
}
