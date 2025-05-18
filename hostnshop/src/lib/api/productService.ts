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
      minPrice?: number;
      maxPrice?: number;
      inStock?: boolean;
      onSale?: boolean;
    } = {}
  ) {
    try {
      // Start building the endpoint with required parameters
      const {
        page = 1,
        limit = 10,
        categoryId,
        search,
        minPrice,
        maxPrice,
        inStock,
        onSale,
      } = params;

      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("limit", limit.toString());

      // Add optional parameters if they exist
      if (categoryId) {
        queryParams.append("categoryId", categoryId);
      }

      if (search) {
        queryParams.append("search", search);
      }

      if (minPrice !== undefined) {
        queryParams.append("minPrice", minPrice.toString());
      }

      if (maxPrice !== undefined) {
        queryParams.append("maxPrice", maxPrice.toString());
      }

      if (inStock !== undefined) {
        queryParams.append("inStock", inStock.toString());
      }

      if (onSale !== undefined) {
        queryParams.append("onSale", onSale.toString());
      }

      const endpoint = `products?${queryParams.toString()}`;

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
    try {
      return await apiClient.get<{data: ReadProductDTO}>(`products/${id}`);
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw new Error("Failed to fetch product details");
    }
  },

  async getCategories() {
    try {
      return await apiClient.get<{data: ReadCategoryDTO[]}>("categories");
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Failed to fetch categories");
    }
  },

  async createProduct(productData: CreateProductDTO) {
    try {
      return await apiClient.post<{
        data: ReadProductDTO;
      }>("products", productData, {
        token: true,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Failed to create product");
    }
  },

  async updateProduct(id: string, productData: UpdateProductDTO) {
    try {
      return await apiClient.put<{data: ReadProductDTO}>(
        `products/${id}`,
        productData
      );
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      throw new Error("Failed to update product");
    }
  },

  async deleteProduct(id: string) {
    try {
      return await apiClient.delete<{success: boolean}>(`products/${id}`);
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw new Error("Failed to delete product");
    }
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
        throw new Error(`File upload failed: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error uploading product image:", error);
      throw new Error("Failed to upload product image");
    }
  },

  async updateInventory(id: string, stockQuantity: number) {
    try {
      return await apiClient.put<{data: ReadProductDTO}>(
        `products/${id}/inventory`,
        {stock_quantity: stockQuantity}
      );
    } catch (error) {
      console.error(`Error updating inventory for product ${id}:`, error);
      throw new Error("Failed to update product inventory");
    }
  },

  async updateDiscount(id: string, discountPercentage: number) {
    try {
      return await apiClient.put<{data: ReadProductDTO}>(
        `products/${id}/discount`,
        {discount_percentage: discountPercentage}
      );
    } catch (error) {
      console.error(`Error updating discount for product ${id}:`, error);
      throw new Error("Failed to update product discount");
    }
  },

  async getLowStockProducts(threshold: number = 5) {
    try {
      return await apiClient.get<{
        data: ReadProductDTO[];
      }>(`products/low-stock?threshold=${threshold}`);
    } catch (error) {
      console.error(`Error fetching low stock products:`, error);
      throw new Error("Failed to fetch low stock products");
    }
  },
};
