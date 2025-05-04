/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/cart/page.tsx
"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useCartStore} from "@/lib/store/cartStore";
import {Button} from "@/presentation/components/ui/button";

import {ShoppingCart, ArrowLeft} from "lucide-react";
import CartSummary from "@/presentation/components/client/cart/cartSummery";
import CartItem from "@/presentation/components/client/cart/cartItem";

export default function CartPage() {
  const router = useRouter();
  const {items} = useCartStore();
  const [isClient, setIsClient] = useState(false);

  // Hydration fix
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-textPrimary mb-8">Your Cart</h1>
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bg_primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-textPrimary mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-xl font-medium text-textPrimary mb-2">
            Your cart is empty
          </h2>
          <p className="text-textSecondary mb-6">
            Looks like you haven&#39;t added any products to your cart yet.
          </p>
          <Button asChild className="bg-bg_primary hover:bg-btn_hover">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-textPrimary mb-4">
                Cart Items
              </h2>
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
              <div className="mt-6 flex justify-between items-center">
                <Button
                  asChild
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Link href="/products">
                    <ArrowLeft className="h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}
