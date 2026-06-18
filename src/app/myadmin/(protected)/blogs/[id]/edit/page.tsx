"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  content: string;
  status: string;
};

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState<FormState | null>(null);
  const [originalSlug, setOriginalSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data, error: fetchError } = await supabase
        .from("blogs")
        .select("id, title, slug, excerpt, cover_image, content, status")
        .eq("id", id)
        .single();

      if (fetchError || !data) {
        setLoadError(true);
        return;
      }

      const slug = data.slug ?? "";
      setOriginalSlug(slug);
      setSlugManual(true); // Loaded from DB — don't auto-follow title changes
      setForm({
        title: data.title ?? "",
        slug,
        excerpt: data.excerpt ?? "",
        cover_image: data.cover_image ?? "",
        content: data.content ?? "",
        status: data.status ?? "draft",
      });
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function handleTitleChange(value: string) {
    setForm((f) =>
      f ? { ...f, title: value, slug: slugManual ? f.slug : generateSlug(value) } : f
    );
  }

  function handleSlugChange(value: string) {
    setSlugManual(true);
    setForm((f) => (f ? { ...f, slug: value } : f));
  }

  async function handleSave() {
    if (!form) return;
    setError(null);

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!form.slug.trim()) {
      setError("Slug is required.");
      return;
    }

    setSaving(true);

    // Check slug uniqueness only if slug changed
    if (form.slug.trim() !== originalSlug) {
      const { data: existing } = await supabase
        .from("blogs")
        .select("id")
        .eq("slug", form.slug.trim())
        .maybeSingle();

      if (existing) {
        setError(
          "This slug is already used by another blog post. Please change it."
        );
        setSaving(false);
        return;
      }
    }

    const { error: updateError } = await supabase
      .from("blogs")
      .update({
        title: form.title.trim(),
        slug: form.slug.trim(),
        excerpt: form.excerpt.trim() || null,
        cover_image: form.cover_image.trim() || null,
        content: form.content,
        status: form.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    router.push("/myadmin/blogs");
  }

  if (loadError) {
    return (
      <div className="max-w-3xl">
        <button
          onClick={() => router.push("/myadmin/blogs")}
          className="text-sm text-gray-500 hover:text-gray-800 mb-4 block transition-colors"
        >
          ← Back to Blogs
        </button>
        <p className="text-red-600 text-sm">Blog post not found.</p>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="max-w-3xl">
        <p className="text-sm text-gray-500">Loading…</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/myadmin/blogs")}
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            ← Back to Blogs
          </button>
          <span className="text-gray-300">/</span>
          <h1 className="text-xl font-bold text-gray-800">Edit Blog Post</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white
            text-sm font-semibold rounded-md transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-5">
        {/* Title + slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Blog post title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm
              focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <div className="mt-1.5 flex items-center gap-1 flex-wrap">
            <span className="text-xs text-gray-400">URL:</span>
            <span className="text-xs text-gray-500">
              balkumarihandicraft.com.np/blog/
            </span>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="slug"
              className="text-xs text-amber-700 border-b border-dashed border-amber-300
                bg-transparent focus:outline-none focus:border-amber-500 min-w-[80px] flex-1"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Excerpt
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={2}
            placeholder="Short summary shown in blog listing..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm
              focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
          />
        </div>

        {/* Cover image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cover Image URL
          </label>
          <input
            type="text"
            value={form.cover_image}
            onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
            placeholder="https://res.cloudinary.com/..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm
              focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {form.cover_image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={form.cover_image}
              alt="Cover preview"
              className="mt-2 h-36 w-full object-cover rounded-lg border border-gray-200"
            />
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={15}
            placeholder="Write your blog post here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm
              focus:outline-none focus:ring-2 focus:ring-amber-400 resize-y"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm
              focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <p className="mt-1 text-xs text-gray-400">
            Draft blogs are not visible on the website.
          </p>
        </div>
      </div>
    </div>
  );
}
