// src/application/services/storage.service.ts

import fs from "fs/promises";
import path from "path";
import {v4 as uuidv4} from "uuid";
import sharp from "sharp"; // For image optimization
import {FileRepository} from "@/data_access/repositories/file_storage.repository";
import {
  CreateFileDTO,
  ReadFileDTO,
  FileUrlOptionsDTO,
} from "@/shared/dtos/file_storage.dto";

export class StorageService {
  private fileRepository: FileRepository;
  private basePath: string;
  private allowedTypes: Record<string, string[]>;
  private sizeLimits: Record<string, number>;

  constructor() {
    this.fileRepository = new FileRepository();
    this.basePath =
      process.env.STORAGE_PATH || path.join(process.cwd(), "public", "uploads");

    // Define allowed MIME types for different entity types
    this.allowedTypes = {
      product: ["image/jpeg", "image/png", "image/webp"],
      avatar: ["image/jpeg", "image/png", "image/webp"],
      banner: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
      document: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      import: [
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ],
    };

    // Define size limits (in bytes) for different entity types
    this.sizeLimits = {
      product: 5 * 1024 * 1024, // 5MB
      avatar: 2 * 1024 * 1024, // 2MB
      banner: 10 * 1024 * 1024, // 10MB
      document: 20 * 1024 * 1024, // 20MB
      import: 50 * 1024 * 1024, // 50MB
    };
  }

  async storeFile(
    file: File,
    entityType: string,
    entityId?: string,
    userId?: string
  ): Promise<ReadFileDTO> {
    // Validate file
    this.validateFile(file, entityType);

    // Generate unique ID and file path
    const fileId = uuidv4();
    const fileExt = path.extname(file.name);
    const fileName = `${fileId}${fileExt}`;
    const relativePath = `/${entityType}/${fileName}`;
    const fullPath = path.join(this.basePath, entityType);

    // Ensure directory exists
    await fs.mkdir(fullPath, {recursive: true});

    // Convert file to buffer - fix type errors by explicitly setting the type
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Process image files (resize, optimize)
    let processedBuffer: Buffer;
    let dimensions = {width: 0, height: 0};

    if (
      file.type.startsWith("image/") &&
      entityType !== "document" &&
      entityType !== "import"
    ) {
      // Process with sharp for images
      const image = sharp(buffer);
      const metadata = await image.metadata();

      dimensions = {
        width: metadata.width || 0,
        height: metadata.height || 0,
      };

      // Different processing based on entity type
      if (entityType === "product") {
        processedBuffer = await this.processProductImage(image);
      } else if (entityType === "avatar") {
        processedBuffer = await this.processAvatarImage(image);
      } else if (entityType === "banner") {
        processedBuffer = await this.processBannerImage(image);
      } else {
        // Default processing for other image types
        processedBuffer = await image.toBuffer();
      }
    } else {
      // For non-image files, use the original buffer
      processedBuffer = buffer;
    }

    // Write file to disk
    await fs.writeFile(path.join(fullPath, fileName), processedBuffer);

    // Create database record for the file
    const fileData: CreateFileDTO = {
      id: fileId,
      original_name: file.name,
      file_name: fileName,
      mime_type: file.type,
      size: processedBuffer.length,
      path: relativePath,
      entity_id: entityId || null,
      //   entity_type: entityType,
      width: dimensions.width,
      height: dimensions.height,
      uploaded_by: userId || null,
    };

    return await this.fileRepository.create(fileData);
  }

  async getFileById(
    fileId: string,
    options?: FileUrlOptionsDTO
  ): Promise<{file: Buffer; metadata: ReadFileDTO}> {
    // Get file metadata from database
    const fileMetadata = await this.fileRepository.findById(fileId);

    if (!fileMetadata) {
      throw new Error("File not found");
    }

    // Read file from disk
    const filePath = path.join(this.basePath, fileMetadata.path);
    let fileBuffer: Buffer;

    try {
      fileBuffer = await fs.readFile(filePath);
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
      throw new Error("File could not be read from disk");
    }

    // Process resizing if needed
    if (options?.resize && fileMetadata.mime_type.startsWith("image/")) {
      try {
        const resizedImage = await sharp(fileBuffer)
          .resize(options.resize.width, options.resize.height, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .toBuffer();

        return {file: resizedImage, metadata: fileMetadata};
      } catch (error) {
        console.error("Error resizing image:", error);
        // Return original if resizing fails
        return {file: fileBuffer, metadata: fileMetadata};
      }
    }

    return {file: fileBuffer, metadata: fileMetadata};
  }

  async deleteFile(fileId: string): Promise<boolean> {
    // Get file metadata from database
    const fileMetadata = await this.fileRepository.findById(fileId);

    if (!fileMetadata) {
      return false;
    }

    // Delete file from disk
    try {
      const filePath = path.join(this.basePath, fileMetadata.path);
      await fs.unlink(filePath);
    } catch (error) {
      console.error("Error deleting file from disk:", error);
      // Continue with database deletion even if file removal fails
    }

    // Delete record from database
    return await this.fileRepository.delete(fileId);
  }

  async getFilesByEntity(
    entityType: string,
    entityId: string
  ): Promise<ReadFileDTO[]> {
    return await this.fileRepository.findByEntity(entityType, entityId);
  }

  // Private methods for image processing
  private async processProductImage(image: sharp.Sharp): Promise<Buffer> {
    // Create optimized version
    return await image
      .resize(1200, 1200, {fit: "inside", withoutEnlargement: true})
      .webp({quality: 85})
      .toBuffer();
  }

  private async processAvatarImage(image: sharp.Sharp): Promise<Buffer> {
    // Create square crop for avatar
    return await image
      .resize(256, 256, {fit: "cover"})
      .webp({quality: 85})
      .toBuffer();
  }

  private async processBannerImage(image: sharp.Sharp): Promise<Buffer> {
    // Optimize for banner
    return await image
      .resize(1920, 600, {fit: "inside", withoutEnlargement: true})
      .webp({quality: 85})
      .toBuffer();
  }

  private validateFile(file: File, entityType: string): void {
    // Check file size
    const sizeLimit = this.sizeLimits[entityType] || 5 * 1024 * 1024;
    if (file.size > sizeLimit) {
      throw new Error(
        `File size exceeds the limit of ${sizeLimit / (1024 * 1024)}MB`
      );
    }

    // Check file type
    const allowedTypes = this.allowedTypes[entityType] || [
      "image/jpeg",
      "image/png",
    ];
    if (!allowedTypes.includes(file.type)) {
      throw new Error(
        `File type not allowed. Allowed types: ${allowedTypes.join(", ")}`
      );
    }
  }
}
