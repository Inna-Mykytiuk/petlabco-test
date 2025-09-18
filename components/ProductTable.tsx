"use client";

import { useAppSelector } from "@/lib/hooks";
import { selectPaginatedProducts } from "@/lib/productsSlice";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import ProductCard from "./ProductCard";

const FALLBACK_IMAGE = "/images/generated-image.png";

export default function ProductTable() {
  const currentProducts = useAppSelector(selectPaginatedProducts);
  const router = useRouter();
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  const handleImageError = (productId: number) => {
    setFailedImages((prev) => new Set(prev).add(productId));
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden overflow-x-auto rounded-xl shadow-lg lg:block">
        <table className="table w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="w-20">Image</th>
              <th>Product</th>
              <th>Tags</th>
              <th>Price</th>
              <th>Subscription</th>
              <th>Vendor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentProducts.map((product: Product) => (
              <tr
                key={product.id}
                className="cursor-pointer transition-colors hover:bg-gray-50"
                onClick={() => handleProductClick(product.id)}
              >
                <td>
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-gray-200">
                    {product.image_src && !failedImages.has(product.id) ? (
                      <Image
                        src={product.image_src}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                        onError={() => handleImageError(product.id)}
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
                </td>
                <td>
                  <div>
                    <div className="hover:text-primary-600 font-medium text-[#111827] transition-colors">
                      {product.title}
                    </div>
                    <div className="text-sm text-[#6b7280]">
                      {product.option_value}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex flex-wrap gap-1">
                    {product.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-primary-100 text-primary-800 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="font-medium text-[#111827]">
                    {formatPrice(product.price)}
                  </div>
                </td>
                <td>
                  <span
                    className={`${
                      product.subscription
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-[#1f2937]"
                    } inline-flex items-center rounded-full px-2 py-1 text-xs font-medium`}
                  >
                    {product.subscription ? "Available" : "Not Available"}
                  </span>
                </td>
                <td className="font-medium text-[#111827]">{product.vendor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="flex flex-col gap-4 space-y-4 lg:hidden">
        {currentProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
