// Create EmailSubscription DTO
export interface CreateEmailSubscriptionDTO {
  customer_id: string;
  is_subscribed: boolean;
}

// Update EmailSubscription DTO
export interface UpdateEmailSubscriptionDTO {
  is_subscribed?: boolean;
}

// Read EmailSubscription DTO
export interface ReadEmailSubscriptionDTO {
  id: string;
  customer_id: string;
  is_subscribed: boolean;
  created_at: string;
}

// Delete EmailSubscription DTO
export interface DeleteEmailSubscriptionDTO {
  id: string;
}
