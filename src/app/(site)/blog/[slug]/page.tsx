import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  ChevronRight,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import { getPostBySlug, getAllPostSlugs } from "@/data/blog";
import { SITE_CONFIG } from "@/data/site-config";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `${SITE_CONFIG.domain}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_CONFIG.domain}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          alt: post.coverImageAlt,
        },
      ],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

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
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span
                className="w-1 h-1 rounded-full bg-muted-foreground/40"
                aria-hidden="true"
              />
              <span className="flex items-center gap-1.5">
                <Clock size={11} aria-hidden="true" />
                {post.readingTime} min read
              </span>
              <span
                className="w-1 h-1 rounded-full bg-muted-foreground/40"
                aria-hidden="true"
              />
              <span>{post.author}</span>
            </div>

            <h1
              className="font-serif font-bold text-brand-brown leading-tight mb-4"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
            >
              {post.title}
            </h1>

            <p
              className="text-muted-foreground leading-relaxed"
              style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}
            >
              {post.excerpt}
            </p>
          </header>

          {/* Cover image */}
          <div
            className="relative w-full rounded-2xl overflow-hidden mb-10 border border-brand-gold/10"
            style={{ aspectRatio: "16/9" }}
          >
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

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
            {post.content
              ?.split("\n\n")
              .map((paragraph, index) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;

                if (trimmed.startsWith("## ")) {
                  return (
                    <h2 key={index}>{trimmed.replace("## ", "")}</h2>
                  );
                }

                return <p key={index}>{trimmed}</p>;
              })}
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
