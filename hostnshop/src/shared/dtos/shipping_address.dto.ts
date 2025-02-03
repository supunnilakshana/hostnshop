// Create ShippingAddress DTO
export interface CreateShippingAddressDTO {
  customer_id: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

// Update ShippingAddress DTO
export interface UpdateShippingAddressDTO {
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  is_default?: boolean;
}

// Read ShippingAddress DTO
export interface ReadShippingAddressDTO {
  id: string;
  customer_id: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

// Delete ShippingAddress DTO
export interface DeleteShippingAddressDTO {
  id: string;
}
