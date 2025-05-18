import {apiClient} from "./client";
import {
  CreateCategoryDTO,
  ReadCategoryDTO,
  UpdateCategoryDTO,
} from "@/shared/dtos";

export const categoryService = {
  async getCategories(params: {search?: string} = {}) {
    try {
      let endpoint = "categories";

      if (params.search) {
        endpoint += `?search=${encodeURIComponent(params.search)}`;
      }

      return await apiClient.get<{
        data: ReadCategoryDTO[];
      }>(endpoint);
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Failed to fetch categories");
    }
  },

  async getCategoryById(id: string) {
    return apiClient.get<{data: ReadCategoryDTO}>(`categories/${id}`);
  },

  async createCategory(categoryData: CreateCategoryDTO) {
    return apiClient.post<{
      data: ReadCategoryDTO;
    }>("categories", categoryData, {
      token: true,
    });
  },

  async updateCategory(id: string, categoryData: UpdateCategoryDTO) {
    return apiClient.put<{data: ReadCategoryDTO}>(
      `categories/${id}`,
      categoryData,
      {
        token: true,
      }
    );
  },

  async deleteCategory(id: string) {
    return apiClient.delete<{success: boolean}>(`categories/${id}`);
  },
};
