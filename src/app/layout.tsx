import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/data/site-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: SITE_CONFIG.seo.defaultTitle,
    template: SITE_CONFIG.seo.titleTemplate,
  },
  description: SITE_CONFIG.seo.defaultDescription,
  keywords: [...SITE_CONFIG.seo.keywords],
  authors: [{ name: SITE_CONFIG.businessName }],
  creator: SITE_CONFIG.businessName,
  publisher: SITE_CONFIG.businessName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.domain,
    siteName: SITE_CONFIG.businessName,
    title: SITE_CONFIG.seo.defaultTitle,
    description: SITE_CONFIG.seo.defaultDescription,
    images: [
      {
        url: SITE_CONFIG.seo.ogImage,
        width: 1200,
        height: 630,
        alt: "Balkumari Handicraft — Authentic Nepali Crafts from Lalitpur, Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.seo.defaultTitle,
    description: SITE_CONFIG.seo.defaultDescription,
    images: [SITE_CONFIG.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_CONFIG.domain,
  },
  verification: {
    google: "",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon-32x32.png?v=2", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png?v=2",
    shortcut: "/favicon.ico?v=2",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
