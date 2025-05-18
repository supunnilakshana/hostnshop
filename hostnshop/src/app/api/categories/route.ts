import {CategoryController} from "@/application/controllers/category.controller";
import {NextRequest} from "next/server";

const categoryController = new CategoryController();

export async function GET(req: NextRequest) {
  return await categoryController.getCategories(req);
}

export async function POST(req: NextRequest) {
  return await categoryController.createCategory(req);
}
