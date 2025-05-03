/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/products/[id]/page.tsx
import {productService} from "@/lib/api/productService";
import ProductDetail from "@/presentation/components/client/product/ProductDetail";
import ProductGrid from "@/presentation/components/client/product/ProductGrid";
import ReviewList from "@/presentation/components/client/product/ReviewList";
import ReviewStats from "@/presentation/components/client/product/ReviewStats";

import {notFound} from "next/navigation";

interface ProductPageProps {
  params: {id: string};
}

export default async function ProductPage({params}: ProductPageProps) {
  try {
    const {id} = params;
    const productResponse = await productService.getProductById(id);

    if (!productResponse.data) {
      return notFound();
    }

    const product = productResponse.data;

    // Fetch category if category_id exists
    let category;
    if (product.category_id) {
      const categoriesResponse = await productService.getCategories();
      category = categoriesResponse.data?.find(
        (c) => c.id === product.category_id
      );
    }

    // Fetch related products (same category)
    let relatedProducts: string | any[] = [];
    if (product.category_id) {
      const relatedResponse = await productService.getProducts({
        categoryId: product.category_id,
        limit: 4,
      });

      // Filter out the current product
      relatedProducts =
        relatedResponse.data?.products.filter((p) => p.id !== id) || [];
    }

    return (
      <div className="pt-6">
        {/* Product Detail */}
        <ProductDetail product={product} category={category} />

        {/* Reviews Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-textPrimary mb-4">
                Ratings & Reviews
              </h2>
              <ReviewStats productId={id} />
            </div>
            <div className="md:col-span-2">
              <ReviewList productId={id} />
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="bg-grayLight py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-textPrimary mb-8">
                You May Also Like
              </h2>
              <ProductGrid products={relatedProducts} />
            </div>
          </div>
        )}
      </div>
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return notFound();
  }
}
