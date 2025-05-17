import {prisma} from "../db_client/prisma_client";
import {CreateOrderItemDTO, ReadOrderItemDTO} from "@/shared/dtos";
import {IOrderItemRepository} from "./iorder_item.repository";
import {OrderItemMapper} from "../mappers/prisma";

export class OrderItemRepository implements IOrderItemRepository {
  async create(data: CreateOrderItemDTO): Promise<ReadOrderItemDTO> {
    const orderItem = await prisma.orderItem.create({data});
    return OrderItemMapper.toReadDTO(orderItem);
  }

  async findByOrder(orderId: string): Promise<ReadOrderItemDTO[]> {
    const orderItems = await prisma.orderItem.findMany({
      where: {order_id: orderId},
      include: {
        product: true,
      },
    });

    return OrderItemMapper.toReadDTOList(orderItems);
  }

  async findByProduct(productId: string): Promise<ReadOrderItemDTO[]> {
    const orderItems = await prisma.orderItem.findMany({
      where: {product_id: productId},
      include: {
        order: true,
      },
    });

    return OrderItemMapper.toReadDTOList(orderItems);
  }

  async countByProduct(productId: string): Promise<number> {
    return await prisma.orderItem.count({
      where: {product_id: productId},
    });
  }
}
