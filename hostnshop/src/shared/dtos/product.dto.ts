// Create Product DTO
export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  discount_percentage: number;
  stock_quantity: number;
  image_url: string;
  category_id?: string;
}

// Update Product DTO
export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  discount_percentage?: number;
  stock_quantity?: number;
  image_url?: string;
  category_id?: string;
}

// Read Product DTO
export interface ReadProductDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_percentage: number;
  stock_quantity: number;
  image_url: string;
  category_id: string;
  created_at: string;
}

// Delete Product DTO
export interface DeleteProductDTO {
  id: string;
}
