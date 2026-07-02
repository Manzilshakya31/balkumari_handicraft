import { SITE_CONFIG } from "@/data/site-config";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Store"],
    name: SITE_CONFIG.businessName,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.domain,
    telephone: SITE_CONFIG.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.region,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.coordinates.lat,
      longitude: SITE_CONFIG.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "NPR, USD",
    paymentAccepted: "Cash, Bank Transfer",
    image: `${SITE_CONFIG.domain}${SITE_CONFIG.seo.ogImage}`,
    logo: `${SITE_CONFIG.domain}${SITE_CONFIG.seo.logo}`,
    hasMap: `https://maps.google.com/?q=${encodeURIComponent(
      `${SITE_CONFIG.businessName}, ${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city}, Nepal`
    )}`,
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.instagram,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
