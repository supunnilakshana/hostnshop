/* eslint-disable @typescript-eslint/no-explicit-any */
import {CreateOrderDTO, ReadOrderDTO, UpdateOrderDTO} from "@/shared/dtos";
import {OrderStatus} from "@/shared/enums";

export interface IOrderRepository {
  create(data: CreateOrderDTO, orderItems: any[]): Promise<ReadOrderDTO>;
  update(id: string, data: UpdateOrderDTO): Promise<ReadOrderDTO | null>;
  updateStatus(id: string, status: OrderStatus): Promise<ReadOrderDTO | null>;
  findOne(id: string): Promise<ReadOrderDTO | null>;
  findOneWithDetails(id: string): Promise<any | null>;
  findAll(options?: {
    customerId?: string | null;
    status?: OrderStatus;
    page?: number;
    limit?: number;
  }): Promise<{
    orders: ReadOrderDTO[];
    total: number;
  }>;
  getAnalytics(startDate?: Date, endDate?: Date): Promise<any>;
}
