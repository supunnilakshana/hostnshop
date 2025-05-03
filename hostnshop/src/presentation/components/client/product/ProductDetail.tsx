// src/components/product/ProductDetail.tsx (complete version)
"use client";

import {useState} from "react";
import Image from "next/image";
import {Minus, Plus, ShoppingCart, Heart, Share2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ReadProductDTO} from "@/shared/dtos";
import {useCartStore} from "@/lib/store/cartStore";

interface ProductDetailProps {
  product: ReadProductDTO;
  category?: {id: string; name: string};
}

export default function ProductDetail({product, category}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const {addItem} = useCartStore();

  // Calculate the discounted price
  const originalPrice = product.price;
  const discountPercentage = product.discount_percentage;
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock_quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative h-96 md:h-full rounded-lg overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {product.discount_percentage > 0 && (
            <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {product.discount_percentage}% OFF
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Category */}
          {category && (
            <div className="mb-2">
              <span className="text-sm text-bg_primary">{category.name}</span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl font-bold text-textPrimary mb-4">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-center mb-6">
            {product.discount_percentage > 0 ? (
              <>
                <span className="text-2xl font-bold text-bg_primary">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="ml-3 text-lg line-through text-gray-500">
                  ${originalPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-bg_primary">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-textSecondary">{product.description}</p>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.stock_quantity > 0 ? (
              <div className="text-green-600 flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                <span>In Stock ({product.stock_quantity} available)</span>
              </div>
            ) : (
              <div className="text-red-500 flex items-center">
                <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                <span>Out of Stock</span>
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="mr-4 text-textSecondary">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                min="1"
                max={product.stock_quantity}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-12 text-center border-none focus:ring-0"
              />
              <button
                onClick={increaseQuantity}
                disabled={quantity >= product.stock_quantity}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock_quantity === 0}
              className="flex-1 bg-bg_primary hover:bg-btn_hover py-6"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              onClick={toggleFavorite}
              className="flex-1 sm:flex-none py-6"
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none py-6">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Additional Info */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-2 gap-4 text-sm text-textSecondary">
              <div>
                <span className="font-medium text-textPrimary">SKU:</span>{" "}
                {product.id.substring(0, 8)}
              </div>
              <div>
                <span className="font-medium text-textPrimary">Category:</span>{" "}
                {category?.name || "Uncategorized"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
