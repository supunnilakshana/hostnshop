// src/app/products/page.tsx
import {Suspense} from "react";
import {productService} from "@/lib/api/productService";

import {Loader2} from "lucide-react";
import ProductFilter from "@/presentation/components/client/product/productFilter";
import ProductGrid from "@/presentation/components/client/product/ProductGrid";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    search?: string;
    page?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
    onSale?: string;
  };
}

export default async function ProductsPage({searchParams}: ProductsPageProps) {
  const page = parseInt(searchParams.page || "1");
  const limit = 12; // Products per page
  const categoryId = searchParams.category;
  const searchQuery = searchParams.search;

  // Fetch products based on search params
  const {data} = await productService.getProducts({
    page,
    limit,
    categoryId,
    search: searchQuery,
  });

  const products = data?.products || [];
  const totalProducts = data?.total || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  // Fetch categories for filter
  const categoriesResponse = await productService.getCategories();
  const categories = categoriesResponse.data || [];

  // Calculate min and max price for filter
  const minPrice = 0;
  const maxPrice = 1000; // Use a reasonable max or calculate from products

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textPrimary">
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : categoryId
            ? `${
                categories.find((c) => c.id === categoryId)?.name || "Category"
              } Products`
            : "All Products"}
        </h1>
        {totalProducts > 0 && (
          <p className="text-textSecondary mt-2">
            Showing {products.length} of {totalProducts} products
          </p>
        )}
      </div>

      {/* Product Grid with Filters */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="lg:w-1/4">
          <Suspense fallback={<div>Loading filters...</div>}>
            <ProductFilter
              categories={categories}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          </Suspense>
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          {products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-textSecondary mb-4">No products found.</p>
              <p className="text-textSecondary">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-96">
                  <Loader2 className="h-8 w-8 animate-spin text-bg_primary" />
                </div>
              }
            >
              <ProductGrid products={products} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex space-x-1">
                    {Array.from({length: totalPages}, (_, i) => i + 1).map(
                      (p) => {
                        // Create search params for this page
                        const pageParams = new URLSearchParams();
                        if (categoryId) pageParams.set("category", categoryId);
                        if (searchQuery) pageParams.set("search", searchQuery);
                        pageParams.set("page", p.toString());

                        return (
                          <a
                            key={p}
                            href={`/products?${pageParams.toString()}`}
                            className={`px-4 py-2 border rounded-md ${
                              p === page
                                ? "bg-bg_primary text-white"
                                : "bg-white text-textPrimary hover:bg-grayLight"
                            }`}
                          >
                            {p}
                          </a>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}
