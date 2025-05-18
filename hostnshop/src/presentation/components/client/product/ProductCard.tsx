// src/components/client/product/ProductCard.tsx
"use client";

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {ShoppingCart, Heart, Eye, X} from "lucide-react";
import {Button} from "@/presentation/components/ui/button";
import {ReadProductDTO} from "@/shared/dtos";
import {useCartStore} from "@/lib/store/cartStore";
import {getImageUrl} from "@/lib/utils/imageUtil";
import {motion, AnimatePresence} from "framer-motion";

interface ProductCardProps {
  product: ReadProductDTO;
}

export default function ProductCard({product}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const {addItem} = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  const closeQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(false);
  };

  // Calculate the discounted price
  const originalPrice = product.price;
  const discountPercentage = product.discount_percentage || 0;
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);

  // Check if product is out of stock
  const isOutOfStock = product.stock_quantity <= 0;

  // Default image if none provided
  const productImage = product.image_url
    ? getImageUrl(product.image_url)
    : "/placeholder-product.jpg";

  return (
    <>
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.3}}
        className="h-full"
      >
        <Link
          href={`/products/${product.id}`}
          className={`group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col ${
            isOutOfStock ? "opacity-80" : ""
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Product Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {discountPercentage}% OFF
              </div>
            )}

            {/* Stock Status Badge */}
            {isOutOfStock && (
              <div className="absolute top-3 right-3 z-10 bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                Out of Stock
              </div>
            )}

            {/* Product Image */}
            <div className="absolute inset-0 transform transition-transform duration-500 group-hover:scale-110 ease-in-out">
              <Image
                src={productImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={false}
              />
            </div>

            {/* Quick Actions Overlay */}
            <div
              className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-all duration-300 ${
                isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                size="sm"
                className="bg-white text-textPrimary hover:bg-bg_primary hover:text-white transition-colors shadow-md rounded-full px-4"
                disabled={isOutOfStock}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                <span>{isOutOfStock ? "Sold Out" : "Add to Cart"}</span>
              </Button>

              {/* Quick View Button */}
              <Button
                size="icon"
                variant="secondary"
                className="bg-white/90 hover:bg-white border border-gray-200 transition-colors rounded-full shadow-md"
                onClick={handleQuickView}
              >
                <Eye className="h-4 w-4 text-textPrimary" />
              </Button>
            </div>

            {/* Favorite Button */}
            <button
              className={`absolute top-3 right-3 p-2 rounded-full transition-colors shadow-sm ${
                isOutOfStock ? "hidden" : ""
              } ${
                discountPercentage > 0 ? "bg-white/80" : "bg-white/80"
              } hover:bg-white/100 ${
                isFavorite ? "text-red-500" : "text-gray-600"
              }`}
              onClick={handleToggleFavorite}
              aria-label={
                isFavorite ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? "fill-red-500" : "fill-transparent"
                } transition-all duration-300`}
              />
            </button>
          </div>

          {/* Product Info */}
          <div className="p-4 flex-grow flex flex-col">
            {/* Product Name */}
            <h3 className="font-medium text-textPrimary text-base truncate group-hover:text-bg_primary transition-colors">
              {product.name}
            </h3>

            {/* Product Description - Optional */}
            {product.description && (
              <p className="text-xs text-gray-500 mt-1 line-clamp-2 flex-grow">
                {product.description}
              </p>
            )}

            {/* Price */}
            <div className="mt-3 flex items-end">
              {discountPercentage > 0 ? (
                <>
                  <span className="text-lg font-semibold text-bg_primary">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm line-through text-gray-400">
                    ${originalPrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-semibold text-bg_primary">
                  ${originalPrice.toFixed(2)}
                </span>
              )}

              {/* Stock Indicator */}
              {!isOutOfStock &&
                product.stock_quantity &&
                product.stock_quantity < 5 && (
                  <span className="ml-auto text-xs text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded-full">
                    Only {product.stock_quantity} left
                  </span>
                )}
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickView && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={closeQuickView}
          >
            <motion.div
              initial={{opacity: 0, scale: 0.9}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.9}}
              transition={{duration: 0.2}}
              className="relative max-w-4xl w-full max-h-[90vh] rounded-lg overflow-hidden bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-50 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                onClick={closeQuickView}
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>

              <div className="w-full h-[80vh] relative">
                <Image
                  src={productImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1200px) 90vw, 1200px"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold text-textPrimary mb-1">
                  {product.name}
                </h2>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {discountPercentage > 0 ? (
                      <>
                        <span className="text-2xl font-bold text-bg_primary">
                          ${discountedPrice.toFixed(2)}
                        </span>
                        <span className="text-lg line-through text-gray-500">
                          ${originalPrice.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-bg_primary">
                        ${originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={(e) => {
                      handleAddToCart(e);
                      closeQuickView(e);
                    }}
                    size="lg"
                    className="bg-bg_primary hover:bg-bg_primary/90 text-white transition-colors shadow-md gap-2"
                    disabled={isOutOfStock}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
