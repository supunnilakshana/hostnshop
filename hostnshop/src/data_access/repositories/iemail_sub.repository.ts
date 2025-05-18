import {
  CreateEmailSubscriptionDTO,
  ReadEmailSubscriptionDTO,
  UpdateEmailSubscriptionDTO,
} from "@/shared/dtos";

export interface IEmailSubscriptionRepository {
  create(data: CreateEmailSubscriptionDTO): Promise<ReadEmailSubscriptionDTO>;
  update(
    id: string,
    data: UpdateEmailSubscriptionDTO
  ): Promise<ReadEmailSubscriptionDTO | null>;
  findOne(id: string): Promise<ReadEmailSubscriptionDTO | null>;
  findByUser(userId: string): Promise<ReadEmailSubscriptionDTO | null>;
  findAll(options?: {
    subscribedOnly?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{
    subscriptions: ReadEmailSubscriptionDTO[];
    total: number;
  }>;
}
