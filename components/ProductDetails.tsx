"use client";

import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FALLBACK_IMAGE = "/images/generated-image.png";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [imageError, setImageError] = useState(false);

  const subscriptionPrice = product.subscription_discount
    ? product.price *
      (1 - parseFloat(product.subscription_discount.toString()) / 100)
    : product.price;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      {/* "Back" button */}
      <div className="mb-6">
        <Link
          href="/products"
          className="text-primary-600 hover:text-primary-800 inline-flex items-center space-x-2 transition-colors"
        >
          <span>Back to catalog</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Product image */}
        <div className="flex justify-center">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg bg-gray-200 shadow-xl">
            {product.image_src && !imageError ? (
              <Image
                src={product.image_src}
                alt={product.title}
                fill
                className="object-cover"
                priority
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

        {/* Product information */}
        <div className="space-y-6 rounded-lg bg-white p-6">
          {/* Title and vendor */}
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {product.title}
            </h1>
            <p className="text-lg text-gray-600">by {product.vendor}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="text-primary-800 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Product option */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Option:</h3>
            <p className="inline-block rounded-lg bg-gray-50 px-4 py-2 text-gray-700">
              {product.option_value}
            </p>
          </div>

          {/* Price */}
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.subscription && product.subscription_discount && (
                  <span className="text-sm text-gray-500 line-through">
                    Regular price
                  </span>
                )}
              </div>

              {/* Subscription and discount */}
              {product.subscription && product.subscription_discount && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">
                      {formatPrice(subscriptionPrice)}
                    </span>
                    <span className="rounded bg-green-100 px-2 py-1 text-sm font-medium text-green-800">
                      -{product.subscription_discount}% with subscription
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    You save: {formatPrice(product.price - subscriptionPrice)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Subscription status */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Subscription availability:
            </h3>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                product.subscription
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {product.subscription ? "Available" : "Unavailable"}
            </span>
          </div>

          {/* SKU */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">SKU:</h3>
            <p className="inline-block rounded bg-gray-50 px-2 py-1 font-mono text-sm text-gray-700">
              {product.sku}
            </p>
          </div>

          {/* Link to original */}
          {product.url && (
            <div className="pt-4">
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-800 inline-flex items-center space-x-2 transition-colors"
              >
                <span>View on official website</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-2M7 17l3-3 3 3M14 6l3 3-3 3"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
