import LoadingSpinner from "./LoadingSpinner";

export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1">
          <div className="space-y-4">
            <div className="h-6 animate-pulse rounded bg-gray-200"></div>
            <div className="h-10 animate-pulse rounded bg-gray-200"></div>
            <div className="h-6 animate-pulse rounded bg-gray-200"></div>
            <div className="h-10 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1">
          <div className="flex h-64 items-center justify-center">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    </div>
  );
}
