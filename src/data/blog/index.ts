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

export const ALL_POSTS: BlogPost[] = [];

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
