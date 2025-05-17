// src/data_access/repositories/ifile.repository.ts

import {
  CreateFileDTO,
  ReadFileDTO,
  UpdateFileDTO,
  FileQueryDTO,
  FileResponseDTO,
} from "@/shared/dtos/file_storage.dto";

export interface IFileRepository {
  create(data: CreateFileDTO): Promise<ReadFileDTO>;

  findById(id: string): Promise<ReadFileDTO | null>;

  findByEntity(entityType: string, entityId: string): Promise<ReadFileDTO[]>;

  findAll(query: FileQueryDTO): Promise<FileResponseDTO>;

  update(id: string, data: UpdateFileDTO): Promise<ReadFileDTO | null>;

  delete(id: string): Promise<boolean>;
}
