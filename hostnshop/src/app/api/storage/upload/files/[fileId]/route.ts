// src/app/api/storage/files/[fileId]/route.ts

import {StorageController} from "@/application/controllers/storage.controller";
import {NextRequest} from "next/server";

const storageController = new StorageController();

export async function GET(req: NextRequest) {
  return await storageController.getFile(req);
}

export async function DELETE(req: NextRequest) {
  return await storageController.deleteFile(req);
}
