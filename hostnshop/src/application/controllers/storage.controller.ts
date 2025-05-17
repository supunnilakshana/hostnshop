/* eslint-disable @typescript-eslint/no-explicit-any */
// src/application/controllers/storage.controller.ts

import {NextRequest, NextResponse} from "next/server";
import {BaseController} from "./base.controller";
import {StorageService} from "../services/file_storage.service";
import {HttpStatus, UserRole} from "@/shared/enums";
import {FileUrlOptionsDTO} from "@/shared/dtos/file_storage.dto";

export class StorageController extends BaseController {
  private storageService: StorageService;

  constructor() {
    super();
    this.storageService = new StorageService();
  }

  async uploadFile(req: NextRequest) {
    return this.handleRequest(
      req,
      async (user) => {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
          return this.sendError({
            message: "No file provided",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        const entityType = formData.get("entityType") as string;
        const entityId = (formData.get("entityId") as string) || undefined;

        if (!entityType) {
          return this.sendError({
            message: "Entity type is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        try {
          const result = await this.storageService.storeFile(
            file,
            entityType,
            entityId,
            user?.id
          );

          return result;
        } catch (error: any) {
          return this.sendError({
            message: error.message || "Failed to upload file",
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          });
        }
      },
      []
    );
  }

  async getFile(req: NextRequest) {
    try {
      const fileId = req.nextUrl.pathname.split("/").pop();

      if (!fileId) {
        return this.sendError({
          message: "File ID is required",
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      // Parse resize options from query params
      const width = req.nextUrl.searchParams.get("width");
      const height = req.nextUrl.searchParams.get("height");

      const options: FileUrlOptionsDTO = {};

      if (width || height) {
        options.resize = {
          width: width ? parseInt(width) : undefined,
          height: height ? parseInt(height) : undefined,
        };
      }

      const {file, metadata} = await this.storageService.getFileById(
        fileId,
        options
      );

      // Determine content disposition
      const download = req.nextUrl.searchParams.get("download") === "true";
      const disposition = download
        ? `attachment; filename="${encodeURIComponent(metadata.original_name)}"`
        : `inline`;

      // Return file with appropriate headers
      return new NextResponse(file, {
        status: 200,
        headers: {
          "Content-Type": metadata.mime_type,
          "Content-Disposition": disposition,
          "Content-Length": file.length.toString(),
          "Cache-Control": "public, max-age=31536000", // Cache for 1 year
        },
      });
    } catch (error: any) {
      console.error("Error serving file:", error);
      return this.sendError({
        message: error.message || "Failed to get file",
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
  }

  async deleteFile(req: NextRequest) {
    return this.handleRequest(
      req,
      async (user) => {
        const fileId = req.nextUrl.pathname.split("/").pop();

        if (!fileId) {
          return this.sendError({
            message: "File ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        // Get file metadata to check permissions
        const fileMetadata = await this.storageService.getFileById(fileId);

        // Only admin or the uploader can delete files
        if (
          user?.role !== UserRole.ADMIN &&
          fileMetadata.metadata.uploaded_by !== user?.id
        ) {
          return this.sendError({
            message: "You don't have permission to delete this file",
            statusCode: HttpStatus.FORBIDDEN,
          });
        }

        const success = await this.storageService.deleteFile(fileId);

        if (!success) {
          return this.sendError({
            message: "Failed to delete file",
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          });
        }

        return {success: true};
      },
      [UserRole.ADMIN, UserRole.CUSTOMER]
    );
  }

  async getFilesByEntity(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const entityType = req.nextUrl.searchParams.get("entityType");
        const entityId = req.nextUrl.searchParams.get("entityId");

        if (!entityType || !entityId) {
          return this.sendError({
            message: "Entity type and ID are required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        const files = await this.storageService.getFilesByEntity(
          entityType,
          entityId
        );

        return {files};
      },
      [UserRole.ADMIN, UserRole.CUSTOMER]
    );
  }
}
