'use client'

import { ReadProductDTO } from "@/shared/dtos";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

interface ProductGridProps {
  products: ReadProductDTO[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) return null;

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="h-full"
          variants={itemVariants}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
