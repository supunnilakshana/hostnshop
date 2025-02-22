/* eslint-disable @typescript-eslint/no-explicit-any */
import {UserRole} from "@/shared/enums";
import {NextRequest} from "next/server";
import {BaseController} from "./base.controller";

export class ProductController extends BaseController {
  async createProduct(req: NextRequest) {
    return this.handleRequest(
      req,
      async (user) => {
        const productData = await this.getRequestBody(req);
        // Your product creation logic here
        return {
          id: "new-product-id",
          createdBy: user!.id,
          ...(productData as any),
        };
      },
      [UserRole.ADMIN]
    );
  }

  async getProducts(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const page = this.getQueryParam(req, "page") || "1";
        // Your product fetching logic here
        return {
          page: parseInt(page),
          items: [
            {
              id: "product-1",
              name: "Product 1",
            },
            {
              id: "product-2",
              name: "Product 2",
            },
          ],
        };
      },
      [UserRole.CUSTOMER, UserRole.ADMIN]
    );
  }
}
