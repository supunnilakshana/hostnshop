// src/app/checkout/page.tsx
"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useCartStore} from "@/lib/store/cartStore";
import {useAuthStore} from "@/lib/store/authStore";
import {Button} from "@/presentation/components/ui/button";
import {ArrowLeft} from "lucide-react";
import CheckoutForm from "@/presentation/components/client/cart/cartCheckout";
import {ShippingMethod} from "@/shared/enums";

export default function CheckoutPage() {
  const router = useRouter();
  const {items, totalPrice} = useCartStore();
  const {isAuthenticated} = useAuthStore();
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(
    ShippingMethod.STANDARD
  );

  // Define shipping methods (same as in CheckoutForm)
  const shippingMethods = [
    {
      id: ShippingMethod.STANDARD,
      name: "Standard Shipping",
      description: "Delivery in 5-7 business days",
      cost: 0,
      label: "Free",
    },
    {
      id: ShippingMethod.EXPRESS,
      name: "Express Shipping",
      description: "Delivery in 2-3 business days",
      cost: 12.99,
      label: "$12.99",
    },
    {
      id: ShippingMethod.OVERNIGHT,
      name: "Overnight Shipping",
      description: "Delivery next business day",
      cost: 24.99,
      label: "$24.99",
    },
  ];

  // Get selected shipping method details
  const getSelectedShippingMethod = () => {
    return (
      shippingMethods.find((method) => method.id === selectedShippingMethod) ||
      shippingMethods[0]
    );
  };

  // Calculate total with shipping
  const calculateTotal = () => {
    return totalPrice() + getSelectedShippingMethod().cost;
  };

  useEffect(() => {
    // Redirect if cart is empty
    if (items.length === 0) {
      router.push("/cart");
    }

    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push("/auth/login?redirect=/checkout");
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
            <CheckoutForm
              onShippingMethodChange={(method) =>
                setSelectedShippingMethod(method)
              }
            />
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
                <span>{getSelectedShippingMethod().label}</span>
              </div>

              <div className="flex justify-between font-medium text-lg pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-bg_primary">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>

            {/* Available Shipping Options */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h3 className="text-md font-medium text-textPrimary mb-2">
                Shipping Options
              </h3>
              <ul className="text-sm text-textSecondary space-y-1">
                {shippingMethods.map((method) => (
                  <li
                    key={method.id}
                    className={
                      method.id === selectedShippingMethod
                        ? "text-bg_primary font-medium"
                        : ""
                    }
                  >
                    {method.name}: {method.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
