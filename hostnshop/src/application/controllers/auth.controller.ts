/* eslint-disable @typescript-eslint/no-explicit-any */
// controllers/auth.controller.ts
import {NextRequest} from "next/server";
import {BaseController} from "./base.controller";

import {HttpStatus} from "@/shared/enums";
import {SignInRequest, SignUpRequest} from "@/shared/types";

export class AuthController extends BaseController {
  async signUp(req: NextRequest) {
    try {
      const data = await this.getRequestBody<SignUpRequest>(req);
      const authService = this.serviceLocator.getAuthService();
      const result = await authService.signUp(data);
      return this.sendSuccess(result, HttpStatus.CREATED);
    } catch (error: any) {
      return this.sendError({
        message: error.message,
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async signIn(req: NextRequest) {
    try {
      const credentials = await this.getRequestBody<SignInRequest>(req);
      const authService = this.serviceLocator.getAuthService();
      const result = await authService.signIn(credentials);
      return this.sendSuccess(result);
    } catch (error: any) {
      return this.sendError({
        message: error.message,
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async refreshToken(req: NextRequest) {
    try {
      const {refreshToken} = await this.getRequestBody<{refreshToken: string}>(
        req
      );
      const authService = this.serviceLocator.getAuthService();
      const result = await authService.refreshTokens(refreshToken);
      return this.sendSuccess(result);
    } catch (error: any) {
      return this.sendError({
        message: error.message,
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async changePassword(req: NextRequest) {
    try {
      const {oldPassword, newPassword} = await this.getRequestBody<{
        oldPassword: string;
        newPassword: string;
      }>(req);

      const user = await this.getUser(req);
      if (!user) {
        return this.sendError({
          message: "User not authenticated",
          statusCode: HttpStatus.UNAUTHORIZED,
        });
      }

      const authService = this.serviceLocator.getAuthService();
      await authService.changePassword(user.id, oldPassword, newPassword);
      return this.sendSuccess({message: "Password changed successfully"});
    } catch (error: any) {
      return this.sendError({
        message: error.message,
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async resetPassword(req: NextRequest) {
    try {
      const {email} = await this.getRequestBody<{email: string}>(req);
      const authService = this.serviceLocator.getAuthService();
      await authService.resetPassword(email);
      return this.sendSuccess({
        message:
          "If the email exists, password reset instructions will be sent",
      });
    } catch (error: any) {
      return this.sendError({
        message: error.message,
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async validateToken(req: NextRequest) {
    try {
      const token = req.headers.get("authorization")?.split(" ")[1];
      if (!token) {
        return this.sendError({
          message: "No token provided",
          statusCode: HttpStatus.UNAUTHORIZED,
        });
      }

      const authService = this.serviceLocator.getAuthService();
      const isValid = await authService.validateToken(token);
      if (!isValid) {
        return this.sendError({
          message: "Invalid token",
          statusCode: HttpStatus.UNAUTHORIZED,
        });
      }

      return this.sendSuccess({valid: true});
    } catch (error: any) {
      return this.sendError({
        message: error.message,
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }
  }
}
