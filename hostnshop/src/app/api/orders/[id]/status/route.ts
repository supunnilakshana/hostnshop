/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/api/orders/[id]/status/route.ts
import {NextRequest, NextResponse} from "next/server";
import {OrderController} from "@/application/controllers/order.controller";

const orderController = new OrderController();

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  return orderController.updateOrderStatus(req);
}
