export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  date: string;
  productPurchased?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
