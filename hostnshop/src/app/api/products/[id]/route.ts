import {ProductController} from "@/application/controllers/product.controller";

import {NextRequest} from "next/server";

const productController = new ProductController();

export async function DELETE(req: NextRequest) {
  return await productController.deleteProduct(req);
}
export async function GET(req: NextRequest) {
  return await productController.getProductById(req);
}
