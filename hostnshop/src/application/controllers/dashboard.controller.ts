/* eslint-disable @typescript-eslint/no-unused-vars */
// src/application/controllers/dashboard.controller.ts
import {NextRequest} from "next/server";
import {BaseController} from "./base.controller";
import {HttpStatus, UserRole} from "@/shared/enums";
import {DashboardService} from "../services/dashboard.service";

export class DashboardController extends BaseController {
  private dashboardService: DashboardService;

  constructor() {
    super();
    this.dashboardService = new DashboardService();
  }

  async getDashboardSummary(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        return await this.dashboardService.getDashboardSummary();
      },
      [UserRole.ADMIN]
    );
  }

  async getRecentOrders(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const limitParam = this.getQueryParam(req, "limit");
        const limit = limitParam ? parseInt(limitParam) : 5;
        return await this.dashboardService.getRecentOrders(limit);
      },
      [UserRole.ADMIN]
    );
  }

  async getLowStockProducts(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const thresholdParam = this.getQueryParam(req, "threshold");
        const threshold = thresholdParam ? parseInt(thresholdParam) : 5;
        return await this.dashboardService.getLowStockProducts(threshold);
      },
      [UserRole.ADMIN]
    );
  }

  async getAnalytics(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const timeframe = this.getQueryParam(req, "timeframe") || "week";
        const startDateParam = this.getQueryParam(req, "startDate");
        const endDateParam = this.getQueryParam(req, "endDate");

        const startDate = startDateParam ? new Date(startDateParam) : undefined;
        const endDate = endDateParam ? new Date(endDateParam) : undefined;

        return await this.dashboardService.getRevenueAnalytics(
          timeframe,
          startDate,
          endDate
        );
      },
      [UserRole.ADMIN]
    );
  }
}
