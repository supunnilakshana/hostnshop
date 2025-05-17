// src/app/api/orders/route.ts
import {OrderController} from "@/application/controllers/order.controller";
import {NextRequest, NextResponse} from "next/server";

const orderController = new OrderController();

export async function POST(req: NextRequest): Promise<NextResponse> {
  return orderController.createOrder(req);
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  return orderController.getOrders(req);
}
