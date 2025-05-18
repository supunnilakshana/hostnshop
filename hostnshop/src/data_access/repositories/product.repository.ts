/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {prisma} from "../db_client/prisma_client";
import {
  CreateProductDTO,
  ReadProductDTO,
  UpdateProductDTO,
} from "@/shared/dtos";
import {IProductRepository} from "./iproduct.repository";
import {ProductMapper} from "../mappers/prisma";

export class ProductRepository implements IProductRepository {
  async create(data: CreateProductDTO): Promise<ReadProductDTO> {
    const product = await prisma.product.create({data});
    return ProductMapper.toReadDTO(product);
  }

  async update(
    id: string,
    data: UpdateProductDTO
  ): Promise<ReadProductDTO | null> {
    try {
      const product = await prisma.product.update({
        where: {id},
        data,
      });
      return ProductMapper.toReadDTO(product);
    } catch (error) {
      return null;
    }
  }

  async findOne(id: string): Promise<ReadProductDTO | null> {
    const product = await prisma.product.findUnique({
      where: {id},
      include: {category: true},
    });
    return product ? ProductMapper.toReadDTO(product) : null;
  }

  async findAll(options?: {
    categoryId?: string;
    page?: number;
    limit?: number;
    searchQuery?: string;
  }): Promise<{
    products: ReadProductDTO[];
    total: number;
  }> {
    // Build the where clause
    const where: any = {};

    if (options?.categoryId) {
      where.category_id = options.categoryId;
    }

    if (options?.searchQuery) {
      where.OR = [
        {name: {contains: options.searchQuery, mode: "insensitive"}},
        {description: {contains: options.searchQuery, mode: "insensitive"}},
      ];
    }

    // Count total matching products
    const total = await prisma.product.count({where});

    // Get products with pagination
    const skip =
      options?.page && options?.limit
        ? (options.page - 1) * options.limit
        : undefined;
    const take = options?.limit;

    const products = await prisma.product.findMany({
      where,
      skip,
      take,
      orderBy: {created_at: "desc"},
      include: {category: true},
    });

    return {
      products: ProductMapper.toReadDTOList(products),
      total,
    };
  }

  async findByLowStock(threshold: number): Promise<ReadProductDTO[]> {
    const products = await prisma.product.findMany({
      where: {stock_quantity: {lte: threshold}},
      orderBy: {stock_quantity: "asc"},
      include: {category: true},
    });

    return ProductMapper.toReadDTOList(products);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.product.delete({
        where: {id},
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
