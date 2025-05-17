/* eslint-disable @typescript-eslint/no-explicit-any */
import {Order} from "@prisma/client";
import {ReadOrderDTO} from "@/shared/dtos";

export class OrderMapper {
  static toReadDTO(order: Order): ReadOrderDTO {
    return {
      id: order.id,
      customer_id: order.customer_id,
      total_price: order.total_price,
      status: order.status,
      created_at: order.created_at.toISOString(),
    };
  }

  static toReadDetailedDTO(
    order: Order & {
      customer?: any;
      orderItems?: any[];
      payment?: any;
    }
  ): any {
    return {
      id: order.id,
      customer_id: order.customer_id,
      total_price: order.total_price,
      status: order.status,
      created_at: order.created_at.toISOString(),
      customer: order.customer
        ? {
            name: order.customer.name,
            email: order.customer.email,
          }
        : undefined,
      items: order.orderItems
        ? order.orderItems.map((item) => ({
            id: item.id,
            product_id: item.product_id,
            product_name: item.product.name,
            quantity: item.quantity,
            price_at_purchase: item.price_at_purchase,
            discount_applied: item.discount_applied,
            subtotal:
              item.price_at_purchase *
              item.quantity *
              (1 - item.discount_applied / 100),
          }))
        : [],
      payment: order.payment
        ? {
            id: order.payment.id,
            payment_method: order.payment.payment_method,
            payment_status: order.payment.payment_status,
            transaction_id: order.payment.transaction_id,
            created_at: order.payment.created_at.toISOString(),
          }
        : undefined,
    };
  }

  static toReadDTOList(orders: Order[]): ReadOrderDTO[] {
    return orders.map((order) => this.toReadDTO(order));
  }
}
