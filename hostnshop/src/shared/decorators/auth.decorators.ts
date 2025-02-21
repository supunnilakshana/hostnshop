/* eslint-disable @typescript-eslint/no-explicit-any */
import {BaseController} from "@/application/controllers/base.controller";
import {NextRequest, NextResponse} from "next/server";
import {HttpError, UserRole} from "../types";
import {HttpStatus} from "../enums";

// Define method decorator types
type MethodDecorator = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => PropertyDescriptor;

type ControllerMethod = (
  req: NextRequest,
  ...args: any[]
) => Promise<NextResponse>;

/**
 * Protected route decorator
 * Ensures the endpoint requires authentication
 */
export function Protected(): MethodDecorator {
  return function (
    target: BaseController,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value as ControllerMethod;

    descriptor.value = async function (
      this: BaseController,
      req: NextRequest,
      ...args: any[]
    ): Promise<NextResponse> {
      try {
        // Ensure authentication before proceeding
        await this.requireAuth();
        return await originalMethod.call(this, req, ...args);
      } catch (error) {
        // Handle authentication errors
        const httpError =
          error instanceof HttpError
            ? error
            : new HttpError(HttpStatus.UNAUTHORIZED, "Authentication required");

        return this.sendResponse(this.createResponse(undefined, httpError));
      }
    };

    return descriptor;
  };
}

/**
 * Public route decorator
 * Explicitly marks an endpoint as public (no auth required)
 */
export function Public(): MethodDecorator {
  return function (
    target: BaseController,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value as ControllerMethod;

    descriptor.value = async function (
      this: BaseController,
      req: NextRequest,
      ...args: any[]
    ): Promise<NextResponse> {
      // Mark the method as public by setting skipAuth flag
      this.skipAuth = true;
      return await originalMethod.call(this, req, ...args);
    };

    return descriptor;
  };
}

/**
 * Role-based authorization decorator
 * Ensures the authenticated user has the required roles
 */
export function RequireRoles(role: string): MethodDecorator {
  return function (
    target: BaseController,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value as ControllerMethod;

    descriptor.value = async function (
      this: BaseController,
      req: NextRequest,
      ...args: any[]
    ): Promise<NextResponse> {
      try {
        // First ensure user is authenticated
        await this.requireAuth();

        // Then check roles
        const hasRequiredRole = await this.hasRole(role as UserRole);
        if (!hasRequiredRole) {
          throw new HttpError(HttpStatus.FORBIDDEN, "Insufficient permissions");
        }

        return await originalMethod.call(this, req, ...args);
      } catch (error) {
        const httpError =
          error instanceof HttpError
            ? error
            : new HttpError(HttpStatus.FORBIDDEN, "Authorization required");

        return this.sendResponse(this.createResponse(undefined, httpError));
      }
    };

    return descriptor;
  };
}
