"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

type ProductImage = {
  url: string;
  sort_order: number;
};

type Product = {
  id: string;
  sku: string;
  name: string;
  category: string | null;
  price: number | null;
  material: string | null;
  dimensions: string | null;
  is_available: boolean;
  status: string;
  product_images: ProductImage[];
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("products")
        .select(
          "id, sku, name, category, price, material, dimensions, is_available, status, product_images(url, sort_order)",
        )
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(4);

      if (data) {
        setProducts(data as unknown as Product[]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return null;
  if (products.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm tracking-widest text-amber-700 mb-2">
            HANDPICKED FOR YOU
          </p>
          <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600">
            Our most popular handcrafted pieces, loved by collectors and
            enthusiasts worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const sortedImages = [...(product.product_images || [])].sort(
              (a, b) => a.sort_order - b.sort_order,
            );
            const imageUrl = sortedImages[0]?.url;

            return (
              <Link
                key={product.id}
                href={`/shop/${product.sku}`}
                className="block border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-gray-100">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  {product.category && (
                    <span className="inline-block text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full mb-2">
                      {product.category}
                    </span>
                  )}
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  {(product.material || product.dimensions) && (
                    <p className="text-sm text-gray-500 mb-3">
                      {[product.material, product.dimensions]
                        .filter(Boolean)
                        .join(" Â· ")}
                    </p>
                  )}
                  <span className="block text-center border rounded-md py-2 text-sm font-medium">
                    Inquire on WhatsApp
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-block border border-amber-700 text-amber-800 px-6 py-3 rounded-full font-medium hover:bg-amber-50"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
