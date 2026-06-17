import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Balkumari Handicraft in Lalitpur, Nepal. Visit our workshop at Thapahiti, call us, or send a WhatsApp message. We ship authentic Nepali handicrafts worldwide.",
  keywords: [
    "contact Balkumari Handicraft",
    "Nepali handicraft shop Lalitpur",
    "buy handicrafts Nepal contact",
    "Thapahiti handicraft shop",
  ],
  alternates: {
    canonical: `${SITE_CONFIG.domain}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-cream">

      {/* Page header */}
      <div className="bg-brand-brown">
        <div className="container-custom py-12 md:py-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-brand-gold" aria-hidden="true" />
            <span className="text-brand-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Get in Touch
            </span>
          </div>
          <h1
            className="font-serif font-bold text-white leading-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            Contact{" "}
            <span className="text-brand-gold">Us</span>
          </h1>
          <p
            className="text-white/55 mt-3 max-w-xl"
            style={{ fontSize: "clamp(0.875rem, 1.5vw, 1rem)" }}
          >
            Visit our workshop, call us, or send a message. We respond to all
            inquiries within 24 hours.
          </p>
        </div>
      </div>

      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left — Contact info */}
          <div>
            <h2
              className="font-serif font-bold text-brand-brown mb-6"
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
            >
              Visit Our Workshop
            </h2>

            <address className="not-italic space-y-5 mb-8">
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-lg bg-white border
                    border-brand-gold/20 flex items-center justify-center
                    flex-shrink-0"
                >
                  <MapPin size={18} className="text-brand-gold" />
                </div>
                <div>
                  <p className="font-semibold text-brand-brown text-sm mb-1">
                    Address
                  </p>
                  <a
                    href={SITE_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground leading-relaxed hover:text-brand-maroon transition-colors"
                  >
                    {SITE_CONFIG.address.street},{" "}
                    {SITE_CONFIG.address.city}{" "}
                    {SITE_CONFIG.address.postalCode},{" "}
                    {SITE_CONFIG.address.country}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-lg bg-white border
                    border-brand-gold/20 flex items-center justify-center
                    flex-shrink-0"
                >
                  <Clock size={18} className="text-brand-gold" />
                </div>
                <div>
                  <p className="font-semibold text-brand-brown text-sm mb-1">
                    Opening Hours
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {SITE_CONFIG.hours.display}
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-0.5">
                    {SITE_CONFIG.hours.note}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-lg bg-white border
                    border-brand-gold/20 flex items-center justify-center
                    flex-shrink-0"
                >
                  <Phone size={18} className="text-brand-gold" />
                </div>
                <div>
                  <p className="font-semibold text-brand-brown text-sm mb-1">
                    Phone
                  </p>
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="text-sm text-muted-foreground hover:text-brand-maroon transition-colors"
                  >
                    {SITE_CONFIG.phoneDisplay}
                  </a>
                </div>
              </div>
            </address>

            {/* WhatsApp preferred CTA */}
            <div className="bg-brand-brown rounded-xl p-5 mb-8">
              <p className="font-semibold text-white text-sm mb-1">
                Fastest Response: WhatsApp
              </p>
              <p className="text-white/55 text-xs mb-4 leading-relaxed">
                Send us a message on WhatsApp for the quickest reply. We
                typically respond within a few hours.
              </p>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20handicrafts`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-gold
                  hover:bg-brand-gold-dark text-white rounded-full px-5
                  py-2.5 text-sm font-semibold transition-colors duration-200"
                aria-label="Contact Balkumari Handicraft on WhatsApp"
              >
                <MessageCircle size={15} />
                Open WhatsApp Chat
              </a>
            </div>

            {/* Google Maps embed */}
            <div className="space-y-2">
              <div
                className="rounded-2xl overflow-hidden border
                  border-brand-gold/20 h-[280px] bg-brand-cream"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3532.86!2d85.326306!3d27.6693428!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198cd69d51fb%3A0x5fe7a83de4a9013b!2sBalkumari%20Handicraft!5e0!3m2!1sen!2snp!4v1750000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Balkumari Handicraft location map"
                  aria-label="Google Maps — Balkumari Handicraft, Thapahiti, Lalitpur"
                />
              </div>
              <a
                href={SITE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 text-xs
                  text-muted-foreground hover:text-brand-maroon transition-colors"
              >
                <MapPin size={12} />
                Get Directions on Google Maps
              </a>
            </div>
          </div>

          {/* Right — Contact form */}
          <div>
            <h2
              className="font-serif font-bold text-brand-brown mb-6"
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
            >
              Send Us a Message
            </h2>
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  );
}
