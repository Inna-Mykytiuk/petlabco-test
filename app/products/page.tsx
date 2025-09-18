"use client";

import FiltersSidebar from "@/components/FiltersSidebar";
import Pagination from "@/components/Pagination";
import ProductTable from "@/components/ProductTable";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchProductsAsync,
  setCurrentPage,
  setItemsPerPage,
} from "@/lib/productsSlice";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { filteredProducts, pagination, loading, error } = useAppSelector(
    (state) => state.products,
  );
  const searchParams = useSearchParams();

  useEffect(() => {
    const pageParam = searchParams.get("_page");
    const limitParam = searchParams.get("_limit");

    if (pageParam) {
      const page = parseInt(pageParam, 10);
      if (!isNaN(page) && page >= 1) {
        dispatch(setCurrentPage(page));
      }
    }

    if (limitParam) {
      const limit = parseInt(limitParam, 10);
      if (!isNaN(limit) && limit > 0) {
        dispatch(setItemsPerPage(limit));
      }
    }

    dispatch(fetchProductsAsync());
  }, [dispatch, searchParams]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="mb-4 text-xl text-red-600">
            Error loading products
          </div>
          <p className="mb-4 text-[#4b5563]">{error}</p>
          <button
            onClick={() => dispatch(fetchProductsAsync())}
            className="btn btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const startResult =
    pagination.totalItems > 0
      ? (pagination.currentPage - 1) * pagination.itemsPerPage + 1
      : 0;
  const endResult = Math.min(
    pagination.currentPage * pagination.itemsPerPage,
    pagination.totalItems,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-[#111827]">
          Product Catalog
        </h1>
        <p className="text-[#4b5563]">
          Discover our complete collection of premium pet products
        </p>
      </div>

      <div className="flex flex-col gap-8 xl:flex-row">
        {/* Filters Sidebar */}
        <div className="max-w-full xl:max-w-[350px]">
          <FiltersSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {/* Results Header */}
              <div className="mb-6 flex items-center justify-between">
                <div className="text-sm text-[#4b5563]">
                  {pagination.totalItems > 0 ? (
                    <>
                      Showing {startResult}-{endResult} of{" "}
                      {pagination.totalItems} results
                    </>
                  ) : (
                    "No results found"
                  )}
                </div>
              </div>

              {/* Products Table/Grid */}
              {filteredProducts.length > 0 ? (
                <>
                  <ProductTable />
                  <Pagination />
                </>
              ) : (
                <div className="py-12 text-center">
                  <div className="mb-4 text-6xl text-[#9ca3af]">🔍</div>
                  <h3 className="mb-2 text-xl font-semibold text-[#111827]">
                    No products found
                  </h3>
                  <p className="text-[#4b5563]">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
