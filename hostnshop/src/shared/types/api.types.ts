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
