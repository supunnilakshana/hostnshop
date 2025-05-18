/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/api/orderService.ts
import {apiClient} from "./client";
import {CreateOrderDTO, ReadOrderDTO} from "@/shared/dtos";

export const orderService = {
  /**
   * Create a new order
   * POST /api/orders
   */
  async createOrder(orderData: CreateOrderDTO) {
    return apiClient.post<{data: ReadOrderDTO}>("orders", orderData);
  },

  /**
   * Get orders with pagination and optional filters
   * GET /api/orders?page=1&limit=10&status=Pending
   */
  async getOrders(
    params: {
      page?: number;
      limit?: number;
      status?: string;
      customerId?: string;
    } = {}
  ) {
    const {page = 1, limit = 10, status, customerId} = params;

    let endpoint = `orders?page=${page}&limit=${limit}`;

    if (status) {
      endpoint += `&status=${status}`;
    }

    if (customerId) {
      endpoint += `&customerId=${customerId}`;
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

  /**
   * Get order by ID
   * GET /api/orders/[id]
   */
  async getOrderById(id: string) {
    return apiClient.get<{data: any}>(`orders/${id}`);
  },

  /**
   * Update order status
   * PATCH /api/orders/[id]/status
   */
  async updateOrderStatus(id: string, status: string) {
    return apiClient.post<{data: ReadOrderDTO}>(`orders/${id}/status`, {
      status,
    });
  },

  /**
   * Cancel an order
   * POST /api/orders/[id]/cancel
   */
  async cancelOrder(id: string) {
    return apiClient.post<{data: ReadOrderDTO}>(`orders/${id}/cancel`, {});
  },

  /**
   * Get order analytics
   * GET /api/orders/analytics?startDate=2023-01-01&endDate=2023-12-31
   */
  async getOrderAnalytics(params: {startDate?: string; endDate?: string} = {}) {
    const {startDate, endDate} = params;

    let endpoint = "orders/analytics";
    const queryParams = [];

    if (startDate) {
      queryParams.push(`startDate=${startDate}`);
    }

    if (endDate) {
      queryParams.push(`endDate=${endDate}`);
    }

    if (queryParams.length > 0) {
      endpoint += `?${queryParams.join("&")}`;
    }

    return apiClient.get<{data: any}>(endpoint);
  },
};
