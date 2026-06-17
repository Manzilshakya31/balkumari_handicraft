import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-brand-cream flex items-center justify-center"
    >
      <div className="text-center px-4">
        <p
          className="font-serif font-bold text-brand-gold leading-none mb-4"
          style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
          aria-hidden="true"
        >
          404
        </p>
        <h1
          className="font-serif font-bold text-brand-brown mb-3"
          style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }}
        >
          Page Not Found
        </h1>
        <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            asChild
            className="rounded-full bg-brand-maroon hover:bg-brand-maroon-dark
              text-white px-6"
          >
            <Link href="/">Go Home</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-brand-gold text-brand-gold-dark
              hover:bg-brand-gold hover:text-white px-6"
          >
            <Link href="/shop">Browse Shop</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
