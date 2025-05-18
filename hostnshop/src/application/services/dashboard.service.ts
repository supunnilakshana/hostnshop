/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/application/services/dashboard.service.ts
import {HttpStatus, OrderStatus, UserRole} from "@/shared/enums";
import {HttpError} from "@/shared/types";
import {OrderRepository} from "@/data_access/repositories/order.repository";
import {ProductRepository} from "@/data_access/repositories/product.repository";
import {UserRepository} from "@/data_access/repositories/user.repository";
import {PaymentRepository} from "@/data_access/repositories/payment.repository";
import {IOrderRepository} from "@/data_access/repositories/iorder.repository";
import {IProductRepository} from "@/data_access/repositories/iproduct.repository";
import {IUserRepository} from "@/data_access/repositories/iuser.repository";
import {IPaymentRepository} from "@/data_access/repositories/ipayment.repository";

export class DashboardService {
  private orderRepository: IOrderRepository;
  private productRepository: IProductRepository;
  private userRepository: IUserRepository;
  private paymentRepository: IPaymentRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.productRepository = new ProductRepository();
    this.userRepository = new UserRepository();
    this.paymentRepository = new PaymentRepository();
  }

  async getDashboardSummary(): Promise<{
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
    revenueChange: number;
    ordersChange: number;
    customersChange: number;
    productsChange: number;
  }> {
    try {
      // Get current period data
      const currentPeriodEnd = new Date();
      const currentPeriodStart = new Date();
      currentPeriodStart.setMonth(currentPeriodStart.getMonth() - 1);

      // Get previous period data for comparison
      const previousPeriodEnd = new Date(currentPeriodStart);
      const previousPeriodStart = new Date(previousPeriodEnd);
      previousPeriodStart.setMonth(previousPeriodStart.getMonth() - 1);

      // Current period analytics
      const currentOrderAnalytics = await this.orderRepository.getAnalytics(
        currentPeriodStart,
        currentPeriodEnd
      );
      const currentPaymentAnalytics = await this.paymentRepository.getAnalytics(
        currentPeriodStart,
        currentPeriodEnd
      );

      // Previous period analytics
      const previousOrderAnalytics = await this.orderRepository.getAnalytics(
        previousPeriodStart,
        previousPeriodEnd
      );
      const previousPaymentAnalytics =
        await this.paymentRepository.getAnalytics(
          previousPeriodStart,
          previousPeriodEnd
        );

      // Get total customers (users with Customer role)
      const customers = await this.userRepository.findByRole(
        UserRole.CUSTOMER.toString()
      );
      const totalCustomers = customers.length;

      // Get total products
      const {products, total: totalProducts} =
        await this.productRepository.findAll({});

      // Calculate percentage changes
      const revenueChange = this.calculatePercentageChange(
        previousPaymentAnalytics.totalRevenue,
        currentPaymentAnalytics.totalRevenue
      );
      const ordersChange = this.calculatePercentageChange(
        previousOrderAnalytics.totalOrders,
        currentOrderAnalytics.totalOrders
      );

      // For demo purposes, using hardcoded changes for customers and products
      // In a real app, you'd fetch historical data for these as well
      const customersChange = 5.2;
      const productsChange = -2.1;

      return {
        totalRevenue: currentPaymentAnalytics.totalRevenue,
        totalOrders: currentOrderAnalytics.totalOrders,
        totalCustomers,
        totalProducts,
        revenueChange,
        ordersChange,
        customersChange,
        productsChange,
      };
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch dashboard summary",
        "DASHBOARD_SUMMARY_ERROR"
      );
    }
  }

  async getRecentOrders(limit: number = 5): Promise<any[]> {
    try {
      const {orders} = await this.orderRepository.findAll({
        limit,
        page: 1,
      });

      // Get detailed information for each order
      const detailedOrders = await Promise.all(
        orders.map(async (order) => {
          const detailedOrder = await this.orderRepository.findOneWithDetails(
            order.id
          );
          return detailedOrder;
        })
      );

      return detailedOrders;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch recent orders",
        "RECENT_ORDERS_ERROR"
      );
    }
  }

  async getLowStockProducts(threshold: number = 5): Promise<any[]> {
    try {
      return await this.productRepository.findByLowStock(threshold);
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch low stock products",
        "LOW_STOCK_PRODUCTS_ERROR"
      );
    }
  }

  async getRevenueAnalytics(
    timeframe: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<{
    revenueByDay: {date: string; revenue: number}[];
    ordersByStatus: {status: string; count: number}[];
  }> {
    try {
      // Set date range based on timeframe
      if (!startDate || !endDate) {
        const now = new Date();
        endDate = new Date(now);

        if (timeframe === "week") {
          startDate = new Date(now);
          startDate.setDate(startDate.getDate() - 7);
        } else if (timeframe === "month") {
          startDate = new Date(now);
          startDate.setMonth(startDate.getMonth() - 1);
        } else if (timeframe === "year") {
          startDate = new Date(now);
          startDate.setFullYear(startDate.getFullYear() - 1);
        } else {
          // Default to week
          startDate = new Date(now);
          startDate.setDate(startDate.getDate() - 7);
        }
      }

      // Get order analytics
      const orderAnalytics = await this.orderRepository.getAnalytics(
        startDate,
        endDate
      );

      // Get payment analytics
      const paymentAnalytics = await this.paymentRepository.getAnalytics(
        startDate,
        endDate
      );

      // Format revenue by day data
      let revenueByDay: {date: string; revenue: number}[] = [];

      if (timeframe === "week") {
        // Group by day of week for the week view
        revenueByDay = this.getDailyRevenueForWeek(
          paymentAnalytics.revenueByDate
        );
      } else if (timeframe === "month") {
        // Group by week for the month view
        revenueByDay = this.getWeeklyRevenueForMonth(
          paymentAnalytics.revenueByDate
        );
      } else {
        // Group by month for the year view
        revenueByDay = this.getMonthlyRevenueForYear(
          paymentAnalytics.revenueByDate
        );
      }

      // Format orders by status
      const ordersByStatus = Object.entries(orderAnalytics.statusCounts).map(
        ([status, count]) => ({
          status,
          count: count as number,
        })
      );

      return {
        revenueByDay,
        ordersByStatus,
      };
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch analytics data",
        "ANALYTICS_ERROR"
      );
    }
  }

  // Helper methods
  private calculatePercentageChange(previous: number, current: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  }

  private getDailyRevenueForWeek(
    revenueData: {date: string; revenue: number}[]
  ): {date: string; revenue: number}[] {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const result: {date: string; revenue: number}[] = days.map((day) => ({
      date: day,
      revenue: 0,
    }));

    // Aggregate revenue by day of week
    for (const item of revenueData) {
      const date = new Date(item.date);
      const dayIndex = date.getDay();
      result[dayIndex].revenue += item.revenue;
    }

    // Reorder to start with Monday
    const monday = result.splice(1, 5);
    return [...monday, ...result];
  }

  private getWeeklyRevenueForMonth(
    revenueData: {date: string; revenue: number}[]
  ): {date: string; revenue: number}[] {
    const result: {date: string; revenue: number}[] = [];
    const weekMap = new Map<number, number>();

    // Group by week
    for (const item of revenueData) {
      const date = new Date(item.date);
      const weekNum = this.getWeekOfMonth(date);

      if (weekMap.has(weekNum)) {
        weekMap.set(weekNum, weekMap.get(weekNum)! + item.revenue);
      } else {
        weekMap.set(weekNum, item.revenue);
      }
    }

    // Convert map to array
    for (const [week, revenue] of weekMap.entries()) {
      result.push({
        date: `Week ${week}`,
        revenue,
      });
    }

    return result.sort(
      (a, b) => parseInt(a.date.split(" ")[1]) - parseInt(b.date.split(" ")[1])
    );
  }

  private getMonthlyRevenueForYear(
    revenueData: {date: string; revenue: number}[]
  ): {date: string; revenue: number}[] {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const result: {date: string; revenue: number}[] = months.map((month) => ({
      date: month,
      revenue: 0,
    }));

    // Aggregate revenue by month
    for (const item of revenueData) {
      const date = new Date(item.date);
      const monthIndex = date.getMonth();
      result[monthIndex].revenue += item.revenue;
    }

    return result;
  }

  private getWeekOfMonth(date: Date): number {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const pastDaysOfMonth = date.getDate() - 1;
    const weekIndex =
      Math.floor((firstDayOfMonth.getDay() + pastDaysOfMonth) / 7) + 1;
    return weekIndex;
  }
}
