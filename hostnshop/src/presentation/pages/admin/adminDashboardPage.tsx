// src/app/admin/dashboard/page.tsx
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, {useState, useEffect} from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/components/ui/table";
import {Badge} from "@/presentation/components/ui/badge";
import {Button} from "@/presentation/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/components/ui/tabs";
import {
  DollarSign,
  Users,
  ShoppingBag,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
  Eye,
  Activity,
} from "lucide-react";

import {OrderStatus} from "@/shared/enums";
import {ReadProductDTO} from "@/shared/dtos";
import AdminLayout from "@/presentation/components/admin/layout/adminLayout";
import {
  dashboardService,
  DashboardSummary,
  OrderSummary,
  RecentAnalytics,
} from "@/lib/api/dashboardService";
import {getImageUrl} from "@/lib/utils/imageUtil";

export default function AdminDashBoardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [recentOrders, setRecentOrders] = useState<OrderSummary[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<ReadProductDTO[]>(
    []
  );
  const [analytics, setAnalytics] = useState<RecentAnalytics | null>(null);
  const [loading, setLoading] = useState({
    summary: true,
    recentOrders: true,
    lowStockProducts: true,
    analytics: true,
  });
  const [activeTimeframe, setActiveTimeframe] = useState("week");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    fetchAnalytics(activeTimeframe);
  }, [activeTimeframe]);

  const fetchDashboardData = async () => {
    fetchSummary();
    fetchRecentOrders();
    fetchLowStockProducts();
    fetchAnalytics(activeTimeframe);
  };

  const fetchSummary = async () => {
    setLoading((prev) => ({...prev, summary: true}));
    try {
      const response = await dashboardService.getDashboardSummary();
      if (response.data) {
        setSummary(response.data);
      }
    } catch (err) {
      console.error("Error fetching summary:", err);
    } finally {
      setLoading((prev) => ({...prev, summary: false}));
    }
  };

  const fetchRecentOrders = async () => {
    setLoading((prev) => ({...prev, recentOrders: true}));
    try {
      const response = await dashboardService.getRecentOrders(5);
      if (response.data) {
        setRecentOrders(response.data);
      }
    } catch (err) {
      console.error("Error fetching recent orders:", err);
    } finally {
      setLoading((prev) => ({...prev, recentOrders: false}));
    }
  };

  const fetchLowStockProducts = async () => {
    setLoading((prev) => ({...prev, lowStockProducts: true}));
    try {
      const response = await dashboardService.getLowStockProducts(5);
      if (response.data) {
        setLowStockProducts(response.data);
      }
    } catch (err) {
      console.error("Error fetching low stock products:", err);
    } finally {
      setLoading((prev) => ({...prev, lowStockProducts: false}));
    }
  };

  const fetchAnalytics = async (timeframe: string) => {
    setLoading((prev) => ({...prev, analytics: true}));
    try {
      const response = await dashboardService.getAnalytics(timeframe);
      if (response.data) {
        setAnalytics(response.data);
      }
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setLoading((prev) => ({...prev, analytics: false}));
    }
  };

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

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Welcome to your admin dashboard
            </p>
          </div>
          <Button
            onClick={fetchDashboardData}
            className="mt-2 md:mt-0 bg-bg_primary hover:bg-btn_hover text-accent hover:text-accent"
          >
            <span className="sr-only">Refresh</span>
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
            Refresh Data
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Revenue Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              {loading.summary ? (
                <div className="h-10 flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin text-bg_primary" />
                </div>
              ) : summary ? (
                <>
                  <div className="text-2xl font-bold">
                    {formatCurrency(summary.totalRevenue)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    {summary.revenueChange >= 0 ? (
                      <>
                        <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                        <span className="text-green-500 font-medium">
                          {summary.revenueChange.toFixed(1)}%
                        </span>
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
                        <span className="text-red-500 font-medium">
                          {Math.abs(summary.revenueChange).toFixed(1)}%
                        </span>
                      </>
                    )}
                    <span className="ml-1">from last month</span>
                  </p>
                </>
              ) : (
                <div className="text-gray-400">No data available</div>
              )}
            </CardContent>
          </Card>

          {/* Orders Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Orders
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              {loading.summary ? (
                <div className="h-10 flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin text-bg_primary" />
                </div>
              ) : summary ? (
                <>
                  <div className="text-2xl font-bold">
                    {summary.totalOrders}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    {summary.ordersChange >= 0 ? (
                      <>
                        <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                        <span className="text-green-500 font-medium">
                          {summary.ordersChange.toFixed(1)}%
                        </span>
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
                        <span className="text-red-500 font-medium">
                          {Math.abs(summary.ordersChange).toFixed(1)}%
                        </span>
                      </>
                    )}
                    <span className="ml-1">from last month</span>
                  </p>
                </>
              ) : (
                <div className="text-gray-400">No data available</div>
              )}
            </CardContent>
          </Card>

          {/* Customers Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Customers
              </CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              {loading.summary ? (
                <div className="h-10 flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin text-bg_primary" />
                </div>
              ) : summary ? (
                <>
                  <div className="text-2xl font-bold">
                    {summary.totalCustomers}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    {summary.customersChange >= 0 ? (
                      <>
                        <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                        <span className="text-green-500 font-medium">
                          {summary.customersChange.toFixed(1)}%
                        </span>
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
                        <span className="text-red-500 font-medium">
                          {Math.abs(summary.customersChange).toFixed(1)}%
                        </span>
                      </>
                    )}
                    <span className="ml-1">from last month</span>
                  </p>
                </>
              ) : (
                <div className="text-gray-400">No data available</div>
              )}
            </CardContent>
          </Card>

          {/* Products Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              {loading.summary ? (
                <div className="h-10 flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin text-bg_primary" />
                </div>
              ) : summary ? (
                <>
                  <div className="text-2xl font-bold">
                    {summary.totalProducts}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    {summary.productsChange >= 0 ? (
                      <>
                        <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                        <span className="text-green-500 font-medium">
                          {summary.productsChange.toFixed(1)}%
                        </span>
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
                        <span className="text-red-500 font-medium">
                          {Math.abs(summary.productsChange).toFixed(1)}%
                        </span>
                      </>
                    )}
                    <span className="ml-1">from last month</span>
                  </p>
                </>
              ) : (
                <div className="text-gray-400">No data available</div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Revenue Chart */}
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Revenue Overview</CardTitle>
                <Tabs
                  value={activeTimeframe}
                  onValueChange={setActiveTimeframe}
                  className="w-auto"
                >
                  <TabsList className="grid w-[240px] grid-cols-3">
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <CardDescription>
                Revenue trend over the selected period
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              {loading.analytics ? (
                <div className="h-[300px] flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-bg_primary" />
                </div>
              ) : analytics &&
                analytics.revenueByDay &&
                analytics.revenueByDay.length > 0 ? (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={analytics.revenueByDay}
                      margin={{top: 20, right: 30, left: 20, bottom: 20}}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="date"
                        tick={{fontSize: 12}}
                        tickMargin={10}
                      />
                      <YAxis
                        tickFormatter={(value: any) => `$${value}`}
                        tick={{fontSize: 12}}
                      />
                      <Tooltip
                        formatter={(value: any) => [`$${value}`, "Revenue"]}
                        labelFormatter={(label: any) => `Date: ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8A4FFF"
                        strokeWidth={3}
                        dot={{r: 4}}
                        activeDot={{r: 6}}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  No revenue data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <a href="/admin/orders">View All</a>
                </Button>
              </div>
              <CardDescription>Latest customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              {loading.recentOrders ? (
                <div className="h-[300px] flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-bg_primary" />
                </div>
              ) : recentOrders.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.slice(0, 5).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            <a
                              href={`/admin/orders/${order.id}`}
                              className="hover:underline text-bg_primary"
                            >
                              {order.id.substring(0, 8)}...
                            </a>
                          </TableCell>
                          <TableCell>{order.customer.name}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell className="text-right">
                            ${order.total_price.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No recent orders
                </div>
              )}
            </CardContent>
          </Card>

          {/* Orders by Status */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Orders by Status</CardTitle>
              <CardDescription>
                Distribution of orders by their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading.analytics ? (
                <div className="h-[300px] flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-bg_primary" />
                </div>
              ) : analytics &&
                analytics.ordersByStatus &&
                analytics.ordersByStatus.length > 0 ? (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={analytics.ordersByStatus}
                      margin={{top: 20, right: 30, left: 20, bottom: 20}}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="status" />
                      <YAxis
                        allowDecimals={false}
                        label={{
                          value: "Count",
                          angle: -90,
                          position: "insideLeft",
                          style: {textAnchor: "middle"},
                        }}
                      />
                      <Tooltip />
                      <Bar
                        dataKey="count"
                        fill="#8A4FFF"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  No order status data available
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Products */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-red-500" />
                Low Stock Products
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <a href="/admin/products">View All Products</a>
              </Button>
            </div>
            <CardDescription>
              Products that need to be restocked soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading.lowStockProducts ? (
              <div className="h-[200px] flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-bg_primary" />
              </div>
            ) : lowStockProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lowStockProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-10 h-10 relative rounded overflow-hidden bg-gray-100 mr-3">
                              <img
                                src={getImageUrl(product.image_url)}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/assets/images/placeholder.png";
                                }}
                              />
                            </div>
                            <div className="font-medium max-w-[200px] truncate">
                              {product.name}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            ${product.price.toFixed(2)}
                          </div>
                          {product.discount_percentage > 0 && (
                            <div className="text-xs text-green-600">
                              {product.discount_percentage}% off
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              product.stock_quantity <= 0
                                ? "bg-bg_outofstock text-text_outofstock"
                                : product.stock_quantity < 5
                                ? "bg-bg_lowstock text-text_lowstock"
                                : "bg-bg_instock text-text_instock"
                            }
                          >
                            {product.stock_quantity} in stock
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {product.category_id
                            ? product.category_id
                            : "Uncategorized"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            <Button size="sm" variant="outline" asChild>
                              <a href={`/admin/products?edit=${product.id}`}>
                                <Eye className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No low stock products found
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
