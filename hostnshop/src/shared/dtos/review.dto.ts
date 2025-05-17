// Create Review DTO
export interface CreateReviewDTO {
  customer_id: string;
  product_id: string;
  rating: number;
  review_text?: string;
}

// Update Review DTO
export interface UpdateReviewDTO {
  rating?: number;
  review_text?: string;
}

// Read Review DTO
export interface ReadReviewDTO {
  id: string;
  customer_id: string;
  product_id: string;
  rating: number;
  review_text?: string;
  created_at: string;
}

// Delete Review DTO
export interface DeleteReviewDTO {
  id: string;
}
