// src/components/account/OrderDetailsModal.tsx
"use client";

import {useState, useEffect} from "react";
import {X} from "lucide-react";
import {Badge} from "@/presentation/components/ui/badge";
import {Button} from "@/presentation/components/ui/button";
import {orderService} from "@/lib/api/orderService";

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price_at_purchase: number;
  discount_applied: number;
  subtotal: number;
}

interface OrderCustomer {
  name: string;
  email: string;
}

interface OrderDetails {
  id: string;
  customer_id: string;
  total_price: number;
  status: string;
  created_at: string;
  customer?: OrderCustomer;
  items: OrderItem[];
}

interface OrderDetailsModalProps {
  orderId: string | null;
  onClose: () => void;
}

export default function OrderDetailsModal({
  orderId,
  onClose,
}: OrderDetailsModalProps) {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails(orderId);
    }
  }, [orderId]);

  const fetchOrderDetails = async (id: string) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await orderService.getOrderById(id);
      console.log("Order details response:", response);

      // Check if we have data in the expected format
      if (response && response.data) {
        setOrderDetails(response.data);
      } else {
        setError("Failed to load order details. Invalid response format.");
      }
    } catch (error) {
      console.error("Failed to fetch order details:", error);
      setError("Failed to load order details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-700 border-yellow-300"
          >
            Pending
          </Badge>
        );
      case "Processing":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-700 border-blue-300"
          >
            Processing
          </Badge>
        );
      case "Shipped":
        return (
          <Badge
            variant="outline"
            className="bg-purple-100 text-purple-700 border-purple-300"
          >
            Shipped
          </Badge>
        );
      case "Delivered":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-700 border-green-300"
          >
            Delivered
          </Badge>
        );
      case "Cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-700 border-red-300"
          >
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleCancelOrder = async () => {
    if (!orderDetails) return;

    try {
      await orderService.cancelOrder(orderDetails.id);
      // Refresh order details after cancellation
      fetchOrderDetails(orderDetails.id);
    } catch (error) {
      console.error("Failed to cancel order:", error);
      setError("Failed to cancel order. Please try again.");
    }
  };

  if (!orderId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-textPrimary">
            Order Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bg_primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-6">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => orderId && fetchOrderDetails(orderId)}>
                Try Again
              </Button>
            </div>
          ) : orderDetails ? (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h3 className="font-medium text-textPrimary mb-1">
                    Order #{orderDetails.id.substring(0, 8)}
                  </h3>
                  <p className="text-sm text-textSecondary">
                    Placed on{" "}
                    {new Date(orderDetails.created_at).toLocaleDateString()}
                  </p>
                  {orderDetails.customer && (
                    <p className="text-sm text-textSecondary mt-1">
                      Customer: {orderDetails.customer.name}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="mb-2">
                    {getStatusBadge(orderDetails.status)}
                  </div>
                  <p className="font-medium">
                    Total: ${orderDetails.total_price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-medium text-textPrimary mb-3">Items</h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Discount
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orderDetails.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.product_name}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            ${item.price_at_purchase.toFixed(2)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            {item.discount_applied > 0
                              ? `${item.discount_applied}%`
                              : "-"}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-right">
                            ${item.subtotal.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-3 text-right text-sm font-medium"
                        >
                          Total
                        </td>
                        <td className="px-4 py-3 text-right text-sm font-medium">
                          ${orderDetails.total_price.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4">
                {orderDetails.status === "Pending" && (
                  <Button variant="destructive" onClick={handleCancelOrder}>
                    Cancel Order
                  </Button>
                )}
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-textSecondary">No order details found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
