"use client";

import Link from "next/link";
import {
  Crown,
  Sparkles,
  Hammer,
  Music,
  Flame,
  Palette,
  ArrowRight,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CATEGORIES = [
  {
    slug: "buddha-statues",
    label: "Buddha Statues",
    description:
      "Handcrafted copper and bronze Buddha statues using the ancient lost-wax casting method passed down through Newari artisan families.",
    icon: Crown,
    size: "featured",
    bg: "bg-[#2C1810]",
    accentColor: "from-amber-900/40 to-transparent",
  },
  {
    slug: "hindu-deities",
    label: "Hindu Deities",
    description:
      "Traditional deity statues handmade by Newari artisans.",
    icon: Sparkles,
    size: "normal",
    bg: "bg-[#1A0F0F]",
    accentColor: "from-red-900/50 to-transparent",
  },
  {
    slug: "metal-crafts",
    label: "Metal Crafts",
    description:
      "Authentic decorative metalwork from Nepal.",
    icon: Hammer,
    size: "normal",
    bg: "bg-[#1C1A10]",
    accentColor: "from-yellow-900/40 to-transparent",
  },
  {
    slug: "singing-bowls",
    label: "Singing Bowls",
    description:
      "Hand-hammered Himalayan singing bowls for meditation.",
    icon: Music,
    size: "normal",
    bg: "bg-[#0F1A1A]",
    accentColor: "from-teal-900/40 to-transparent",
  },
  {
    slug: "ritual-items",
    label: "Ritual Items",
    description:
      "Traditional ceremonial objects and sacred implements.",
    icon: Flame,
    size: "normal",
    bg: "bg-[#1A0F18]",
    accentColor: "from-purple-900/40 to-transparent",
  },
  {
    slug: "thangka",
    label: "Thangka Paintings",
    description:
      "Hand-painted traditional Tibetan and Nepali sacred paintings — each one a meditation in itself, taking weeks to complete.",
    icon: Palette,
    size: "wide",
    bg: "bg-[#101A10]",
    accentColor: "from-green-900/40 to-transparent",
  },
];

function DecorativePattern({ slug }: { slug: string }) {
  if (slug === "buddha-statues") {
    return (
      <svg
        className="absolute right-0 top-0 w-56 h-56 opacity-[0.06]
          translate-x-10 -translate-y-10 pointer-events-none"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        {[90, 70, 50, 30, 10].map((r) => (
          <circle
            key={r}
            cx="100" cy="100" r={r}
            stroke="#C9A84C" strokeWidth="0.8"
          />
        ))}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
          <line
            key={a}
            x1="100" y1="100"
            x2={100 + 90 * Math.cos((a * Math.PI) / 180)}
            y2={100 + 90 * Math.sin((a * Math.PI) / 180)}
            stroke="#C9A84C" strokeWidth="0.4"
          />
        ))}
      </svg>
    );
  }

  if (slug === "thangka") {
    return (
      <svg
        className="absolute right-0 top-0 h-full w-64 opacity-[0.05]
          pointer-events-none"
        viewBox="0 0 200 120"
        fill="none"
        preserveAspectRatio="xMaxYMid meet"
        aria-hidden="true"
      >
        {[0, 20, 40, 60, 80, 100].map((y) => (
          <path
            key={y}
            d={`M0 ${y} Q50 ${y - 15} 100 ${y} Q150 ${y + 15} 200 ${y}`}
            stroke="#C9A84C" strokeWidth="0.6"
          />
        ))}
        {[40, 100, 160].map((x) => (
          <circle key={x} cx={x} cy="60" r="20"
            stroke="#C9A84C" strokeWidth="0.6" />
        ))}
      </svg>
    );
  }

  return (
    <svg
      className="absolute right-0 bottom-0 w-32 h-32 opacity-[0.05]
        translate-x-4 translate-y-4 pointer-events-none"
      viewBox="0 0 128 128"
      fill="none"
      aria-hidden="true"
    >
      {[60, 44, 28].map((r) => (
        <rect
          key={r}
          x={64 - r} y={64 - r}
          width={r * 2} height={r * 2}
          stroke="#C9A84C" strokeWidth="0.6"
          transform="rotate(45 64 64)"
        />
      ))}
    </svg>
  );
}

