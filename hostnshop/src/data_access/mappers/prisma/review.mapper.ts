/* eslint-disable @typescript-eslint/no-explicit-any */
import {Review} from "@prisma/client";
import {ReadReviewDTO} from "@/shared/dtos";

export class ReviewMapper {
  static toReadDTO(review: Review): ReadReviewDTO {
    return {
      id: review.id,
      customer_id: review.customer_id,
      product_id: review.product_id,
      rating: review.rating,
      review_text: review.review_text || undefined,
      created_at: review.created_at.toISOString(),
    };
  }

  static toReadDetailedDTO(
    review: Review & {customer?: any; product?: any}
  ): any {
    return {
      id: review.id,
      customer_id: review.customer_id,
      product_id: review.product_id,
      rating: review.rating,
      review_text: review.review_text || undefined,
      created_at: review.created_at.toISOString(),
      customer: review.customer
        ? {
            name: review.customer.name,
          }
        : undefined,
      product: review.product
        ? {
            name: review.product.name,
            image_url: review.product.image_url,
          }
        : undefined,
    };
  }

  static toReadDTOList(reviews: Review[]): ReadReviewDTO[] {
    return reviews.map((review) => this.toReadDTO(review));
  }
}
