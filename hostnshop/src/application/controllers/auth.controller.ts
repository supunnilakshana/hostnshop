/* eslint-disable @typescript-eslint/no-unused-vars */
// controllers/auth.controller.ts
import {NextRequest} from "next/server";
import {BaseController} from "./base.controller";
import {UserRole} from "@/shared/enums/auth.enum";
import {JWTUtil} from "@/shared/utils/jwt_util";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
  accessToken: string;
}

export class AuthController extends BaseController {
  // Login endpoint
  async login(req: NextRequest) {
    return this.handleRequest(req, async () => {
      const {email, password} = await this.getRequestBody<LoginRequest>(req);

      // In real app, verify from database
      // This is just for demonstration
      if (email === "admin@example.com" && password === "admin123") {
        const user = {
          id: "1",
          email,
          role: UserRole.ADMIN,
        };

        const accessToken = JWTUtil.generateAccessToken(user);

        const response: AuthResponse = {
          user,
          accessToken,
        };

        return response;
      }

      if (email === "user@example.com" && password === "user123") {
        const user = {
          id: "2",
          email,
          role: UserRole.USER,
        };

        const accessToken = JWTUtil.generateAccessToken(user);

        const response: AuthResponse = {
          user,
          accessToken,
        };

        return response;
      }

      throw new Error("Invalid credentials");
    });
  }

  // Register endpoint
  async register(req: NextRequest) {
    return this.handleRequest(req, async () => {
      const {email, password, name} =
        await this.getRequestBody<RegisterRequest>(req);

      // In real app, save to database
      // This is just for demonstration
      const user = {
        id: Date.now().toString(),
        email,
        role: UserRole.USER,
      };

      const accessToken = JWTUtil.generateAccessToken(user);

      const response: AuthResponse = {
        user,
        accessToken,
      };

      return response;
    });
  } // Update profile endpoint
  async updateProfile(req: NextRequest) {
    return this.handleRequest(
      req,
      async (user) => {
        // Your database update logic here
        return {
          id: "1",
          email: "ddd",
        };
      },
      [UserRole.USER, UserRole.ADMIN]
    );
  }
}
