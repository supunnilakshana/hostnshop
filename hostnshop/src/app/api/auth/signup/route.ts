import {AuthController} from "@/application/controllers/auth.controller";

import {NextRequest} from "next/server";

const authController = new AuthController();

export async function POST(req: NextRequest) {
  return await authController.signUp(req);
}
