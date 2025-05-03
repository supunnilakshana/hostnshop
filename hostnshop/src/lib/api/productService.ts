// src/lib/api/productService.ts
import {apiClient} from "./client";
import {ReadCategoryDTO, ReadProductDTO} from "@/shared/dtos";

export const productService = {
  async getProducts(
    params: {
      page?: number;
      limit?: number;
      categoryId?: string;
      search?: string;
    } = {}
  ) {
    const {page = 1, limit = 10, categoryId, search} = params;

    let endpoint = `products?page=${page}&limit=${limit}`;

    if (categoryId) {
      endpoint += `&categoryId=${categoryId}`;
    }

    if (search) {
      endpoint += `&search=${encodeURIComponent(search)}`;
    }

    return apiClient.get<{
      data: {
        products: ReadProductDTO[];
        total: number;
        page: number;
        totalPages: number;
      };
    }>(endpoint);
  },

  async getProductById(id: string) {
    return apiClient.get<{data: ReadProductDTO}>(`products/${id}`);
  },

  async getCategories() {
    return apiClient.get<{data: ReadCategoryDTO[]}>("categories");
  },
};
