import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { Hero } from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { AboutPreview } from "@/components/home/AboutPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { LocationCTA } from "@/components/home/LocationCTA";

export const revalidate = 0;

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <Hero />
      <FeaturedProducts />
      <AboutPreview />
      <WhyChooseUs />
      <Testimonials />
      <LocationCTA />
    </>
  );
}
