/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/products/page.tsx
"use client";

import {useState, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {Loader2, Search} from "lucide-react";
import {productService} from "@/lib/api/productService";
import ProductFilter from "@/presentation/components/client/product/productFilter";
import ProductGrid from "@/presentation/components/client/product/ProductGrid";
import {Input} from "@/presentation/components/ui/input";
import {Button} from "@/presentation/components/ui/button";
import {Badge} from "@/presentation/components/ui/badge";
import {ReadProductDTO} from "@/shared/dtos";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for products and filtering
  const [products, setProducts] = useState<ReadProductDTO[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ReadProductDTO[]>(
    []
  );
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12; // Products per page

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearchQuery, setTempSearchQuery] = useState("");

  // URL parameters
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");
  const pageParam = searchParams.get("page");
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const inStockParam = searchParams.get("inStock");
  const onSaleParam = searchParams.get("onSale");

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all products
        const productsResponse = await productService.getProducts();
        const allProducts = productsResponse.data?.products || [];
        setProducts(allProducts);
        setTotalProducts(allProducts.length);

        // Fetch categories
        const categoriesResponse = await productService.getCategories();
        setCategories(categoriesResponse.data || []);

        // Initialize filter states from URL parameters
        if (categoryParam) {
          setSelectedCategories(categoryParam.split(","));
        }

        if (searchParam) {
          setSearchQuery(searchParam);
          setTempSearchQuery(searchParam);
        }

        if (pageParam) {
          setCurrentPage(parseInt(pageParam, 10));
        }

        if (minPriceParam && maxPriceParam) {
          setPriceRange([
            parseInt(minPriceParam, 10),
            parseInt(maxPriceParam, 10),
          ]);
        } else {
          // Calculate min/max price from products if not in URL
          if (allProducts.length > 0) {
            const prices = allProducts.map((p) => p.price);
            const minPrice = Math.floor(Math.min(...prices));
            const maxPrice = Math.ceil(Math.max(...prices));
            setPriceRange([minPrice, maxPrice]);
          }
        }

        if (inStockParam) {
          setInStock(inStockParam === "true");
        }

        if (onSaleParam) {
          setOnSale(onSaleParam === "true");
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    categoryParam,
    searchParam,
    pageParam,
    minPriceParam,
    maxPriceParam,
    inStockParam,
    onSaleParam,
  ]);

  // Apply filters and update filteredProducts
  useEffect(() => {
    if (products.length === 0) return;

    let filtered = [...products];

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product.category_id &&
          selectedCategories.includes(product.category_id)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by stock status
    if (inStock) {
      filtered = filtered.filter((product) => product.stock_quantity > 0);
    }

    // Filter by discount/sale status
    if (onSale) {
      filtered = filtered.filter((product) => product.discount_percentage > 0);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
    setTotalProducts(filtered.length);

    // Reset to first page when filters change
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [products, selectedCategories, priceRange, inStock, onSale, searchQuery]);

  // Update URL with filter parameters
  const updateURLWithFilters = () => {
    const params = new URLSearchParams();

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","));
    }

    if (searchQuery) {
      params.set("search", searchQuery);
    }

    if (priceRange[0] > 0) {
      params.set("minPrice", priceRange[0].toString());
    }

    if (priceRange[1] < 1000) {
      params.set("maxPrice", priceRange[1].toString());
    }

    if (inStock) {
      params.set("inStock", "true");
    }

    if (onSale) {
      params.set("onSale", "true");
    }

    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    router.push(`/products?${params.toString()}`, {scroll: false});
  };

  // Handle filter changes and update URL
  useEffect(() => {
    updateURLWithFilters();
  }, [
    selectedCategories,
    searchQuery,
    priceRange,
    inStock,
    onSale,
    currentPage,
  ]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(tempSearchQuery);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setInStock(false);
    setOnSale(false);
    setSearchQuery("");
    setTempSearchQuery("");

    // Reset price range to min/max from all products
    if (products.length > 0) {
      const prices = products.map((p) => p.price);
      const minPrice = Math.floor(Math.min(...prices));
      const maxPrice = Math.ceil(Math.max(...prices));
      setPriceRange([minPrice, maxPrice]);
    } else {
      setPriceRange([0, 1000]);
    }

    setCurrentPage(1);
    router.push("/products");
  };

  // Calculate pagination
  const totalPages = Math.ceil(totalProducts / limit);
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Calculate max price for slider if we have products
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((p) => p.price);
      const maxProductPrice = Math.ceil(Math.max(...prices));
      // Only update if the current max is different
      if (priceRange[1] === 1000 && maxProductPrice !== 1000) {
        setPriceRange([priceRange[0], maxProductPrice]);
      }
    }
  }, [products]);

  // Get active filter count
  const activeFilterCount =
    (selectedCategories.length > 0 ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (inStock ? 1 : 0) +
    (onSale ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0);

  // Get category name by ID
  const getCategoryName = (id: string) => {
    const category = categories.find((c) => c.id === id);
    return category ? category.name : "Unknown Category";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textPrimary">
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : selectedCategories.length === 1
            ? `${getCategoryName(selectedCategories[0])} Products`
            : "Shop All Products"}
        </h1>

        {/* Search Bar */}
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1 flex">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search products..."
                value={tempSearchQuery}
                onChange={(e) => setTempSearchQuery(e.target.value)}
                className="pr-10"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center px-3"
              >
                <Search className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </form>

          {/* Active Filter Tags */}
          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {selectedCategories.map((catId) => (
                <Badge
                  key={catId}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {getCategoryName(catId)}
                  <button
                    onClick={() => {
                      setSelectedCategories(
                        selectedCategories.filter((id) => id !== catId)
                      );
                    }}
                    className="ml-1 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              ))}

              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchQuery}
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setTempSearchQuery("");
                    }}
                    className="ml-1 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              )}

              {inStock && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  In Stock
                  <button
                    onClick={() => setInStock(false)}
                    className="ml-1 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              )}

              {onSale && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  On Sale
                  <button
                    onClick={() => setOnSale(false)}
                    className="ml-1 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              )}

              {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Price: ${priceRange[0]} - ${priceRange[1]}
                  <button
                    onClick={() => {
                      if (products.length > 0) {
                        const prices = products.map((p) => p.price);
                        const minPrice = Math.floor(Math.min(...prices));
                        const maxPrice = Math.ceil(Math.max(...prices));
                        setPriceRange([minPrice, maxPrice]);
                      } else {
                        setPriceRange([0, 1000]);
                      }
                    }}
                    className="ml-1 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                className="ml-auto"
              >
                Clear All
              </Button>
            </div>
          )}
        </div>

        {totalProducts > 0 && (
          <p className="text-textSecondary mt-4">
            Showing {paginatedProducts.length} of {totalProducts} products
          </p>
        )}
      </div>

      {/* Product Grid with Filters */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="lg:w-1/4">
          <ProductFilter
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            inStock={inStock}
            setInStock={setInStock}
            onSale={onSale}
            setOnSale={setOnSale}
            minPrice={0}
            maxPrice={1000}
            clearFilters={handleClearFilters}
          />
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <Loader2 className="h-8 w-8 animate-spin text-bg_primary" />
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-medium text-textPrimary mb-2">
                No products found
              </h3>
              <p className="text-textSecondary mb-4">
                We couldn&lsquo;t find any products matching your current
                filters.
              </p>
              <Button onClick={handleClearFilters}>Clear All Filters</Button>
            </div>
          ) : (
            <>
              <ProductGrid products={paginatedProducts} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {/* Previous Page Button */}
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

                    {/* Page Numbers */}
                    {Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                      // Create centered window of 5 pages
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}

                    {/* Next Page Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
