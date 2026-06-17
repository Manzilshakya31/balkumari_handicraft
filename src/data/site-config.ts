export const SITE_CONFIG = {
  businessName: "Balkumari Handicraft",
  legalName: "Balkumari Handicraft",
  tagline: "Authentic Handcrafted Nepali Handicrafts from Lalitpur",
  description:
    "Discover authentic handmade Buddha statues, metal crafts, singing " +
    "bowls, and traditional Nepali handicrafts. Crafted by skilled artisans " +
    "in Lalitpur, Nepal. Direct from workshop to your home.",
  domain: "https://www.balkumarihandicraft.com.np",
  address: {
    street: "Thapahiti",
    city: "Lalitpur",
    region: "Bagmati Province",
    postalCode: "44700",
    country: "Nepal",
    countryCode: "NP",
  },
  coordinates: {
    lat: 27.6693428,
    lng: 85.326306,
  },
  googleMapsUrl: "https://maps.app.goo.gl/ZrdXsfPsLSRF3AFn7",
  phone: "+977-9818706474",
  phoneDisplay: "+977 9818706474",
  whatsapp: "9779818706474",
  email: "",
  hours: {
    display: "Sunday – Friday, 9:00 AM – 6:00 PM",
    note: "Closed on Saturdays",
    schema: "Su-Fr 09:00-18:00",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61584424653114",
    instagram: "",
    youtube: "",
    whatsapp: "9779818706474",
  },
  seo: {
    defaultTitle:
      "Balkumari Handicraft | Authentic Nepali Crafts — Lalitpur, Nepal",
    titleTemplate: "%s | Balkumari Handicraft",
    defaultDescription:
      "Handmade Buddha statues, metal crafts, singing bowls and " +
      "traditional Nepali handicrafts from Lalitpur. Shop authentic crafts " +
      "directly from our workshop in Nepal.",
    keywords: [
      "Nepali handicrafts",
      "Buddha statue Nepal",
      "handmade crafts Lalitpur",
      "authentic Nepali crafts",
      "metal crafts Nepal",
      "singing bowls Nepal",
      "buy handicrafts Nepal",
      "Hindu deity statues Nepal",
      "thangka painting Nepal",
      "Newari crafts Lalitpur",
      "Balkumari Handicraft",
    ],
    ogImage: "/og-image.jpg",
  },
  categories: [
    {
      slug: "buddha-statues",
      label: "Buddha Statues",
      description:
        "Handcrafted copper and bronze Buddha statues from Lalitpur, Nepal",
      icon: "🙏",
    },
    {
      slug: "hindu-deities",
      label: "Hindu Deities",
      description:
        "Traditional Hindu deity statues handmade by Newari artisans",
      icon: "✨",
    },
    {
      slug: "metal-crafts",
      label: "Metal Crafts",
      description:
        "Authentic Nepali metal crafts and decorative items",
      icon: "🔱",
    },
    {
      slug: "singing-bowls",
      label: "Singing Bowls",
      description:
        "Handmade Himalayan singing bowls for meditation and healing",
      icon: "🎵",
    },
    {
      slug: "ritual-items",
      label: "Ritual Items",
      description:
        "Traditional Nepali ritual items and ceremonial objects",
      icon: "🪔",
    },
    {
      slug: "thangka",
      label: "Thangka Paintings",
      description:
        "Hand-painted traditional Tibetan and Nepali thangka paintings",
      icon: "🎨",
    },
  ],
} as const;
