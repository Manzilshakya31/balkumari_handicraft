import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { SITE_CONFIG } from "@/data/site-config";
import { FOOTER_LINKS } from "@/lib/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-brown text-white" role="contentinfo">
      {/* Main footer grid */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Balkumari Handicraft Home">
              <Image
                src="/logo.png"
                alt="Balkumari Handicraft"
                width={140}
                height={48}
                className="h-11 w-auto object-contain mb-4"
              />
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mb-5">
              Authentic handmade Nepali handicrafts crafted by skilled
              Newari artisans in Lalitpur, Nepal. Bringing traditional
              craftsmanship to the world since our founding.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {SITE_CONFIG.social.facebook && (
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Balkumari Handicraft on Facebook"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-gold
                    flex items-center justify-center transition-colors"
                >
                  <FaFacebook size={16} />
                </a>
              )}
              {SITE_CONFIG.social.instagram && (
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Balkumari Handicraft on Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-gold
                    flex items-center justify-center transition-colors"
                >
                  <FaInstagram size={16} />
                </a>
              )}
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Balkumari Handicraft on WhatsApp"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-gold
                  flex items-center justify-center transition-colors"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Column 2 — Shop categories */}
          <div>
            <h3 className="font-serif text-brand-gold font-semibold mb-4
              text-base">
              Our Collection
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-brand-gold
                      transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company links */}
          <div>
            <h3 className="font-serif text-brand-gold font-semibold mb-4
              text-base">
              Company
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-brand-gold
                      transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact info */}
          <div>
            <h3 className="font-serif text-brand-gold font-semibold mb-4
              text-base">
              Visit Us
            </h3>
            <address className="not-italic space-y-3">
              <div className="flex gap-3 text-sm text-white/70">
                <MapPin
                  size={16}
                  className="text-brand-gold flex-shrink-0 mt-0.5"
                />
                <span>
                  {SITE_CONFIG.address.street},{" "}
                  {SITE_CONFIG.address.city}{" "}
                  {SITE_CONFIG.address.postalCode},{" "}
                  {SITE_CONFIG.address.country}
                </span>
              </div>
              <div className="flex gap-3 text-sm text-white/70">
                <Clock
                  size={16}
                  className="text-brand-gold flex-shrink-0 mt-0.5"
                />
                <div>
                  <p>{SITE_CONFIG.hours.display}</p>
                  <p className="text-white/50 text-xs mt-0.5">
                    {SITE_CONFIG.hours.note}
                  </p>
                </div>
              </div>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex gap-3 text-sm text-white/70
                  hover:text-brand-gold transition-colors group"
              >
                <Phone
                  size={16}
                  className="text-brand-gold flex-shrink-0 mt-0.5"
                />
                <span>{SITE_CONFIG.phoneDisplay}</span>
              </a>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col md:flex-row
          justify-between items-center gap-3 text-xs text-white/50">
          <p>
            © {currentYear} {SITE_CONFIG.businessName}. All rights
            reserved.
          </p>
          <p>
            Handcrafted in{" "}
            <span className="text-brand-gold">Lalitpur, Nepal</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
