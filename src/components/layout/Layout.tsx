import { MessageCircle } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SITE_CONFIG } from "@/data/site-config";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 pt-16 md:pt-[104px]">
        {children}
      </div>
      <Footer />

      {/* Floating WhatsApp button */}
      <a
        href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hello%2C%20I%20am%20interested%20in%20your%20handicrafts`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 sm:flex
          text-white rounded-full shadow-lg shadow-black/25
          transition-all duration-200 hover:scale-105
          px-4 py-3 text-sm font-semibold"
        style={{ backgroundColor: "#25D366" }}
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
