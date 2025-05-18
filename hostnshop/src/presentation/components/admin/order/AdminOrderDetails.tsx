// src/components/account/AdminOrderDetails.tsx
"use client";

import {useState, useEffect} from "react";
import {
  Loader2,
  Calendar,
  Package,
  User,
  DollarSign,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/presentation/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components/ui/table";
import {Button} from "@/presentation/components/ui/button";
import {Badge} from "@/presentation/components/ui/badge";
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

interface OrderPayment {
  id: string;
  payment_method: string;
  payment_status: string;
  transaction_id?: string;
  created_at: string;
}

interface OrderDetails {
  id: string;
  customer_id: string;
  total_price: number;
  status: string;
  created_at: string;
  customer?: OrderCustomer;
  items: OrderItem[];
  payment?: OrderPayment;
}

interface AdminOrderDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string | null;
  onStatusUpdate?: () => void;
}

export default function AdminOrderDetails({
  open,
  onOpenChange,
  orderId,
  onStatusUpdate,
}: AdminOrderDetailsProps) {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && orderId) {
      fetchOrderDetails(orderId);
    }
  }, [open, orderId]);

  const fetchOrderDetails = async (id: string) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await orderService.getOrderById(id);

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
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "Processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case "Shipped":
        return <Badge className="bg-indigo-100 text-indigo-800">Shipped</Badge>;
      case "Delivered":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
    );
  };

  const handleCancelOrder = async () => {
    if (!orderDetails) return;

    setIsLoading(true);
    setError("");

    try {
      await orderService.cancelOrder(orderDetails.id);
      // Refresh order details
      await fetchOrderDetails(orderDetails.id);
      // Notify parent component if callback provided
      if (onStatusUpdate) {
        onStatusUpdate();
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
      setError("Failed to cancel order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Order Details
            {orderDetails && (
              <span className="ml-2 text-gray-500">
                #{orderDetails.id.substring(0, 8)}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="py-12 flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-bg_primary" />
          </div>
        ) : error ? (
          <div className="py-6 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => orderId && fetchOrderDetails(orderId)}>
              Try Again
            </Button>
          </div>
        ) : orderDetails ? (
          <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto">
            {/* Order Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-semibold">Date:</span>
                  <span className="ml-2">
                    {formatDate(orderDetails.created_at)}
                  </span>
                </div>
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-semibold">Status:</span>
                  <span className="ml-2">
                    {getStatusBadge(orderDetails.status)}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-semibold">Customer:</span>
                  <span className="ml-2">
                    {orderDetails.customer?.name || "Unknown"}
                  </span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-semibold">Total:</span>
                  <span className="ml-2 font-bold text-bg_primary">
                    ${orderDetails.total_price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            {orderDetails.payment && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Payment Information</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <dt className="text-gray-500">Payment Method</dt>
                    <dd className="font-medium">
                      {orderDetails.payment.payment_method}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Payment Status</dt>
                    <dd className="font-medium">
                      {orderDetails.payment.payment_status === "Completed" ? (
                        <span className="text-green-600 flex items-center">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Completed
                        </span>
                      ) : orderDetails.payment.payment_status === "Failed" ? (
                        <span className="text-red-600 flex items-center">
                          <XCircle className="h-4 w-4 mr-1" />
                          Failed
                        </span>
                      ) : (
                        <span>{orderDetails.payment.payment_status}</span>
                      )}
                    </dd>
                  </div>
                  {orderDetails.payment.transaction_id && (
                    <div className="md:col-span-2">
                      <dt className="text-gray-500">Transaction ID</dt>
                      <dd className="font-medium font-mono text-xs">
                        {orderDetails.payment.transaction_id}
                      </dd>
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <dt className="text-gray-500">Payment Date</dt>
                    <dd>{formatDate(orderDetails.payment.created_at)}</dd>
                  </div>
                </dl>
              </div>
            )}

            {/* Order Items */}
            <div>
              <h3 className="font-semibold mb-2">Order Items</h3>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Discount</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderDetails.items && orderDetails.items.length > 0 ? (
                      orderDetails.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.product_name}
                          </TableCell>
                          <TableCell className="text-right">
                            ${item.price_at_purchase.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.discount_applied > 0
                              ? `${item.discount_applied}%`
                              : "-"}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ${item.subtotal.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center text-gray-500 py-4"
                        >
                          No items found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                  <tfoot className="bg-gray-50 font-medium">
                    <tr>
                      <td colSpan={4} className="px-4 py-2 text-right">
                        Total:
                      </td>
                      <td className="px-4 py-2 text-right font-bold text-bg_primary">
                        ${orderDetails.total_price.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center text-gray-500">
            No order details available
          </div>
        )}

        <DialogFooter>
          {orderDetails && orderDetails.status === "Pending" && (
            <Button
              variant="destructive"
              onClick={handleCancelOrder}
              disabled={isLoading}
              className="mr-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                "Cancel Order"
              )}
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
