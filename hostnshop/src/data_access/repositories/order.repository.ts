/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {prisma} from "../db_client/prisma_client";
import {
  CreateOrderDTO,
  CreateOrderItemDTO,
  ReadOrderDTO,
  UpdateOrderDTO,
} from "@/shared/dtos";

import {OrderMapper} from "../mappers/prisma";
import {OrderStatus} from "@/shared/enums";
import {IOrderRepository} from "./iorder.repository";

export class OrderRepository implements IOrderRepository {
  async create(
    data: CreateOrderDTO,
    orderItems: CreateOrderItemDTO[]
  ): Promise<ReadOrderDTO> {
    try {
      //remove order_id from orderItems as list
      const orderItemsWithoutOrderId = orderItems.map((item) => {
        const {order_id, ...rest} = item;
        return rest;
      });

      const order = await prisma.order.create({
        data: {
          ...data,
          orderItems: {
            create: orderItemsWithoutOrderId,
          },
        },
      });

      return OrderMapper.toReadDTO(order);
    } catch (error) {
      console.error("Error creating order:", error);
      throw new Error("Failed to create order");
    }
  }

  async update(id: string, data: UpdateOrderDTO): Promise<ReadOrderDTO | null> {
    try {
      const order = await prisma.order.update({
        where: {id},
        data: {
          ...data,
          orderItems: {
            deleteMany: {},
          },
        },
      });
      return OrderMapper.toReadDTO(order);
    } catch (error) {
      return null;
    }
  }

  async updateStatus(
    id: string,
    status: OrderStatus
  ): Promise<ReadOrderDTO | null> {
    try {
      const order = await prisma.order.update({
        where: {id},
        data: {status},
      });
      return OrderMapper.toReadDTO(order);
    } catch (error) {
      return null;
    }
  }

  async findOne(id: string): Promise<ReadOrderDTO | null> {
    const order = await prisma.order.findUnique({
      where: {id},
    });
    return order ? OrderMapper.toReadDTO(order) : null;
  }

  async findOneWithDetails(id: string): Promise<any | null> {
    const order = await prisma.order.findUnique({
      where: {id},
      include: {
        customer: {
          select: {
            name: true,
            email: true,
            phone_number: true,
          },
        },
        orderItems: {
          include: {
            product: true,
          },
        },
        payment: true,
      },
    });

    return order ? OrderMapper.toReadDetailedDTO(order) : null;
  }

  async findAll(options?: {
    customerId?: string;
    status?: OrderStatus;
    page?: number;
    limit?: number;
  }): Promise<{
    orders: ReadOrderDTO[];
    total: number;
  }> {
    // Build where clause
    const where: any = {};

    if (options?.customerId) {
      where.customer_id = options.customerId;
    }

    if (options?.status) {
      where.status = options.status;
    }

    // Count total
    const total = await prisma.order.count({where});

    // Get orders with pagination
    const skip =
      options?.page && options?.limit
        ? (options.page - 1) * options.limit
        : undefined;
    const take = options?.limit;

    const orders = await prisma.order.findMany({
      where,
      skip,
      take,
      orderBy: {created_at: "desc"},
      include: {
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      orders: OrderMapper.toReadDTOList(orders),
      total,
    };
  }

  async getAnalytics(startDate?: Date, endDate?: Date): Promise<any> {
    // Build where clause for date range
    const where: any = {};

    if (startDate || endDate) {
      where.created_at = {};

      if (startDate) {
        where.created_at.gte = startDate;
      }

      if (endDate) {
        where.created_at.lte = endDate;
      }
    }

    // Get all orders in date range
    const orders = await prisma.order.findMany({where});

    // Calculate status counts
    const statusCounts: Record<OrderStatus, number> = {
      Pending: 0,
      Processing: 0,
      Shipped: 0,
      Delivered: 0,
      Cancelled: 0,
    };

    let totalRevenue = 0;

    // Group by date for revenue chart
    const revenueByDate: {[date: string]: number} = {};

    for (const order of orders) {
      // Increment status count
      statusCounts[order.status]++;

      // Add to total revenue (if not cancelled)
      if (order.status !== "Cancelled") {
        totalRevenue += order.total_price;
      }

      // Group by date
      const dateStr = order.created_at.toISOString().split("T")[0];
      revenueByDate[dateStr] =
        (revenueByDate[dateStr] || 0) + order.total_price;
    }

    return {
      totalOrders: orders.length,
      totalRevenue,
      averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
      statusCounts,
      revenueByDate: Object.entries(revenueByDate).map(([date, revenue]) => ({
        date,
        revenue,
      })),
    };
  }
}
