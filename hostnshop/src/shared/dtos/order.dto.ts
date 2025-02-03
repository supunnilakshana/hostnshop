// Create Order DTO
export interface CreateOrderDTO {
  customer_id: string;
  total_price: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

// Update Order DTO
export interface UpdateOrderDTO {
  total_price?: number;
  status?: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

// Read Order DTO
export interface ReadOrderDTO {
  id: string;
  customer_id: string;
  total_price: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  created_at: string;
}

// Delete Order DTO
export interface DeleteOrderDTO {
  id: string;
}
