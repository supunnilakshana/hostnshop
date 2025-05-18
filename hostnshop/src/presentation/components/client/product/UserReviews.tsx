// src/components/account/UserReviews.tsx
"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import {Star, Pencil, Trash2} from "lucide-react";
import {Button} from "@/presentation/components/ui/button";
import {ReadReviewDTO} from "@/shared/dtos";
import {reviewService} from "@/lib/api/reviewService";
import {apiClient} from "@/lib/api/client";

export default function UserReviews() {
  const [reviews, setReviews] = useState<ReadReviewDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserReviews(currentPage);
  }, [currentPage]);

  const fetchUserReviews = async (page: number) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await reviewService.getUserReviews({page, limit: 5});

      if (response.data) {
        setReviews(response.data.reviews);
        setTotalPages(Math.ceil(response.data.total / 5));
      }
    } catch (error) {
      console.error("Failed to fetch user reviews:", error);
      setError("Failed to load your reviews. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      await apiClient.delete(`reviews/${reviewId}`);
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Failed to delete review:", error);
      alert("Failed to delete review. Please try again.");
    }
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

  if (isLoading && reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-textPrimary mb-6">
          Your Reviews
        </h2>
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bg_primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-textPrimary mb-6">
          Your Reviews
        </h2>
        <div className="text-center py-6">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => fetchUserReviews(currentPage)}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-textPrimary mb-6">
        Your Reviews
      </h2>

      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-textSecondary mb-4">
            You haven&apos;t written any reviews yet.
          </p>
          <Button asChild className="bg-bg_primary hover:bg-btn_hover">
            <Link href="/products">Shop Products</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border border-gray-200 rounded-md p-4 hover:border-bg_primary transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <Link
                      href={`/products/${review.product_id}`}
                      className="font-medium text-textPrimary hover:text-bg_primary"
                    >
                      {/* {review.product?.name || "Product"} */}
                    </Link>
                    <div className="flex items-center mt-1">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-xs text-textSecondary">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/reviews/edit/${review.id}`}>
                        <Pencil className="h-3 w-3 mr-1" />
                        Edit
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>

                {review.review_text && (
                  <p className="text-textSecondary">{review.review_text}</p>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="flex space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                {Array.from({length: totalPages}, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={
                        page === currentPage
                          ? "bg-bg_primary hover:bg-btn_hover"
                          : ""
                      }
                    >
                      {page}
                    </Button>
                  )
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
