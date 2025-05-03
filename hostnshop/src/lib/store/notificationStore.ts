/* eslint-disable @typescript-eslint/no-unused-vars */
// src/lib/store/notificationStore.ts
import {create} from "zustand";
import {ReadNotificationDTO} from "@/shared/dtos";

interface NotificationState {
  notifications: ReadNotificationDTO[];
  unreadCount: number;
  addNotification: (notification: ReadNotificationDTO) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  fetchNotifications: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + (notification.is_read ? 0 : 1),
    }));
  },

  markAsRead: (id) => {
    set((state) => {
      const updatedNotifications = state.notifications.map((notification) =>
        notification.id === id ? {...notification, is_read: true} : notification
      );

      const unreadCount = updatedNotifications.filter((n) => !n.is_read).length;

      return {notifications: updatedNotifications, unreadCount};
    });
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        is_read: true,
      })),
      unreadCount: 0,
    }));
  },

  fetchNotifications: async () => {
    try {
      const response = await fetch("/api/notifications");
      const data = await response.json();

      if (data.success) {
        set({
          notifications: data.data.notifications,
          unreadCount: data.data.unreadCount,
        });
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  },
}));
