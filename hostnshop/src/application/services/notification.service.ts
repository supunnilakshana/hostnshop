/* eslint-disable @typescript-eslint/no-unused-vars */
import {HttpStatus, NotificationType, UserRole} from "@/shared/enums";
import {HttpError} from "@/shared/types";
import {CreateNotificationDTO, ReadNotificationDTO} from "@/shared/dtos";
import {NotificationRepository} from "@/data_access/repositories/notification.repository";
import {INotificationRepository} from "@/data_access/repositories/inotification.repository";
import {UserRepository} from "@/data_access/repositories/user.repository";
import {IUserRepository} from "@/data_access/repositories/iuser.repository";

export class NotificationService {
  private notificationRepository: INotificationRepository;
  private userRepository: IUserRepository;

  constructor() {
    this.notificationRepository = new NotificationRepository();
    this.userRepository = new UserRepository();
  }

  async createNotification(
    data: CreateNotificationDTO
  ): Promise<ReadNotificationDTO> {
    try {
      // Validate user exists
      const user = await this.userRepository.findOne(data.user_id);

      if (!user) {
        throw new HttpError(
          HttpStatus.BAD_REQUEST,
          "User not found",
          "USER_NOT_FOUND"
        );
      }

      const notification = await this.notificationRepository.create(data);

      // In a real-world scenario, we would send the actual notification here
      // based on the notification type (Email, Push, SMS)
      await this.sendRealTimeNotification(notification);

      return notification;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to create notification",
        "NOTIFICATION_CREATE_ERROR"
      );
    }
  }

  async getUserNotifications(
    userId: string,
    options: {
      page: number;
      limit: number;
      unreadOnly: boolean;
    }
  ): Promise<{
    notifications: ReadNotificationDTO[];
    total: number;
    page: number;
    totalPages: number;
    unreadCount: number;
  }> {
    try {
      const result = await this.notificationRepository.findByUser(
        userId,
        options
      );

      return {
        notifications: result.notifications,
        total: result.total,
        page: options.page,
        totalPages: Math.ceil(result.total / options.limit),
        unreadCount: result.unreadCount,
      };
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch notifications",
        "NOTIFICATIONS_FETCH_ERROR"
      );
    }
  }

  async getNotificationById(id: string): Promise<ReadNotificationDTO> {
    try {
      const notification = await this.notificationRepository.findOne(id);

      if (!notification) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Notification not found",
          "NOTIFICATION_NOT_FOUND"
        );
      }

      return notification;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch notification",
        "NOTIFICATION_FETCH_ERROR"
      );
    }
  }

  async markNotificationAsRead(id: string): Promise<ReadNotificationDTO> {
    try {
      const notification = await this.notificationRepository.markAsRead(id);

      if (!notification) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Notification not found",
          "NOTIFICATION_NOT_FOUND"
        );
      }

      return notification;
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to mark notification as read",
        "NOTIFICATION_UPDATE_ERROR"
      );
    }
  }

  async markAllNotificationsAsRead(
    userId: string
  ): Promise<{success: boolean; count: number}> {
    try {
      const count = await this.notificationRepository.markAllAsRead(userId);

      return {
        success: true,
        count,
      };
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to mark all notifications as read",
        "NOTIFICATIONS_UPDATE_ERROR"
      );
    }
  }

  async deleteNotification(id: string): Promise<{success: boolean}> {
    try {
      const success = await this.notificationRepository.delete(id);

      if (!success) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "Notification not found or could not be deleted",
          "NOTIFICATION_DELETE_ERROR"
        );
      }

      return {success};
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to delete notification",
        "NOTIFICATION_DELETE_ERROR"
      );
    }
  }

  async sendNotificationToAllUsers(
    title: string,
    message: string,
    type: NotificationType
  ): Promise<{success: boolean; count: number}> {
    try {
      const users = await this.userRepository.findAll();

      const notifications = await Promise.all(
        users.map((user) =>
          this.createNotification({
            user_id: user.id,
            title,
            message,
            type,
            is_read: false,
          })
        )
      );

      return {
        success: true,
        count: notifications.length,
      };
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to send notifications to all users",
        "BROADCAST_NOTIFICATION_ERROR"
      );
    }
  }

  async getNotificationSettings(userId: string): Promise<{
    email_notifications: boolean;
    push_notifications: boolean;
    sms_notifications: boolean;
  }> {
    try {
      // In a real application, this would retrieve user notification settings from a dedicated table
      // For this implementation, we'll use a simplified approach
      return {
        email_notifications: true,
        push_notifications: true,
        sms_notifications: false,
      };
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to get notification settings",
        "NOTIFICATION_SETTINGS_ERROR"
      );
    }
  }

  async updateNotificationSettings(
    userId: string,
    settings: {
      email_notifications: boolean;
      push_notifications: boolean;
      sms_notifications: boolean;
    }
  ): Promise<{
    email_notifications: boolean;
    push_notifications: boolean;
    sms_notifications: boolean;
  }> {
    try {
      // In a real application, this would update user notification settings in a dedicated table
      // For this implementation, we'll just return the settings
      return settings;
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update notification settings",
        "NOTIFICATION_SETTINGS_UPDATE_ERROR"
      );
    }
  }

  // Public helper methods for other services to use

  async sendLowStockNotification(
    productName: string,
    stockQuantity: number
  ): Promise<void> {
    // Find admin users
    const adminUsers = await this.userRepository.findByRole(
      UserRole.ADMIN.toString()
    );

    // Send notifications
    for (const admin of adminUsers) {
      await this.createNotification({
        user_id: admin.id,
        title: "Low Stock Alert",
        message: `Product "${productName}" is running low on stock (${stockQuantity} units remaining)`,
        type: "Email",
        is_read: false,
      });
    }
  }

  async sendDiscountNotification(
    productName: string,
    discountPercentage: number
  ): Promise<void> {
    // In a real implementation, you would use an EmailSubscriptionRepository
    // to find subscribed users
    const subscribedUsers = await this.userRepository.findAll();

    // Send notifications
    for (const user of subscribedUsers) {
      await this.createNotification({
        user_id: user.id,
        title: "Special Discount",
        message: `Product "${productName}" now has a ${discountPercentage}% discount!`,
        type: "Email",
        is_read: false,
      });
    }
  }

  async sendOrderStatusNotification(
    userId: string,
    orderId: string,
    status: string
  ): Promise<void> {
    await this.createNotification({
      user_id: userId,
      title: "Order Status Updated",
      message: `Your order #${orderId} status has been updated to ${status}.`,
      type: "Email",
      is_read: false,
    });
  }

  async sendPaymentConfirmation(
    userId: string,
    orderId: string,
    transactionId: string
  ): Promise<void> {
    await this.createNotification({
      user_id: userId,
      title: "Payment Successful",
      message: `Your payment for order #${orderId} has been processed successfully. Transaction ID: ${transactionId}`,
      type: "Email",
      is_read: false,
    });
  }

  // Private helper methods

  private async sendRealTimeNotification(
    notification: ReadNotificationDTO
  ): Promise<void> {
    // In a real implementation, this would integrate with:
    // - Email service (e.g., SendGrid, AWS SES) for Email notifications
    // - Push notification service (e.g., Firebase Cloud Messaging) for Push notifications
    // - SMS service (e.g., Twilio) for SMS notifications

    switch (notification.type) {
      case "Email":
        await this.sendEmailNotification(notification);
        break;
      case "Push":
        await this.sendPushNotification(notification);
        break;
      case "SMS":
        await this.sendSmsNotification(notification);
        break;
    }
  }

  private async sendEmailNotification(
    notification: ReadNotificationDTO
  ): Promise<void> {
    // In a real implementation, this would send an actual email
    console.log(
      `[EMAIL] To: ${notification.user_id}, Subject: ${notification.title}, Body: ${notification.message}`
    );
  }

  private async sendPushNotification(
    notification: ReadNotificationDTO
  ): Promise<void> {
    // In a real implementation, this would send a push notification
    console.log(
      `[PUSH] To: ${notification.user_id}, Title: ${notification.title}, Body: ${notification.message}`
    );
  }

  private async sendSmsNotification(
    notification: ReadNotificationDTO
  ): Promise<void> {
    // In a real implementation, this would send an SMS
    console.log(
      `[SMS] To: ${notification.user_id}, Message: ${notification.title} - ${notification.message}`
    );
  }
}
