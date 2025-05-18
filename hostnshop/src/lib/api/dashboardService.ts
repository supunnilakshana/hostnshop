// src/lib/api/dashboardService.ts
import {apiClient} from "./client";
import {OrderStatus} from "@/shared/enums";
import {ReadProductDTO} from "@/shared/dtos";

export interface DashboardSummary {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueChange: number;
  ordersChange: number;
  customersChange: number;
  productsChange: number;
}

export interface OrderSummary {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  total_price: number;
  status: OrderStatus;
  created_at: string;
}

export interface RecentAnalytics {
  revenueByDay: {date: string; revenue: number}[];
  ordersByStatus: {status: string; count: number}[];
}

export const dashboardService = {
  async getDashboardSummary() {
    try {
      return await apiClient.get<{data: DashboardSummary}>(
        "admin/dashboard/summary"
      );
    } catch (error) {
      console.error("Error fetching dashboard summary:", error);
      throw new Error("Failed to fetch dashboard summary");
    }
  },

  async getRecentOrders(limit: number = 5) {
    try {
      return await apiClient.get<{data: OrderSummary[]}>(
        `admin/dashboard/recent-orders?limit=${limit}`
      );
    } catch (error) {
      console.error("Error fetching recent orders:", error);
      throw new Error("Failed to fetch recent orders");
    }
  },

  async getLowStockProducts(threshold: number = 5) {
    try {
      return await apiClient.get<{data: ReadProductDTO[]}>(
        `admin/dashboard/low-stock?threshold=${threshold}`
      );
    } catch (error) {
      console.error("Error fetching low stock products:", error);
      throw new Error("Failed to fetch low stock products");
    }
  },

  async getAnalytics(timeframe: string = "week") {
    try {
      return await apiClient.get<{data: RecentAnalytics}>(
        `admin/dashboard/analytics?timeframe=${timeframe}`
      );
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      throw new Error("Failed to fetch analytics data");
    }
  },
};
