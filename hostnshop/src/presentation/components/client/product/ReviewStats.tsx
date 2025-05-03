/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/product/ReviewStats.tsx
"use client";

import {useState, useEffect} from "react";
import {Star} from "lucide-react";
import {ReadReviewDTO} from "@/shared/dtos";
import {reviewService} from "@/lib/api/reviewService";

interface ReviewStatsProps {
  productId: string;
}

export default function ReviewStats({productId}: ReviewStatsProps) {
  const [reviews, setReviews] = useState<ReadReviewDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ratingCounts, setRatingCounts] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    setIsLoading(true);

    try {
      const response = await reviewService.getProductReviews(productId, {
        limit: 100, // Get as many reviews as possible for accurate stats
      });

      if (response.data) {
        setReviews(response.data.reviews);
        setTotalReviews(response.data.total);

        // Calculate rating distribution
        const counts: Record<number, number> = {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        };

        response.data.reviews.forEach((review) => {
          counts[review.rating] = (counts[review.rating] || 0) + 1;
        });

        setRatingCounts(counts);

        // Calculate average rating
        if (response.data.reviews.length > 0) {
          const totalStars = response.data.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          setAverageRating(totalStars / response.data.reviews.length);
        }
      }
    } catch (error) {
      console.error("Failed to fetch reviews for stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bg_primary"></div>
      </div>
    );
  }

  if (totalReviews === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-textSecondary">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4">
      {/* Average Rating Display */}
      <div className="flex items-center mb-4">
        <div className="text-4xl font-bold text-textPrimary mr-2">
          {averageRating.toFixed(1)}
        </div>
        <div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(averageRating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-textSecondary mt-1">
            Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
          </p>
        </div>
      </div>

      {/* Rating Distribution Bars */}
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = ratingCounts[rating] || 0;
          const percentage =
            totalReviews > 0 ? (count / totalReviews) * 100 : 0;

          return (
            <div key={rating} className="flex items-center text-sm">
              <div className="w-12 flex items-center">
                <span>{rating}</span>
                <Star className="h-3 w-3 ml-1 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{width: `${percentage}%`}}
                ></div>
              </div>
              <div className="w-10 text-right text-textSecondary">{count}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
