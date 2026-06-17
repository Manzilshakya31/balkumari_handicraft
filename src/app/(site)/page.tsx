import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { AboutPreview } from "@/components/home/AboutPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { LocationCTA } from "@/components/home/LocationCTA";
import { getFeaturedProducts } from "@/data/products";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(8);

  return (
    <>
      <LocalBusinessSchema />
      <Hero />
      <CategoryGrid />
      <FeaturedProducts products={featuredProducts} />
      <AboutPreview />
      <WhyChooseUs />
      <Testimonials />
      <LocationCTA />
    </>
  );
}
