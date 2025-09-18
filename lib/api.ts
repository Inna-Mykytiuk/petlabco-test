import { MOCK_PRODUCTS } from "@/data/bd";
import { Product } from "@/lib/types";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchProducts(): Promise<Product[]> {
  await delay(750);

  if (Math.random() < 0.05) {
    throw new Error("Network error: Failed to fetch products");
  }

  return MOCK_PRODUCTS.filter((p) => p.published);
}

export async function getTotalProductsCount(): Promise<number> {
  await delay(100);
  return MOCK_PRODUCTS.filter((p) => p.published).length;
}

export async function getProduct(id: number): Promise<Product | null> {
  await delay(300);

  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  return product || null;
}
