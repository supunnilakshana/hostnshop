// src/app/home/page.tsx
"use client";

import {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/presentation/components/ui/button";
import {
  ArrowRight,
  ShoppingBag,
  Truck,
  Sparkles,
  Gift,
  ChevronRight,
} from "lucide-react";
import {productService} from "@/lib/api/productService";
import {ReadProductDTO, ReadCategoryDTO} from "@/shared/dtos";
import ProductCard from "@/presentation/components/client/product/ProductCard";

export default function ClientHomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<ReadProductDTO[]>(
    []
  );
  const [categories, setCategories] = useState<ReadCategoryDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch featured products (latest 8 products)
        const productsResponse = await productService.getProducts({limit: 8});
        if (productsResponse.data) {
          setFeaturedProducts(productsResponse.data.products);
        }

        // Fetch categories
        const categoriesResponse = await productService.getCategories();
        if (categoriesResponse.data) {
          setCategories(categoriesResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
      <div className="absolute inset-0 z-0 w-full h-full">
      <Image
        src="/assets/images/hero-banner.jpg"
        alt="hero banner"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-black/30" />
    </div>


        <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Products at Great Prices
            </h1>
            <p className="text-lg mb-8">
              Shop the latest trends and find everything you need, all in one
              place.
            </p>
            <Button size="lg" className="bg-bg_primary hover:bg-btn_hover">
              <Link href="/products" className="flex items-center">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-textPrimary mb-2">
              Shop by Category
            </h2>
            <p className="text-textSecondary">
              Browse our wide selection of high-quality products
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({length: 4}).map((_, index) => (
                  <div
                    key={index}
                    className="h-40 bg-gray-200 animate-pulse rounded-lg"
                  ></div>
                ))
              : categories.slice(0, 8).map((category) => (
                  <Link
                    href={`/products?category=${category.id}`}
                    key={category.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                  >
                    <div className="h-40 bg-bg_secondary relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-bg_primary opacity-0 group-hover:opacity-20 transition-opacity" />
                      <h3 className="text-xl font-semibold text-textPrimary group-hover:text-bg_primary transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                ))}
          </div>

          <div className="text-center mt-10">
            <Button
              asChild
              variant="outline"
              className="border-bg_primary text-bg_primary hover:bg-bg_primary hover:text-white"
            >
              <Link href="/products" className="flex items-center">
                View All Categories <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-textPrimary mb-2">
              Featured Products
            </h2>
            <p className="text-textSecondary">
              Discover our most popular items
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({length: 8}).map((_, index) => (
                  <div
                    key={index}
                    className="h-80 bg-gray-200 animate-pulse rounded-lg"
                  ></div>
                ))
              : featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild className="bg-bg_primary hover:bg-btn_hover text-accent hover:text-accent">
              <Link href="/products" className="flex items-center">
                View All Products <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits/Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-textPrimary mb-2">
              Why Shop With Us
            </h2>
            <p className="text-textSecondary">
              Experience the best online shopping
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-bg_secondary rounded-full">
                  <Truck className="h-6 w-6 text-bg_primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-textPrimary mb-2">
                Free Shipping
              </h3>
              <p className="text-textSecondary">On all orders over $100</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-bg_secondary rounded-full">
                  <ShoppingBag className="h-6 w-6 text-bg_primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-textPrimary mb-2">
                Quality Products
              </h3>
              <p className="text-textSecondary">Carefully selected items</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-bg_secondary rounded-full">
                  <Sparkles className="h-6 w-6 text-bg_primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-textPrimary mb-2">
                Best Deals
              </h3>
              <p className="text-textSecondary">Competitive pricing</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-bg_secondary rounded-full">
                  <Gift className="h-6 w-6 text-bg_primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-textPrimary mb-2">
                Exclusive Offers
              </h3>
              <p className="text-textSecondary">Special promotions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-bg_primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover why HostNShop is
            the best online store for all your needs.
          </p>
          <Button
            size="lg"
            asChild
            variant="outline"
            className="border-bg_primary text-bg_primary hover:bg-bg_primary hover:text-white hover:border hover:border-white"
          >
            <Link href="/products" className="flex text-center">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-textPrimary mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-textSecondary mb-6">
              Stay updated with the latest products, special offers, and news.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg_primary"
              />
              <Button className="bg-bg_primary hover:bg-btn_hover text-accent hover:text-accent">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
