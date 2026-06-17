"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Phone, MessageCircle } from "lucide-react";
import { NAV_ITEMS } from "@/lib/navigation";
import { SITE_CONFIG } from "@/data/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const solidHeader = isScrolled || !isHomePage;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        solidHeader
          ? "bg-white/97 backdrop-blur-sm shadow-sm border-b border-brand-gold/15"
          : "bg-transparent"
      )}
    >
      {/* Top bar */}
      <div
        className={cn(
          "py-1.5 hidden md:block transition-all duration-300",
          solidHeader
            ? "bg-brand-maroon"
            : "bg-black/30 backdrop-blur-sm"
        )}
      >
        <div className="container-custom flex justify-between items-center text-sm">
          <span className="text-brand-gold-light text-xs">
            {SITE_CONFIG.hours.display} · {SITE_CONFIG.hours.note}
          </span>
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="flex items-center gap-1.5 text-white/80
              hover:text-white transition-colors text-xs"
            aria-label="Call Balkumari Handicraft"
          >
            <Phone size={11} />
            {SITE_CONFIG.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className="container-custom flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center flex-shrink-0"
          aria-label="Balkumari Handicraft — Home"
        >
          <Image
            src="/logo.png"
            alt="Balkumari Handicraft Logo"
            width={140}
            height={48}
            priority
            className={cn(
              "h-10 w-auto object-contain transition-all duration-300",
              !solidHeader ? "brightness-0 invert" : ""
            )}
          />
        </Link>

        {/* Desktop nav links — no dropdown */}
        <ul
          className="hidden md:flex items-center gap-1"
          role="menubar"
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                role="menuitem"
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium",
                  "transition-colors duration-200",
                  isActive(item.href)
                    ? solidHeader
                      ? "text-brand-maroon font-semibold"
                      : "text-brand-gold font-semibold"
                    : solidHeader
                      ? "text-foreground hover:text-brand-maroon"
                      : "text-white/90 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA — WhatsApp */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            asChild
            className="bg-brand-gold hover:bg-brand-gold-dark text-white
              rounded-full px-5 h-9 text-sm font-medium gap-2"
          >
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hello%2C%20I%20am%20interested%20in%20your%20handicrafts`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Balkumari Handicraft on WhatsApp"
            >
              <MessageCircle size={14} />
              WhatsApp Us
            </a>
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "md:hidden",
                !solidHeader ? "text-white hover:bg-white/10" : ""
              )}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-white p-0">
            {/* Mobile header */}
            <div className="flex items-center p-4 border-b
              border-brand-gold/20 bg-brand-cream">
              <Image
                src="/logo.png"
                alt="Balkumari Handicraft"
                width={120}
                height={40}
                className="h-9 w-auto object-contain"
              />
            </div>

            {/* Mobile nav links */}
            <nav className="p-4 space-y-1" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2.5 rounded-md text-base font-medium",
                    "transition-colors",
                    isActive(item.href)
                      ? "bg-brand-cream text-brand-maroon font-semibold"
                      : "text-foreground hover:bg-brand-cream hover:text-brand-maroon"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile bottom CTA */}
            <div className="absolute bottom-0 left-0 right-0 p-4
              border-t border-brand-gold/20 bg-brand-cream space-y-3">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hello%2C%20I%20am%20interested%20in%20your%20handicrafts`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 justify-center w-full
                  bg-brand-gold hover:bg-brand-gold-dark text-white
                  rounded-full px-4 py-2.5 text-sm font-medium
                  transition-colors"
              >
                <MessageCircle size={15} />
                WhatsApp Us
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-2 justify-center
                  text-sm text-muted-foreground hover:text-brand-maroon
                  transition-colors"
              >
                <Phone size={14} />
                {SITE_CONFIG.phoneDisplay}
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
