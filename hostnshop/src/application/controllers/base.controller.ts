/* eslint-disable @typescript-eslint/no-explicit-any */
// controllers/base.controller.ts
import {NextRequest, NextResponse} from "next/server";

import {verifyAuth} from "@/shared/middleware/auth.middleware";
import {HttpStatus, UserRole} from "@/shared/enums";
import {ApiResponse, AuthUser, ErrorResponse} from "@/shared/types";
import {ServiceLocator} from "../config/service_locator";

export abstract class BaseController {
  protected serviceLocator: ServiceLocator;

  constructor() {
    this.serviceLocator = ServiceLocator.getInstance();
  }

  protected async handleRequest<T>(
    req: NextRequest,
    handler: (user?: AuthUser | null) => Promise<T>,
    roles: UserRole[] = []
  ): Promise<NextResponse> {
    try {
      // If roles are specified, verify authentication
      if (roles.length > 0) {
        const authResult = await verifyAuth(req, roles);
        if (!authResult.success) {
          return authResult.error!;
        }
        return this.sendSuccess(await handler(authResult.user));
      }

      // No auth required
      return this.sendSuccess(await handler());
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected sendSuccess<T>(
    data: T,
    statusCode: HttpStatus = HttpStatus.OK
  ): NextResponse {
    const response: ApiResponse<T> = {
      success: true,
      data,
      statusCode,
    };
    return NextResponse.json(response, {status: statusCode});
  }

  sendError(error: ErrorResponse): NextResponse {
    const response: ApiResponse = {
      success: false,
      message: error.message,
      statusCode: error.statusCode,
    };
    return NextResponse.json(response, {status: error.statusCode});
  }

  protected handleError(error: any): NextResponse {
    console.error("Error:", error);

    if (error instanceof Error) {
      return this.sendError({
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }

    return this.sendError({
      message: "An unexpected error occurred",
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }

  protected getQueryParam(req: NextRequest, param: string): string | null {
    return req.nextUrl.searchParams.get(param);
  }

  protected async getRequestBody<T>(req: NextRequest): Promise<T> {
    return (await req.json()) as T;
  }

  protected async getUser(req: NextRequest): Promise<AuthUser | null> {
    const authResult = await verifyAuth(req);

    return authResult.success ? authResult.user ?? null : null;
  }
}
