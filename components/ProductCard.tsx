import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
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
          <div className="relative h-20 w-20 overflow-hidden rounded-lg">
            <Image
              src={product.image_src}
              alt={product.title}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="min-w-0 flex-1">
          <div className="mb-2">
            <h3 className="truncate text-lg font-medium text-[#111827]">
              {product.title}
            </h3>
            <p className="text-[#f9fafb]0 text-sm">{product.option_value}</p>
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
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-[#111827]">
              {formatPrice(product.price)}
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span
                className={`$\{ product.subscription ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-[#1f2937]' } inline-flex items-center rounded-full px-2 py-1 text-xs font-medium`}
              >
                {product.subscription ? "Subscription" : "One-time"}
              </span>
              <span className="text-[#f9fafb]0">{product.vendor}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
