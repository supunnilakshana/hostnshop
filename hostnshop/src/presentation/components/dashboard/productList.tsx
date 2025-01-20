import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
 import { Product } from '@/shared/types/product';
 import { products } from '@/shared/data/product';


const ProductCard = ({ product }: { product: Product }) => {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
        <Star
        key={index}
        size={16}
        className={`${
          index < rating 
            ? 'fill-bg_primary text-bg_primary' 
            : 'fill-grayLight text-grayLight'
        }`}
      />
    ));
  };

  return (
    <div className="relative group">
      <div className="rounded-lg overflow-hidden bg-cardBg shadow-md transition-shadow duration-300 hover:shadow-lg">
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
          />
          <button className="absolute right-4 bottom-4 bg-bg_primary p-2 rounded-full text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-btn_hover">
            <ShoppingCart size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-textPrimary mb-2">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-textPrimary">
              ${product.currentPrice}
            </span>
            <span className="text-sm text-textSecondary line-through">
              ${product.originalPrice}
            </span>
          </div>
          
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductList = () => {
  return (
    <div className="bg-sidebarBg min-h-screen">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
  );
};

export default ProductList;