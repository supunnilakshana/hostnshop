// src/lib/api/userService.ts
import {apiClient} from "./client";
import {UpdateUserDTO} from "@/shared/dtos";

export interface User {
  id: string;
  name: string;
  email: string;
  phone_number?: string;
  is_email_verified: boolean;
  created_at: string;
  updated_at: string;
  role: string;
}

export interface UserStatistics {
  totalUsers: number;
  newUsersThisMonth: number;
  activeUsers: number;
  verifiedUsers: number;
}

export const userService = {
  /**
   * Get all users (admin and customers)
   * GET /api/users
   */
  async getAllUsers() {
    return apiClient.get<{data: User[]}>("users");
  },

  /**
   * Get customers only (users with role CUSTOMER)
   * GET /api/users/customers
   */
  async getCustomers() {
    return apiClient.get<{data: User[]}>("users/customers");
  },

  /**
   * Get user by ID
   * GET /api/users/[id]
   */
  async getUserById(id: string) {
    return apiClient.get<{data: User}>(`users/${id}`);
  },

  /**
   * Update user
   * PATCH /api/users/[id]
   */
  async updateUser(id: string, userData: UpdateUserDTO) {
    return apiClient.post<{data: User}>(`users/${id}`, userData);
  },

  /**
   * Delete user
   * DELETE /api/users/[id]
   */
  async deleteUser(id: string) {
    return apiClient.delete<{success: boolean}>(`users/${id}`);
  },

  /**
   * Get user statistics
   * GET /api/users/statistics
   */
  async getUserStatistics() {
    return apiClient.get<{data: UserStatistics}>("users/statistics");
  },

  /**
   * Get user subscription status
   * GET /api/users/[id]/subscription
   */
  async getUserSubscriptionStatus(userId: string) {
    return apiClient.get<{data: {isSubscribed: boolean}}>(
      `users/${userId}/subscription`
    );
  },

  /**
   * Update user subscription status
   * PATCH /api/users/[id]/subscription
   */
  async updateUserSubscription(userId: string, isSubscribed: boolean) {
    return apiClient.post<{data: {success: boolean}}>(
      `users/${userId}/subscription`,
      {
        isSubscribed,
      }
    );
  },
};
