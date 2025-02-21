/* eslint-disable @typescript-eslint/no-explicit-any */
import {NextRequest} from "next/server";

export interface ApiErrorResponse {
  code: string;
  message: string;
  details?: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiErrorResponse;
  requestId: string;
  timestamp: string;
}
export type HandlerMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type RouteHandler = () => Promise<unknown>;

export type RouteConfig = {
  GET?: RouteHandler;
  POST?: RouteHandler;
  PUT?: RouteHandler;
  DELETE?: RouteHandler;
  PATCH?: RouteHandler;
};

export type Middleware = (request: NextRequest) => Promise<void | Error>;
