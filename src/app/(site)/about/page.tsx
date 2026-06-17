import type { Metadata } from "next";
import Link from "next/link";
import { Hammer, MapPin, Heart, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/data/site-config";

export const metadata: Metadata = {
  title: "About Us — Our Story & Craftsmanship",
  description:
    "Learn about Balkumari Handicraft — a family workshop in Thapahiti, Lalitpur, Nepal dedicated to preserving traditional Newari craftsmanship. Handcrafted Buddha statues and Nepali handicrafts since our founding.",
  keywords: [
    "about Balkumari Handicraft",
    "Nepali handicraft workshop Lalitpur",
    "Newari artisan Nepal",
    "traditional Nepali craftsmanship",
    "handicraft shop Thapahiti",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.domain}/about`,
  },
};

const VALUES = [
  {
    icon: Hammer,
    title: "Traditional Craftsmanship",
    description:
      "Every piece is made using techniques passed down through Newari artisan families for generations. We never compromise craft for speed.",
  },
  {
    icon: Heart,
    title: "Made with Purpose",
    description:
      "Our handicrafts carry spiritual and cultural significance. We believe every buyer deserves to understand the story behind what they purchase.",
  },
  {
    icon: MapPin,
    title: "Rooted in Lalitpur",
    description:
      "We are proud to operate from Thapahiti, Lalitpur — one of Nepal's oldest centers of traditional metalcraft and artisanship.",
  },
  {
    icon: Globe,
    title: "Reaching the World",
    description:
      "Authentic Nepali handicrafts deserve a global audience. We ship carefully packaged pieces worldwide so everyone can own a piece of Nepal.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-cream">

      {/* Page header */}
      <div className="bg-brand-brown">
        <div className="container-custom py-12 md:py-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-brand-gold" aria-hidden="true" />
            <span className="text-brand-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Our Story
            </span>
          </div>
          <h1
            className="font-serif font-bold text-white leading-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            About{" "}
            <span className="text-brand-gold">Balkumari Handicraft</span>
          </h1>
          <p
            className="text-white/55 mt-3 max-w-xl"
            style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
          >
            A workshop rooted in Lalitpur, dedicated to preserving the living
            tradition of Newari craftsmanship.
          </p>
        </div>
      </div>

      {/* Story section */}
      <div className="container-custom py-14 md:py-20">
        <div className="max-w-3xl mx-auto">

          {/* Main story */}
          <div className="mb-16">
            <p
              className="font-serif text-brand-brown leading-relaxed mb-6"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)" }}
            >
              Founded by Gyani Raj Shakya in 1999, Balkumari
              Handicraft has spent more than 25 years bringing
              authentic Newari craftsmanship from the workshops
              of Lalitpur to homes across the world.
            </p>

            <div
              className="space-y-4 text-muted-foreground leading-relaxed"
              style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
            >
              <p>
                Balkumari Handicraft was founded by Gyani Raj Shakya
                more than 25 years ago in the heart of Thapahiti,
                Lalitpur — a neighbourhood that has been the beating
                centre of Nepali metalcraft and artisanship for over
                a thousand years.
              </p>
              <p>
                Gyani Raj did not begin his journey as a shopkeeper.
                He began it as a craftsman. In the workshops of
                Lalitpur, he sat beside master artisans and learned
                every step of the statue-making process — from the
                preparation of raw copper and bronze, to the ancient
                lost-wax casting method, to the final hand-finishing
                and gold plating that gives each piece its sacred
                beauty. This was not education from books. It was
                knowledge earned through years of patient, dedicated
                practice.
              </p>
              <p>
                As his mastery grew, Gyani Raj began taking Nepali
                handicrafts beyond the borders of Nepal. He
                participated in international exhibitions in China,
                Bhutan, and multiple other countries — presenting
                authentic Newari craftsmanship on the world stage.
                These exhibitions opened eyes to what genuine Nepali
                artistry looked like: not mass-produced souvenirs,
                but deeply meaningful objects of cultural and
                spiritual significance, made by human hands using
                techniques unchanged for centuries.
              </p>
              <p>
                Inspired by the global response, Gyani Raj built
                Balkumari Handicraft into a worldwide operation.
                Today, handcrafted Buddha statues, Hindu deity
                figures, singing bowls, metal crafts, ritual items,
                and thangka paintings from his workshop are delivered
                to collectors, temples, meditation centres, and
                homes across every continent.
              </p>
              <p>
                More than 500 customers across the world have trusted
                Gyani Raj Shakya with bringing a piece of Nepal into
                their lives. Each one receives not just an object,
                but a story — the story of a man who dedicated his
                life to ensuring that the living tradition of Newari
                craftsmanship would never be forgotten, and would
                always find its way to those who truly value it.
              </p>
            </div>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white rounded-xl p-6 border
                  border-brand-gold/15 hover:border-brand-gold/30
                  hover:shadow-md transition-all duration-200"
              >
                <div
                  className="w-11 h-11 rounded-lg bg-brand-cream
                    border border-brand-gold/20 flex items-center
                    justify-center mb-4"
                >
                  <Icon size={20} className="text-brand-gold" />
                </div>
                <h3 className="font-serif font-semibold text-brand-brown mb-2 text-base">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>

          {/* Location callout */}
          <div className="bg-brand-brown rounded-2xl p-8 text-center">
            <MapPin
              size={32}
              className="text-brand-gold mx-auto mb-3"
              aria-hidden="true"
            />
            <h2
              className="font-serif font-bold text-white mb-2"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
            >
              Visit Us in Lalitpur
            </h2>
            <p className="text-white/55 text-sm mb-5 max-w-sm mx-auto">
              {SITE_CONFIG.address.street},{" "}
              {SITE_CONFIG.address.city},{" "}
              {SITE_CONFIG.address.country}
              <br />
              {SITE_CONFIG.hours.display}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                className="rounded-full bg-brand-gold hover:bg-brand-gold-dark
                  text-white px-6 font-semibold text-sm"
              >
                <Link href="/contact">
                  Get Directions
                  <ArrowRight size={14} className="ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/20 text-white
                  hover:bg-white/10 px-6 font-semibold text-sm"
              >
                <Link href="/shop">Browse Collection</Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
