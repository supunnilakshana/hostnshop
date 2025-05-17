// src/components/product/ProductCard.tsx
"use client";

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {ShoppingCart, Heart} from "lucide-react";
import {Button} from "@/presentation/components/ui/button";
import {ReadProductDTO} from "@/shared/dtos";
import {useCartStore} from "@/lib/store/cartStore";
import {getImageUrl} from "@/lib/utils/imageUtil";

interface ProductCardProps {
  product: ReadProductDTO;
}

export default function ProductCard({product}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
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

  // Calculate the discounted price
  const originalPrice = product.price;
  const discountPercentage = product.discount_percentage;
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        {product.discount_percentage > 0 && (
          <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {product.discount_percentage}% OFF
          </div>
        )}

        <Image
          src={getImageUrl(product.image_url)}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Quick actions overlay */}
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="bg-white text-textPrimary hover:bg-bg_primary hover:text-white"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            <span>Add to Cart</span>
          </Button>
        </div>

        {/* Favorite button */}
        <button
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          onClick={handleToggleFavorite}
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-textPrimary truncate">
          {product.name}
        </h3>

        <div className="mt-1 flex items-end">
          {product.discount_percentage > 0 ? (
            <>
              <span className="text-lg font-semibold text-bg_primary">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="ml-2 text-sm line-through text-gray-500">
                ${originalPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-lg font-semibold text-bg_primary">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
