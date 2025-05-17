import {Category} from "@prisma/client";
import {ReadCategoryDTO} from "@/shared/dtos";

export class CategoryMapper {
  static toReadDTO(category: Category): ReadCategoryDTO {
    return {
      id: category.id,
      name: category.name,
      created_at: category.created_at.toISOString(),
    };
  }

  static toReadDTOList(categories: Category[]): ReadCategoryDTO[] {
    return categories.map((category) => this.toReadDTO(category));
  }
}