export function CategoryGrid() {
  const featured = CATEGORIES[0];
  const middle = CATEGORIES.slice(1, 5);
  const wide = CATEGORIES[5];

  return (
    <section
      className="section-padding bg-white"
      aria-labelledby="categories-heading"
    >
      <div className="container-custom">
        <SectionHeading
          eyebrow="Browse by Category"
          title="Our"
          titleHighlight="Collections"
          description="Six centuries of Newari artisan tradition,
            preserved in every handcrafted piece."
        />

        <div className="flex flex-col gap-4">

          {/* Row 1 — Featured left + 2x2 grid right */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Featured card — spans 2 rows on desktop */}
            <Link
              href={`/shop?category=${featured.slug}`}
              className={`
                group relative overflow-hidden rounded-2xl
                ${featured.bg} flex flex-col justify-end
                p-7 md:p-8
                min-h-[280px] md:min-h-0 md:row-span-2
                transition-all duration-500
                hover:-translate-y-1
                hover:shadow-2xl hover:shadow-black/50
                md:col-span-1
              `}
              style={{ minHeight: "clamp(280px, 40vw, 480px)" }}
              aria-label={`Browse ${featured.label}`}
            >
              <DecorativePattern slug={featured.slug} />

              {/* Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br
                  ${featured.accentColor}`}
                aria-hidden="true"
              />

              {/* Bottom text gradient */}
              <div
                className="absolute bottom-0 left-0 right-0 h-3/4
                  bg-gradient-to-t from-black/70 to-transparent"
                aria-hidden="true"
              />

              {/* Gold top line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]
                  bg-gradient-to-r from-transparent via-brand-gold
                  to-transparent scale-x-0 group-hover:scale-x-100
                  transition-transform duration-500"
                aria-hidden="true"
              />

              <div className="relative">
                <div
                  className="w-12 h-12 rounded-xl bg-brand-gold/10
                    border border-brand-gold/25 flex items-center
                    justify-center mb-5 group-hover:bg-brand-gold/20
                    transition-colors duration-300"
                >
                  <Crown size={22} className="text-brand-gold" />
                </div>

                <h3
                  className="font-serif font-bold text-white
                    leading-tight mb-3 text-2xl md:text-3xl
                    group-hover:text-brand-gold-light
                    transition-colors duration-300"
                >
                  {featured.label}
                </h3>

                <p className="text-white/50 text-sm leading-relaxed
                  mb-5 max-w-[220px]">
                  {featured.description}
                </p>

                <div
                  className="flex items-center gap-2 text-brand-gold
                    text-[11px] font-bold uppercase tracking-[0.15em]
                    group-hover:gap-3 transition-all duration-300"
                >
                  <span>Explore Collection</span>
                  <ArrowRight size={11} />
                </div>
              </div>
            </Link>

            {/* 4 normal cards — 2x2 grid */}
            {middle.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={`/shop?category=${cat.slug}`}
                  className={`
                    group relative overflow-hidden rounded-2xl
                    ${cat.bg} flex flex-col justify-end
                    p-5 min-h-[160px] md:min-h-[180px]
                    transition-all duration-400
                    hover:-translate-y-0.5
                    hover:shadow-xl hover:shadow-black/40
                  `}
                  aria-label={`Browse ${cat.label}`}
                >
                  <DecorativePattern slug={cat.slug} />

                  <div
                    className={`absolute inset-0 bg-gradient-to-br
                      ${cat.accentColor}`}
                    aria-hidden="true"
                  />

                  <div
                    className="absolute bottom-0 left-0 right-0 h-2/3
                      bg-gradient-to-t from-black/60 to-transparent"
                    aria-hidden="true"
                  />

                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]
                      bg-gradient-to-r from-transparent via-brand-gold
                      to-transparent scale-x-0 group-hover:scale-x-100
                      transition-transform duration-500"
                    aria-hidden="true"
                  />

                  <div className="relative">
                    <div
                      className="w-9 h-9 rounded-lg bg-brand-gold/10
                        border border-brand-gold/20 flex items-center
                        justify-center mb-3 group-hover:bg-brand-gold/20
                        transition-colors duration-300"
                    >
                      <Icon size={16} className="text-brand-gold" />
                    </div>

                    <h3
                      className="font-serif font-semibold text-white
                        text-base leading-tight mb-2
                        group-hover:text-brand-gold-light
                        transition-colors duration-300"
                    >
                      {cat.label}
                    </h3>

                    <div
                      className="flex items-center gap-1.5 text-brand-gold
                        text-[10px] font-bold uppercase tracking-[0.15em]
                        group-hover:gap-2.5 transition-all duration-300"
                    >
                      <span>Explore</span>
                      <ArrowRight size={9} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Row 2 — Wide banner card full width */}
          {wide && (
            <Link
              href={`/shop?category=${wide.slug}`}
              className={`
                group relative overflow-hidden rounded-2xl
                ${wide.bg} flex flex-col justify-end
                p-6 md:p-8 min-h-[140px] md:min-h-[160px]
                transition-all duration-500
                hover:-translate-y-0.5
                hover:shadow-xl hover:shadow-black/40
              `}
              aria-label={`Browse ${wide.label}`}
            >
              <DecorativePattern slug={wide.slug} />

              <div
                className={`absolute inset-0 bg-gradient-to-r
                  ${wide.accentColor}`}
                aria-hidden="true"
              />

              <div
                className="absolute bottom-0 left-0 right-0 h-full
                  bg-gradient-to-t from-black/50 via-transparent
                  to-transparent"
                aria-hidden="true"
              />

              <div
                className="absolute top-0 left-0 right-0 h-[2px]
                  bg-gradient-to-r from-transparent via-brand-gold
                  to-transparent scale-x-0 group-hover:scale-x-100
                  transition-transform duration-500"
                aria-hidden="true"
              />

              {/* Horizontal layout for wide card */}
              <div className="relative flex items-end justify-between
                gap-6">
                <div className="flex items-center gap-5">
                  <div
                    className="w-11 h-11 rounded-xl bg-brand-gold/10
                      border border-brand-gold/20 flex items-center
                      justify-center flex-shrink-0
                      group-hover:bg-brand-gold/20
                      transition-colors duration-300"
                  >
                    <Palette size={18} className="text-brand-gold" />
                  </div>
                  <div>
                    <h3
                      className="font-serif font-bold text-white
                        text-lg md:text-xl leading-tight mb-1
                        group-hover:text-brand-gold-light
                        transition-colors duration-300"
                    >
                      {wide.label}
                    </h3>
                    <p className="text-white/45 text-xs md:text-sm
                      max-w-md hidden sm:block">
                      {wide.description}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-2 text-brand-gold
                    text-[11px] font-bold uppercase tracking-[0.15em]
                    flex-shrink-0 group-hover:gap-3
                    transition-all duration-300"
                >
                  <span>Explore</span>
                  <ArrowRight size={11} />
                </div>
              </div>
            </Link>
          )}

        </div>
      </div>
    </section>
  );
}
