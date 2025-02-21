/* eslint-disable @typescript-eslint/no-explicit-any */
import {HttpStatus} from "../enums";
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
