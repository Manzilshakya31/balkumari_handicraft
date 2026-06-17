import { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  shop: [
    { label: "Buddha Statues", href: "/shop?category=buddha-statues" },
    { label: "Hindu Deities", href: "/shop?category=hindu-deities" },
    { label: "Metal Crafts", href: "/shop?category=metal-crafts" },
    { label: "Singing Bowls", href: "/shop?category=singing-bowls" },
    { label: "Ritual Items", href: "/shop?category=ritual-items" },
    { label: "Thangka Paintings", href: "/shop?category=thangka" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};
