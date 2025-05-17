// src/components/product/ReviewForm.tsx
"use client";

import {SetStateAction, useState} from "react";
import {Star} from "lucide-react";
import {Button} from "@/presentation/components/ui/button";
import {Textarea} from "@/presentation/components/ui/textarea";
import {ReadReviewDTO} from "@/shared/dtos";
import {reviewService} from "@/lib/api/reviewService";
import {useAuthStore} from "@/lib/store/authStore";

interface ReviewFormProps {
  productId: string;
  onSubmit: (review: ReadReviewDTO) => void;
}

export default function ReviewForm({productId, onSubmit}: ReviewFormProps) {
  const {user} = useAuthStore();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (!user) {
      setError("You must be logged in to submit a review");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const reviewData = {
        customer_id: user.id,
        product_id: productId,
        rating,
        review_text: reviewText,
      };

      const response = await reviewService.createReview(reviewData);

      if (response.data) {
        onSubmit(response.data);

        // Reset form
        setRating(0);
        setReviewText("");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "Failed to submit review. Please try again.");
      } else {
        setError("Failed to submit review. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-textPrimary mb-2">
          Rating
        </label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`h-6 w-6 ${
                  (hoverRating || rating) >= star
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="reviewText"
          className="block text-sm font-medium text-textPrimary mb-2"
        >
          Review (Optional)
        </label>
        <Textarea
          id="reviewText"
          value={reviewText}
          onChange={(e: {target: {value: SetStateAction<string>}}) =>
            setReviewText(e.target.value)
          }
          placeholder="Share your experience with this product..."
          className="h-32"
        />
      </div>

      <Button
        type="submit"
        className="bg-bg_primary hover:bg-btn_hover"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
