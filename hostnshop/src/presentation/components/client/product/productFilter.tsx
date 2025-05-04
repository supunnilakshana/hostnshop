// src/components/product/ProductFilter.tsx
"use client";

import {useState, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {Button} from "@/presentation/components/ui/button";
import {Slider} from "@/presentation/components/ui/slider";
import {Checkbox} from "@/presentation/components/ui/checkbox";
import {FilterX, SlidersHorizontal} from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface ProductFilterProps {
  categories: Category[];
  minPrice: number;
  maxPrice: number;
}

export default function ProductFilter({
  categories,
  minPrice,
  maxPrice,
}: ProductFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);

  // Initialize filter state from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategories(categoryParam.split(","));
    }

    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    if (minPriceParam && maxPriceParam) {
      setPriceRange([Number(minPriceParam), Number(maxPriceParam)]);
    }

    const inStockParam = searchParams.get("inStock");
    setInStock(inStockParam === "true");

    const onSaleParam = searchParams.get("onSale");
    setOnSale(onSaleParam === "true");
  }, [searchParams]);

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams();

    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","));
    }

    if (priceRange[0] > minPrice) {
      params.set("minPrice", priceRange[0].toString());
    }

    if (priceRange[1] < maxPrice) {
      params.set("maxPrice", priceRange[1].toString());
    }

    if (inStock) {
      params.set("inStock", "true");
    }

    if (onSale) {
      params.set("onSale", "true");
    }

    const page = searchParams.get("page");
    if (page && page !== "1") {
      params.set("page", "1"); // Reset to page 1 when filters change
    }

    const search = searchParams.get("search");
    if (search) {
      params.set("search", search);
    }

    router.push(`/products?${params.toString()}`);
    setIsMobileFilterOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([minPrice, maxPrice]);
    setInStock(false);
    setOnSale(false);

    const params = new URLSearchParams();
    const search = searchParams.get("search");
    if (search) {
      params.set("search", search);
    }

    router.push(`/products${search ? `?${params.toString()}` : ""}`);
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <label
                htmlFor={`category-${category.id}`}
                className="ml-2 text-sm font-medium text-textSecondary cursor-pointer"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-medium mb-4">Price Range</h3>
        <Slider
          defaultValue={[priceRange[0], priceRange[1]]}
          min={minPrice}
          max={maxPrice}
          step={1}
          onValueChange={(value: number[]) =>
            setPriceRange([value[0], value[1]])
          }
          className="mb-4"
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-textSecondary">${priceRange[0]}</span>
          <span className="text-sm text-textSecondary">${priceRange[1]}</span>
        </div>
      </div>

      {/* Other Filters */}
      <div>
        <h3 className="text-sm font-medium mb-3">Product Status</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <Checkbox
              id="inStock"
              checked={inStock}
              onCheckedChange={(checked: boolean) =>
                setInStock(checked === true)
              }
            />
            <label
              htmlFor="inStock"
              className="ml-2 text-sm font-medium text-textSecondary cursor-pointer"
            >
              In Stock Only
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="onSale"
              checked={onSale}
              onCheckedChange={(checked: boolean) =>
                setOnSale(checked === true)
              }
            />
            <label
              htmlFor="onSale"
              className="ml-2 text-sm font-medium text-textSecondary cursor-pointer"
            >
              On Sale
            </label>
          </div>
        </div>
      </div>

      {/* Filter Actions */}
      <div className="flex gap-2">
        <Button onClick={applyFilters} className="flex-1">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={resetFilters} size="icon">
          <FilterX className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter */}
      <div className="hidden lg:block">{filterContent}</div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          variant="outline"
          className="w-full"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filter Products
        </Button>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-full max-w-xs bg-white p-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                <FilterX className="h-5 w-5" />
              </Button>
            </div>
            {filterContent}
          </div>
        </div>
      )}
    </>
  );
}
