/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/data_access/repositories/file.repository.ts

import {prisma} from "../db_client/prisma_client";
import {IFileRepository} from "./ifile_storage.repository";
import {
  CreateFileDTO,
  ReadFileDTO,
  UpdateFileDTO,
  FileQueryDTO,
  FileResponseDTO,
} from "@/shared/dtos/file_storage.dto";

export class FileRepository implements IFileRepository {
  async create(data: CreateFileDTO): Promise<ReadFileDTO> {
    const file = await prisma.file.create({data});

    return this.mapToReadDTO(file);
  }

  async findById(id: string): Promise<ReadFileDTO | null> {
    const file = await prisma.file.findUnique({
      where: {id},
    });

    return file ? this.mapToReadDTO(file) : null;
  }

  async findByEntity(
    entityType: string,
    entityId: string
  ): Promise<ReadFileDTO[]> {
    const files = await prisma.file.findMany({
      where: {
        // entity_type: entityType,
        entity_id: entityId,
      },
      orderBy: {
        uploaded_at: "desc",
      },
    });

    return files.map((file) => this.mapToReadDTO(file));
  }

  async findAll(query: FileQueryDTO): Promise<FileResponseDTO> {
    const where: any = {};

    if (query.entity_type) {
      where.entity_type = query.entity_type;
    }

    if (query.entity_id) {
      where.entity_id = query.entity_id;
    }

    if (query.mime_type) {
      where.mime_type = query.mime_type;
    }

    if (query.uploaded_by) {
      where.uploaded_by = query.uploaded_by;
    }

    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const [files, total] = await Promise.all([
      prisma.file.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          uploaded_at: "desc",
        },
      }),
      prisma.file.count({where}),
    ]);

    return {
      files: files.map((file) => this.mapToReadDTO(file)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(id: string, data: UpdateFileDTO): Promise<ReadFileDTO | null> {
    try {
      const file = await prisma.file.update({
        where: {id},
        data,
      });

      return this.mapToReadDTO(file);
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.file.delete({where: {id}});
      return true;
    } catch (error) {
      return false;
    }
  }

  private mapToReadDTO(file: any): ReadFileDTO {
    const baseUrl =
      process.env.FILE_BASE_URL || "http://localhost:3000/api/storage/files";

    return {
      id: file.id,
      original_name: file.original_name,
      file_name: file.file_name,
      mime_type: file.mime_type,
      size: file.size,
      path: file.path,
      width: file.width || undefined,
      height: file.height || undefined,
      entity_id: file.entity_id,
      //   entity_type: file.entity_type,
      uploaded_by: file.uploaded_by,
      uploaded_at: file.uploaded_at.toISOString(),
      url: `${baseUrl}/${file.id}`,
    };
  }
}
