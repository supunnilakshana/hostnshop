/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/api/orderService.ts
import {apiClient} from "./client";
import {CreateOrderDTO, ReadOrderDTO} from "@/shared/dtos";

export const orderService = {
  async createOrder(orderData: CreateOrderDTO) {
    return apiClient.post<{data: ReadOrderDTO}>("orders", orderData);
  },

  async getOrders(
    params: {page?: number; limit?: number; status?: string} = {}
  ) {
    const {page = 1, limit = 10, status} = params;

    let endpoint = `orders?page=${page}&limit=${limit}`;

    if (status) {
      endpoint += `&status=${status}`;
    }

    return apiClient.get<{
      data: {
        orders: ReadOrderDTO[];
        total: number;
        page: number;
        totalPages: number;
      };
    }>(endpoint);
  },

  async getOrderById(id: string) {
    return apiClient.get<{data: any}>(`orders/${id}`);
  },

  async cancelOrder(id: string) {
    return apiClient.post<{data: ReadOrderDTO}>(`orders/${id}/cancel`, {});
  },
};
