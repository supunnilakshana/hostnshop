/* eslint-disable @typescript-eslint/no-unused-vars */

// src/app/api/orders/[id]/cancel/route.ts
import {NextRequest, NextResponse} from "next/server";
import {OrderController} from "@/application/controllers/order.controller";

const orderController = new OrderController();

export async function POST(
  req: NextRequest,
  {params}: {params: {id: string}}
): Promise<NextResponse> {
  // We're not using params.id directly as the controller extracts it from pathname
  return orderController.cancelOrder(req);
}
