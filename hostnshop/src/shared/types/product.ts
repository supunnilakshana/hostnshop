export interface Productdashbord {
    id: number;
    name: string;
    currentPrice: number;
    originalPrice: number;
    rating: number;
    image: string;
  }


  export type Product = {
    id: string
    name: string
    category: string
    price: number
    discount: number
    stockQuantity: number
    stockStatus: "In Stock" | "Low Stock" | "Out of Stock"
    image: string
  }
  
  