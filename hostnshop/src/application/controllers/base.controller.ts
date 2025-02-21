/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {ApiResponse, JWTPayload, UserRole} from "@/shared/types";
import {NextRequest, NextResponse} from "next/server";
import {AuthService} from "../services/auth_service";
import {JWTUtil} from "@/shared/utils/jwt_util";
import {HttpStatus} from "@/shared/enums";

export class HttpError extends Error {
  constructor(
    public readonly status: HttpStatus,
    message: string,
    public readonly code: string = "ERROR",
    public readonly details?: any
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export class BaseController {
  protected request: NextRequest;
  protected accessToken?: string;
  protected currentUser?: JWTPayload | null;
  protected requestId: string;
  protected authService: AuthService;
  protected skipAuth: boolean = false;

  constructor(request: NextRequest) {
    this.request = request;
    this.requestId = this.generateRequestId();
    this.authService = new AuthService();
    this.accessToken = this.extractAccessToken();

    if (this.accessToken) {
      try {
        this.currentUser = JWTUtil.decodeToken(this.accessToken);
      } catch (error) {
        console.warn(`Failed to decode token: ${error}`);
      }
    }
  }

  /**
   * Generate unique request ID
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Extract JWT token from Authorization header
   */
  private extractAccessToken(): string | undefined {
    const authHeader = this.request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return undefined;
    return authHeader.slice(7);
  }

  /**
   * Require authentication for protected routes
   */
  protected async requireAuth(): Promise<void> {
    if (this.skipAuth) return;

    if (!this.accessToken) {
      throw new HttpError(
        HttpStatus.UNAUTHORIZED,
        "No authentication token provided",
        "AUTH_MISSING"
      );
    }

    try {
      this.currentUser = JWTUtil.verifyAccessToken(this.accessToken);
    } catch (error) {
      throw new HttpError(
        HttpStatus.UNAUTHORIZED,
        "Invalid or expired token",
        "AUTH_INVALID"
      );
    }
  }

  /**
   * Get current authenticated user
   */
  protected async getCurrentUser(): Promise<JWTPayload> {
    await this.requireAuth();
    if (!this.currentUser) {
      throw new HttpError(
        HttpStatus.UNAUTHORIZED,
        "User not authenticated",
        "AUTH_REQUIRED"
      );
    }
    return this.currentUser;
  }

  /**
   * Check if user has required roles
   */
  protected async hasRole(requiredRoles: UserRole): Promise<boolean> {
    try {
      if (!this.currentUser) {
        await this.requireAuth();
      }

      if (!this.currentUser?.role) {
        return false;
      }

      return requiredRoles.includes(this.currentUser.role as UserRole);
    } catch (error) {
      return false;
    }
  }

  /**
   * Get user's roles
   */
  protected async getUserRoles(): Promise<UserRole> {
    try {
      if (!this.currentUser) {
        await this.requireAuth();
      }
      return this.currentUser?.role as UserRole;
    } catch (error) {
      return "Customer";
    }
  }

  /**
   * Parse request body
   */
  protected async getRequestBody<T>(): Promise<T> {
    try {
      return await this.request.json();
    } catch (error) {
      throw new HttpError(
        HttpStatus.BAD_REQUEST,
        "Invalid request body",
        "INVALID_BODY"
      );
    }
  }

  /**
   * Get query parameters
   */
  protected getQueryParams(): URLSearchParams {
    const url = new URL(this.request.url);
    return url.searchParams;
  }

  /**
   * Get specific query parameter
   */
  protected getQueryParam(key: string): string | null {
    return this.getQueryParams().get(key);
  }

  /**
   * Get URL parameters
   */
  protected getUrlParams(): {[key: string]: string} {
    const url = new URL(this.request.url);
    const params: {[key: string]: string} = {};

    // Extract parameters from path segments
    const pathSegments = url.pathname.split("/");
    const paramRegex = /\[(\w+)\]/;

    pathSegments.forEach((segment) => {
      const match = segment.match(paramRegex);
      if (match) {
        params[match[1]] = segment;
      }
    });

    return params;
  }

  /**
   * Create standardized API response
   */
  protected createResponse<T>(
    data?: T,
    error?: Error,
    status: HttpStatus = HttpStatus.OK
  ): ApiResponse<T> {
    if (error) {
      const httpError =
        error instanceof HttpError
          ? error
          : new HttpError(
              HttpStatus.INTERNAL_SERVER_ERROR,
              error.message,
              "INTERNAL_ERROR"
            );

      return {
        success: false,
        error: {
          code: httpError.code,
          message: httpError.message,
          details: httpError.details,
        },
        requestId: this.requestId,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      success: true,
      data,
      requestId: this.requestId,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Send API response
   */
  protected sendResponse<T>(
    response: ApiResponse<T>,
    headers: HeadersInit = {}
  ): NextResponse {
    const status = response.success
      ? HttpStatus.OK
      : response.error?.code === "NOT_FOUND"
      ? HttpStatus.NOT_FOUND
      : response.error?.code === "AUTH_REQUIRED"
      ? HttpStatus.UNAUTHORIZED
      : response.error?.code === "FORBIDDEN"
      ? HttpStatus.FORBIDDEN
      : HttpStatus.BAD_REQUEST;

    return NextResponse.json(response, {
      status,
      headers: {
        "Content-Type": "application/json",
        "X-Request-ID": this.requestId,
        ...headers,
      },
    });
  }

  /**
   * Handle successful response
   */
  protected async handleSuccess<T>(
    data?: T,
    status: HttpStatus = HttpStatus.OK
  ): Promise<NextResponse> {
    const response = this.createResponse(data);
    return this.sendResponse(response);
  }

  /**
   * Handle error response
   */
  protected async handleError(error: Error): Promise<NextResponse> {
    const response = this.createResponse(undefined, error);
    return this.sendResponse(response);
  }

  /**
   * Validate pagination parameters
   */
  protected getPaginationParams(): {page: number; limit: number} {
    const params = this.getQueryParams();
    const page = Math.max(1, parseInt(params.get("page") || "1", 10));
    const limit = Math.min(
      100,
      Math.max(1, parseInt(params.get("limit") || "10", 10))
    );
    return {page, limit};
  }

  /**
   * Get client IP address
   */
  protected getClientIP(): string {
    return (
      this.request.headers.get("x-forwarded-for") ||
      this.request.headers.get("x-real-ip") ||
      "unknown"
    );
  }

  /**
   * Log request details
   */
  protected async logRequest(
    method: string,
    path: string,
    metadata?: Record<string, unknown>
  ): Promise<void> {
    const logEntry = {
      timestamp: new Date().toISOString(),
      requestId: this.requestId,
      method,
      path,
      userId: this.currentUser?.id,
      userEmail: this.currentUser?.email,
      userRoles: this.currentUser?.role,
      ip: this.getClientIP(),
      userAgent: this.request.headers.get("user-agent"),
      metadata,
    };

    console.log(JSON.stringify(logEntry));
  }
}
