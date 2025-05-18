/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {HttpStatus, OrderStatus} from "@/shared/enums";
import {HttpError} from "@/shared/types";
import {CreateOrderDTO, ReadOrderDTO, CreateOrderItemDTO} from "@/shared/dtos";
import {NotificationService} from "./notification.service";
import {OrderRepository} from "@/data_access/repositories/order.repository";
import {IOrderRepository} from "@/data_access/repositories/iorder.repository";

import {ProductRepository} from "@/data_access/repositories/product.repository";
import {IProductRepository} from "@/data_access/repositories/iproduct.repository";
import {UserRepository} from "@/data_access/repositories/user.repository";
import {IUserRepository} from "@/data_access/repositories/iuser.repository";
import {IOrderItemRepository} from "@/data_access/repositories/iorder_item.repository";
import {OrderItemRepository} from "@/data_access/repositories/order_item.repository";

export class OrderService {
  private orderRepository: IOrderRepository;
  private orderItemRepository: IOrderItemRepository;
  private productRepository: IProductRepository;
  private userRepository: IUserRepository;
  private notificationService: NotificationService;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.orderItemRepository = new OrderItemRepository();
    this.productRepository = new ProductRepository();
    this.userRepository = new UserRepository();
    this.notificationService = new NotificationService();
  }

  async createOrder(
    orderData: CreateOrderDTO & {orderItems?: CreateOrderItemDTO[]}
  ): Promise<ReadOrderDTO> {
    try {
      // Validate customer exists
      const customer = await this.userRepository.findOne(orderData.customer_id);

      if (!customer) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Customer not found",
          "CUSTOMER_NOT_FOUND"
        );
      }

      // Validate order items and check stock availability
      if (!orderData.orderItems || orderData.orderItems.length === 0) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Order must contain at least one item",
          "EMPTY_ORDER"
        );
      }

      // Check product availability and prepare for stock update
      for (const item of orderData.orderItems) {
        const product = await this.productRepository.findOne(item.product_id);

        if (!product) {
          throw new HttpError(
            HttpStatus.BAD_REQUEST,
            `Product with ID ${item.product_id} not found`,
            "PRODUCT_NOT_FOUND"
          );
        }

        if (product.stock_quantity < item.quantity) {
          throw new HttpError(
            HttpStatus.BAD_REQUEST,
            `Not enough stock for product "${product.name}". Available: ${product.stock_quantity}, Requested: ${item.quantity}`,
            "INSUFFICIENT_STOCK"
          );
        }
      }

      // // remove order_id filed from order items
      // // const orderItems: CreateOrderItemDTO[] = orderData.orderItems.map((item) => {

      // //   const {order_id, ...rest} = item;
      // //   return rest;
      // // }
      // );
      // Create order and order items
      const order = await this.orderRepository.create(
        orderData,
        orderData.orderItems
      );

      // Update product stock quantities
      for (const item of orderData.orderItems) {
        const product = await this.productRepository.findOne(item.product_id);
        if (product) {
          await this.productRepository.update(item.product_id, {
            stock_quantity: product.stock_quantity - item.quantity,
          });
        }
      }

      // Send order confirmation notification
      await this.notificationService.createNotification({
        user_id: order.customer_id,
        title: "Order Placed Successfully",
        message: `Your order #${order.id} has been placed successfully and is now being processed.`,
        type: "Email",
        is_read: false,
      });

      // Notify admin about new order
      const adminUsers = await this.userRepository.findByRole("Admin");

      for (const admin of adminUsers) {
        await this.notificationService.createNotification({
          user_id: admin.id,
          title: "New Order Received",
          message: `A new order #${order.id} has been placed by customer (ID: ${order.customer_id}).`,
          type: "Email",
          is_read: false,
        });
      }

      return order;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to create order",
        "ORDER_CREATE_ERROR"
      );
    }
  }

  async getOrders(options: {
    page: number;
    limit: number;
    status?: OrderStatus;
    customerId?: string | null;
  }): Promise<{
    orders: ReadOrderDTO[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    try {
      const result = await this.orderRepository.findAll(options);

      return {
        orders: result.orders,
        total: result.total,
        page: options.page,
        totalPages: Math.ceil(result.total / options.limit),
      };
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch orders",
        "ORDERS_FETCH_ERROR"
      );
    }
  }

  async getOrdersByCustomer(
    customerId: string,
    options: {
      page: number;
      limit: number;
      status?: OrderStatus;
    }
  ): Promise<{
    orders: ReadOrderDTO[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    // Reuse getOrders with customer ID filter
    return this.getOrders({
      ...options,
      customerId,
    });
  }

  async getOrderById(id: string): Promise<any> {
    try {
      const order = await this.orderRepository.findOneWithDetails(id);

      if (!order) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Order not found",
          "ORDER_NOT_FOUND"
        );
      }

      return order;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch order",
        "ORDER_FETCH_ERROR"
      );
    }
  }

  async updateOrderStatus(
    id: string,
    status: OrderStatus
  ): Promise<ReadOrderDTO> {
    try {
      const order = await this.orderRepository.findOne(id);

      if (!order) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Order not found",
          "ORDER_NOT_FOUND"
        );
      }

      // // Validate status transition
      // this.validateStatusTransition(order.status, status);

      const updatedOrder = await this.orderRepository.updateStatus(id, status);

      if (!updatedOrder) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to update order status",
          "ORDER_STATUS_UPDATE_ERROR"
        );
      }

      // Send notification about status change
      await this.notificationService.sendOrderStatusNotification(
        order.customer_id,
        order.id,
        status
      );

      return updatedOrder;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update order status",
        "ORDER_STATUS_UPDATE_ERROR"
      );
    }
  }

  async cancelOrder(id: string): Promise<ReadOrderDTO> {
    try {
      const order = await this.orderRepository.findOneWithDetails(id);

      if (!order) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Order not found",
          "ORDER_NOT_FOUND"
        );
      }

      // Check if order can be cancelled
      if (!["Pending", "Processing"].includes(order.status)) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          `Cannot cancel order with status '${order.status}'`,
          "INVALID_ORDER_STATUS"
        );
      }

      // Restore product stock quantities
      const orderItems = await this.orderItemRepository.findByOrder(id);

      for (const item of orderItems) {
        const product = await this.productRepository.findOne(item.product_id);
        if (product) {
          await this.productRepository.update(item.product_id, {
            stock_quantity: product.stock_quantity + item.quantity,
          });
        }
      }

      // Update order status to cancelled
      const updatedOrder = await this.orderRepository.updateStatus(
        id,
        OrderStatus.CANCELLED
      );

      if (!updatedOrder) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to cancel order",
          "ORDER_CANCEL_ERROR"
        );
      }

      // Send cancellation notification
      await this.notificationService.createNotification({
        user_id: order.customer_id,
        title: "Order Cancelled",
        message: `Your order #${order.id} has been cancelled.`,
        type: "Email",
        is_read: false,
      });

      // Notify admin about cancelled order
      const adminUsers = await this.userRepository.findByRole("Admin");

      for (const admin of adminUsers) {
        await this.notificationService.createNotification({
          user_id: admin.id,
          title: "Order Cancelled",
          message: `Order #${order.id} has been cancelled by customer (ID: ${order.customer_id}).`,
          type: "Email",
          is_read: false,
        });
      }

      return updatedOrder;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to cancel order",
        "ORDER_CANCEL_ERROR"
      );
    }
  }

  async getOrderAnalytics(
    startDate?: string | null,
    endDate?: string | null
  ): Promise<any> {
    try {
      // Parse date range for the repository
      const startDateTime = startDate ? new Date(startDate) : undefined;
      const endDateTime = endDate ? new Date(endDate) : undefined;

      return await this.orderRepository.getAnalytics(
        startDateTime,
        endDateTime
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to generate order analytics",
        "ORDER_ANALYTICS_ERROR"
      );
    }
  }

  // Private helper methods

  // private validateStatusTransition(
  //   currentStatus: OrderStatus,
  //   newStatus: OrderStatus
  // ): void {
  //   // Define valid status transitions
  //   const validTransitions: Record<OrderStatus, OrderStatus[]> = {
  //     Pending: ["Processing", "Cancelled"],
  //     Processing: ["Shipped", "Cancelled"],
  //     Shipped: ["Delivered", "Cancelled"],
  //     Delivered: [], // Terminal state
  //     Cancelled: [], // Terminal state
  //   };

  //   if (!validTransitions[currentStatus].includes(newStatus)) {
  //     throw new HttpError(
  //       HttpStatus.BAD_REQUEST,
  //       `Invalid status transition from '${currentStatus}' to '${newStatus}'`,
  //       "INVALID_STATUS_TRANSITION"
  //     );
  //   }
  // }
}
