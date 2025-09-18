"use client";

import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card p-4">
      <div className="flex space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-gray-200">
            {product.image_src ? (
              <Image
                src={product.image_src}
                alt={product.title}
                fill
                className="object-cover"
                sizes="80px"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            ) : null}

            {/* Заглушка, якщо картинка відсутня або помилка */}
            {!product.image_src && (
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="min-w-0 flex-1">
          <div className="mb-2">
            <h3 className="truncate text-lg font-medium text-[#111827]">
              {product.title}
            </h3>
            <p className="text-sm text-gray-500">{product.option_value}</p>
          </div>

          {/* Tags */}
          <div className="mb-2 flex flex-wrap gap-1">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="bg-primary-100 text-primary-800 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
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
  );
}
