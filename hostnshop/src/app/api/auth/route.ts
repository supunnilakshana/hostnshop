import {AuthController} from "@/application/controllers/auth.controller";
import {HttpStatus} from "@/shared/enums";
import {NextRequest} from "next/server";

const authController = new AuthController();

export async function POST(req: NextRequest) {
  const path = req.nextUrl.pathname;

  switch (path) {
    case "/api/auth/login":
      return await authController.login(req);
    case "/api/auth":
      return await authController.updateProfile(req);
    default:
      return authController.sendError({
        message: "Endpoint not found",
        statusCode: HttpStatus.NOT_FOUND,
      });
  }
}
