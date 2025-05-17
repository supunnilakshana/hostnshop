/* eslint-disable @typescript-eslint/no-explicit-any */
import {NextRequest} from "next/server";
import {BaseController} from "./base.controller";
import {HttpStatus, OrderStatus, UserRole} from "@/shared/enums";
import {OrderService} from "../services/order.service";
import {CreateOrderDTO, UpdateOrderDTO} from "@/shared/dtos";

export class OrderController extends BaseController {
  private orderService: OrderService;

  constructor() {
    super();
    this.orderService = new OrderService();
  }

  async createOrder(req: NextRequest) {
    return this.handleRequest(
      req,
      async (user) => {
        if (!user) {
          return this.sendError({
            message: "User authentication required",
            statusCode: HttpStatus.UNAUTHORIZED,
          });
        }

        const orderData = await this.getRequestBody<CreateOrderDTO>(req);
        // Set the customer ID to the authenticated user's ID
        orderData.customer_id = user.id;

        return await this.orderService.createOrder(orderData);
      },
      [UserRole.CUSTOMER, UserRole.ADMIN]
    );
  }

  async getOrders(req: NextRequest) {
    return this.handleRequest(
      req,
      async (user) => {
        const page = parseInt(this.getQueryParam(req, "page") || "1");
        const limit = parseInt(this.getQueryParam(req, "limit") || "10");
        const status = this.getQueryParam(req, "status");

        // If admin, they can see all orders, otherwise only the user's orders
        if (user?.role === UserRole.ADMIN) {
          const customerId = this.getQueryParam(req, "customerId");
          return await this.orderService.getOrders({
            page,
            limit,
            status: status as any,
            customerId,
          });
        } else if (user) {
          return await this.orderService.getOrdersByCustomer(user.id, {
            page,
            limit,
            status: status as any,
          });
        }

        return this.sendError({
          message: "Unauthorized",
          statusCode: HttpStatus.UNAUTHORIZED,
        });
      },
      [UserRole.CUSTOMER, UserRole.ADMIN]
    );
  }

  async getOrderById(req: NextRequest) {
    return this.handleRequest(
      req,
      async (user) => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "Order ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        const order = await this.orderService.getOrderById(id);

        // If user is not admin, verify they own this order
        if (user?.role !== UserRole.ADMIN && order.customer_id !== user?.id) {
          return this.sendError({
            message: "You are not authorized to view this order",
            statusCode: HttpStatus.FORBIDDEN,
          });
        }

        return order;
      },
      [UserRole.CUSTOMER, UserRole.ADMIN]
    );
  }

  async updateOrderStatus(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "Order ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        const {status} = await this.getRequestBody<{
          status: UpdateOrderDTO["status"];
        }>(req);

        // statuss take as OrderStatus
        if (!status) {
          return this.sendError({
            message: "Status is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        return await this.orderService.updateOrderStatus(
          id,
          this.mapStringToOrderStatus(status)
        );
      },
      [UserRole.ADMIN]
    );
  }

  async cancelOrder(req: NextRequest) {
    return this.handleRequest(
      req,
      async (user) => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "Order ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        // If customer is cancelling, verify they own this order
        if (user?.role === UserRole.CUSTOMER) {
          const order = await this.orderService.getOrderById(id);
          if (order.customer_id !== user.id) {
            return this.sendError({
              message: "You are not authorized to cancel this order",
              statusCode: HttpStatus.FORBIDDEN,
            });
          }
        }

        return await this.orderService.cancelOrder(id);
      },
      [UserRole.CUSTOMER, UserRole.ADMIN]
    );
  }

  async getOrderAnalytics(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const startDate = this.getQueryParam(req, "startDate");
        const endDate = this.getQueryParam(req, "endDate");

        return await this.orderService.getOrderAnalytics(startDate, endDate);
      },
      [UserRole.ADMIN]
    );
  }

  private mapStringToOrderStatus(status: string): OrderStatus {
    switch (status) {
      case "Pending":
        return OrderStatus.PENDING;
      case "Processing":
        return OrderStatus.PROCESSING;
      case "Shipped":
        return OrderStatus.SHIPPED;
      case "Delivered":
        return OrderStatus.DELIVERED;
      case "Cancelled":
        return OrderStatus.CANCELLED;
      default:
        throw new Error(`Invalid order status: ${status}`);
    }
  }
}
