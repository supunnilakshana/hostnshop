import {Notification} from "@prisma/client";
import {ReadNotificationDTO} from "@/shared/dtos";

export class NotificationMapper {
  static toReadDTO(notification: Notification): ReadNotificationDTO {
    return {
      id: notification.id,
      user_id: notification.user_id,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      is_read: notification.is_read,
      created_at: notification.created_at.toISOString(),
    };
  }

  static toReadDTOList(notifications: Notification[]): ReadNotificationDTO[] {
    return notifications.map((notification) => this.toReadDTO(notification));
  }
}
