/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/checkout/CheckoutForm.tsx (modified version)
"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@/presentation/components/ui/button";
import {Input} from "@/presentation/components/ui/input";
import {Textarea} from "@/presentation/components/ui/textarea";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/presentation/components/ui/radio-group";
import {Label} from "@/presentation/components/ui/label";
import {useCartStore} from "@/lib/store/cartStore";
import {useAuthStore} from "@/lib/store/authStore";
import {ShippingMethod, PaymentMethod, OrderStatus} from "@/shared/enums";
import {CreateOrderDTO, CreateOrderItemDTO} from "@/shared/dtos";
import {orderService} from "@/lib/api/orderService";

export default function CheckoutForm({
  onShippingMethodChange = (method: any) => {},
}) {
  const router = useRouter();
  const {items, totalPrice, clearCart} = useCartStore();
  const {user} = useAuthStore();

  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define shipping methods
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

  // Form state
  const [formData, setFormData] = useState({
    // Shipping Information
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",

    // Shipping Method
    shippingMethod: ShippingMethod.STANDARD,

    // Payment Information
    paymentMethod: PaymentMethod.CREDIT_CARD,
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",

    // Order Notes
    notes: "",
  });

  // Get selected shipping method details
  const getSelectedShippingMethod = () => {
    return (
      shippingMethods.find((method) => method.id === formData.shippingMethod) ||
      shippingMethods[0]
    );
  };

  // Calculate final total
  const calculateTotal = () => {
    return totalPrice() + getSelectedShippingMethod().cost;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({...prev, [name]: value}));

    // Notify parent component of shipping method changes
    if (name === "shippingMethod") {
      onShippingMethodChange(value);
    }
  };

  const handleContinue = () => {
    if (validateCurrentStep()) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const validateCurrentStep = () => {
    // Basic validation logic for each step
    if (activeStep === 1) {
      // Validate shipping information
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.phone ||
        !formData.address ||
        !formData.city ||
        !formData.zip ||
        !formData.country
      ) {
        alert("Please fill in all required fields");
        return false;
      }
    } else if (activeStep === 2) {
      // No validation needed for shipping method
      return true;
    } else if (activeStep === 3) {
      // Validate payment information
      if (formData.paymentMethod === PaymentMethod.CREDIT_CARD) {
        if (
          !formData.cardName ||
          !formData.cardNumber ||
          !formData.expiryDate ||
          !formData.cvv
        ) {
          alert("Please fill in all payment details");
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmitOrder = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderItems: CreateOrderItemDTO[] = items.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price_at_purchase: item.product.price,
        discount_applied: item.product.discount_percentage,
        order_id: "", // This will be filled by the backend
      }));

      const orderData: CreateOrderDTO = {
        customer_id: user?.id || "",
        total_price: calculateTotal(),
        // shipping_cost: getSelectedShippingMethod().cost,
        // shipping_method: formData.shippingMethod,
        status: OrderStatus.PENDING,
        orderItems: orderItems,
      };

      // Submit order
      const response = await orderService.createOrder(orderData);

      // Clear cart
      clearCart();

      // Redirect to success page
      router.push(`/order-complete?orderId=${response.data.id}`);
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Steps Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {["Shipping Information", "Shipping Method", "Payment", "Review"].map(
            (step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    activeStep > index + 1
                      ? "bg-green-500 text-white"
                      : activeStep === index + 1
                      ? "bg-bg_primary text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {activeStep > index + 1 ? "✓" : index + 1}
                </div>
                <span className="mt-2 text-xs text-textSecondary">{step}</span>
              </div>
            )
          )}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
          <div
            className="absolute top-0 left-0 h-1 bg-bg_primary transition-all duration-300"
            style={{width: `${((activeStep - 1) / 3) * 100}%`}}
          ></div>
        </div>
      </div>

      {/* Step 1: Shipping Information */}
      {activeStep === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-textPrimary mb-4">
            Shipping Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="zip">Postal Code</Label>
              <Input
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-2"
                required
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
                {/* Add more countries as needed */}
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              onClick={handleContinue}
              className="bg-bg_primary hover:bg-btn_hover"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Shipping Method */}
      {activeStep === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-textPrimary mb-4">
            Shipping Method
          </h2>

          <RadioGroup
            value={formData.shippingMethod}
            onValueChange={(value) =>
              handleRadioChange("shippingMethod", value)
            }
            className="space-y-4"
          >
            {shippingMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center space-x-2 border border-gray-200 p-4 rounded-md"
              >
                <RadioGroupItem value={method.id} id={method.id} />
                <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                  <div className="font-medium">{method.name}</div>
                  <div className="text-sm text-textSecondary">
                    {method.description}
                  </div>
                </Label>
                <div className="font-medium">{method.label}</div>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button
              onClick={handleContinue}
              className="bg-bg_primary hover:bg-btn_hover"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Payment */}
      {activeStep === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-textPrimary mb-4">
            Payment Method
          </h2>

          <RadioGroup
            value={formData.paymentMethod}
            onValueChange={(value) => handleRadioChange("paymentMethod", value)}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 border border-gray-200 p-4 rounded-md">
              <RadioGroupItem
                value={PaymentMethod.CREDIT_CARD}
                id="creditCard"
              />
              <Label htmlFor="creditCard" className="flex-1 cursor-pointer">
                <div className="font-medium">Credit Card</div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border border-gray-200 p-4 rounded-md">
              <RadioGroupItem value={PaymentMethod.PAYPAL} id="paypal" />
              <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                <div className="font-medium">PayPal</div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border border-gray-200 p-4 rounded-md">
              <RadioGroupItem
                value={PaymentMethod.BANK_TRANSFER}
                id="bankTransfer"
              />
              <Label htmlFor="bankTransfer" className="flex-1 cursor-pointer">
                <div className="font-medium">Bank Transfer</div>
              </Label>
            </div>
          </RadioGroup>

          {formData.paymentMethod === PaymentMethod.CREDIT_CARD && (
            <div className="mt-6 space-y-4 border border-gray-200 p-4 rounded-md">
              <div>
                <Label htmlFor="cardName">Name on Card</Label>
                <Input
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="**** **** **** ****"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    placeholder="***"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {formData.paymentMethod === PaymentMethod.PAYPAL && (
            <div className="mt-6 text-center p-6 border border-gray-200 rounded-md">
              <p className="text-textSecondary">
                You will be redirected to PayPal to complete your payment after
                reviewing your order.
              </p>
            </div>
          )}

          {formData.paymentMethod === PaymentMethod.BANK_TRANSFER && (
            <div className="mt-6 p-6 border border-gray-200 rounded-md">
              <p className="text-textSecondary mb-2">
                Please use the following details to make your bank transfer:
              </p>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">Bank Name:</span> HostNShop Bank
                </p>
                <p>
                  <span className="font-medium">Account Name:</span> HostNShop
                  Ltd
                </p>
                <p>
                  <span className="font-medium">Account Number:</span>{" "}
                  1234567890
                </p>
                <p>
                  <span className="font-medium">Sort Code:</span> 12-34-56
                </p>
                <p>
                  <span className="font-medium">Reference:</span> Your Order
                  Number (will be provided after checkout)
                </p>
              </div>
            </div>
          )}

          <div className="mt-4">
            <Label htmlFor="notes">Order Notes (Optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Notes about your order, e.g. special delivery instructions"
              className="h-24"
            />
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button
              onClick={handleContinue}
              className="bg-bg_primary hover:bg-btn_hover"
            >
              Review Order
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Review Order */}
      {activeStep === 4 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-textPrimary mb-4">
            Review Your Order
          </h2>

          {/* Shipping Information */}
          <div className="border border-gray-200 rounded-md p-4">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium text-textPrimary">
                Shipping Information
              </h3>
              <button
                onClick={() => setActiveStep(1)}
                className="text-sm text-bg_primary hover:underline"
              >
                Edit
              </button>
            </div>
            <div className="text-sm text-textSecondary">
              <p>{formData.fullName}</p>
              <p>{formData.address}</p>
              <p>
                {formData.city}, {formData.state} {formData.zip}
              </p>
              <p>{formData.country}</p>
              <p>Email: {formData.email}</p>
              <p>Phone: {formData.phone}</p>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="border border-gray-200 rounded-md p-4">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium text-textPrimary">Shipping Method</h3>
              <button
                onClick={() => setActiveStep(2)}
                className="text-sm text-bg_primary hover:underline"
              >
                Edit
              </button>
            </div>
            <div className="text-sm text-textSecondary">
              <p>
                {getSelectedShippingMethod().name} (
                {getSelectedShippingMethod().description})
              </p>
              <p>Cost: {getSelectedShippingMethod().label}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="border border-gray-200 rounded-md p-4">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium text-textPrimary">Payment Method</h3>
              <button
                onClick={() => setActiveStep(3)}
                className="text-sm text-bg_primary hover:underline"
              >
                Edit
              </button>
            </div>
            <div className="text-sm text-textSecondary">
              <p>
                {formData.paymentMethod === PaymentMethod.CREDIT_CARD &&
                  "Credit Card"}
                {formData.paymentMethod === PaymentMethod.PAYPAL && "PayPal"}
                {formData.paymentMethod === PaymentMethod.BANK_TRANSFER &&
                  "Bank Transfer"}
              </p>
              {formData.paymentMethod === PaymentMethod.CREDIT_CARD && (
                <p>Card ending in {formData.cardNumber.slice(-4)}</p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="font-medium text-textPrimary mb-2">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between text-sm"
                >
                  <div>
                    <span>{item.product.name}</span>
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

            <div className="border-t border-gray-200 pt-2 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-textSecondary">Subtotal</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textSecondary">Shipping</span>
                <span>{getSelectedShippingMethod().label}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-bg_primary">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="font-medium text-textPrimary mb-2">
              Delivery Options
            </h3>
            <ul className="list-disc pl-5 text-sm text-textSecondary space-y-2">
              {shippingMethods.map((method) => (
                <li key={method.id}>
                  <span className="font-medium">{method.name}:</span>{" "}
                  {method.description} ({method.label})
                </li>
              ))}
            </ul>
          </div>

          {/* Order Notes */}
          {formData.notes && (
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="font-medium text-textPrimary mb-2">Order Notes</h3>
              <p className="text-sm text-textSecondary">{formData.notes}</p>
            </div>
          )}

          {/* Terms and Conditions */}
          <div className="mt-4">
            <div className="flex items-start">
              <input type="checkbox" id="terms" className="mt-1" required />
              <label
                htmlFor="terms"
                className="ml-2 text-sm text-textSecondary"
              >
                I agree to the{" "}
                <a href="/terms" className="text-bg_primary hover:underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-bg_primary hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button
              onClick={handleSubmitOrder}
              className="bg-bg_primary hover:bg-btn_hover"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
