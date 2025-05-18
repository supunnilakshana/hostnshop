// src/components/client/product/ProductGrid.tsx
import {ReadProductDTO} from "@/shared/dtos";
import ProductCard from "./ProductCard";
import {motion} from "framer-motion";

interface ProductGridProps {
  products: ReadProductDTO[];
}

export default function ProductGrid({products}: ProductGridProps) {
  // No products to display
  if (products.length === 0) {
    return null;
  }

  // Animation variants for staggered grid animation
  const containerVariants = {
    hidden: {opacity: 0},
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {products.map((product) => (
        <div key={product.id} className="h-full">
          <ProductCard product={product} />
        </div>
      ))}
    </motion.div>
  );
}
