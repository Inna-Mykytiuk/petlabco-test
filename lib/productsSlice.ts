import { Product, ProductFilters, ProductsState } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchProducts } from "./api";

// Initial state
const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  filters: {
    search: "",
    priceMin: null,
    priceMax: null,
    subscription: "all",
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12,
  },
  loading: false,
  error: null,
};

// Async thunk for fetching products
export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchProducts();
    return response;
  },
);

// Helper function to calculate pagination
function calculatePagination(
  totalItems: number,
  itemsPerPage: number,
  currentPage: number,
) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));

  return {
    currentPage: validCurrentPage,
    totalPages: totalPages || 1,
    totalItems,
    itemsPerPage,
  };
}

// Helper function to apply filters
function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  return products.filter((product) => {
    // Search filter (tags)
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesTags = product.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm),
      );
      if (!matchesTags) return false;
    }

    // Price filter
    if (filters.priceMin !== null && product.price < filters.priceMin)
      return false;
    if (filters.priceMax !== null && product.price > filters.priceMax)
      return false;

    // Subscription filter
    if (filters.subscription !== "all") {
      const hasSubscription = product.subscription;
      if (filters.subscription === "yes" && !hasSubscription) return false;
      if (filters.subscription === "no" && hasSubscription) return false;
    }

    return true;
  });
}

// Селектор для отримання продуктів поточної сторінки
export const selectPaginatedProducts = (state: { products: ProductsState }) => {
  const { filteredProducts, pagination } = state.products;
  const { currentPage, itemsPerPage } = pagination;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return filteredProducts.slice(startIndex, endIndex);
};

// Products slice
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };

      // Apply filters
      const filtered = applyFilters(state.products, state.filters);
      state.filteredProducts = filtered;

      // Update pagination - reset to first page when filters change
      state.pagination = calculatePagination(
        filtered.length,
        state.pagination.itemsPerPage,
        1,
      );
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      const newPage = action.payload;
      const totalPages =
        Math.ceil(
          state.filteredProducts.length / state.pagination.itemsPerPage,
        ) || 1;

      if (newPage >= 1 && newPage <= totalPages) {
        state.pagination.currentPage = newPage;
      }
    },

    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.itemsPerPage = action.payload;

      // Перераховуємо пагінацію
      state.pagination = calculatePagination(
        state.filteredProducts.length,
        action.payload,
        state.pagination.currentPage,
      );
    },

    clearFilters: (state) => {
      state.filters = {
        search: "",
        priceMin: null,
        priceMax: null,
        subscription: "all",
      };

      const filtered = applyFilters(state.products, state.filters);
      state.filteredProducts = filtered;

      state.pagination = calculatePagination(
        filtered.length,
        state.pagination.itemsPerPage,
        1,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;

        // Apply current filters to new data
        const filtered = applyFilters(action.payload, state.filters);
        state.filteredProducts = filtered;

        // Update pagination
        state.pagination = calculatePagination(
          filtered.length,
          state.pagination.itemsPerPage,
          state.pagination.currentPage,
        );
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

// Export actions
export const { setFilters, setCurrentPage, setItemsPerPage, clearFilters } =
  productsSlice.actions;

// Export selectors
export const selectProducts = (state: { products: ProductsState }) =>
  state.products.products;
export const selectFilteredProducts = (state: { products: ProductsState }) =>
  state.products.filteredProducts;
export const selectFilters = (state: { products: ProductsState }) =>
  state.products.filters;
export const selectPagination = (state: { products: ProductsState }) =>
  state.products.pagination;
export const selectLoading = (state: { products: ProductsState }) =>
  state.products.loading;
export const selectError = (state: { products: ProductsState }) =>
  state.products.error;

export default productsSlice.reducer;
