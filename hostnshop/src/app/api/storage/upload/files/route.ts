// src/app/api/storage/files/route.ts

import {StorageController} from "@/application/controllers/storage.controller";
import {NextRequest} from "next/server";

const storageController = new StorageController();

export async function GET(req: NextRequest) {
  return await storageController.getFilesByEntity(req);
}
