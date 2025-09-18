// Product interface
export interface Product {
  id: number;
  slug: string;
  title: string;
  vendor: string;
  tags: string[];
  published: boolean;
  url: string;
  image_src: string;
  option_value: string;
  sku: string;
  price: number;
  subscription_discount: number | string;
  subscription: boolean;
}

// Filter interfaces
export interface ProductFilters {
  search: string;
  priceMin: number | null;
  priceMax: number | null;
  subscription: "all" | "yes" | "no";
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// Redux state interfaces
export interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  filters: ProductFilters;
  pagination: PaginationInfo;
  loading: boolean;
  error: string | null;
}

// API response interface
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
