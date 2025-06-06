// src/app/api/users/route.ts
import {NextRequest, NextResponse} from "next/server";
import {UserController} from "@/application/controllers/user.controller";

const userController = new UserController();

export async function GET(req: NextRequest): Promise<NextResponse> {
  return userController.getAllUsers(req);
}
