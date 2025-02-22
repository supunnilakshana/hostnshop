/* eslint-disable @typescript-eslint/no-explicit-any */

import {HttpStatus} from "../enums";

export interface ApiErrorResponse {
  code: string;
  message: string;
  details?: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  statusCode: number;
}

export interface ErrorResponse {
  message: string;
  statusCode: HttpStatus;
}

export class HttpError extends Error {
  constructor(
    public statusCode: HttpStatus,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = "HttpError";
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
