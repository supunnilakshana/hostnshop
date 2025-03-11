/* eslint-disable @typescript-eslint/no-explicit-any */
import {Product} from "@prisma/client";
import {ReadProductDTO} from "@/shared/dtos";

export class ProductMapper {
  static toReadDTO(product: Product & {category?: any}): ReadProductDTO {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      discount_percentage: product.discount_percentage,
      stock_quantity: product.stock_quantity,
      image_url: product.image_url,
      category_id: product.category_id || "",
      created_at: product.created_at.toISOString(),
    };
  }

  static toReadDTOList(
    products: (Product & {category?: any})[]
  ): ReadProductDTO[] {
    return products.map((product) => this.toReadDTO(product));
  }
}
