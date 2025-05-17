/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {prisma} from "../db_client/prisma_client";
import {IPaymentRepository} from "./ipayment.repository";
import {PaymentMapper} from "../mappers/prisma";
import {PaymentMethod, PaymentStatus} from "@/shared/enums";

export class PaymentRepository implements IPaymentRepository {
  async create(data: {
    order_id: string;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;
    transaction_id?: string;
  }): Promise<any> {
    const payment = await prisma.payment.create({data});
    return PaymentMapper.toReadDTO(payment);
  }

  async update(
    id: string,
    data: {
      payment_status: PaymentStatus;
    }
  ): Promise<any | null> {
    try {
      const payment = await prisma.payment.update({
        where: {id},
        data,
      });
      return PaymentMapper.toReadDTO(payment);
    } catch (error) {
      return null;
    }
  }

  async findOne(id: string): Promise<any | null> {
    const payment = await prisma.payment.findUnique({
      where: {id},
    });
    return payment ? PaymentMapper.toReadDTO(payment) : null;
  }

  async findByOrderId(orderId: string): Promise<any | null> {
    const payment = await prisma.payment.findUnique({
      where: {order_id: orderId},
    });
    return payment ? PaymentMapper.toReadDTO(payment) : null;
  }

  async findAll(options?: {
    status?: PaymentStatus;
    page?: number;
    limit?: number;
  }): Promise<{
    payments: any[];
    total: number;
  }> {
    // Build where clause
    const where: any = {};

    if (options?.status) {
      where.payment_status = options.status;
    }

    // Count total
    const total = await prisma.payment.count({where});

    // Get payments with pagination
    const skip =
      options?.page && options?.limit
        ? (options.page - 1) * options.limit
        : undefined;
    const take = options?.limit;

    const payments = await prisma.payment.findMany({
      where,
      skip,
      take,
      orderBy: {created_at: "desc"},
      include: {
        order: {
          include: {
            customer: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return {
      payments: payments.map((payment) =>
        PaymentMapper.toReadDetailedDTO(payment)
      ),
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

    // Get all payments in date range
    const payments = await prisma.payment.findMany({
      where,
      include: {order: true},
    });

    // Initialize payment method breakdown
    const paymentMethodBreakdown: Record<
      PaymentMethod,
      {count: number; amount: number}
    > = {
      CreditCard: {count: 0, amount: 0},
      PayPal: {count: 0, amount: 0},
      BankTransfer: {count: 0, amount: 0},
    };

    let totalRevenue = 0;
    let totalRefunded = 0;

    // Group by date for revenue chart
    const revenueByDate: {[date: string]: number} = {};

    for (const payment of payments) {
      const method = payment.payment_method;
      const amount = payment.order.total_price;

      // Update payment method breakdown
      paymentMethodBreakdown[method].count++;
      paymentMethodBreakdown[method].amount += amount;

      // Update revenue/refund totals
      if (payment.payment_status === "Completed") {
        totalRevenue += amount;

        // Group revenue by date
        const dateStr = payment.created_at.toISOString().split("T")[0];
        revenueByDate[dateStr] = (revenueByDate[dateStr] || 0) + amount;
      } else if (payment.payment_status === "Refunded") {
        totalRefunded += amount;
      }
    }

    return {
      totalPayments: payments.length,
      totalRevenue,
      totalRefunded,
      paymentMethodBreakdown,
      revenueByDate: Object.entries(revenueByDate).map(([date, revenue]) => ({
        date,
        revenue,
      })),
    };
  }
}
