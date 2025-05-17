/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpStatus,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@/shared/enums";
import {HttpError} from "@/shared/types";
import {NotificationService} from "./notification.service";
import {PaymentRepository} from "@/data_access/repositories/payment.repository";
import {IPaymentRepository} from "@/data_access/repositories/ipayment.repository";
import {OrderRepository} from "@/data_access/repositories/order.repository";
import {IOrderRepository} from "@/data_access/repositories/iorder.repository";
import {v4 as uuidv4} from "uuid";

export class PaymentService {
  private paymentRepository: IPaymentRepository;
  private orderRepository: IOrderRepository;
  private notificationService: NotificationService;

  constructor() {
    this.paymentRepository = new PaymentRepository();
    this.orderRepository = new OrderRepository();
    this.notificationService = new NotificationService();
  }

  async processPayment(orderId: string, paymentMethod: string): Promise<any> {
    try {
      // Validate order exists and is in Pending status
      const order = await this.orderRepository.findOne(orderId);

      if (!order) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Order not found",
          "ORDER_NOT_FOUND"
        );
      }

      if (order.status !== "Pending") {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          `Cannot process payment for order with status '${order.status}'`,
          "INVALID_ORDER_STATUS"
        );
      }

      // Check if payment already exists
      const existingPayment = await this.paymentRepository.findByOrderId(
        orderId
      );

      if (existingPayment) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Payment already exists for this order",
          "PAYMENT_EXISTS"
        );
      }

      // Validate payment method
      if (
        !Object.values(PaymentMethod).includes(paymentMethod as PaymentMethod)
      ) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Invalid payment method",
          "INVALID_PAYMENT_METHOD"
        );
      }

      // In a real application, this would integrate with payment gateways
      // such as Stripe, PayPal, etc.
      // For this implementation, we'll simulate a successful payment

      // Generate a unique transaction ID
      const transactionId = `TXN-${uuidv4().substring(0, 8)}`;

      // Create payment record
      const payment = await this.paymentRepository.create({
        order_id: orderId,
        payment_method: paymentMethod as PaymentMethod,
        payment_status: PaymentStatus.COMPLETED,
        transaction_id: transactionId,
      });

      // Update order status to Processing
      await this.orderRepository.updateStatus(orderId, OrderStatus.PROCESSING);
      // Send payment confirmation notification
      await this.notificationService.sendPaymentConfirmation(
        order.customer_id,
        orderId,
        transactionId
      );

      return payment;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to process payment",
        "PAYMENT_PROCESSING_ERROR"
      );
    }
  }

  async getPaymentByOrderId(orderId: string): Promise<any> {
    try {
      const payment = await this.paymentRepository.findByOrderId(orderId);

      if (!payment) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Payment not found for this order",
          "PAYMENT_NOT_FOUND"
        );
      }

      return payment;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch payment information",
        "PAYMENT_FETCH_ERROR"
      );
    }
  }

  async processRefund(paymentId: string, reason: string): Promise<any> {
    try {
      // Find the payment
      const payment = await this.paymentRepository.findOne(paymentId);

      if (!payment) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Payment not found",
          "PAYMENT_NOT_FOUND"
        );
      }

      if (payment.payment_status === "Refunded") {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Payment has already been refunded",
          "ALREADY_REFUNDED"
        );
      }

      if (payment.payment_status !== "Completed") {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Can only refund completed payments",
          "INVALID_PAYMENT_STATUS"
        );
      }

      // In a real application, this would integrate with payment gateways
      // to process the actual refund
      // For this implementation, we'll simulate a successful refund

      // Update payment status to Refunded
      const updatedPayment = await this.paymentRepository.update(paymentId, {
        payment_status: PaymentStatus.REFUNDED,
      });

      if (!updatedPayment) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to update payment status",
          "PAYMENT_UPDATE_ERROR"
        );
      }

      // Get the order
      const order = await this.orderRepository.findOne(payment.order_id);

      // Update order status to Cancelled if not already
      if (order && order.status !== "Cancelled") {
        await this.orderRepository.updateStatus(
          payment.order_id,
          OrderStatus.CANCELLED
        );
      }

      // Send refund notification
      if (order) {
        await this.notificationService.createNotification({
          user_id: order.customer_id,
          title: "Payment Refunded",
          message: `Your payment for order #${payment.order_id} has been refunded. Reason: ${reason}`,
          type: "Email",
          is_read: false,
        });
      }

      return updatedPayment;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to process refund",
        "REFUND_PROCESSING_ERROR"
      );
    }
  }

  async getAllPayments(options: {
    page: number;
    limit: number;
    status?: PaymentStatus;
  }): Promise<{
    payments: any[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    try {
      const result = await this.paymentRepository.findAll(options);

      return {
        payments: result.payments,
        total: result.total,
        page: options.page,
        totalPages: Math.ceil(result.total / options.limit),
      };
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch payments",
        "PAYMENTS_FETCH_ERROR"
      );
    }
  }

  async getPaymentAnalytics(
    startDate?: string | null,
    endDate?: string | null
  ): Promise<any> {
    try {
      // Parse date range for the repository
      const startDateTime = startDate ? new Date(startDate) : undefined;
      const endDateTime = endDate ? new Date(endDate) : undefined;

      return await this.paymentRepository.getAnalytics(
        startDateTime,
        endDateTime
      );
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to generate payment analytics",
        "PAYMENT_ANALYTICS_ERROR"
      );
    }
  }

  async validateOrderOwnership(
    orderId: string,
    userId: string
  ): Promise<boolean> {
    try {
      const order = await this.orderRepository.findOne(orderId);
      return !!order && order.customer_id === userId;
    } catch (error) {
      return false;
    }
  }
}
