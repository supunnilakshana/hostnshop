/* eslint-disable @typescript-eslint/no-explicit-any */
import {CreateReviewDTO, ReadReviewDTO, UpdateReviewDTO} from "@/shared/dtos";

export interface IReviewRepository {
  create(data: CreateReviewDTO): Promise<ReadReviewDTO>;
  update(id: string, data: UpdateReviewDTO): Promise<ReadReviewDTO | null>;
  findOne(id: string): Promise<ReadReviewDTO | null>;
  findByProduct(
    productId: string,
    options?: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: string;
    }
  ): Promise<{
    reviews: ReadReviewDTO[];
    total: number;
  }>;
  findByUser(
    userId: string,
    options?: {
      page?: number;
      limit?: number;
    }
  ): Promise<{
    reviews: ReadReviewDTO[];
    total: number;
  }>;
  findForModeration(options?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<{
    reviews: any[];
    total: number;
  }>;
  delete(id: string): Promise<boolean>;
}
