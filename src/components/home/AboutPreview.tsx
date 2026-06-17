import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const STATS = [
  { value: "100+", label: "Unique Products" },
  { value: "6", label: "Craft Categories" },
  { value: "500+", label: "Happy Customers" },
  { value: "10+", label: "Years of Craft" },
];

export function AboutPreview() {
  return (
    <section
      className="section-padding bg-white"
      aria-labelledby="about-heading"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — text content */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-brand-gold" aria-hidden="true" />
              <span className="text-brand-gold text-xs font-semibold tracking-[0.2em] uppercase">
                Our Story
              </span>
            </div>

            <h2
              id="about-heading"
              className="font-serif font-bold text-brand-brown leading-tight mb-5"
              style={{ fontSize: "clamp(1.625rem, 3.5vw, 2.5rem)" }}
            >
              Preserving the Art of{" "}
              <span className="text-brand-maroon">Newari Craftsmanship</span>
            </h2>

            <div
              className="space-y-4 text-muted-foreground leading-relaxed mb-8"
              style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
            >
              <p>
                Nestled in the heart of Thapahiti, Lalitpur — a city renowned
                for centuries as the center of Nepali craftsmanship — Balkumari
                Handicraft was born from a deep respect for traditional Newari
                artistry.
              </p>
              <p>
                Every piece in our collection is handcrafted by skilled local
                artisans using time-honored techniques passed down through
                generations. From intricate copper Buddha statues to
                hand-painted thangka paintings, each item tells a story of
                cultural heritage and artistic mastery.
              </p>
              <p>
                We believe authentic handicrafts deserve to reach the world.
                That is why we ship our pieces globally, directly from our
                workshop in Lalitpur.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="rounded-full px-7 h-10 border-brand-maroon
                text-brand-maroon hover:bg-brand-maroon hover:text-white
                font-semibold gap-2 text-sm transition-all duration-200"
            >
              <Link href="/about">
                Read Our Story
                <ArrowRight size={15} />
              </Link>
            </Button>
          </div>

          {/* Right — stats grid */}
          <div className="relative">
            {/* Decorative background */}
            <div
              className="absolute -inset-4 rounded-2xl bg-brand-cream"
              aria-hidden="true"
            />

            <div className="relative grid grid-cols-2 gap-4">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-white rounded-xl p-6 text-center
                    border border-brand-gold/15 hover:border-brand-gold/40
                    hover:shadow-md transition-all duration-200"
                >
                  <p
                    className="font-serif font-bold text-brand-maroon leading-none mb-2"
                    style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
                  >
                    {value}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Decorative gold corner accent */}
            <div
              className="absolute -bottom-2 -right-2 w-12 h-12
                rounded-full bg-brand-gold/20 border border-brand-gold/30"
              aria-hidden="true"
            />
            <div
              className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-brand-maroon/10"
              aria-hidden="true"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
