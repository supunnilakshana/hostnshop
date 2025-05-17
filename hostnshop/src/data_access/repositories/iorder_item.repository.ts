import {CreateOrderItemDTO, ReadOrderItemDTO} from "@/shared/dtos";

export interface IOrderItemRepository {
  create(data: CreateOrderItemDTO): Promise<ReadOrderItemDTO>;
  findByOrder(orderId: string): Promise<ReadOrderItemDTO[]>;
  findByProduct(productId: string): Promise<ReadOrderItemDTO[]>;
  countByProduct(productId: string): Promise<number>;
}
