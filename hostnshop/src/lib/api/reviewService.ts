// src/lib/api/reviewService.ts
import {apiClient} from "./client";
import {CreateReviewDTO, ReadReviewDTO} from "@/shared/dtos";

export const reviewService = {
  async createReview(reviewData: CreateReviewDTO) {
    return apiClient.post<{data: ReadReviewDTO}>("reviews", reviewData);
  },

  async getProductReviews(
    productId: string,
    params: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: string;
    } = {}
  ) {
    const {
      page = 1,
      limit = 10,
      sortBy = "created_at",
      sortOrder = "desc",
    } = params;

    const endpoint = `reviews/product/${productId}?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

    return apiClient.get<{
      data: {
        reviews: ReadReviewDTO[];
        total: number;
      };
    }>(endpoint);
  },

  async getUserReviews(params: {page?: number; limit?: number} = {}) {
    const {page = 1, limit = 10} = params;

    return apiClient.get<{
      data: {
        reviews: ReadReviewDTO[];
        total: number;
      };
    }>(`reviews/user?page=${page}&limit=${limit}`);
  },
};
