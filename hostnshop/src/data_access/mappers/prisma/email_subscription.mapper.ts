/* eslint-disable @typescript-eslint/no-explicit-any */
import {EmailSubscription} from "@prisma/client";
import {ReadEmailSubscriptionDTO} from "@/shared/dtos";

export class EmailSubscriptionMapper {
  static toReadDTO(subscription: EmailSubscription): ReadEmailSubscriptionDTO {
    return {
      id: subscription.id,
      customer_id: subscription.customer_id,
      is_subscribed: subscription.is_subscribed,
      created_at: subscription.created_at.toISOString(),
    };
  }

  static toReadDetailedDTO(
    subscription: EmailSubscription & {customer?: any}
  ): any {
    return {
      id: subscription.id,
      customer_id: subscription.customer_id,
      is_subscribed: subscription.is_subscribed,
      created_at: subscription.created_at.toISOString(),
      customer: subscription.customer
        ? {
            name: subscription.customer.name,
            email: subscription.customer.email,
          }
        : undefined,
    };
  }

  static toReadDTOList(
    subscriptions: EmailSubscription[]
  ): ReadEmailSubscriptionDTO[] {
    return subscriptions.map((subscription) => this.toReadDTO(subscription));
  }
}
