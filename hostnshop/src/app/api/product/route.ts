import {ProductController} from "@/application/controllers/product.controller";

import {NextRequest} from "next/server";

const authController = new ProductController();

export async function GET(req: NextRequest) {
  return await authController.getProducts(req);
}

export async function POST(req: NextRequest) {
  return await authController.createProduct(req);
}

export async function PUT(req: NextRequest) {
  return await authController.updateProduct(req);
}
