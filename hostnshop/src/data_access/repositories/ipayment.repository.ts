/* eslint-disable @typescript-eslint/no-explicit-any */
import {PaymentMethod, PaymentStatus} from "@/shared/enums";

export interface IPaymentRepository {
  create(data: {
    order_id: string;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;
    transaction_id?: string;
  }): Promise<any>;
  update(
    id: string,
    data: {
      payment_status: PaymentStatus;
    }
  ): Promise<any | null>;
  findOne(id: string): Promise<any | null>;
  findByOrderId(orderId: string): Promise<any | null>;
  findAll(options?: {
    status?: PaymentStatus;
    page?: number;
    limit?: number;
  }): Promise<{
    payments: any[];
    total: number;
  }>;
  getAnalytics(startDate?: Date, endDate?: Date): Promise<any>;
}
