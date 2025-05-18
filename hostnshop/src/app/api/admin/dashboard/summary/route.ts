// src/app/api/admin/dashboard/summary/route.ts
import {DashboardController} from "@/application/controllers/dashboard.controller";
import {NextRequest} from "next/server";

const dashboardController = new DashboardController();

export async function GET(req: NextRequest) {
  return await dashboardController.getDashboardSummary(req);
}
