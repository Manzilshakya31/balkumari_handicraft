import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Calendar, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Blog — Nepali Handicraft Guides & Stories",
  description:
    "Learn about authentic Nepali handicrafts, Buddha statues, traditional craftsmanship, and the cultural heritage of Lalitpur, Nepal.",
  keywords: [
    "Nepali handicraft blog",
    "Buddha statue guide",
    "Nepali craft culture",
    "traditional Nepali artisan",
    "Lalitpur craftsmanship",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.domain}/blog`,
  },
};

type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  created_at: string;
};

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export default async function BlogPage() {
  const supabase = getSupabase();
  const { data } = await supabase
    .from("blogs")
    .select("id, title, slug, excerpt, cover_image, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  const blogs = (data ?? []) as Blog[];

  return (
    <div className="min-h-screen bg-brand-cream">

      {/* Page header */}
      <div className="bg-brand-brown">
        <div className="container-custom py-12 md:py-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-brand-gold" aria-hidden="true" />
            <span className="text-brand-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Journal
            </span>
          </div>
          <h1
            className="font-serif font-bold text-white leading-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Stories &{" "}
            <span className="text-brand-gold">Guides</span>
          </h1>
          <p
            className="text-white/55 mt-3 max-w-xl"
            style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
          >
            Insights on Nepali craftsmanship, buying guides, cultural stories,
            and care tips for your handicrafts.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4" aria-hidden="true">✍️</p>
            <h2 className="font-serif text-xl text-brand-brown mb-2">
              Posts Coming Soon
            </h2>
            <p className="text-muted-foreground text-sm">
              We are working on guides and stories about Nepali handicrafts.
              Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-xl overflow-hidden border
                  border-brand-gold/10 hover:border-brand-gold/30
                  hover:shadow-lg hover:shadow-brand-gold/10
                  transition-all duration-300 group"
              >
                {/* Cover image */}
                <Link
                  href={`/blog/${blog.slug}`}
                  className="block relative overflow-hidden bg-brand-cream"
                  style={{ aspectRatio: "16/9" }}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      blog.cover_image ||
                      "https://placehold.co/800x450/f5e6d0/9a7b4b?text=Blog"
                    }
                    alt={blog.title}
                    className="absolute inset-0 w-full h-full object-cover
                      transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                <div className="p-5">
                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} aria-hidden="true" />
                      {new Date(blog.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <Link href={`/blog/${blog.slug}`}>
                    <h2
                      className="font-serif font-semibold text-brand-brown
                        leading-snug mb-2 line-clamp-2
                        group-hover:text-brand-maroon transition-colors text-base"
                    >
                      {blog.title}
                    </h2>
                  </Link>

                  {/* Excerpt */}
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Read more */}
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs
                      font-semibold text-brand-gold-dark
                      hover:text-brand-maroon transition-colors group/link"
                    aria-label={`Read more: ${blog.title}`}
                  >
                    Read Article
                    <ArrowRight
                      size={12}
                      className="transition-transform duration-200 group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
