import {
  CreateProductDTO,
  ReadProductDTO,
  UpdateProductDTO,
} from "@/shared/dtos";

export interface IProductRepository {
  create(data: CreateProductDTO): Promise<ReadProductDTO>;
  update(id: string, data: UpdateProductDTO): Promise<ReadProductDTO | null>;
  findOne(id: string): Promise<ReadProductDTO | null>;
  findAll(options?: {
    categoryId?: string;
    page?: number;
    limit?: number;
    searchQuery?: string;
  }): Promise<{
    products: ReadProductDTO[];
    total: number;
  }>;
  findByLowStock(threshold: number): Promise<ReadProductDTO[]>;
  delete(id: string): Promise<boolean>;
}
