"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

type Blog = {
  id: string;
  title: string;
  slug: string | null;
  excerpt: string | null;
  cover_image: string | null;
  status: string;
  created_at: string;
};

function formatDate(str: string) {
  if (!str) return "—";
  return new Date(str).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchBlogs() {
      const { data } = await supabase
        .from("blogs")
        .select("id, title, slug, excerpt, cover_image, status, created_at")
        .order("created_at", { ascending: false });
      setBlogs(data ?? []);
      setLoading(false);
    }
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function confirmDelete(id: string) {
    await supabase.from("blogs").delete().eq("id", id);
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    setDeletingId(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Blogs</h1>
        <button
          onClick={() => router.push("/myadmin/blogs/new")}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white
            text-sm font-semibold rounded-md transition-colors"
        >
          + Add New Blog
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : blogs.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-sm">No blogs yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-600 w-16">
                  Cover
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                  Title
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 hidden md:table-cell">
                  Excerpt
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 hidden sm:table-cell">
                  Date
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  {/* Cover */}
                  <td className="px-4 py-3">
                    {b.cover_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={b.cover_image}
                        alt={b.title}
                        className="w-12 h-10 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-10 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs">—</span>
                      </div>
                    )}
                  </td>

                  {/* Title + slug */}
                  <td className="px-4 py-3 text-gray-800 font-medium max-w-[200px]">
                    <span className="line-clamp-2">{b.title}</span>
                    {b.slug && (
                      <span className="block text-xs text-gray-400 font-normal mt-0.5">
                        /{b.slug}
                      </span>
                    )}
                  </td>

                  {/* Excerpt */}
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell max-w-[240px]">
                    <span className="line-clamp-2">{b.excerpt ?? "—"}</span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        b.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell whitespace-nowrap">
                    {formatDate(b.created_at)}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    {deletingId === b.id ? (
                      <div className="space-y-1.5">
                        <p className="text-xs text-red-600 font-medium leading-tight">
                          Delete this blog post?
                          <br />
                          This cannot be undone.
                        </p>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => confirmDelete(b.id)}
                            className="px-2 py-1 text-xs font-semibold text-white
                              bg-red-600 hover:bg-red-700 rounded transition-colors"
                          >
                            Yes, delete
                          </button>
                          <button
                            onClick={() => setDeletingId(null)}
                            className="px-2 py-1 text-xs font-medium text-gray-600
                              border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            router.push(`/myadmin/blogs/${b.id}/edit`)
                          }
                          className="px-3 py-1 text-xs font-medium text-amber-700
                            border border-amber-200 rounded hover:bg-amber-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeletingId(b.id)}
                          className="px-3 py-1 text-xs font-medium text-red-600
                            border border-red-200 rounded hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
