"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrentPage } from "@/lib/productsSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import Button from "./ui/Button";

export default function Pagination() {
  const dispatch = useAppDispatch();
  const { pagination, filteredProducts } = useAppSelector(
    (state) => state.products,
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentPage, totalPages, totalItems, itemsPerPage } = pagination;

  useEffect(() => {
    const pageParam = searchParams.get("_page");

    if (pageParam) {
      const page = parseInt(pageParam, 10);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        dispatch(setCurrentPage(page));
      }
    }
  }, [searchParams, dispatch, totalPages]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));

    const params = new URLSearchParams(searchParams.toString());
    params.set("_page", page.toString());

    if (itemsPerPage !== 12) {
      params.set("_limit", itemsPerPage.toString());
    } else {
      params.delete("_limit");
    }

    router.push(`/products?${params.toString()}`, { scroll: false });

    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (totalPages <= 1 || filteredProducts.length <= itemsPerPage) {
    return null;
  }

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      // Calculate range around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      // Add ellipsis if there's a gap
      if (start > 2) {
        pages.push("ellipsis-start");
      }

      // Add pages around current page
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      // Add ellipsis if there's a gap
      if (end < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  // Calculate result range
  const startResult = (currentPage - 1) * itemsPerPage + 1;
  const endResult = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mt-8">
      {/* Results Info */}
      <div className="mb-4 text-center text-sm text-[#4b5563]">
        Showing {startResult}-{endResult} of {totalItems} results
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center space-x-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            className="mr-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {pageNumbers.map((page, index) => {
            if (typeof page === "string") {
              return (
                <span key={page} className="px-3 py-2 text-[#4b5563]">
                  ...
                </span>
              );
            }

            const isCurrentPage = page === currentPage;

            return (
              <Button
                key={page}
                variant={isCurrentPage ? "primary" : "ghost"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={`${isCurrentPage ? "bg-[#2563eb] text-white" : "hover:bg-gray-100"} min-w-[40px] cursor-pointer`}
              >
                {page}
              </Button>
            );
          })}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </div>

      {/* Mobile Pagination (Simplified) */}
      <div className="mt-4 flex justify-center space-x-2 sm:hidden">
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="flex items-center rounded bg-gray-100 px-4 py-2">
          <span className="text-sm font-medium">
            {currentPage} of {totalPages}
          </span>
        </div>
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
