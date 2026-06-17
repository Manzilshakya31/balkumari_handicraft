"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, ChevronDown } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

export function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden -mt-16 md:-mt-[104px]"
      style={{
        height: "100vh",
        minHeight: "580px",
        maxHeight: "900px",
      }}
      aria-label="Balkumari Handicraft — Authentic Nepali Handicrafts"
    >

      {/* ── Video background ── */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/heri-bg.png"
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        >
          <source src="/images/bg.mp4" type="video/mp4" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/heri-bg.png"
            alt="Authentic handcrafted golden Buddha statues from Balkumari Handicraft, Lalitpur Nepal"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </video>
      </div>

      {/* ── Gradient overlays ── */}
      {/* Left dark gradient for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.05) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Bottom fade into cream */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(to top, hsl(45 33% 97%) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      {/* Top vignette */}
      <div
        className="absolute top-0 left-0 right-0 h-24"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Main content ── */}
      <div className="relative h-full container-custom flex flex-col justify-center">
        <div className="max-w-lg">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4" aria-hidden="true">
            <div className="h-px w-10 bg-brand-gold" />
            <span className="text-brand-gold text-xs font-semibold tracking-[0.25em] uppercase">
              Handcrafted in Lalitpur, Nepal
            </span>
          </div>

          {/* H1 — one per page, primary SEO keyword here */}
          <h1
            className="font-serif font-bold text-white leading-[1.1] mb-4"
            style={{ fontSize: "clamp(1.875rem, 4vw, 3.25rem)" }}
          >
            Authentic{" "}
            <span
              className="text-brand-gold"
              style={{ textShadow: "0 0 40px rgba(201,168,76,0.4)" }}
            >
              Nepali
            </span>
            <br />
            Handicrafts
          </h1>

          {/* Gold divider */}
          <div
            className="w-12 h-0.5 bg-brand-gold mb-4"
            aria-hidden="true"
          />

          {/* Subheading — secondary keywords */}
          <p
            className="text-white/70 leading-relaxed mb-6"
            style={{
              fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
              maxWidth: "420px",
            }}
          >
            Discover handcrafted Buddha statues, metal crafts, singing
            bowls, and traditional Nepali handicrafts — made by skilled
            Newari artisans and shipped worldwide from our workshop.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Button
              asChild
              size="lg"
              className="rounded-full px-6 h-11 text-sm font-semibold gap-2"
              style={{
                background: "linear-gradient(135deg, #C9A84C 0%, #8B6914 100%)",
                color: "white",
                boxShadow: "0 8px 32px rgba(201,168,76,0.35)",
                border: "none",
              }}
            >
              <Link href="/shop">
                Explore Collection
                <ArrowRight size={15} />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-6 h-11 text-sm font-semibold gap-2 text-white hover:text-white border-white/25 hover:bg-white/10"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hello%2C%20I%20am%20interested%20in%20your%20Nepali%20handicrafts`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Balkumari Handicraft on WhatsApp"
              >
                <MessageCircle size={15} />
                Ask on WhatsApp
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 sm:gap-8">
            <div>
              <p
                className="font-serif font-bold text-brand-gold leading-none mb-1"
                style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
              >
                100+
              </p>
              <p className="text-white/45 text-[10px] tracking-wider uppercase">
                Unique Products
              </p>
            </div>

            <div className="w-px h-8 bg-white/15" aria-hidden="true" />

            <div>
              <p
                className="font-serif font-bold text-brand-gold leading-none mb-1"
                style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
              >
                6
              </p>
              <p className="text-white/45 text-[10px] tracking-wider uppercase">
                Craft Categories
              </p>
            </div>

            <div className="w-px h-8 bg-white/15" aria-hidden="true" />

            <div>
              <p
                className="font-serif font-bold text-brand-gold leading-none mb-1"
                style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
              >
                ✈
              </p>
              <p className="text-white/45 text-[10px] tracking-wider uppercase">
                Ships Worldwide
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">
          Scroll
        </span>
        <ChevronDown size={14} className="text-white/30 animate-bounce" />
      </div>

    </section>
  );
}
