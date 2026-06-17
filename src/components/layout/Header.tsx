"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, Phone, MessageCircle } from "lucide-react";
import { NAV_ITEMS } from "@/lib/navigation";
import { SITE_CONFIG } from "@/data/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === "/";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled || !isHomePage
          ? "bg-white/97 backdrop-blur-sm shadow-sm border-b border-brand-gold/15"
          : "bg-transparent"
      )}
    >
      {/* Top bar — phone and hours */}
      <div
        className={cn(
          "py-1.5 hidden md:block transition-all duration-300",
          isScrolled || !isHomePage
            ? "bg-brand-maroon"
            : "bg-black/30 backdrop-blur-sm"
        )}
      >
        <div className="container-custom flex justify-between items-center text-sm text-white">
          <span className="text-brand-gold-light">
            {SITE_CONFIG.hours.display} · {SITE_CONFIG.hours.note}
          </span>
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="flex items-center gap-1.5 hover:text-brand-gold-light transition-colors"
            aria-label="Call Balkumari Handicraft"
          >
            <Phone size={13} />
            <span>{SITE_CONFIG.phoneDisplay}</span>
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
          className="flex items-center gap-2 flex-shrink-0"
          aria-label="Balkumari Handicraft — Home"
        >
          <Image
            src="/logo.png"
            alt="Balkumari Handicraft Logo"
            width={140}
            height={48}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop navigation */}
        <ul
          className="hidden md:flex items-center gap-1"
          role="menubar"
        >
          {NAV_ITEMS.map((item) => (
            <li
              key={item.href}
              className="relative group"
              role="none"
              onMouseEnter={() =>
                item.children && setOpenDropdown(item.label)
              }
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                role="menuitem"
                className={cn(
                  "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? isScrolled || !isHomePage
                      ? "text-brand-maroon font-semibold"
                      : "text-brand-gold font-semibold"
                    : isScrolled || !isHomePage
                      ? "text-foreground hover:text-brand-maroon"
                      : "text-white/90 hover:text-white"
                )}
                aria-haspopup={item.children ? "true" : undefined}
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    size={14}
                    className={cn(
                      "transition-transform duration-200",
                      openDropdown === item.label && "rotate-180"
                    )}
                  />
                )}
              </Link>

              {/* Dropdown */}
              {item.children && (
                <div
                  className={cn(
                    "absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-lg",
                    "border border-brand-gold/20 overflow-hidden",
                    "transition-all duration-200 origin-top",
                    openDropdown === item.label
                      ? "opacity-100 scale-y-100 pointer-events-auto"
                      : "opacity-0 scale-y-95 pointer-events-none"
                  )}
                  role="menu"
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      role="menuitem"
                      className="block px-4 py-2.5 text-sm text-foreground
                        hover:bg-brand-cream hover:text-brand-maroon
                        transition-colors border-b border-brand-gold/10
                        last:border-0"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            asChild
            className="bg-brand-gold hover:bg-brand-gold-dark text-white
              rounded-full px-5 h-9 text-sm font-medium gap-2"
          >
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp"
            >
              <MessageCircle size={15} />
              WhatsApp Us
            </a>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "md:hidden",
                !isScrolled && isHomePage ? "text-white hover:text-white hover:bg-white/10" : ""
              )}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] bg-white p-0"
          >
            {/* Mobile menu header */}
            <div className="flex items-center justify-between p-4
              border-b border-brand-gold/20 bg-brand-cream">
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
                <div key={item.href}>
                  <Link
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
                  {/* Mobile sub-items */}
                  {item.children && (
                    <div className="pl-4 mt-1 space-y-0.5">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 text-sm text-muted-foreground
                            hover:text-brand-maroon transition-colors rounded-md
                            hover:bg-brand-cream"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile contact info */}
            <div className="absolute bottom-0 left-0 right-0 p-4
              border-t border-brand-gold/20 bg-brand-cream space-y-3">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full bg-brand-gold
                  hover:bg-brand-gold-dark text-white rounded-full px-4 py-2.5
                  text-sm font-medium transition-colors justify-center"
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
