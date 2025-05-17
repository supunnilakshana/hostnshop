// src/lib/api/productService.ts
import {apiClient} from "./client";
import {
  CreateProductDTO,
  ReadCategoryDTO,
  ReadProductDTO,
  UpdateProductDTO,
} from "@/shared/dtos";

export const productService = {
  async getProducts(
    params: {
      page?: number;
      limit?: number;
      categoryId?: string;
      search?: string;
    } = {}
  ) {
    try {
      const {page = 1, limit = 10, categoryId, search} = params;

      let endpoint = `products?page=${page}&limit=${limit}`;

      if (categoryId) {
        endpoint += `&categoryId=${categoryId}`;
      }

      if (search) {
        endpoint += `&search=${encodeURIComponent(search)}`;
      }

      return await apiClient.get<{
        data: {
          products: ReadProductDTO[];
          total: number;
          page: number;
          totalPages: number;
        };
      }>(endpoint);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to fetch products");
    }
  },

  async getProductById(id: string) {
    return apiClient.get<{data: ReadProductDTO}>(`products/${id}`);
  },

  async getCategories() {
    return apiClient.get<{data: ReadCategoryDTO[]}>("categories");
  },

  async uploadProductImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("entityType", "product");

    try {
      const response = await fetch("/api/storage/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error uploading product image:", error);
      throw new Error("Failed to upload product image");
    }
  },

  async createProduct(productData: CreateProductDTO) {
    return apiClient.post<{
      data: ReadProductDTO;
    }>("products", productData, {
      token: true,
    });
  },

  async updateProduct(id: string, productData: UpdateProductDTO) {
    return apiClient.put<{data: ReadProductDTO}>(`products/${id}`, productData);
  },

  async deleteProduct(id: string) {
    return apiClient.delete<{success: boolean}>(`products/${id}`);
  },
};
