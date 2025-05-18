// src/components/client/product/ProductFilter.tsx
"use client";

import {Slider} from "@/presentation/components/ui/slider";
import {Checkbox} from "@/presentation/components/ui/checkbox";
import {Button} from "@/presentation/components/ui/button";
import {FilterX, SlidersHorizontal} from "lucide-react";
import {useState, useEffect} from "react";

interface Category {
  id: string;
  name: string;
}

interface ProductFilterProps {
  categories: Category[];
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  inStock: boolean;
  setInStock: (inStock: boolean) => void;
  onSale: boolean;
  setOnSale: (onSale: boolean) => void;
  minPrice: number;
  maxPrice: number;
  clearFilters: () => void;
}

export default function ProductFilter({
  categories,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  inStock,
  setInStock,
  onSale,
  setOnSale,
  minPrice,
  maxPrice,
  clearFilters,
}: ProductFilterProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] =
    useState<[number, number]>(priceRange);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(
      selectedCategories.includes(categoryId)
        ? selectedCategories.filter((id) => id !== categoryId)
        : [...selectedCategories, categoryId]
    );
  };

  const handlePriceChange = (value: number[]) => {
    setLocalPriceRange([value[0], value[1]]);
  };

  const applyPriceRange = () => {
    setPriceRange([localPriceRange[0], localPriceRange[1]]);
  };

  const filterContent = (
    <div className="space-y-6 bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="text-lg font-medium text-textPrimary">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-textSecondary hover:text-textPrimary"
        >
          Clear All
        </Button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center">
          <span className="h-1 w-1 rounded-full bg-bg_primary mr-2"></span>
          Categories
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center hover:bg-gray-50 p-1 rounded transition-colors"
            >
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
                className="text-bg_primary focus:ring-bg_primary"
              />
              <label
                htmlFor={`category-${category.id}`}
                className="ml-2 text-sm text-textSecondary cursor-pointer truncate flex-1"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center">
          <span className="h-1 w-1 rounded-full bg-bg_primary mr-2"></span>
          Price Range
        </h3>
        <Slider
          value={[localPriceRange[0], localPriceRange[1]]}
          min={minPrice}
          max={maxPrice}
          step={1}
          onValueChange={(value: number[]) => handlePriceChange(value)}
          className="mb-4"
        />
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-textSecondary">
            ${localPriceRange[0]}
          </span>
          <span className="text-sm font-medium text-textSecondary">
            ${localPriceRange[1]}
          </span>
        </div>
        <Button
          onClick={applyPriceRange}
          variant="outline"
          size="sm"
          className="w-full text-sm"
        >
          Apply Price
        </Button>
      </div>

      {/* Other Filters */}
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center">
          <span className="h-1 w-1 rounded-full bg-bg_primary mr-2"></span>
          Product Status
        </h3>
        <div className="space-y-3">
          <div className="flex items-center hover:bg-gray-50 p-1 rounded transition-colors">
            <Checkbox
              id="inStock"
              checked={inStock}
              onCheckedChange={(checked: boolean) =>
                setInStock(checked === true)
              }
              className="text-bg_primary focus:ring-bg_primary"
            />
            <label
              htmlFor="inStock"
              className="ml-2 text-sm text-textSecondary cursor-pointer"
            >
              In Stock Only
            </label>
          </div>
          <div className="flex items-center hover:bg-gray-50 p-1 rounded transition-colors">
            <Checkbox
              id="onSale"
              checked={onSale}
              onCheckedChange={(checked: boolean) =>
                setOnSale(checked === true)
              }
              className="text-bg_primary focus:ring-bg_primary"
            />
            <label
              htmlFor="onSale"
              className="ml-2 text-sm text-textSecondary cursor-pointer"
            >
              On Sale
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter */}
      <div className="hidden lg:block sticky top-20">{filterContent}</div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          variant="outline"
          className="w-full shadow-sm"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filter Products
        </Button>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-full max-w-xs bg-white p-4 shadow-lg overflow-y-auto">
            <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pt-1 pb-3 border-b">
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
            <div className="sticky bottom-0 bg-white pt-3 pb-2 border-t mt-6">
              <Button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
