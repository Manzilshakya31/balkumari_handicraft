import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Testimonial } from "@/types";

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Mitchell",
    location: "United States",
    rating: 5,
    review:
      "I purchased a copper Buddha statue as a gift and it exceeded all expectations. The craftsmanship is extraordinary — you can feel the care and skill in every detail. Arrived perfectly packaged.",
    date: "2024-11-15",
    productPurchased: "Shakyamuni Buddha Statue",
  },
  {
    id: "t2",
    name: "David Thornton",
    location: "United Kingdom",
    rating: 5,
    review:
      "Absolutely stunning singing bowl. The sound quality is incredible and the craftsmanship is beautiful. Communication with the shop was excellent — they answered all my questions on WhatsApp promptly.",
    date: "2024-12-02",
    productPurchased: "Himalayan Singing Bowl",
  },
  {
    id: "t3",
    name: "Yuki Tanaka",
    location: "Japan",
    rating: 5,
    review:
      "I have been collecting Nepali handicrafts for years. Balkumari Handicraft is genuinely one of the best sources I have found. The pieces are authentic, beautifully made, and fairly priced.",
    date: "2025-01-08",
    productPurchased: "White Tara Statue",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      aria-label={`${rating} out of 5 stars`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? "fill-brand-gold text-brand-gold"
              : "fill-muted text-muted"
          }
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      className="section-padding bg-brand-cream"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-custom">
        <SectionHeading
          eyebrow="Customer Stories"
          title="Loved by Collectors"
          titleHighlight="Worldwide"
          description="Authentic experiences from customers who brought a piece of Nepali heritage into their homes."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="bg-white rounded-xl p-6 border
                border-brand-gold/15 hover:border-brand-gold/30
                hover:shadow-md transition-all duration-200
                flex flex-col"
            >
              {/* Stars */}
              <StarRating rating={testimonial.rating} />

              {/* Review text */}
              <blockquote className="flex-1 mt-4 mb-5">
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  &ldquo;{testimonial.review}&rdquo;
                </p>
              </blockquote>

              {/* Divider */}
              <div className="h-px bg-brand-gold/15 mb-4" aria-hidden="true" />

              {/* Reviewer info */}
              <figcaption>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-brand-brown text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                  {testimonial.productPurchased && (
                    <span
                      className="text-[10px] text-brand-gold-dark
                        bg-brand-cream px-2 py-1 rounded-full
                        font-medium text-right max-w-[120px] leading-tight"
                    >
                      {testimonial.productPurchased}
                    </span>
                  )}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  );
}
