import {
  CreateCategoryDTO,
  ReadCategoryDTO,
  UpdateCategoryDTO,
} from "@/shared/dtos";

export interface ICategoryRepository {
  create(data: CreateCategoryDTO): Promise<ReadCategoryDTO>;
  update(id: string, data: UpdateCategoryDTO): Promise<ReadCategoryDTO | null>;
  findOne(id: string): Promise<ReadCategoryDTO | null>;
  findByName(name: string): Promise<ReadCategoryDTO | null>;
  findAll(): Promise<ReadCategoryDTO[]>;
  delete(id: string): Promise<boolean>;
}
