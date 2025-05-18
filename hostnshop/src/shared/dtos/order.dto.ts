/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CreateOrderItemDTO,
  ReadOrderItemDTO,
  UpdateOrderItemDTO,
} from "./order_item.dto";

// Create Order DTO
export interface CreateOrderDTO {
  customer_id: string;
  total_price: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  orderItems: CreateOrderItemDTO[];
}

// Update Order DTO
export interface UpdateOrderDTO {
  total_price?: number;
  status?: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  orderItems: UpdateOrderItemDTO[];
}

// Read Order DTO
export interface ReadOrderDTO {
  id: string;
  customer_id: string;
  total_price: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: ReadOrderItemDTO[];
  created_at: string;
}

// Delete Order DTO
export interface DeleteOrderDTO {
  id: string;
}
