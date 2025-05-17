import {NextRequest} from "next/server";
import {BaseController} from "./base.controller";
import {HttpStatus, UserRole} from "@/shared/enums";
import {ProductService} from "../services/product.service";
import {CreateProductDTO, UpdateProductDTO} from "@/shared/dtos";

export class ProductController extends BaseController {
  private productService: ProductService;

  constructor() {
    super();
    this.productService = new ProductService();
  }

  async createProduct(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const productData = await this.getRequestBody<CreateProductDTO>(req);
        return await this.productService.createProduct(productData);
      },
      [UserRole.ADMIN]
    );
  }

  async getProducts(req: NextRequest) {
    return this.handleRequest(req, async () => {
      const categoryId = this.getQueryParam(req, "categoryId");
      const page = parseInt(this.getQueryParam(req, "page") || "1");
      const limit = parseInt(this.getQueryParam(req, "limit") || "10");
      const searchQuery = this.getQueryParam(req, "search");

      return await this.productService.getProducts({
        categoryId,
        page,
        limit,
        searchQuery,
      });
    });
  }

  async getProductById(req: NextRequest) {
    return this.handleRequest(req, async () => {
      const id = req.nextUrl.pathname.split("/").pop();
      if (!id) {
        return this.sendError({
          message: "Product ID is required",
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      return await this.productService.getProductById(id);
    });
  }

  async updateProduct(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "Product ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }
        const productData = await this.getRequestBody<UpdateProductDTO>(req);
        return await this.productService.updateProduct(id, productData);
      },
      [UserRole.ADMIN]
    );
  }

  async deleteProduct(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "Product ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }
        return await this.productService.deleteProduct(id);
      },
      [UserRole.ADMIN]
    );
  }

  async updateInventory(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "Product ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }
        const {stock_quantity} = await this.getRequestBody<{
          stock_quantity: number;
        }>(req);
        return await this.productService.updateInventory(id, stock_quantity);
      },
      [UserRole.ADMIN]
    );
  }

  async getLowStockProducts(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const threshold = parseInt(this.getQueryParam(req, "threshold") || "5");
        return await this.productService.getLowStockProducts(threshold);
      },
      [UserRole.ADMIN]
    );
  }

  async updateDiscount(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "Product ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }
        const {discount_percentage} = await this.getRequestBody<{
          discount_percentage: number;
        }>(req);
        return await this.productService.updateDiscount(
          id,
          discount_percentage
        );
      },
      [UserRole.ADMIN]
    );
  }
}
