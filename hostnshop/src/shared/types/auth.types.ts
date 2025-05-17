/* eslint-disable @typescript-eslint/no-explicit-any */
import {NextResponse} from "next/server";
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
export interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    phoneNumber?: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  accessToken: string;
  refreshToken: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}
export interface AuthResult {
  success: boolean;
  user?: AuthUser | null;
  error?: NextResponse;
}
