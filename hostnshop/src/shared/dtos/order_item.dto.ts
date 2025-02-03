// Create OrderItem DTO
export interface CreateOrderItemDTO {
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  discount_applied?: number;
}

// Update OrderItem DTO
export interface UpdateOrderItemDTO {
  quantity?: number;
  price_at_purchase?: number;
  discount_applied?: number;
}

// Read OrderItem DTO
export interface ReadOrderItemDTO {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  discount_applied: number;
  created_at: string;
}

// Delete OrderItem DTO
export interface DeleteOrderItemDTO {
  id: string;
}
