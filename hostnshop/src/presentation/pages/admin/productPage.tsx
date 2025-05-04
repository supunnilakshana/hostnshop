/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
// src/presentation/pages/productPage.tsx
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
import {Textarea} from "@/presentation/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
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
  PlusCircle,
  Pencil,
  Trash2,
  AlertCircle,
  Loader2,
  Search,
  Package,
  ImageIcon,
} from "lucide-react";
import {Label} from "@/presentation/components/ui/label";

import {Badge} from "@/presentation/components/ui/badge";
import {
  CreateProductDTO,
  ReadProductDTO,
  UpdateProductDTO,
  ReadCategoryDTO,
} from "@/shared/dtos";
import AdminLayout from "@/presentation/components/admin/layout/adminLayout";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  discount_percentage: number;
  stock_quantity: number;
  image_url: string;
  category_id?: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<ReadProductDTO[]>([]);
  const [categories, setCategories] = useState<ReadCategoryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ReadProductDTO | null>(
    null
  );
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    discount_percentage: 0,
    stock_quantity: 0,
    image_url: "",
    category_id: undefined,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ReadProductDTO | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(
    undefined
  );

  // Fetch products and categories
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/products");
      const data = await response.json();

      if (data.success) {
        setProducts(data.data?.products || []);
      } else {
        setError(data.message || "Failed to fetch products");
      }
    } catch (err) {
      setError("An error occurred while fetching products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();

      if (data.success) {
        setCategories(data.data || []);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;
    let parsedValue: string | number = value;

    // Convert numeric fields to numbers
    if (
      name === "price" ||
      name === "discount_percentage" ||
      name === "stock_quantity"
    ) {
      parsedValue = parseFloat(value) || 0;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form data
      if (!formData.name.trim()) {
        setError("Product name is required");
        setIsSubmitting(false);
        return;
      }

      if (formData.price <= 0) {
        setError("Price must be greater than zero");
        setIsSubmitting(false);
        return;
      }

      if (
        formData.discount_percentage < 0 ||
        formData.discount_percentage > 100
      ) {
        setError("Discount percentage must be between 0 and 100");
        setIsSubmitting(false);
        return;
      }

      if (formData.stock_quantity < 0) {
        setError("Stock quantity cannot be negative");
        setIsSubmitting(false);
        return;
      }

      if (!formData.image_url.trim()) {
        setError("Image URL is required");
        setIsSubmitting(false);
        return;
      }

      const productData: CreateProductDTO | UpdateProductDTO = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: formData.price,
        discount_percentage: formData.discount_percentage,
        stock_quantity: formData.stock_quantity,
        image_url: formData.image_url.trim(),
        category_id: formData.category_id || undefined,
      };

      const url =
        isEditMode && currentProduct
          ? `/api/products/${currentProduct.id}`
          : "/api/products";

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchProducts();
        resetForm();
        setIsOpen(false);
      } else {
        setError(
          data.message ||
            `Failed to ${isEditMode ? "update" : "create"} product`
        );
      }
    } catch (err) {
      setError(
        `An error occurred while ${
          isEditMode ? "updating" : "creating"
        } the product`
      );
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/products/${productToDelete.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        await fetchProducts();
        setIsDeleting(false);
        setProductToDelete(null);
      } else {
        setError(data.message || "Failed to delete product");
      }
    } catch (err) {
      setError("An error occurred while deleting the product");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditDialog = (product: ReadProductDTO) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      discount_percentage: product.discount_percentage,
      stock_quantity: product.stock_quantity,
      image_url: product.image_url,
      category_id: product.category_id || undefined,
    });
    setIsEditMode(true);
    setIsOpen(true);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsEditMode(false);
    setIsOpen(true);
  };

  const openDeleteDialog = (product: ReadProductDTO) => {
    setIsDeleting(true);
    setProductToDelete(product);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      discount_percentage: 0,
      stock_quantity: 0,
      image_url: "",
      category_id: undefined,
    });
    setCurrentProduct(null);
    setError(null);
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Filter by search query
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by category
    const matchesCategory =
      !categoryFilter || product.category_id === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Get stock status
  const getStockStatus = (quantity: number) => {
    if (quantity <= 0)
      return {label: "Out of Stock", color: "bg_outofstock text_outofstock"};
    if (quantity < 10)
      return {label: "Low Stock", color: "bg_lowstock text_lowstock"};
    return {label: "In Stock", color: "bg_instock text_instock"};
  };

  // Find category name by ID
  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return "Uncategorized";
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown";
  };

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Product Management</h1>
          <Button
            className="bg-bg_primary hover:bg-btn_hover"
            onClick={openCreateDialog}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div>
            {/* <Select
              value={categoryFilter}
              onValueChange={(value) => setCategoryFilter(value || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="py-12 flex justify-center items-center">
              <Loader2 className="h-8 w-8 animate-spin text-bg_primary" />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stock_quantity);
                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          {product.image_url ? (
                            <div className="w-12 h-12 relative rounded overflow-hidden bg-gray-100">
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/assets/images/placeholder.png";
                                }}
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded">
                              <ImageIcon className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium max-w-[200px] truncate">
                          {product.name}
                        </TableCell>
                        <TableCell>
                          {getCategoryName(product.category_id)}
                        </TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          {product.discount_percentage > 0 ? (
                            <span className="text-green-600 font-medium">
                              {product.discount_percentage}%
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>{product.stock_quantity}</TableCell>
                        <TableCell>
                          <Badge
                            className={`bg-${
                              stockStatus.color.split(" ")[0]
                            } text-${stockStatus.color.split(" ")[1]}`}
                          >
                            {stockStatus.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openEditDialog(product)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => openDeleteDialog(product)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <Package className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-4 text-gray-500">No products found</p>
              <p className="text-sm text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Product Form Dialog */}
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) resetForm();
          setIsOpen(open);
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category_id">Category</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) =>
                    handleSelectChange("category_id", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Uncategorized</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">
                  Price ($) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount_percentage">
                  Discount Percentage (%)
                </Label>
                <Input
                  id="discount_percentage"
                  name="discount_percentage"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={formData.discount_percentage}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock_quantity">
                  Stock Quantity <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="stock_quantity"
                  name="stock_quantity"
                  type="number"
                  min="0"
                  value={formData.stock_quantity}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">
                  Image URL <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                />
              </div>

              {formData.image_url && (
                <div className="md:col-span-2">
                  <Label>Image Preview</Label>
                  <div className="mt-2 h-40 border rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
                    <img
                      src={formData.image_url}
                      alt="Product preview"
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/assets/images/placeholder.png";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="bg-bg_primary hover:bg-btn_hover"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>{isEditMode ? "Update" : "Create"}</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleting}
        onOpenChange={(open) => !open && setIsDeleting(false)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete the product &ldquo;
              {productToDelete?.name}&quot;? This action cannot be undone.
            </p>
            {error && (
              <div className="mt-4 bg-red-50 text-red-500 p-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                <p>{error}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleting(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProduct}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
