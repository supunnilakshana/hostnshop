import {NextRequest} from "next/server";
import {BaseController} from "./base.controller";
import {HttpStatus, UserRole} from "@/shared/enums";
import {PaymentService} from "../services/payment.service";

export class PaymentController extends BaseController {
  private paymentService: PaymentService;

  constructor() {
    super();
    this.paymentService = new PaymentService();
  }

  async processPayment(req: NextRequest) {
    return this.handleRequest(
      req,
      async (user) => {
        if (!user) {
          return this.sendError({
            message: "User authentication required",
            statusCode: HttpStatus.UNAUTHORIZED,
          });
        }

        const {order_id, payment_method} = await this.getRequestBody<{
          order_id: string;
          payment_method: string;
        }>(req);

        // Verify the user owns this order if they're a customer
        if (user.role === UserRole.CUSTOMER) {
          const isUserOrder = await this.paymentService.validateOrderOwnership(
            order_id,
            user.id
          );
          if (!isUserOrder) {
            return this.sendError({
              message: "You are not authorized to make payment for this order",
              statusCode: HttpStatus.FORBIDDEN,
            });
          }
        }

        return await this.paymentService.processPayment(
          order_id,
          payment_method
        );
      },
      [UserRole.CUSTOMER, UserRole.ADMIN]
    );
  }

  async getPaymentByOrderId(req: NextRequest) {
    return this.handleRequest(
      req,
      async (user) => {
        const order_id = req.nextUrl.pathname.split("/").pop();
        if (!order_id) {
          return this.sendError({
            message: "Order ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        // Verify the user owns this order if they're a customer
        if (user?.role === UserRole.CUSTOMER) {
          const isUserOrder = await this.paymentService.validateOrderOwnership(
            order_id,
            user.id
          );
          if (!isUserOrder) {
            return this.sendError({
              message: "You are not authorized to view payment for this order",
              statusCode: HttpStatus.FORBIDDEN,
            });
          }
        }

        return await this.paymentService.getPaymentByOrderId(order_id);
      },
      [UserRole.CUSTOMER, UserRole.ADMIN]
    );
  }

  async processRefund(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const {payment_id, reason} = await this.getRequestBody<{
          payment_id: string;
          reason: string;
        }>(req);

        return await this.paymentService.processRefund(payment_id, reason);
      },
      [UserRole.ADMIN]
    );
  }

  async getAllPayments(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const page = parseInt(this.getQueryParam(req, "page") || "1");
        const limit = parseInt(this.getQueryParam(req, "limit") || "10");
        const status = this.getQueryParam(req, "status");

        return await this.paymentService.getAllPayments({
          page,
          limit,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          status: status as any,
        });
      },
      [UserRole.ADMIN]
    );
  }

  async getPaymentAnalytics(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const startDate = this.getQueryParam(req, "startDate");
        const endDate = this.getQueryParam(req, "endDate");

        return await this.paymentService.getPaymentAnalytics(
          startDate,
          endDate
        );
      },
      [UserRole.ADMIN]
    );
  }
}
