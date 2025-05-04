// src/components/cart/CartItem.tsx
"use client";

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {Trash2, Plus, Minus} from "lucide-react";

import {CartItem as CartItemType} from "@/lib/store/cartStore";
import {useCartStore} from "@/lib/store/cartStore";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({item}: CartItemProps) {
  const {updateQuantity, removeItem} = useCartStore();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    // Small delay for animation
    setTimeout(() => {
      removeItem(item.product.id);
    }, 300);
  };

  const increaseQuantity = () => {
    if (item.quantity < item.product.stock_quantity) {
      updateQuantity(item.product.id, item.quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1);
    }
  };

  const discountedPrice =
    item.product.price * (1 - item.product.discount_percentage / 100);
  const subtotal = discountedPrice * item.quantity;

  return (
    <div
      className={`flex items-start border-b border-gray-200 py-4 transition-all duration-300 ${
        isRemoving ? "opacity-0 scale-95" : "opacity-100"
      }`}
    >
      {/* Product Image */}
      <div className="flex-shrink-0 relative w-20 h-20 rounded-md overflow-hidden">
        <Image
          src={item.product.image_url}
          alt={item.product.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="ml-4 flex-1">
        <Link
          href={`/products/${item.product.id}`}
          className="text-textPrimary font-medium hover:text-bg_primary"
        >
          {item.product.name}
        </Link>

        {/* Price */}
        <div className="mt-1 flex items-center">
          {item.product.discount_percentage > 0 ? (
            <>
              <span className="text-bg_primary font-medium">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="ml-2 text-xs line-through text-gray-500">
                ${item.product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-bg_primary font-medium">
              ${item.product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="mt-2 flex items-center">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={decreaseQuantity}
              disabled={item.quantity <= 1}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <button
              onClick={increaseQuantity}
              disabled={item.quantity >= item.product.stock_quantity}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="ml-4 text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="flex-shrink-0 text-right">
        <p className="text-textPrimary font-medium">${subtotal.toFixed(2)}</p>
      </div>
    </div>
  );
}
