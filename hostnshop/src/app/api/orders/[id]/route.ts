// src/app/api/orders/[id]/route.ts
import {NextRequest, NextResponse} from "next/server";
import {OrderController} from "@/application/controllers/order.controller";

const orderController = new OrderController();

export async function GET(req: NextRequest): Promise<NextResponse> {
  return orderController.getOrderById(req);
}
