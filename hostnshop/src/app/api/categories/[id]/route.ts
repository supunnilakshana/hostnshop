import {CategoryController} from "@/application/controllers/category.controller";
import {NextRequest} from "next/server";

const categoryController = new CategoryController();

export async function DELETE(req: NextRequest) {
  return await categoryController.deleteCategory(req);
}
export async function PUT(req: NextRequest) {
  return await categoryController.updateCategory(req);
}
