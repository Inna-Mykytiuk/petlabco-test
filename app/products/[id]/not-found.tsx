import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-4 text-6xl">🐾</div>
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Product not found
        </h2>
        <p className="mb-8 text-gray-600">
          A product with this ID does not exist or has been removed from the
          catalog.
        </p>
        <Link
          href="/products"
          className="bg-primary-600 hover:bg-primary-700 inline-flex items-center space-x-2 rounded-lg px-6 py-3 text-white transition-colors"
        >
          <span>Return to catalog</span>
        </Link>
      </div>
    </div>
  );
}
