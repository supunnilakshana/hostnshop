// src/lib/api/authService.ts
import {apiClient} from "./client";
import {SignInRequest, SignUpRequest, AuthResponse} from "@/shared/types";

export const authService = {
  async signin(credentials: SignInRequest) {
    return apiClient.post<{data: AuthResponse}>("auth/signin", credentials, {
      token: false,
    });
  },

  async signup(userData: SignUpRequest) {
    return apiClient.post<{data: AuthResponse}>("auth/signup", userData, {
      token: false,
    });
  },

  async refreshToken(refreshToken: string) {
    return apiClient.post<{
      data: {accessToken: string; refreshToken: string};
    }>("auth/refresh", {refreshToken}, {token: false});
  },

  async changePassword(oldPassword: string, newPassword: string) {
    return apiClient.post<{success: boolean}>("auth/change-password", {
      oldPassword,
      newPassword,
    });
  },

  async resetPassword(email: string) {
    return apiClient.post<{success: boolean}>(
      "auth/reset-password",
      {email},
      {token: false}
    );
  },
};
