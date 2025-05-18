// src/presentation/pages/customerPage.tsx
"use client";

import {useState, useEffect} from "react";
import {
  Card,
  CardContent,
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
import {Input} from "@/presentation/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/presentation/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/components/ui/tabs";
import {Switch} from "@/presentation/components/ui/switch";
import {
  Loader2,
  Search,
  UserCircle,
  Mail,
  Phone,
  Calendar,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  UserX,
} from "lucide-react";
import AdminLayout from "@/presentation/components/admin/layout/adminLayout";
import {userService, User} from "@/lib/api/userService";

export default function CustomerPage() {
  const [customers, setCustomers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentCustomer, setCurrentCustomer] = useState<User | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, [currentPage]);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.getCustomers();
      if (response.data) {
        setCustomers(response.data || []);
        // Calculate totalPages based on items per page (10 for example)
        setTotalPages(Math.ceil((response.data?.length || 0) / 10));
      } else {
        setError("Failed to fetch customers");
      }
    } catch (err) {
      setError("An error occurred while fetching customers");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerDetails = async (id: string) => {
    try {
      // Get customer details
      const response = await userService.getUserById(id);

      if (response.data && response.data) {
        setCurrentCustomer(response.data);
        setIsViewModalOpen(true);

        // Get subscription status
        fetchSubscriptionStatus(id);
      }
    } catch (err) {
      console.error("Failed to fetch customer details:", err);
    }
  };

  const fetchSubscriptionStatus = async (id: string) => {
    setIsSubscriptionLoading(true);
    try {
      const response = await userService.getUserSubscriptionStatus(id);
      if (response.data && response.data) {
        setIsSubscribed(response.data.isSubscribed);
      }
    } catch (err) {
      console.error("Failed to fetch subscription status:", err);
    } finally {
      setIsSubscriptionLoading(false);
    }
  };

  const handleUpdateSubscription = async (isChecked: boolean) => {
    if (!currentCustomer) return;

    setIsSubscriptionLoading(true);
    try {
      const response = await userService.updateUserSubscription(
        currentCustomer.id,
        isChecked
      );

      if (response.data && response.data.success) {
        setIsSubscribed(isChecked);
      }
    } catch (err) {
      console.error("Failed to update subscription:", err);
    } finally {
      setIsSubscriptionLoading(false);
    }
  };

  const openDeleteModal = (customer: User) => {
    setCurrentCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCustomer = async () => {
    if (!currentCustomer) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await userService.deleteUser(currentCustomer.id);

      setIsDeleteModalOpen(false);
      // Remove deleted customer from the customers list
      setCustomers(customers.filter((c) => c.id !== currentCustomer.id));
    } catch (err) {
      setError("An error occurred while deleting customer");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter customers by search query
  const filteredCustomers = searchQuery
    ? customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (customer.phone_number && customer.phone_number.includes(searchQuery))
      )
    : customers;

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <AdminLayout>
      <div className="container mx-auto my-6">
        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Customers Table */}
            {loading ? (
              <div className="py-12 flex justify-center items-center">
                <Loader2 className="h-8 w-8 animate-spin text-bg_primary" />
              </div>
            ) : filteredCustomers.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                <UserCircle className="h-6 w-6 text-gray-500" />
                              </div>
                              <div className="font-medium">{customer.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 text-gray-400 mr-2" />
                              <span>{customer.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {customer.phone_number ? (
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                                <span>{customer.phone_number}</span>
                              </div>
                            ) : (
                              <span className="text-gray-400">
                                Not provided
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {customer.is_email_verified ? (
                              <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Verified
                              </Badge>
                            ) : (
                              <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
                                <XCircle className="h-3 w-3" />
                                Unverified
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                              <span>{formatDate(customer.created_at)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  fetchCustomerDetails(customer.id)
                                }
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => openDeleteModal(customer)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-6">
                    <nav>
                      <ul className="flex space-x-1">
                        <li>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCurrentPage(Math.max(1, currentPage - 1))
                            }
                            disabled={currentPage === 1}
                          >
                            Previous
                          </Button>
                        </li>
                        {Array.from({length: totalPages}, (_, i) => i + 1).map(
                          (page) => {
                            // Show limited page numbers
                            if (
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 &&
                                page <= currentPage + 1)
                            ) {
                              return (
                                <li key={page}>
                                  <Button
                                    variant={
                                      page === currentPage
                                        ? "default"
                                        : "outline"
                                    }
                                    size="sm"
                                    className={
                                      page === currentPage
                                        ? "bg-bg_primary hover:bg-btn_hover"
                                        : ""
                                    }
                                    onClick={() => setCurrentPage(page)}
                                  >
                                    {page}
                                  </Button>
                                </li>
                              );
                            }

                            // Show ellipsis
                            if (
                              page === currentPage - 2 ||
                              page === currentPage + 2
                            ) {
                              return (
                                <li key={page} className="px-3 py-2">
                                  ...
                                </li>
                              );
                            }

                            return null;
                          }
                        )}
                        <li>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCurrentPage(
                                Math.min(totalPages, currentPage + 1)
                              )
                            }
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </Button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="py-12 text-center">
                <UserX className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-4 text-gray-500">No customers found</p>
                <p className="text-sm text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* View Customer Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg">Customer Details</DialogTitle>
          </DialogHeader>

          {currentCustomer ? (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Customer Information
                  </h3>

                  <div className="flex flex-col p-4 border rounded-md bg-gray-50">
                    <div className="flex justify-center mb-4">
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserCircle className="h-10 w-10 text-gray-500" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">Name</span>
                        <div className="font-medium">
                          {currentCustomer.name}
                        </div>
                      </div>

                      <div>
                        <span className="text-sm text-gray-500">Email</span>
                        <div className="font-medium flex items-center gap-2">
                          {currentCustomer.email}
                          {currentCustomer.is_email_verified ? (
                            <Badge className="bg-green-100 text-green-800">
                              Verified
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              Unverified
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div>
                        <span className="text-sm text-gray-500">Phone</span>
                        <div className="font-medium">
                          {currentCustomer.phone_number || "Not provided"}
                        </div>
                      </div>

                      <div>
                        <span className="text-sm text-gray-500">Joined</span>
                        <div className="font-medium">
                          {formatDate(currentCustomer.created_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Marketing & Subscriptions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Marketing & Subscriptions
                  </h3>

                  <div className="p-4 border rounded-md bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium">Email Newsletter</p>
                        <p className="text-sm text-gray-500">
                          Receive promotions and updates
                        </p>
                      </div>

                      {isSubscriptionLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-bg_primary" />
                      ) : (
                        <Switch
                          checked={isSubscribed}
                          onCheckedChange={handleUpdateSubscription}
                        />
                      )}
                    </div>

                    <div className="text-sm text-gray-500">
                      Last updated: {new Date().toLocaleDateString()}
                    </div>
                  </div>

                  <div className="p-4 border rounded-md bg-gray-50">
                    <h4 className="font-medium mb-2">Account Actions</h4>

                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-red-500 hover:text-red-700"
                        onClick={() => {
                          setIsViewModalOpen(false);
                          openDeleteModal(currentCustomer);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Customer Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order History & Activity */}
              <div>
                <Tabs defaultValue="orders">
                  <TabsList>
                    <TabsTrigger value="orders">Order History</TabsTrigger>
                    <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="orders"
                    className="p-4 border rounded-md mt-4"
                  >
                    {/* In a real application, fetch customer orders */}
                    <div className="text-center text-gray-500 py-8">
                      <p>No order history available</p>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="activity"
                    className="p-4 border rounded-md mt-4"
                  >
                    {/* In a real application, fetch customer activity */}
                    <div className="text-center text-gray-500 py-8">
                      <p>No recent activity available</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          ) : (
            <div className="py-12 flex justify-center items-center">
              <Loader2 className="h-8 w-8 animate-spin text-bg_primary" />
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Customer</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium">
                  Are you sure you want to delete this customer?
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  This action cannot be undone. All customer data, orders, and
                  account information will be permanently deleted.
                </p>
              </div>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 text-red-500 p-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {currentCustomer && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium">{currentCustomer.name}</p>
                <p className="text-sm text-gray-500">{currentCustomer.email}</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleDeleteCustomer}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Customer"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
