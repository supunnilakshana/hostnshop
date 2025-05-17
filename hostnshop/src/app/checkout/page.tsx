// src/app/checkout/page.tsx
"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useCartStore} from "@/lib/store/cartStore";
import {useAuthStore} from "@/lib/store/authStore";
import {Button} from "@/presentation/components/ui/button";
import {ArrowLeft} from "lucide-react";
import CheckoutForm from "@/presentation/components/client/cart/cartCheckout";

export default function CheckoutPage() {
  const router = useRouter();
  const {items, totalPrice} = useCartStore();
  const {isAuthenticated} = useAuthStore();

  useEffect(() => {
    // Redirect if cart is empty
    if (items.length === 0) {
      router.push("/cart");
    }

    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push("/login?redirect=/checkout");
    }
  }, [items, isAuthenticated, router]);

  // Don't render until we're sure the user should be here
  if (items.length === 0 || !isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bg_primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center mb-8">
        <Button asChild variant="outline" className="mr-4">
          <Link href="/cart">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-textPrimary">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <CheckoutForm />
          </div>
        </div>

        <div className="lg:col-span-1">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-medium text-textPrimary mb-4">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <div>
                    <span className="font-medium">{item.product.name}</span>
                    <span className="text-textSecondary">
                      {" "}
                      × {item.quantity}
                    </span>
                  </div>
                  <span>
                    $
                    {(
                      item.product.price *
                      (1 - item.product.discount_percentage / 100) *
                      item.quantity
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-textSecondary">Subtotal</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-textSecondary">Shipping</span>
                <span>Free</span>
              </div>

              <div className="flex justify-between">
                <span className="text-textSecondary">Tax</span>
                <span>${(totalPrice() * 0.07).toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-medium text-lg pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-bg_primary">
                  ${(totalPrice() + totalPrice() * 0.07).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
