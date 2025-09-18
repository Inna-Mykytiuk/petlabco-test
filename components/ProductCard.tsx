"use client";

import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FALLBACK_IMAGE = "/images/generated-image.png";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="card cursor-pointer p-4 transition-shadow hover:shadow-lg">
        <div className="flex space-x-4">
          {/* Product Image */}
          <div className="flex flex-shrink-0 items-center justify-center">
            <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-gray-200">
              {product.image_src && !imageError ? (
                <Image
                  src={product.image_src}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                  onError={handleImageError}
                />
              ) : (
                <Image
                  src={FALLBACK_IMAGE}
                  alt={`${product.title} placeholder`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center"
                />
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="min-w-0 flex-1">
            <div className="mb-2">
              <h3 className="hover:text-primary-600 truncate text-lg font-medium text-[#111827] transition-colors">
                {product.title}
              </h3>
              <p className="text-sm text-gray-500">{product.option_value}</p>
            </div>

            {/* Tags */}
            <div className="mb-2 flex flex-wrap gap-1">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-primary-800 inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Price and Details */}
            <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
              <div className="text-lg font-bold text-[#111827]">
                {formatPrice(product.price)}
              </div>
              <div className="flex w-full items-center justify-between space-x-2 text-sm md:justify-end">
                <span
                  className={`${
                    product.subscription
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  } inline-flex items-center rounded-full px-2 py-1 text-xs font-medium`}
                >
                  {product.subscription ? "Subscription" : "One-time"}
                </span>
                <span className="text-gray-600">{product.vendor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
