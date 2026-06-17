import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STATS = [
  { value: "25+", label: "Years", context: "Est. 1999" },
  { value: "100+", label: "Products", context: "Handcrafted" },
  { value: "500+", label: "Customers", context: "Worldwide" },
  { value: "10+", label: "Countries", context: "Exhibitions" },
];

export function AboutPreview() {
  return (
    <section
      className="bg-brand-brown overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

          {/* ── Left panel — story ── */}
          <div
            className="py-16 lg:py-20 pr-0 lg:pr-14
              border-b lg:border-b-0 lg:border-r
              border-white/10 flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="h-px w-8 bg-brand-gold"
                aria-hidden="true"
              />
              <span className="text-brand-gold text-xs font-semibold
                tracking-[0.2em] uppercase">
                Our Story
              </span>
            </div>

            {/* Heading */}
            <h2
              id="about-heading"
              className="font-serif font-bold text-white
                leading-[1.1] mb-6"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              }}
            >
              25 Years of{" "}
              <span className="text-brand-gold">
                Authentic Craft
              </span>
            </h2>

            {/* Short story — no em dashes, short sentences */}
            <div
              className="space-y-4 text-white/60 leading-relaxed mb-8"
              style={{
                fontSize: "clamp(0.875rem, 1.4vw, 0.9375rem)",
              }}
            >
              <p>
                Gyani Raj Shakya started with one goal: to learn
                the craft properly. He spent years training beside
                master artisans in Thapahiti, Lalitpur, mastering
                the lost-wax casting process that has defined
                Nepali metalwork for centuries.
              </p>
              <p>
                As his skills grew, so did his reach. He took
                Nepali handicrafts to international exhibitions
                in China, Bhutan, and beyond. The world responded.
                Today, Balkumari Handicraft ships handcrafted
                statues, singing bowls, and sacred art to
                collectors and temples across every continent.
              </p>
              <p>
                Every piece carries the same commitment Gyani Raj
                started with in 1999: complete authenticity,
                genuine craftsmanship, nothing compromised.
              </p>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-brand-gold
                hover:text-brand-gold-light text-sm font-semibold
                uppercase tracking-[0.15em] transition-colors
                duration-200 group w-fit"
              aria-label="Read the full story of Balkumari Handicraft"
            >
              Read Full Story
              <ArrowRight
                size={14}
                className="transition-transform duration-200
                  group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* ── Right panel — founder quote ── */}
          <div
            className="py-16 lg:py-20 pl-0 lg:pl-14
              flex flex-col justify-center"
          >
            {/* Large decorative quote mark */}
            <div
              className="font-serif text-brand-gold/10 leading-none
                mb-4 select-none"
              style={{ fontSize: "8rem", lineHeight: 1 }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            {/* Quote */}
            <blockquote>
              <p
                className="font-serif text-white leading-relaxed mb-6"
                style={{
                  fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                }}
              >
                From the exhibition halls of China and Bhutan to
                homes across five continents, every piece that
                leaves our workshop carries the soul of Nepal.
              </p>
              <footer>
                <div className="flex items-center gap-3">
                  <div
                    className="h-px w-8 bg-brand-gold/40"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-white text-sm font-semibold">
                      Gyani Raj Shakya
                    </p>
                    <p className="text-white/40 text-xs mt-0.5">
                      Founder, Balkumari Handicraft
                    </p>
                  </div>
                </div>
              </footer>
            </blockquote>

            {/* Thin gold divider */}
            <div
              className="h-px bg-white/10 my-8"
              aria-hidden="true"
            />

            {/* Origin badge */}
            <div className="flex items-center gap-3">
              <div
                className="w-2 h-2 rounded-full bg-brand-gold"
                aria-hidden="true"
              />
              <p className="text-white/40 text-xs tracking-wider uppercase">
                Thapahiti, Lalitpur, Nepal · Est. 1999
              </p>
            </div>
          </div>

        </div>

        {/* ── Bottom stats strip ── */}
        <div
          className="grid grid-cols-2 md:grid-cols-4
            border-t border-white/10"
        >
          {STATS.map(({ value, label, context }, index) => (
            <div
              key={label}
              className={`
                py-8 px-6 text-center
                ${index < STATS.length - 1
                  ? "border-b md:border-b-0 md:border-r border-white/10"
                  : "border-b md:border-b-0"
                }
                ${index % 2 === 0 && index < STATS.length - 1
                  ? "border-r md:border-r-0"
                  : ""
                }
              `}
            >
              <p
                className="font-serif font-bold text-brand-gold
                  leading-none mb-1"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                }}
              >
                {value}
              </p>
              <p className="text-white text-xs font-semibold
                uppercase tracking-wider mb-0.5">
                {label}
              </p>
              <p className="text-white/35 text-[10px]">
                {context}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
