// src/lib/api/notificationService.ts
import {apiClient} from "./client";
import {ReadNotificationDTO} from "@/shared/dtos";

export const notificationService = {
  async getNotifications(
    params: {
      page?: number;
      limit?: number;
      unreadOnly?: boolean;
    } = {}
  ) {
    const {page = 1, limit = 10, unreadOnly = false} = params;

    let endpoint = `notifications?page=${page}&limit=${limit}`;

    if (unreadOnly) {
      endpoint += "&unreadOnly=true";
    }

    return apiClient.get<{
      data: {
        notifications: ReadNotificationDTO[];
        total: number;
        unreadCount: number;
      };
    }>(endpoint);
  },

  async markAsRead(id: string) {
    return apiClient.post<{data: ReadNotificationDTO}>(
      `notifications/${id}/read`,
      {}
    );
  },

  async markAllAsRead() {
    return apiClient.post<{success: boolean; count: number}>(
      "notifications/read-all",
      {}
    );
  },
};
