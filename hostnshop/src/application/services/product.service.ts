/* eslint-disable @typescript-eslint/no-unused-vars */
import {HttpStatus} from "@/shared/enums";
import {HttpError} from "@/shared/types";
import {
  CreateProductDTO,
  ReadProductDTO,
  UpdateProductDTO,
} from "@/shared/dtos";
import {NotificationService} from "./notification.service";
import {ProductRepository} from "@/data_access/repositories/product.repository";
import {IProductRepository} from "@/data_access/repositories/iproduct.repository";
import {CategoryRepository} from "@/data_access/repositories/category.repository";
import {ICategoryRepository} from "@/data_access/repositories/icategory.repository";
import {IOrderItemRepository} from "@/data_access/repositories/iorder_item.repository";
import {OrderItemRepository} from "@/data_access/repositories/order_item.repository";

export class ProductService {
  private productRepository: IProductRepository;
  private categoryRepository: ICategoryRepository;
  private orderItemRepository: IOrderItemRepository;
  private notificationService: NotificationService;

  constructor() {
    this.productRepository = new ProductRepository();
    this.categoryRepository = new CategoryRepository();
    this.orderItemRepository = new OrderItemRepository();
    this.notificationService = new NotificationService();
  }

  async createProduct(data: CreateProductDTO): Promise<ReadProductDTO> {
    try {
      // Validate category if provided
      if (data.category_id) {
        const category = await this.categoryRepository.findOne(
          data.category_id
        );

        if (!category) {
          throw new HttpError(
            HttpStatus.BAD_REQUEST,
            "Invalid category ID",
            "INVALID_CATEGORY"
          );
        }
      }

      return await this.productRepository.create(data);
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to create product",
        "PRODUCT_CREATE_ERROR"
      );
    }
  }

  async getProducts(options: {
    categoryId?: string | null;
    page: number;
    limit: number;
    searchQuery?: string | null;
  }): Promise<{
    products: ReadProductDTO[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    try {
      const sanitizedOptions = {
        ...options,
        categoryId: options.categoryId ?? undefined,
        searchQuery: options.searchQuery ?? undefined,
      };
      const result = await this.productRepository.findAll(sanitizedOptions);

      return {
        products: result.products,
        total: result.total,
        page: options.page,
        totalPages: Math.ceil(result.total / options.limit),
      };
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch products",
        "PRODUCTS_FETCH_ERROR"
      );
    }
  }

  async getProductById(id: string): Promise<ReadProductDTO> {
    try {
      const product = await this.productRepository.findOne(id);

      if (!product) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Product not found",
          "PRODUCT_NOT_FOUND"
        );
      }

      return product;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch product",
        "PRODUCT_FETCH_ERROR"
      );
    }
  }

  async updateProduct(
    id: string,
    data: UpdateProductDTO
  ): Promise<ReadProductDTO> {
    try {
      // Check if product exists
      const existingProduct = await this.productRepository.findOne(id);

      if (!existingProduct) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Product not found",
          "PRODUCT_NOT_FOUND"
        );
      }

      // Validate category if provided
      if (data.category_id) {
        const category = await this.categoryRepository.findOne(
          data.category_id
        );

        if (!category) {
          throw new HttpError(
            HttpStatus.BAD_REQUEST,
            "Invalid category ID",
            "INVALID_CATEGORY"
          );
        }
      }

      const updatedProduct = await this.productRepository.update(id, data);

      if (!updatedProduct) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to update product",
          "PRODUCT_UPDATE_ERROR"
        );
      }

      return updatedProduct;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update product",
        "PRODUCT_UPDATE_ERROR"
      );
    }
  }

  async deleteProduct(id: string): Promise<{success: boolean}> {
    try {
      // Check if product exists
      const existingProduct = await this.productRepository.findOne(id);

      if (!existingProduct) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Product not found",
          "PRODUCT_NOT_FOUND"
        );
      }

      // Check if product is used in any order items
      const orderItemCount = await this.orderItemRepository.countByProduct(id);

      if (orderItemCount > 0) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Cannot delete product that is associated with orders",
          "PRODUCT_IN_USE"
        );
      }

      const success = await this.productRepository.delete(id);

      if (!success) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to delete product",
          "PRODUCT_DELETE_ERROR"
        );
      }

      return {success};
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to delete product",
        "PRODUCT_DELETE_ERROR"
      );
    }
  }

  async updateInventory(
    id: string,
    stockQuantity: number
  ): Promise<ReadProductDTO> {
    try {
      if (stockQuantity < 0) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Stock quantity cannot be negative",
          "INVALID_STOCK_QUANTITY"
        );
      }

      // Check if product exists
      const existingProduct = await this.productRepository.findOne(id);

      if (!existingProduct) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Product not found",
          "PRODUCT_NOT_FOUND"
        );
      }

      const updatedProduct = await this.productRepository.update(id, {
        stock_quantity: stockQuantity,
      });

      if (!updatedProduct) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to update inventory",
          "INVENTORY_UPDATE_ERROR"
        );
      }

      // If stock is low, send notification to admin
      if (stockQuantity <= 5 && existingProduct.stock_quantity > 5) {
        // Find admin users - in a real implementation, you would use a UserRepository
        // For now, we'll just call the NotificationService directly
        await this.notificationService.sendLowStockNotification(
          updatedProduct.name,
          stockQuantity
        );
      }

      return updatedProduct;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update inventory",
        "INVENTORY_UPDATE_ERROR"
      );
    }
  }

  async getLowStockProducts(threshold: number): Promise<ReadProductDTO[]> {
    try {
      return await this.productRepository.findByLowStock(threshold);
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch low stock products",
        "LOW_STOCK_FETCH_ERROR"
      );
    }
  }

  async updateDiscount(
    id: string,
    discountPercentage: number
  ): Promise<ReadProductDTO> {
    try {
      if (discountPercentage < 0 || discountPercentage > 100) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Discount percentage must be between 0 and 100",
          "INVALID_DISCOUNT"
        );
      }

      // Check if product exists
      const existingProduct = await this.productRepository.findOne(id);

      if (!existingProduct) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Product not found",
          "PRODUCT_NOT_FOUND"
        );
      }

      const updatedProduct = await this.productRepository.update(id, {
        discount_percentage: discountPercentage,
      });

      if (!updatedProduct) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to update discount",
          "DISCOUNT_UPDATE_ERROR"
        );
      }

      // If discount is added or significantly increased, notify subscribed customers
      if (
        discountPercentage > 0 &&
        discountPercentage > existingProduct.discount_percentage + 5
      ) {
        // Send discount notification to subscribed users
        // In a real implementation, you would use an EmailSubscriptionRepository
        // For now, we'll just call the NotificationService directly
        await this.notificationService.sendDiscountNotification(
          updatedProduct.name,
          discountPercentage
        );
      }

      return updatedProduct;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update discount",
        "DISCOUNT_UPDATE_ERROR"
      );
    }
  }
}
