import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import {
  Calendar,
  ChevronRight,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import DOMPurify from "isomorphic-dompurify";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
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

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { data } = await getSupabase()
    .from("blogs")
    .select("title, slug, excerpt, cover_image")
    .eq("slug", params.slug)
    .eq("status", "published")
    .single();

  if (!data) return {};

  return {
    title: data.title,
    description: data.excerpt ?? undefined,
    alternates: {
      canonical: `${SITE_CONFIG.domain}/blog/${data.slug}`,
    },
    openGraph: {
      title: data.title,
      description: data.excerpt ?? undefined,
      url: `${SITE_CONFIG.domain}/blog/${data.slug}`,
      type: "article",
      images: data.cover_image
        ? [{ url: data.cover_image, alt: data.title }]
        : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { data: blog } = await getSupabase()
    .from("blogs")
    .select("id, title, slug, content, excerpt, cover_image, created_at")
    .eq("slug", params.slug)
    .eq("status", "published")
    .single();

  if (!blog) notFound();

  const post = blog as Blog;

  const whatsappMessage = encodeURIComponent(
    `Hello, I read your article "${post.title}" and I am interested in your handicrafts.`
  );

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
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li>
              <Link href="/blog" className="hover:text-brand-maroon transition-colors">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li
              className="text-brand-brown font-medium truncate max-w-[200px]"
              aria-current="page"
            >
              {post.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* Article */}
      <article className="container-custom py-10 md:py-14">
        <div className="max-w-3xl mx-auto">

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm
              text-muted-foreground hover:text-brand-maroon
              transition-colors mb-8 group"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            Back to Blog
          </Link>

          {/* Article header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1.5">
                <Calendar size={11} aria-hidden="true" />
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <h1
              className="font-serif font-bold text-brand-brown leading-tight mb-4"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
            >
              {post.title}
            </h1>

            {post.excerpt && (
              <p
                className="text-muted-foreground leading-relaxed"
                style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}
              >
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Cover image */}
          {post.cover_image && (
            <div
              className="relative w-full rounded-2xl overflow-hidden mb-10 border border-brand-gold/10"
              style={{ aspectRatio: "16/9" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover_image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article content */}
          <div
            className="prose prose-stone prose-headings:font-serif
              prose-headings:text-brand-brown
              prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-brand-maroon prose-a:no-underline
              hover:prose-a:underline
              max-w-none"
            style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)" }}
          >
<div
  className="prose prose-stone prose-headings:font-serif\n                prose-headings:text-brand-brown\n                prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3\n                prose-p:text-muted-foreground prose-p:leading-relaxed\n                prose-a:text-brand-maroon prose-a:no-underline\n                hover:prose-a:underline\n                max-w-none"
  style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)" }}
  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content || "") }}
/>
          </div>

          {/* CTA box at end of article */}
          <div className="mt-12 bg-brand-brown rounded-2xl p-8 text-center">
            <p
              className="font-serif font-bold text-white mb-2"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
            >
              Interested in Authentic Nepali Handicrafts?
            </p>
            <p className="text-white/55 text-sm mb-5">
              Browse our collection or contact us directly on WhatsApp for
              personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2
                  bg-brand-gold hover:bg-brand-gold-dark text-white
                  rounded-full px-6 py-2.5 text-sm font-semibold
                  transition-colors duration-200"
              >
                Browse Collection
              </Link>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2
                  bg-white/10 hover:bg-white/20 text-white border
                  border-white/20 rounded-full px-6 py-2.5 text-sm
                  font-semibold transition-colors duration-200"
              >
                <MessageCircle size={14} />
                Ask on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </article>
    </div>
  );
}
