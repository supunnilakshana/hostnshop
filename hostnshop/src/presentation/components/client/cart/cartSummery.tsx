/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/cart/CartSummary.tsx
"use client";

import {SetStateAction, useState} from "react";
import {useRouter} from "next/navigation";
import {ArrowRight, Check} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useCartStore} from "@/lib/store/cartStore";
import {useAuthStore} from "@/lib/store/authStore";

export default function CartSummary() {
  const router = useRouter();
  const {items, totalPrice, promoCode, applyPromoCode, removePromoCode} =
    useCartStore();
  const {isAuthenticated} = useAuthStore();

  const [promoInput, setPromoInput] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [promoError, setPromoError] = useState("");

  // Calculate cart totals
  const subtotal = items.reduce((total, item) => {
    const price =
      item.product.price * (1 - item.product.discount_percentage / 100);
    return total + price * item.quantity;
  }, 0);

  const estimatedTax = subtotal * 0.07;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + estimatedTax + shipping;

  const handleApplyPromoCode = async () => {
    if (!promoInput.trim()) return;

    setIsApplying(true);
    setPromoError("");

    try {
      const success = await applyPromoCode(promoInput);

      if (!success) {
        setPromoError("Invalid or expired promo code");
      }
    } catch (error) {
      setPromoError("Failed to apply promo code");
    } finally {
      setIsApplying(false);
    }
  };

  const handleProceedToCheckout = () => {
    if (isAuthenticated) {
      router.push("/checkout");
    } else {
      router.push("/login?redirect=/checkout");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-medium text-textPrimary mb-4">
        Order Summary
      </h2>

      {/* Summary Items */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-textSecondary">
            Subtotal ({items.length} items)
          </span>
          <span className="text-textPrimary font-medium">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-textSecondary">Estimated Tax</span>
          <span className="text-textPrimary font-medium">
            ${estimatedTax.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-textSecondary">Shipping</span>
          <span className="text-textPrimary font-medium">
            {shipping > 0 ? `$${shipping.toFixed(2)}` : "Free"}
          </span>
        </div>

        {promoCode && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center">
              <Check className="h-4 w-4 mr-1" />
              Promo: {promoCode}
              <button
                onClick={removePromoCode}
                className="ml-2 text-xs text-red-500 hover:text-red-600 underline"
              >
                Remove
              </button>
            </span>
            <span>-$10.00</span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-medium">
            <span className="text-textPrimary">Order Total</span>
            <span className="text-bg_primary text-lg">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mt-6">
        <label className="block text-sm text-textSecondary mb-2">
          Promo Code
        </label>
        <div className="flex">
          <Input
            type="text"
            value={promoInput}
            onChange={(e: {target: {value: SetStateAction<string>}}) =>
              setPromoInput(e.target.value)
            }
            placeholder="Enter promo code"
            className="flex-1 rounded-r-none"
          />
          <Button
            onClick={handleApplyPromoCode}
            disabled={isApplying || !promoInput.trim()}
            className="bg-bg_primary hover:bg-btn_hover rounded-l-none"
          >
            Apply
          </Button>
        </div>
        {promoError && (
          <p className="mt-1 text-sm text-red-500">{promoError}</p>
        )}
      </div>

      {/* Checkout Button */}
      <Button
        onClick={handleProceedToCheckout}
        className="w-full mt-6 bg-bg_primary hover:bg-btn_hover"
        disabled={items.length === 0}
      >
        Proceed to Checkout
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      {/* Additional Info */}
      <div className="mt-4 text-xs text-center text-textSecondary">
        <p>Free shipping on orders over $100</p>
        <p className="mt-1">Taxes calculated at checkout</p>
      </div>
    </div>
  );
}
