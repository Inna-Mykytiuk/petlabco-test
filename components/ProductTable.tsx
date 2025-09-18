"use client";

import { useAppSelector } from "@/lib/hooks";
import { selectPaginatedProducts } from "@/lib/productsSlice";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";

import ProductCard from "./ProductCard";

export default function ProductTable() {
  const currentProducts = useAppSelector(selectPaginatedProducts);
  const { loading } = useAppSelector((state) => state.products);

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="table w-full">
          <thead className="bg-[#f9fafb]">
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
                className="transition-colors hover:bg-[#f9fafb]"
              >
                <td>
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-gray-200">
                    {product.image_src ? (
                      <Image
                        src={product.image_src}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                    ) : (
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
                </td>
                <td>
                  <div>
                    <div className="font-medium text-[#111827]">
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
      <div className="space-y-4 lg:hidden">
        {currentProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export function Skeleton({ rows = 12 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-10 w-full animate-pulse rounded-md bg-gray-200"
        />
      ))}
    </div>
  );
}
