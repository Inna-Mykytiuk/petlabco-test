"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export default function Select({
  value,
  onValueChange,
  options,
  placeholder = "Select option...",
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        className="input flex w-full items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? "text-[#111827]" : "text-[#f9fafb]0"}>
          {selectedOption?.label || placeholder}
        </span>
        <svg
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 left-0 z-10 mt-1 rounded-md border border-[#d1d5db] bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className="w-full px-3 py-2 text-left text-sm first:rounded-t-md last:rounded-b-md hover:bg-gray-100"
              onClick={() => {
                onValueChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
