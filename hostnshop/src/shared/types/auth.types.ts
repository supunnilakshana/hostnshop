/* eslint-disable @typescript-eslint/no-explicit-any */
import {UserRole} from "../enums/auth.enum";

export interface JWTPayload {
  id: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}
