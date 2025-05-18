import {NextRequest} from "next/server";
import {OrderController} from "@/application/controllers/order.controller";

const orderController = new OrderController();

export async function GET(req: NextRequest) {
  return await orderController.getOrders(req);
}

export async function POST(req: NextRequest) {
  return await orderController.createOrder(req);
}
