/* eslint-disable @typescript-eslint/no-explicit-any */
import {Payment} from "@prisma/client";

export class PaymentMapper {
  static toReadDTO(payment: Payment): any {
    return {
      id: payment.id,
      order_id: payment.order_id,
      payment_method: payment.payment_method,
      payment_status: payment.payment_status,
      transaction_id: payment.transaction_id,
      created_at: payment.created_at.toISOString(),
    };
  }

  static toReadDetailedDTO(payment: Payment & {order?: any}): any {
    return {
      id: payment.id,
      order_id: payment.order_id,
      payment_method: payment.payment_method,
      payment_status: payment.payment_status,
      transaction_id: payment.transaction_id,
      created_at: payment.created_at.toISOString(),
      order: payment.order
        ? {
            total_price: payment.order.total_price,
            status: payment.order.status,
            customer: payment.order.customer
              ? {
                  name: payment.order.customer.name,
                  email: payment.order.customer.email,
                }
              : null,
          }
        : null,
    };
  }
}
