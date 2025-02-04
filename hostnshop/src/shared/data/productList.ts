import type { Product } from "@/shared/types/product"

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Premium T-Shirt",
    category: "Clothing",
    price: 29.99,
    discount: 10,
    stockQuantity: 100,
    stockStatus: "In Stock",
    image: "/assets/images/lap.jpg",
  },
  {
    id: "2",
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 99.99,
    discount: 0,
    stockQuantity: 50,
    stockStatus: "Low Stock",
    image: "/assets/images/lap.jpg",
  },
]
