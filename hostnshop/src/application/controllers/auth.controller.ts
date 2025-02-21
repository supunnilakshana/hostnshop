import {NextRequest} from "next/server";
import {BaseController} from "./base.controller";

import {HttpError, HttpStatus} from "@/shared/enums";
import {
  SignInRequest,
  SignUpRequest,
  ChangePasswordRequest,
  ResetPasswordRequest,
  RefreshTokenRequest,
} from "@/shared/types";
import {Public} from "@/shared/decorators/auth.decorators";

export class AuthController extends BaseController {
  /**
   * User registration endpoint
   */
  @Public()
  async signUp(req: NextRequest) {
    try {
      const signUpData = await this.getRequestBody<SignUpRequest>();

      // Basic validation
      if (
        !signUpData.email ||
        !signUpData.password ||
        !signUpData.firstName ||
        !signUpData.lastName
      ) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Missing required fields",
          "VALIDATION_ERROR"
        );
      }

      const result = await this.authService.signUp(signUpData);
      return this.sendResponse(this.createResponse(result));
    } catch (error) {
      return this.sendResponse(this.createResponse(undefined, error));
    }
  }

  /**
   * User login endpoint
   */
  @Public()
  async signIn(req: NextRequest) {
    try {
      const credentials = await this.getRequestBody<SignInRequest>();

      // Basic validation
      if (!credentials.email || !credentials.password) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Email and password are required",
          "VALIDATION_ERROR"
        );
      }

      const result = await this.authService.signIn(credentials);
      return this.sendResponse(this.createResponse(result));
    } catch (error) {
      return this.sendResponse(this.createResponse(undefined, error));
    }
  }

  /**
   * Refresh token endpoint
   */
  @Public()
  async refreshToken(req: NextRequest) {
    try {
      const {refreshToken} = await this.getRequestBody<RefreshTokenRequest>();

      if (!refreshToken) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Refresh token is required",
          "VALIDATION_ERROR"
        );
      }

      const result = await this.authService.refreshTokens(refreshToken);
      return this.sendResponse(this.createResponse(result));
    } catch (error) {
      return this.sendResponse(this.createResponse(undefined, error));
    }
  }

  /**
   * Change password endpoint (requires authentication)
   */
  @Protected()
  async changePassword(req: NextRequest) {
    try {
      const {oldPassword, newPassword} =
        await this.getRequestBody<ChangePasswordRequest>();

      if (!oldPassword || !newPassword) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Old and new passwords are required",
          "VALIDATION_ERROR"
        );
      }

      const currentUser = await this.getCurrentUser();
      await this.authService.changePassword(
        currentUser.id,
        oldPassword,
        newPassword
      );

      return this.sendResponse(
        this.createResponse({message: "Password changed successfully"})
      );
    } catch (error) {
      return this.sendResponse(this.createResponse(undefined, error));
    }
  }

  /**
   * Reset password endpoint (public)
   */
  @Public()
  async resetPassword(req: NextRequest) {
    try {
      const {email} = await this.getRequestBody<ResetPasswordRequest>();

      if (!email) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Email is required",
          "VALIDATION_ERROR"
        );
      }

      await this.authService.resetPassword(email);

      // Always return success for security (even if email doesn't exist)
      return this.sendResponse(
        this.createResponse({
          message: "Password reset instructions sent if email exists",
        })
      );
    } catch (error) {
      return this.sendResponse(this.createResponse(undefined, error));
    }
  }

  /**
   * Validate token endpoint
   */
  @Public()
  async validateToken(req: NextRequest) {
    try {
      const token = this.extractAccessToken();

      if (!token) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "Token is required",
          "VALIDATION_ERROR"
        );
      }

      const isValid = await this.authService.validateToken(token);
      return this.sendResponse(this.createResponse({isValid}));
    } catch (error) {
      return this.sendResponse(this.createResponse(undefined, error));
    }
  }

  /**
   * Get current user profile
   */
  @Protected()
  async getProfile(req: NextRequest) {
    try {
      const currentUser = await this.getCurrentUser();
      const userProfile = await this.authService.getUserFromToken(
        this.accessToken!
      );

      if (!userProfile) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "User profile not found",
          "NOT_FOUND"
        );
      }

      return this.sendResponse(this.createResponse(userProfile));
    } catch (error) {
      return this.sendResponse(this.createResponse(undefined, error));
    }
  }
}
