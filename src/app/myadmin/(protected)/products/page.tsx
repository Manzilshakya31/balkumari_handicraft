"use client";

import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { createClient } from "@/lib/supabase";

// ── Types ──────────────────────────────────────────────────────

type ProductImage = {
  id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
};

type Product = {
  id: string;
  sku: string | null;
  name: string;
  category: string | null;
  price: number | null;
  bargain_price: number | null;
  material: string | null;
  dimensions: string | null;
  origin: string | null;
  stock: number;
  status: string;
  is_available: boolean;
  description: string | null;
  created_at: string;
  product_images: ProductImage[];
};

type FormState = {
  name: string;
  category: string;
  price: string;
  bargain_price: string;
  material: string;
  dimensions: string;
  origin: string;
  stock: string;
  description: string;
  is_available: boolean;
  status: string;
};

// ── Constants ──────────────────────────────────────────────────

const EMPTY_FORM: FormState = {
  name: "",
  category: "",
  price: "",
  bargain_price: "",
  material: "",
  dimensions: "",
  origin: "Nepal",
  stock: "0",
  description: "",
  is_available: true,
  status: "active",
};

const CATEGORIES = [
  "Buddha Statues",
  "Hindu Deity Statues",
  "Metal Crafts",
  "Singing Bowls",
  "Ritual Items",
  "Thangka Paintings",
  "Other",
];

// ── Helpers ────────────────────────────────────────────────────

function formatPrice(price: number | null): string {
  if (price == null) return "—";
  return `NPR ${price.toLocaleString()}`;
}

function sortedImages(images: ProductImage[]): ProductImage[] {
  return [...images].sort((a, b) => a.sort_order - b.sort_order);
}

