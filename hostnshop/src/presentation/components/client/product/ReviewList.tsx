// src/components/product/ReviewList.tsx
"use client";

import {useState, useEffect} from "react";
import {Star, ChevronDown, ChevronUp} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ReadReviewDTO} from "@/shared/dtos";
import {reviewService} from "@/lib/api/reviewService";
import {useAuthStore} from "@/lib/store/authStore";
import ReviewForm from "./ReviewForm";

interface ReviewListProps {
  productId: string;
}

export default function ReviewList({productId}: ReviewListProps) {
  const [reviews, setReviews] = useState<ReadReviewDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  const {isAuthenticated} = useAuthStore();

  useEffect(() => {
    fetchReviews();
  }, [productId, page, sortBy, sortOrder]);

  const fetchReviews = async () => {
    setIsLoading(true);

    try {
      const response = await reviewService.getProductReviews(productId, {
        page,
        limit: 5,
        sortBy,
        sortOrder,
      });

      if (response.data) {
        if (page === 1) {
          setReviews(response.data.reviews);
        } else {
          setReviews((prev) => [...prev, ...response.data.reviews]);
        }

        setTotalReviews(response.data.total);
        setHasMore(
          response.data.reviews.length === 5 &&
            reviews.length + response.data.reviews.length < response.data.total
        );

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
      console.error("Failed to fetch reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddReview = (newReview: ReadReviewDTO) => {
    setReviews((prev) => [newReview, ...prev]);
    setTotalReviews((prev) => prev + 1);

    // Recalculate average rating
    const totalStars =
      reviews.reduce((sum, review) => sum + review.rating, 0) +
      newReview.rating;
    setAverageRating(totalStars / (reviews.length + 1));

    setShowForm(false);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      // Toggle sort order
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }

    // Reset page
    setPage(1);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const renderSortIcon = (field: string) => {
    if (sortBy !== field) return null;

    return sortOrder === "desc" ? (
      <ChevronDown className="h-4 w-4 ml-1" />
    ) : (
      <ChevronUp className="h-4 w-4 ml-1" />
    );
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-textPrimary mb-4">
        Customer Reviews
      </h2>

      {/* Reviews Summary */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <div className="flex items-center">
            <div className="flex mr-2">
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
            <span className="text-lg font-semibold">
              {averageRating ? averageRating.toFixed(1) : "No ratings yet"}
            </span>
          </div>
          <p className="text-textSecondary mt-1">
            Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
          </p>
        </div>

        {isAuthenticated && (
          <Button
            onClick={() => setShowForm(!showForm)}
            className="mt-4 md:mt-0 bg-bg_primary hover:bg-btn_hover"
          >
            Write a Review
          </Button>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="mb-8 p-6 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>
          <ReviewForm productId={productId} onSubmit={handleAddReview} />
        </div>
      )}

      {/* Reviews Sorting */}
      {reviews.length > 0 && (
        <div className="flex justify-end mb-4">
          <div className="flex space-x-4 text-sm">
            <button
              onClick={() => handleSort("created_at")}
              className={`flex items-center ${
                sortBy === "created_at"
                  ? "font-semibold text-bg_primary"
                  : "text-textSecondary"
              }`}
            >
              Date {renderSortIcon("created_at")}
            </button>
            <button
              onClick={() => handleSort("rating")}
              className={`flex items-center ${
                sortBy === "rating"
                  ? "font-semibold text-bg_primary"
                  : "text-textSecondary"
              }`}
            >
              Rating {renderSortIcon("rating")}
            </button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {isLoading && reviews.length === 0 ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bg_primary"></div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8 border border-gray-200 rounded-lg">
          <p className="text-textSecondary">
            No reviews yet. Be the first to review this product!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-sm font-medium">
                      {review.customer_id}
                    </span>
                  </div>
                  <p className="text-sm text-textSecondary mt-1">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {review.review_text && (
                <p className="mt-3 text-textPrimary">{review.review_text}</p>
              )}
            </div>
          ))}

          {hasMore && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                onClick={() => setPage(page + 1)}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load More Reviews"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
