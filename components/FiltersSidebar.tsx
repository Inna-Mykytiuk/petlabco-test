"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clearFilters, setFilters } from "@/lib/productsSlice";
import { useState } from "react";
import { useEffect } from "react";

import Button from "./ui/Button";
import Input from "./ui/Input";
import Select from "./ui/Select";

export default function FiltersSidebar() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.products);

  const [localSearch, setLocalSearch] = useState(filters.search);
  const [priceMin, setPriceMin] = useState(filters.priceMin?.toString() || "");
  const [priceMax, setPriceMax] = useState(filters.priceMax?.toString() || "");

  // Debounce search input
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      dispatch(setFilters({ search: debouncedSearch }));
    }
  }, [debouncedSearch, dispatch, filters.search]);

  const handlePriceChange = (type: "min" | "max", value: string) => {
    if (type === "min") {
      setPriceMin(value);
      const numValue = value ? parseFloat(value) : null;
      if (!isNaN(numValue as number) || value === "") {
        dispatch(setFilters({ priceMin: numValue }));
      }
    } else {
      setPriceMax(value);
      const numValue = value ? parseFloat(value) : null;
      if (!isNaN(numValue as number) || value === "") {
        dispatch(setFilters({ priceMax: numValue }));
      }
    }
  };

  const handleSubscriptionChange = (value: string) => {
    dispatch(
      setFilters({
        subscription: value as "all" | "yes" | "no",
      }),
    );
  };

  const handleClearFilters = () => {
    setLocalSearch("");
    setPriceMin("");
    setPriceMax("");
    dispatch(clearFilters());
  };

  return (
    <div className="sticky top-24 h-fit rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#111827]">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="text-[#2563eb] hover:text-[#1d4ed8]"
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        {/* Search Filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Search by Tags
          </label>
          <Input
            type="text"
            placeholder="e.g. Dog, Cat, Chews..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full"
          />
          <p className="text-[#f9fafb]0 mt-1 text-xs">
            Search will automatically update as you type
          </p>
        </div>

        {/* Price Filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceMin}
              onChange={(e) => handlePriceChange("min", e.target.value)}
              min="0"
              step="0.01"
            />
            <Input
              type="number"
              placeholder="Max"
              value={priceMax}
              onChange={(e) => handlePriceChange("max", e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {/* Subscription Filter */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Subscription Available
          </label>
          <Select
            value={filters.subscription}
            onValueChange={handleSubscriptionChange}
            options={[
              { value: "all", label: "All Products" },
              { value: "yes", label: "Subscription Available" },
              { value: "no", label: "One-time Purchase Only" },
            ]}
          />
        </div>

        {/* Filter Summary */}
        <div className="border-t border-gray-200 pt-4">
          <div className="text-sm text-[#4b5563]">
            <div className="mb-2 font-medium">Active Filters:</div>
            <ul className="space-y-1 text-xs">
              {filters.search && (
                <li>• Search: &quot;{filters.search}&quot;</li>
              )}
              {(filters.priceMin || filters.priceMax) && (
                <li>
                  • Price: {filters.priceMin || "0"} - {filters.priceMax || "∞"}
                </li>
              )}
              {filters.subscription !== "all" && (
                <li>
                  • Subscription:{" "}
                  {filters.subscription === "yes"
                    ? "Available"
                    : "Not Available"}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
