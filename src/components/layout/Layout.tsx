import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 pt-16 md:pt-[104px]">
        {children}
      </div>
      <Footer />
    </div>
  );
}
