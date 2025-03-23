/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextRequest} from "next/server";
import {BaseController} from "./base.controller";
import {HttpStatus, UserRole} from "@/shared/enums";
import {CategoryService} from "../services/category.service";
import {CreateCategoryDTO, UpdateCategoryDTO} from "@/shared/dtos";

export class CategoryController extends BaseController {
  private categoryService: CategoryService;

  constructor() {
    super();
    this.categoryService = new CategoryService();
  }

  async createCategory(req: NextRequest) {
    return this.handleRequest(
      req,
      async (user) => {
        const categoryData = await this.getRequestBody<CreateCategoryDTO>(req);
        return await this.categoryService.createCategory(categoryData);
      },
      [UserRole.ADMIN]
    );
  }

  async getCategories(req: NextRequest) {
    return this.handleRequest(req, async () => {
      return await this.categoryService.getAllCategories();
    });
  }

  async getCategoryById(req: NextRequest) {
    return this.handleRequest(req, async () => {
      const id = req.nextUrl.pathname.split("/").pop();
      if (!id) {
        return this.sendError({
          message: "Category ID is required",
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      return await this.categoryService.getCategoryById(id);
    });
  }

  async updateCategory(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "Category ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }
        const categoryData = await this.getRequestBody<UpdateCategoryDTO>(req);
        return await this.categoryService.updateCategory(id, categoryData);
      },
      [UserRole.ADMIN]
    );
  }

  async deleteCategory(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "Category ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }
        return await this.categoryService.deleteCategory(id);
      },
      [UserRole.ADMIN]
    );
  }
}