// ── Page ───────────────────────────────────────────────────────

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Images
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [newImageUrls, setNewImageUrls] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState("");

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const supabase = createClient();

  // ── Data fetching ────────────────────────────────────────────

  async function fetchProducts() {
    setLoading(true);
    const { data } = await supabase
      .from("products")
      .select("*, product_images(id, url, alt_text, sort_order)")
      .order("created_at", { ascending: false });
    setProducts((data ?? []) as Product[]);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Modal helpers ────────────────────────────────────────────

  function openAdd() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setExistingImages([]);
    setNewImageUrls([]);
    setUrlInput("");
    setSaveError("");
    setShowModal(true);
  }

  function openEdit(p: Product) {
    setEditing(p);
    setForm({
      name: p.name ?? "",
      category: p.category ?? "",
      price: p.price != null ? String(p.price) : "",
      bargain_price: p.bargain_price != null ? String(p.bargain_price) : "",
      material: p.material ?? "",
      dimensions: p.dimensions ?? "",
      origin: p.origin ?? "Nepal",
      stock: p.stock != null ? String(p.stock) : "0",
      description: p.description ?? "",
      is_available: p.is_available ?? true,
      status: p.status ?? "active",
    });
    setExistingImages(sortedImages(p.product_images ?? []));
    setNewImageUrls([]);
    setUrlInput("");
    setSaveError("");
    setShowModal(true);
  }

  function closeModal() {
    setNewImageUrls([]);
    setUrlInput("");
    setShowModal(false);
    setEditing(null);
    setSaveError("");
  }

  // ── Image URL management ─────────────────────────────────────

  function addImageUrl() {
    const url = urlInput.trim();
    if (!url) return;
    setNewImageUrls((prev) => [...prev, url]);
    setUrlInput("");
  }

  function removeNewUrl(index: number) {
    setNewImageUrls((prev) => prev.filter((_, i) => i !== index));
  }

  async function deleteExistingImage(img: ProductImage) {
    const { error } = await supabase
      .from("product_images")
      .delete()
      .eq("id", img.id);
    if (error) {
      setSaveError(error.message);
      return;
    }
    setExistingImages((prev) => prev.filter((i) => i.id !== img.id));
  }

  // ── Insert new image rows ─────────────────────────────────────

  async function insertNewImages(productId: string, productName: string) {
    const baseOrder = existingImages.length;
    for (let i = 0; i < newImageUrls.length; i++) {
      const { error } = await supabase.from("product_images").insert({
        product_id: productId,
        url: newImageUrls[i],
        alt_text: productName,
        sort_order: baseOrder + i,
      });
      if (error) throw new Error(error.message);
    }
  }

  // ── Save ─────────────────────────────────────────────────────

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError("");

    const payload = {
      name: form.name.trim(),
      category: form.category || null,
      price: form.price !== "" ? Number(form.price) : null,
      bargain_price: form.bargain_price !== "" ? Number(form.bargain_price) : null,
      material: form.material.trim() || null,
      dimensions: form.dimensions.trim() || null,
      origin: form.origin.trim() || "Nepal",
      stock: form.stock !== "" ? parseInt(form.stock, 10) : 0,
      description: form.description.trim() || null,
      is_available: form.is_available,
      status: form.status,
    };

    try {
      if (editing) {
        const { error } = await supabase
          .from("products")
          .update(payload)
          .eq("id", editing.id);
        if (error) throw new Error(error.message);
        await insertNewImages(editing.id, form.name.trim());
      } else {
        // Do NOT include sku — DB trigger generates it automatically
        const { data, error } = await supabase
          .from("products")
          .insert(payload)
          .select("id")
          .single();
        if (error) throw new Error(error.message);
        await insertNewImages(data.id, form.name.trim());
      }
      closeModal();
      fetchProducts();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred";
      setSaveError(msg);
    } finally {
      setSaving(false);
    }
  }

  // ── Delete ───────────────────────────────────────────────────

  function promptDelete(p: Product) {
    setDeleteTarget(p);
    setDeleteError("");
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError("");
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", deleteTarget.id);
      if (error) throw new Error(error.message);
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err: unknown) {
      setDeleteError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  // ── Render ───────────────────────────────────────────────────

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products Management</h1>
        <button
          onClick={openAdd}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white
            text-sm font-semibold rounded-md transition-colors"
        >
          + Add New Product
        </button>
      </div>

      {/* Product table */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 mb-4">No products yet.</p>
          <button
            onClick={openAdd}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white
              text-sm font-semibold rounded-md transition-colors"
          >
            Add your first product
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {["SKU", "Image", "Name", "Category", "Price (NPR)", "Bargain Price", "Available", "Status", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-semibold text-gray-600 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p) => {
                  const thumb = sortedImages(p.product_images ?? [])[0] ?? null;
                  return (
                    <tr
                      key={p.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                    >
                      {/* SKU */}
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                          {p.sku ?? "—"}
                        </span>
                      </td>

                      {/* Thumbnail */}
                      <td className="px-4 py-3">
                        {thumb ? (
                          <div className="w-12 h-12 rounded overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={thumb.url}
                              alt={thumb.alt_text ?? p.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded bg-gray-100 border border-gray-200 flex items-center justify-center">
                            <span className="text-gray-300 text-lg">—</span>
                          </div>
                        )}
                      </td>

                      {/* Name */}
                      <td className="px-4 py-3 font-medium text-gray-800 max-w-[160px]">
                        <span className="line-clamp-2">{p.name}</span>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{p.category ?? "—"}</td>

                      {/* Public Price */}
                      <td className="px-4 py-3 text-gray-800 whitespace-nowrap">
                        {formatPrice(p.price)}
                      </td>

                      {/* Bargain Price */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Lock size={11} className="flex-shrink-0 text-gray-400" />
                          <span className="text-xs">{formatPrice(p.bargain_price)}</span>
                        </div>
                      </td>

                      {/* Availability */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              p.is_available ? "bg-green-500" : "bg-red-400"
                            }`}
                          />
                          <span
                            className={`text-xs font-medium ${
                              p.is_available ? "text-green-700" : "text-red-600"
                            }`}
                          >
                            {p.is_available ? "Available" : "Unavailable"}
                          </span>
                        </div>
                      </td>

                      {/* Status badge */}
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            p.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {p.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEdit(p)}
                            className="px-3 py-1 text-xs font-medium text-amber-700
                              border border-amber-200 rounded hover:bg-amber-50 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => promptDelete(p)}
                            className="px-3 py-1 text-xs font-medium text-red-600
                              border border-red-200 rounded hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Add / Edit modal ────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 px-4 py-8 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl my-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {editing ? "Edit Product" : "Add New Product"}
                </h2>
                {editing && editing.sku && (
                  <p className="text-xs font-mono text-gray-400 mt-0.5">
                    SKU: {editing.sku}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">

              {/* 1. Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="e.g. Bajrasatwo Statue 18 Inch"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm
                    focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>

              {/* 2. Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm
                    focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                >
                  <option value="">— Select category —</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Public Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Public Price (shown on website)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 select-none">
                    NPR
                  </span>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    min="0"
                    step="1"
                    placeholder="0"
                    className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md text-sm
                      focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                </div>
              </div>

              {/* 4. Bargain Price */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1">
                  <Lock size={13} className="text-gray-400" />
                  Bargain Price (admin only, never shown publicly)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 select-none">
                    NPR
                  </span>
                  <input
                    type="number"
                    value={form.bargain_price}
                    onChange={(e) => setForm({ ...form, bargain_price: e.target.value })}
                    min="0"
                    step="1"
                    placeholder="0"
                    className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md text-sm
                      focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Use this as your minimum acceptable price during negotiation
                </p>
              </div>

              {/* 5. Material */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Material
                </label>
                <input
                  type="text"
                  value={form.material}
                  onChange={(e) => setForm({ ...form, material: e.target.value })}
                  placeholder="e.g. Copper with gold plating"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm
                    focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>

              {/* 6. Dimensions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dimensions
                </label>
                <input
                  type="text"
                  value={form.dimensions}
                  onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                  placeholder="e.g. 10cm x 5cm x 5cm"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm
                    focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>

              {/* 7. Origin + 8. Stock */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Origin
                  </label>
                  <input
                    type="text"
                    value={form.origin}
                    onChange={(e) => setForm({ ...form, origin: e.target.value })}
                    placeholder="Nepal"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm
                      focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    min="0"
                    step="1"
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm
                      focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                </div>
              </div>

              {/* 9. Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  placeholder="Describe the product…"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm
                    focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
                />
              </div>

              {/* 10. Availability toggle */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                <button
                  type="button"
                  role="switch"
                  aria-checked={form.is_available}
                  onClick={() => setForm({ ...form, is_available: !form.is_available })}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 mt-0.5 rounded-full
                    transition-colors duration-200 focus:outline-none focus:ring-2
                    focus:ring-amber-400 focus:ring-offset-1 ${
                      form.is_available ? "bg-green-500" : "bg-gray-300"
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow
                      transition-transform duration-200 mt-0.5 ${
                        form.is_available ? "translate-x-4" : "translate-x-0.5"
                      }`}
                  />
                </button>
                <div>
                  <p className="text-sm font-medium text-gray-700">Currently Available</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {form.is_available
                      ? 'Customers see "Available — Inquire for pricing"'
                      : 'Customers see "Currently Unavailable"'}
                  </p>
                </div>
              </div>

              {/* 11. Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm
                    focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  Inactive products are hidden from the public shop entirely
                </p>
              </div>

              {/* 12. Images */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Images</p>

                {/* Existing images (edit mode) */}
                {existingImages.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-400 mb-2">Current images — click × to remove</p>
                    <div className="flex flex-wrap gap-2">
                      {existingImages.map((img) => (
                        <div
                          key={img.id}
                          className="relative w-20 h-20 rounded-lg overflow-hidden
                            border border-gray-200 bg-gray-50 group flex-shrink-0"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.url}
                            alt={img.alt_text ?? "product image"}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => deleteExistingImage(img)}
                            className="absolute inset-0 bg-black/50 flex items-center
                              justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Delete image"
                          >
                            <span className="text-white text-xl font-bold leading-none">×</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New image URL thumbnails */}
                {newImageUrls.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-400 mb-2">
                      New images to add ({newImageUrls.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {newImageUrls.map((url, idx) => (
                        <div
                          key={idx}
                          className="relative w-20 h-20 rounded-lg overflow-hidden
                            border-2 border-amber-300 bg-amber-50 group flex-shrink-0"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={url}
                            alt={`New image ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeNewUrl(idx)}
                            className="absolute inset-0 bg-black/50 flex items-center
                              justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove image"
                          >
                            <span className="text-white text-xl font-bold leading-none">×</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* URL input + Add button */}
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImageUrl())}
                    placeholder="https://res.cloudinary.com/..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm
                      focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addImageUrl}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700
                      text-sm font-medium rounded-md transition-colors whitespace-nowrap"
                  >
                    + Add
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Paste an image URL and click + Add. Repeat for multiple images.
                </p>
              </div>

              {/* Error */}
              {saveError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                  {saveError}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2 border border-gray-300 rounded-md text-sm
                    font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white
                    text-sm font-semibold rounded-md transition-colors disabled:opacity-60"
                >
                  {saving
                    ? editing ? "Saving…" : "Adding…"
                    : editing ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete confirmation modal ──────────────────────── */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-base font-bold text-gray-800 mb-2">Delete Product</h2>
            <p className="text-sm text-gray-600 mb-1">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">{deleteTarget.name}</span>?
            </p>
            <p className="text-sm text-red-500 mb-5">This cannot be undone.</p>

            {deleteError && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 mb-4">
                {deleteError}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setDeleteTarget(null); setDeleteError(""); }}
                disabled={deleting}
                className="flex-1 py-2 border border-gray-300 rounded-md text-sm
                  font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white
                  text-sm font-semibold rounded-md transition-colors disabled:opacity-60"
              >
                {deleting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
