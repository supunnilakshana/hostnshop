/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {prisma} from "../db_client/prisma_client";
import {
  CreateEmailSubscriptionDTO,
  ReadEmailSubscriptionDTO,
  UpdateEmailSubscriptionDTO,
} from "@/shared/dtos";
import {IEmailSubscriptionRepository} from "./iemail_sub.repository";
import {EmailSubscriptionMapper} from "../mappers/prisma";

export class EmailSubscriptionRepository
  implements IEmailSubscriptionRepository
{
  async create(
    data: CreateEmailSubscriptionDTO
  ): Promise<ReadEmailSubscriptionDTO> {
    // Check if a subscription already exists for this user
    const existingSubscription = await prisma.emailSubscription.findFirst({
      where: {customer_id: data.customer_id},
    });

    if (existingSubscription) {
      // Update existing subscription instead of creating a new one
      const updatedSubscription = await prisma.emailSubscription.update({
        where: {id: existingSubscription.id},
        data: {is_subscribed: data.is_subscribed},
      });

      return EmailSubscriptionMapper.toReadDTO(updatedSubscription);
    }

    // Create new subscription
    const subscription = await prisma.emailSubscription.create({data});
    return EmailSubscriptionMapper.toReadDTO(subscription);
  }

  async update(
    id: string,
    data: UpdateEmailSubscriptionDTO
  ): Promise<ReadEmailSubscriptionDTO | null> {
    try {
      const subscription = await prisma.emailSubscription.update({
        where: {id},
        data,
      });
      return EmailSubscriptionMapper.toReadDTO(subscription);
    } catch (error) {
      return null;
    }
  }

  async findOne(id: string): Promise<ReadEmailSubscriptionDTO | null> {
    const subscription = await prisma.emailSubscription.findUnique({
      where: {id},
    });
    return subscription
      ? EmailSubscriptionMapper.toReadDTO(subscription)
      : null;
  }

  async findByUser(userId: string): Promise<ReadEmailSubscriptionDTO | null> {
    const subscription = await prisma.emailSubscription.findFirst({
      where: {customer_id: userId},
    });
    return subscription
      ? EmailSubscriptionMapper.toReadDTO(subscription)
      : null;
  }

  async findAll(options?: {
    subscribedOnly?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{
    subscriptions: ReadEmailSubscriptionDTO[];
    total: number;
  }> {
    // Build where clause
    const where: any = {};

    if (options?.subscribedOnly) {
      where.is_subscribed = true;
    }

    // Count total
    const total = await prisma.emailSubscription.count({where});

    // Get subscriptions with pagination
    const skip =
      options?.page && options?.limit
        ? (options.page - 1) * options.limit
        : undefined;
    const take = options?.limit;

    const subscriptions = await prisma.emailSubscription.findMany({
      where,
      skip,
      take,
      orderBy: {created_at: "desc"},
      include: {
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      subscriptions: subscriptions.map((subscription) =>
        EmailSubscriptionMapper.toReadDetailedDTO(subscription)
      ),
      total,
    };
  }
}
