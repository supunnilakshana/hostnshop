/* eslint-disable @typescript-eslint/no-unused-vars */
import {NextRequest, NextResponse} from "next/server";
import {AuthResult, AuthUser} from "../types";
import {HttpStatus, UserRole} from "../enums";
import {JWTUtil} from "../utils/jwt_util";

export async function verifyAuth(
  req: NextRequest,
  allowedRoles: UserRole[] = []
): Promise<AuthResult> {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return {
        success: false,
        error: new NextResponse(
          JSON.stringify({
            message: "No token provided",
            statusCode: HttpStatus.UNAUTHORIZED,
          }),
          {status: HttpStatus.UNAUTHORIZED}
        ),
      };
    }

    const user = JWTUtil.verifyAccessToken(token);

    if (allowedRoles.length && !allowedRoles.includes(user.role as UserRole)) {
      return {
        success: false,
        error: new NextResponse(
          JSON.stringify({
            message: "Insufficient permissions",
            statusCode: HttpStatus.FORBIDDEN,
          }),
          {status: HttpStatus.FORBIDDEN}
        ),
      };
    }

    return {
      success: true,
      user: user as AuthUser,
    };
  } catch (error) {
    return {
      success: false,
      error: new NextResponse(
        JSON.stringify({
          message: "Authentication failed",
          statusCode: HttpStatus.UNAUTHORIZED,
        }),
        {status: HttpStatus.UNAUTHORIZED}
      ),
    };
  }
}
