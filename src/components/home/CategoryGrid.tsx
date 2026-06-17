import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CategoryGrid() {
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
          description="Explore our curated range of authentic Nepali handicrafts,
            each category representing centuries of Newari artisan tradition."
        />

        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
          role="list"
          aria-label="Product categories"
        >
          {SITE_CONFIG.categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              role="listitem"
              className="group relative overflow-hidden rounded-xl
                bg-brand-brown aspect-[4/3] flex flex-col justify-end
                p-5 transition-transform duration-300 hover:-translate-y-1
                hover:shadow-xl hover:shadow-brand-brown/20"
              aria-label={`Browse ${category.label}`}
            >
              {/* Background gradient — real images added later */}
              <div
                className="absolute inset-0 bg-gradient-to-br
                  from-brand-brown via-brand-brown-light to-brand-brown"
                aria-hidden="true"
              />

              {/* Gold accent line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5
                  bg-brand-gold scale-x-0 group-hover:scale-x-100
                  transition-transform duration-300 origin-left"
                aria-hidden="true"
              />

              {/* Category icon */}
              <span
                className="relative text-3xl mb-3 block"
                aria-hidden="true"
              >
                {category.icon}
              </span>

              {/* Category name */}
              <h3
                className="relative font-serif font-semibold text-white
                  leading-tight mb-1 text-base md:text-lg"
              >
                {category.label}
              </h3>

              {/* Description — hidden on mobile for space */}
              <p
                className="relative text-white/55 text-xs leading-relaxed
                  hidden md:block mb-3 line-clamp-2"
              >
                {category.description}
              </p>

              {/* Arrow link */}
              <div
                className="relative flex items-center gap-1.5 text-brand-gold
                  text-xs font-semibold uppercase tracking-wider
                  group-hover:gap-2.5 transition-all duration-200"
              >
                <span>Explore</span>
                <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
