import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function AdminDashboard() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );

  const [{ count: productCount }, { count: blogCount }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("blogs").select("*", { count: "exact", head: true }),
  ]);

  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">
        Welcome back, Admin
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Here&apos;s an overview of your site
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Total Products
          </p>
          <p className="text-4xl font-bold text-gray-800">
            {productCount ?? 0}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Total Blogs
          </p>
          <p className="text-4xl font-bold text-gray-800">{blogCount ?? 0}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Last Updated
          </p>
          <p className="text-lg font-semibold text-gray-800">{lastUpdated}</p>
        </div>
      </div>
    </div>
  );
}
