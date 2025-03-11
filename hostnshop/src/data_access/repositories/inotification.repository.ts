import {CreateNotificationDTO, ReadNotificationDTO} from "@/shared/dtos";

export interface INotificationRepository {
  create(data: CreateNotificationDTO): Promise<ReadNotificationDTO>;
  markAsRead(id: string): Promise<ReadNotificationDTO | null>;
  markAllAsRead(userId: string): Promise<number>;
  findOne(id: string): Promise<ReadNotificationDTO | null>;
  findByUser(
    userId: string,
    options?: {
      page?: number;
      limit?: number;
      unreadOnly?: boolean;
    }
  ): Promise<{
    notifications: ReadNotificationDTO[];
    total: number;
    unreadCount: number;
  }>;
  delete(id: string): Promise<boolean>;
}
