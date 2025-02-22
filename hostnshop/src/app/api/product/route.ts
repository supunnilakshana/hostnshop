import {ProductController} from "@/application/controllers/product.controller";

import {NextRequest} from "next/server";

const authController = new ProductController();

export async function GET(req: NextRequest) {
  return await authController.getProducts(req);
}
