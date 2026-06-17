import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

export function LocationCTA() {
  return (
    <section
      className="section-padding bg-white"
      aria-labelledby="location-heading"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — contact details */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-brand-gold" aria-hidden="true" />
              <span className="text-brand-gold text-xs font-semibold tracking-[0.2em] uppercase">
                Find Us
              </span>
            </div>

            <h2
              id="location-heading"
              className="font-serif font-bold text-brand-brown leading-tight mb-4"
              style={{ fontSize: "clamp(1.625rem, 3.5vw, 2.5rem)" }}
            >
              Visit Our{" "}
              <span className="text-brand-maroon">Workshop</span>
              {" "}in Lalitpur
            </h2>

            <p
              className="text-muted-foreground leading-relaxed mb-8"
              style={{
                fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                maxWidth: "440px",
              }}
            >
              Come and see our craftsmen at work. Browse our full collection in
              person, or reach out before you visit — we are always happy to
              assist.
            </p>

            {/* Contact details */}
            <address className="not-italic space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-cream flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-brand-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-brown mb-0.5">
                    Address
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {SITE_CONFIG.address.street},{" "}
                    {SITE_CONFIG.address.city}{" "}
                    {SITE_CONFIG.address.postalCode},{" "}
                    {SITE_CONFIG.address.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-cream flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-brand-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-brown mb-0.5">
                    Opening Hours
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {SITE_CONFIG.hours.display}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-0.5">
                    {SITE_CONFIG.hours.note}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-cream flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-brand-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-brown mb-0.5">
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

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20handicrafts`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5
                bg-brand-gold hover:bg-brand-gold-dark text-white
                rounded-full px-7 py-3 text-sm font-semibold
                transition-colors duration-200 shadow-lg
                shadow-brand-gold/20"
              aria-label="Contact Balkumari Handicraft on WhatsApp"
            >
              <MessageCircle size={17} />
              Chat with Us on WhatsApp
            </a>
          </div>

          {/* Right — Google Maps embed */}
          <div
            className="rounded-2xl overflow-hidden border
              border-brand-gold/20 shadow-lg h-[380px] lg:h-[440px]
              bg-brand-cream"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.2!2d85.3188!3d27.6644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDM5JzUxLjgiTiA4NcKwMTknMDcuNyJF!5e0!3m2!1sen!2snp!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Balkumari Handicraft location — Thapahiti, Lalitpur, Nepal"
              aria-label="Google Maps showing Balkumari Handicraft location in Lalitpur, Nepal"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
