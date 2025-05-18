// src/app/api/users/statistics/route.ts
import {NextRequest, NextResponse} from "next/server";
import {UserController} from "@/application/controllers/user.controller";

const userController = new UserController();

export async function GET(req: NextRequest): Promise<NextResponse> {
  return userController.getUserStatistics(req);
}
