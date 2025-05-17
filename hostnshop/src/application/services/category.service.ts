/* eslint-disable @typescript-eslint/no-unused-vars */
import {HttpStatus} from "@/shared/enums";
import {HttpError} from "@/shared/types";
import {
  CreateCategoryDTO,
  ReadCategoryDTO,
  UpdateCategoryDTO,
} from "@/shared/dtos";
import {CategoryRepository} from "@/data_access/repositories/category.repository";
import {ICategoryRepository} from "@/data_access/repositories/icategory.repository";

export class CategoryService {
  private categoryRepository: ICategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async createCategory(data: CreateCategoryDTO): Promise<ReadCategoryDTO> {
    try {
      // Check if category with the same name already exists
      const existingCategory = await this.categoryRepository.findByName(
        data.name
      );

      if (existingCategory) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Category with this name already exists",
          "CATEGORY_EXISTS"
        );
      }

      return await this.categoryRepository.create(data);
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to create category",
        "CATEGORY_CREATE_ERROR"
      );
    }
  }

  async getAllCategories(): Promise<ReadCategoryDTO[]> {
    try {
      return await this.categoryRepository.findAll();
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch categories",
        "CATEGORIES_FETCH_ERROR"
      );
    }
  }

  async getCategoryById(id: string): Promise<ReadCategoryDTO> {
    try {
      const category = await this.categoryRepository.findOne(id);

      if (!category) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Category not found",
          "CATEGORY_NOT_FOUND"
        );
      }

      return category;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch category",
        "CATEGORY_FETCH_ERROR"
      );
    }
  }

  async updateCategory(
    id: string,
    data: UpdateCategoryDTO
  ): Promise<ReadCategoryDTO> {
    try {
      // Check if category exists
      const existingCategory = await this.categoryRepository.findOne(id);

      if (!existingCategory) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Category not found",
          "CATEGORY_NOT_FOUND"
        );
      }

      // If name is being updated, check if it's unique
      if (data.name && data.name !== existingCategory.name) {
        const nameExists = await this.categoryRepository.findByName(data.name);

        if (nameExists) {
          throw new HttpError(
            HttpStatus.BAD_REQUEST,
            "Category with this name already exists",
            "CATEGORY_NAME_EXISTS"
          );
        }
      }

      const updatedCategory = await this.categoryRepository.update(id, data);

      if (!updatedCategory) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to update category",
          "CATEGORY_UPDATE_ERROR"
        );
      }

      return updatedCategory;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update category",
        "CATEGORY_UPDATE_ERROR"
      );
    }
  }

  async deleteCategory(id: string): Promise<{success: boolean}> {
    try {
      // Check if category exists
      const existingCategory = await this.categoryRepository.findOne(id);

      if (!existingCategory) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Category not found",
          "CATEGORY_NOT_FOUND"
        );
      }

      // TODO: Check if there are products using this category
      // We would need a ProductRepository method to count products by category

      const success = await this.categoryRepository.delete(id);

      if (!success) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to delete category",
          "CATEGORY_DELETE_ERROR"
        );
      }

      return {success};
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to delete category",
        "CATEGORY_DELETE_ERROR"
      );
    }
  }
}
