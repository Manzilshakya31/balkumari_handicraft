import {
  Hammer,
  Award,
  Globe,
  MessageCircle,
  Leaf,
  Heart,
} from "lucide-react";

const REASONS = [
  {
    icon: Hammer,
    title: "100% Handcrafted",
    description:
      "Every piece is individually handmade by skilled Newari artisans using traditional techniques. No mass production, ever.",
  },
  {
    icon: Award,
    title: "Certified Authentic",
    description:
      "Sourced directly from our workshop in Thapahiti, Lalitpur — the cultural heart of Nepali craftsmanship.",
  },
  {
    icon: Globe,
    title: "Worldwide Shipping",
    description:
      "We ship authentic Nepali handicrafts globally. Careful packaging ensures your piece arrives in perfect condition.",
  },
  {
    icon: MessageCircle,
    title: "Direct Communication",
    description:
      "Talk directly to us on WhatsApp. Get answers, request custom sizes, or ask about specific pieces instantly.",
  },
  {
    icon: Leaf,
    title: "Ethically Made",
    description:
      "We support local artisan communities in Lalitpur, ensuring fair compensation and sustainable craft practices.",
  },
  {
    icon: Heart,
    title: "Made with Purpose",
    description:
      "Each item carries spiritual significance and cultural meaning — not just decoration, but a piece of Nepali heritage.",
  },
];

export function WhyChooseUs() {
  return (
    <section
      className="section-padding bg-brand-brown"
      aria-labelledby="why-heading"
    >
      <div className="container-custom">
        {/* Section heading — light version for dark bg */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div
            className="flex items-center justify-center gap-3 mb-3"
            aria-hidden="true"
          >
            <div className="h-px w-8 bg-brand-gold" />
            <span className="text-brand-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Why Balkumari
            </span>
            <div className="h-px w-8 bg-brand-gold" />
          </div>
          <h2
            id="why-heading"
            className="font-serif font-bold text-white leading-tight mb-3"
            style={{ fontSize: "clamp(1.625rem, 3.5vw, 2.5rem)" }}
          >
            Crafted with Heritage,{" "}
            <span className="text-brand-gold">Delivered with Care</span>
          </h2>
          <p
            className="text-white/55 leading-relaxed"
            style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
          >
            What makes Balkumari Handicraft different from every other online
            handicraft store.
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group bg-white/5 hover:bg-white/10
                border border-white/10 hover:border-brand-gold/30
                rounded-xl p-6 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-lg bg-brand-gold/10
                  border border-brand-gold/20 flex items-center
                  justify-center mb-4 group-hover:bg-brand-gold/20
                  transition-colors duration-200"
              >
                <Icon size={20} className="text-brand-gold" />
              </div>

              {/* Title */}
              <h3 className="font-serif font-semibold text-white mb-2 text-base">
                {title}
              </h3>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
