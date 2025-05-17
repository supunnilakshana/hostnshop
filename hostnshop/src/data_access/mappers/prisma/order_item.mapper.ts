/* eslint-disable @typescript-eslint/no-explicit-any */

import {OrderItem} from "@prisma/client";
import {ReadOrderItemDTO} from "@/shared/dtos";

export class OrderItemMapper {
  static toReadDTO(
    orderItem: OrderItem & {product?: any; order?: any}
  ): ReadOrderItemDTO {
    return {
      id: orderItem.id,
      order_id: orderItem.order_id,
      product_id: orderItem.product_id,
      quantity: orderItem.quantity,
      price_at_purchase: orderItem.price_at_purchase,
      discount_applied: orderItem.discount_applied,
      created_at: "",
    };
  }

  static toReadDTOList(
    orderItems: (OrderItem & {product?: any; order?: any})[]
  ): ReadOrderItemDTO[] {
    return orderItems.map((orderItem) => this.toReadDTO(orderItem));
  }
}
