"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        className="relative w-full rounded-2xl overflow-hidden
          bg-brand-cream border border-brand-gold/15"
        style={{ aspectRatio: "1/1" }}
      >
        <Image
          src={images[activeIndex]}
          alt={`${productName} — handcrafted Nepali handicraft from Balkumari Handicraft, Lalitpur Nepal`}
          fill
          className="object-contain p-4"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails — only show if more than 1 image */}
      {images.length > 1 && (
        <div
          className="flex gap-2 flex-wrap"
          role="tablist"
          aria-label="Product images"
        >
          {images.map((image, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`View image ${index + 1} of ${images.length}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative w-16 h-16 rounded-lg overflow-hidden",
                "border-2 transition-all duration-200",
                "bg-brand-cream flex-shrink-0",
                index === activeIndex
                  ? "border-brand-gold"
                  : "border-transparent hover:border-brand-gold/40"
              )}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-contain p-1"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
