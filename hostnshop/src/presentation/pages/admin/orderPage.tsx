/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Updated src/presentation/pages/orderPage.tsx with AdminOrderDetails integration
"use client";

import React, {useState, useEffect} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components/ui/table";
import {Button} from "@/presentation/components/ui/button";
import {Input} from "@/presentation/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/presentation/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/components/ui/select";
import {
  Loader2,
  Search,
  FileText,
  Eye,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Calendar,
  User,
  Truck,
  Package,
  DollarSign,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {Badge} from "@/presentation/components/ui/badge";
import {OrderStatus} from "@/shared/enums";
import AdminLayout from "@/presentation/components/admin/layout/adminLayout";

import {orderService} from "@/lib/api/orderService"; // Import orderService
import AdminOrderDetails from "@/presentation/components/admin/order/AdminOrderDetails";

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price_at_purchase: number;
  discount_applied: number;
  subtotal: number;
}

interface Customer {
  name: string;
  email: string;
}

interface Payment {
  id: string;
  payment_method: string;
  payment_status: string;
  transaction_id?: string;
  created_at: string;
}

interface Order {
  id: string;
  customer_id: string;
  customer?: Customer;
  total_price: number;
  status: OrderStatus;
  created_at: string;
  items?: OrderItem[];
  payment?: Payment;
}

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [viewOrderModalOpen, setViewOrderModalOpen] = useState(false);
  const [updateStatusModalOpen, setUpdateStatusModalOpen] = useState(false);
  const [adminOrderDetailsOpen, setAdminOrderDetailsOpen] = useState(false); // New state for AdminOrderDetails
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null); // Order ID for AdminOrderDetails
  const [newStatus, setNewStatus] = useState<OrderStatus | "">("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderDetailLoading, setOrderDetailLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const itemsPerPage = 10;

  // Fetch orders
  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter, sortDirection]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await orderService.getOrders({
        page: currentPage,
        limit: itemsPerPage,
        status: statusFilter || undefined,
      });

      if (response.data) {
        setOrders((response.data.orders as unknown as Order[]) || []);
        setTotalPages(response.data.totalPages || 1);
      } else {
        setError("Failed to fetch orders");
      }
    } catch (err) {
      setError("An error occurred while fetching orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId: string) => {
    setOrderDetailLoading(true);
    setError(null);
    try {
      const response = await orderService.getOrderById(orderId);

      if (response.data) {
        setCurrentOrder(response.data.data);
        setViewOrderModalOpen(true);
      } else {
        setError("Failed to fetch order details");
      }
    } catch (err) {
      setError("An error occurred while fetching order details");
      console.error(err);
    } finally {
      setOrderDetailLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!currentOrder || !newStatus) return;

    setIsSubmitting(true);
    setError(null);
    try {
      // First let's create an update function in orderService if it doesn't exist
      const updateOrderStatus = async (orderId: string, status: string) => {
        return await orderService.updateOrderStatus(orderId, status);
      };

      const response = await updateOrderStatus(currentOrder.id, newStatus);

      // Assuming the response follows the same pattern as other API responses
      if (response.data) {
        // Update orders list
        setOrders(
          orders.map((order) =>
            order.id === currentOrder.id
              ? {...order, status: newStatus as OrderStatus}
              : order
          )
        );

        // Update current order if needed
        if (currentOrder) {
          setCurrentOrder({...currentOrder, status: newStatus as OrderStatus});
        }

        setUpdateStatusModalOpen(false);
        setNewStatus("");
      } else {
        setError("Failed to update order status");
      }
    } catch (err) {
      setError("An error occurred while updating order status");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openViewOrderModal = (order: Order) => {
    fetchOrderDetails(order.id);
  };

  const openAdminOrderDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setAdminOrderDetailsOpen(true);
  };

  const openUpdateStatusModal = (order: Order) => {
    setCurrentOrder(order);
    setNewStatus(order.status);
    setUpdateStatusModalOpen(true);
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Filter orders by search query
  const filteredOrders = searchQuery
    ? orders.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (order.customer?.name || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (order.customer?.email || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    : orders;

  // Get status badge color
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case OrderStatus.PROCESSING:
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case OrderStatus.SHIPPED:
        return <Badge className="bg-indigo-100 text-indigo-800">Shipped</Badge>;
      case OrderStatus.DELIVERED:
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      case OrderStatus.CANCELLED:
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
    );
  };

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Order Management</h1>
          <p className="text-gray-500 mt-1">View and manage customer orders</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div>
            {/* Status filter - Uncomment if needed
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value as OrderStatus | "");
                setCurrentPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value={OrderStatus.PENDING}>Pending</SelectItem>
                <SelectItem value={OrderStatus.PROCESSING}>
                  Processing
                </SelectItem>
                <SelectItem value={OrderStatus.SHIPPED}>Shipped</SelectItem>
                <SelectItem value={OrderStatus.DELIVERED}>Delivered</SelectItem>
                <SelectItem value={OrderStatus.CANCELLED}>Cancelled</SelectItem>
              </SelectContent>
            </Select>
            */}
          </div>
          <div className="lg:flex lg:justify-end">
            <Button
              variant="outline"
              onClick={fetchOrders}
              className="w-full lg:w-auto bg-bg_primary hover:bg-btn_hover text-accent hover:text-accent"
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </Button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="py-12 flex justify-center items-center">
              <Loader2 className="h-8 w-8 animate-spin text-bg_primary" />
            </div>
          ) : filteredOrders.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>
                        <button
                          className="flex items-center"
                          onClick={toggleSortDirection}
                        >
                          Date
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </button>
                      </TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id.substring(0, 8)}...
                        </TableCell>
                        <TableCell>
                          {order.customer ? (
                            <div>
                              <div className="font-medium">
                                {order.customer.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {order.customer.email}
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-500">Unknown</span>
                          )}
                        </TableCell>
                        <TableCell>{formatDate(order.created_at)}</TableCell>
                        <TableCell className="font-medium">
                          ${order.total_price.toFixed(2)}
                        </TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openAdminOrderDetails(order.id)} // Open the AdminOrderDetails modal
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openUpdateStatusModal(order)}
                              disabled={
                                order.status === OrderStatus.DELIVERED ||
                                order.status === OrderStatus.CANCELLED
                              }
                            >
                              <Truck className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 border-t">
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * itemsPerPage + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(
                        currentPage * itemsPerPage,
                        (currentPage - 1) * itemsPerPage + filteredOrders.length
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {totalPages * itemsPerPage}
                    </span>{" "}
                    orders
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center space-x-1">
                    {Array.from({length: totalPages}, (_, i) => i + 1).map(
                      (page) => {
                        // Show only a limited number of pages
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <Button
                              key={page}
                              size="sm"
                              variant={
                                page === currentPage ? "default" : "outline"
                              }
                              className={
                                page === currentPage
                                  ? "bg-bg_primary hover:bg-btn_hover  text-accent hover:text-accent"
                                  : ""
                              }
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </Button>
                          );
                        }
                        // Show ellipsis for skipped pages
                        if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return <span key={page}>...</span>;
                        }
                        return null;
                      }
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-4 text-gray-500">No orders found</p>
              <p className="text-sm text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* View Order Modal - Original Dialog */}
      <Dialog open={viewOrderModalOpen} onOpenChange={setViewOrderModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Order Details
              {currentOrder && (
                <span className="ml-2 text-gray-500">
                  #{currentOrder.id.substring(0, 8)}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          {orderDetailLoading ? (
            <div className="py-12 flex justify-center items-center">
              <Loader2 className="h-8 w-8 animate-spin text-bg_primary" />
            </div>
          ) : currentOrder ? (
            <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto">
              {/* Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-semibold">Date:</span>
                    <span className="ml-2">
                      {formatDate(currentOrder.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Package className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-semibold">Status:</span>
                    <span className="ml-2">
                      {getStatusBadge(currentOrder.status)}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-semibold">Customer:</span>
                    <span className="ml-2">
                      {currentOrder.customer?.name || "Unknown"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-semibold">Total:</span>
                    <span className="ml-2 font-bold text-bg_primary">
                      ${currentOrder.total_price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              {currentOrder.payment && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Payment Information</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <dt className="text-gray-500">Payment Method</dt>
                      <dd className="font-medium">
                        {currentOrder.payment.payment_method}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Payment Status</dt>
                      <dd className="font-medium">
                        {currentOrder.payment.payment_status === "Completed" ? (
                          <span className="text-green-600 flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Completed
                          </span>
                        ) : currentOrder.payment.payment_status === "Failed" ? (
                          <span className="text-red-600 flex items-center">
                            <XCircle className="h-4 w-4 mr-1" />
                            Failed
                          </span>
                        ) : (
                          <span>{currentOrder.payment.payment_status}</span>
                        )}
                      </dd>
                    </div>
                    {currentOrder.payment.transaction_id && (
                      <div className="md:col-span-2">
                        <dt className="text-gray-500">Transaction ID</dt>
                        <dd className="font-medium font-mono text-xs">
                          {currentOrder.payment.transaction_id}
                        </dd>
                      </div>
                    )}
                    <div className="md:col-span-2">
                      <dt className="text-gray-500">Payment Date</dt>
                      <dd>{formatDate(currentOrder.payment.created_at)}</dd>
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
                      {currentOrder.items && currentOrder.items.length > 0 ? (
                        currentOrder.items.map((item) => (
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
                          ${currentOrder.total_price.toFixed(2)}
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
            {currentOrder && (
              <Button
                onClick={() => {
                  setViewOrderModalOpen(false);
                  openUpdateStatusModal(currentOrder);
                }}
                disabled={
                  !currentOrder ||
                  currentOrder.status === OrderStatus.DELIVERED ||
                  currentOrder.status === OrderStatus.CANCELLED
                }
                className="bg-bg_primary hover:bg-btn_hover mr-2"
              >
                <Truck className="h-4 w-4 mr-2" />
                Update Status
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setViewOrderModalOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Status Modal */}
      <Dialog
        open={updateStatusModalOpen}
        onOpenChange={setUpdateStatusModalOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {error && (
              <div className="mb-4 bg-red-50 text-red-500 p-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">Current Status:</div>
                <div>{currentOrder && getStatusBadge(currentOrder.status)}</div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">New Status:</label>
                <Select
                  value={newStatus}
                  onValueChange={(value) => setNewStatus(value as OrderStatus)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={OrderStatus.PENDING}>Pending</SelectItem>
                    <SelectItem value={OrderStatus.PROCESSING}>
                      Processing
                    </SelectItem>
                    <SelectItem value={OrderStatus.SHIPPED}>Shipped</SelectItem>
                    <SelectItem value={OrderStatus.DELIVERED}>
                      Delivered
                    </SelectItem>
                    <SelectItem value={OrderStatus.CANCELLED}>
                      Cancelled
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUpdateStatusModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={Boolean(
                isSubmitting ||
                  !newStatus ||
                  (currentOrder && newStatus === currentOrder.status)
              )}
              onClick={handleUpdateStatus}
              className="bg-bg_primary hover:bg-btn_hover"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Status"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AdminOrderDetails Component */}
      <AdminOrderDetails
        open={adminOrderDetailsOpen}
        onOpenChange={(isOpen) => {
          setAdminOrderDetailsOpen(isOpen);
          // Refresh orders if modal closed and there were changes
          if (!isOpen) {
            fetchOrders();
          }
        }}
        orderId={selectedOrderId}
        onStatusUpdate={fetchOrders}
      />
    </AdminLayout>
  );
}
