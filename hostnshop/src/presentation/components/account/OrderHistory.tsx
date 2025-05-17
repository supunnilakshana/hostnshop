// src/components/account/OrderHistory.tsx
"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import {Button} from "@/presentation/components/ui/button";
import {Eye, Package, TruckIcon, CheckCircle, AlertCircle} from "lucide-react";
import {Badge} from "@/presentation/components/ui/badge";
import {ReadOrderDTO} from "@/shared/dtos";
import {orderService} from "@/lib/api/orderService";
import OrderDetailsModal from "./OrderDetailsModal";

export default function OrderHistory() {
  const [orders, setOrders] = useState<ReadOrderDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const fetchOrders = async (page: number) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await orderService.getOrders({page, limit: 5});

      if (response.data) {
        setOrders(response.data.orders);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setError("Failed to load orders. Please try again.");
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Package className="h-5 w-5 text-yellow-500" />;
      case "Processing":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "Shipped":
        return <TruckIcon className="h-5 w-5 text-purple-500" />;
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "Cancelled":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  const handleViewOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
  };

  const handleCloseModal = () => {
    setSelectedOrderId(null);
  };

  if (isLoading && orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-textPrimary mb-6">
          Order History
        </h2>
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bg_primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-textPrimary mb-6">
          Order History
        </h2>
        <div className="text-center py-6">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => fetchOrders(currentPage)}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-textPrimary mb-6">
        Order History
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-textSecondary mb-4">
            You don&apos;t have any orders yet.
          </p>
          <Button asChild className="bg-bg_primary hover:bg-btn_hover">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-md p-4 hover:border-bg_primary transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <div className="flex items-center">
                    {getStatusIcon(order.status)}
                    <h3 className="font-medium ml-2">
                      Order #{order.id.substring(0, 8)}
                    </h3>
                  </div>
                  <div className="mt-2 md:mt-0">
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between text-sm">
                  <div className="text-textSecondary">
                    <p>
                      Date: {new Date(order.created_at).toLocaleDateString()}
                    </p>
                    <p>Total: ${order.total_price.toFixed(2)}</p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 md:mt-0"
                    onClick={() => handleViewOrder(order.id)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="flex space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                {Array.from({length: totalPages}, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={
                        page === currentPage
                          ? "bg-bg_primary hover:bg-btn_hover"
                          : ""
                      }
                    >
                      {page}
                    </Button>
                  )
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Order Details Modal */}
      {selectedOrderId && (
        <OrderDetailsModal
          orderId={selectedOrderId}
          onClose={() => {
            handleCloseModal();
            // Refresh the orders list when modal is closed (in case of changes)
            fetchOrders(currentPage);
          }}
        />
      )}
    </div>
  );
}
