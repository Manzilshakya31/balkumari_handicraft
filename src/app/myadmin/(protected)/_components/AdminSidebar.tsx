"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

const NAV = [
  { href: "/myadmin", label: "Dashboard" },
  { href: "/myadmin/products", label: "Products" },
  { href: "/myadmin/blogs", label: "Blogs" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/myadmin/login");
  }

  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col min-h-screen flex-shrink-0">
      <div className="p-6 border-b border-gray-200">
        <span className="text-base font-bold text-gray-800">Balkumari Admin</span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === item.href
                ? "bg-amber-50 text-amber-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 text-sm font-medium text-red-600
            hover:bg-red-50 rounded-md transition-colors text-left"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
