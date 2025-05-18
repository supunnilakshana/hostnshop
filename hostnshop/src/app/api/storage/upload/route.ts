// src/app/api/storage/upload/route.ts

import {StorageController} from "@/application/controllers/storage.controller";
import {NextRequest} from "next/server";

const storageController = new StorageController();

export async function POST(req: NextRequest) {
  return await storageController.uploadFile(req);
}
