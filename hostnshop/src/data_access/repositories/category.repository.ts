/* eslint-disable @typescript-eslint/no-unused-vars */
import {prisma} from "../db_client/prisma_client";
import {
  CreateCategoryDTO,
  ReadCategoryDTO,
  UpdateCategoryDTO,
} from "@/shared/dtos";
import {ICategoryRepository} from "./icategory.repository";
import {CategoryMapper} from "../mappers/prisma";

export class CategoryRepository implements ICategoryRepository {
  async create(data: CreateCategoryDTO): Promise<ReadCategoryDTO> {
    const category = await prisma.category.create({data});
    return CategoryMapper.toReadDTO(category);
  }

  async update(
    id: string,
    data: UpdateCategoryDTO
  ): Promise<ReadCategoryDTO | null> {
    try {
      const category = await prisma.category.update({
        where: {id},
        data,
      });
      return CategoryMapper.toReadDTO(category);
    } catch (error) {
      return null;
    }
  }

  async findOne(id: string): Promise<ReadCategoryDTO | null> {
    const category = await prisma.category.findUnique({
      where: {id},
    });
    return category ? CategoryMapper.toReadDTO(category) : null;
  }

  async findByName(name: string): Promise<ReadCategoryDTO | null> {
    const category = await prisma.category.findUnique({
      where: {name},
    });
    return category ? CategoryMapper.toReadDTO(category) : null;
  }

  async findAll(): Promise<ReadCategoryDTO[]> {
    const categories = await prisma.category.findMany({
      orderBy: {name: "asc"},
    });
    return CategoryMapper.toReadDTOList(categories);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.category.delete({
        where: {id},
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
