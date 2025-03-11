/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {prisma} from "../db_client/prisma_client";
import {CreateNotificationDTO, ReadNotificationDTO} from "@/shared/dtos";
import {INotificationRepository} from "./inotification.repository";
import {NotificationMapper} from "../mappers/prisma";

export class NotificationRepository implements INotificationRepository {
  async create(data: CreateNotificationDTO): Promise<ReadNotificationDTO> {
    const notification = await prisma.notification.create({data});
    return NotificationMapper.toReadDTO(notification);
  }

  async markAsRead(id: string): Promise<ReadNotificationDTO | null> {
    try {
      const notification = await prisma.notification.update({
        where: {id},
        data: {is_read: true},
      });
      return NotificationMapper.toReadDTO(notification);
    } catch (error) {
      return null;
    }
  }

  async markAllAsRead(userId: string): Promise<number> {
    const result = await prisma.notification.updateMany({
      where: {user_id: userId, is_read: false},
      data: {is_read: true},
    });

    return result.count;
  }

  async findOne(id: string): Promise<ReadNotificationDTO | null> {
    const notification = await prisma.notification.findUnique({
      where: {id},
    });
    return notification ? NotificationMapper.toReadDTO(notification) : null;
  }

  async findByUser(
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
  }> {
    // Build where clause
    const where: any = {user_id: userId};

    if (options?.unreadOnly) {
      where.is_read = false;
    }

    // Count total notifications
    const total = await prisma.notification.count({where});

    // Count unread notifications
    const unreadCount = await prisma.notification.count({
      where: {user_id: userId, is_read: false},
    });

    // Get notifications with pagination
    const skip =
      options?.page && options?.limit
        ? (options.page - 1) * options.limit
        : undefined;
    const take = options?.limit;

    const notifications = await prisma.notification.findMany({
      where,
      skip,
      take,
      orderBy: {created_at: "desc"},
    });

    return {
      notifications: NotificationMapper.toReadDTOList(notifications),
      total,
      unreadCount,
    };
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.notification.delete({
        where: {id},
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
