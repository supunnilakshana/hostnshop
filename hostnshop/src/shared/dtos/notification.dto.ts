// Create Notification DTO
export interface CreateNotificationDTO {
  user_id: string;
  title: string;
  message: string;
  type: "Email" | "Push" | "SMS";
  is_read: boolean;
}

// Update Notification DTO
export interface UpdateNotificationDTO {
  title?: string;
  message?: string;
  type?: "Email" | "Push" | "SMS";
  is_read?: boolean;
}

// Read Notification DTO
export interface ReadNotificationDTO {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: "Email" | "Push" | "SMS";
  is_read: boolean;
  created_at: string;
}

// Delete Notification DTO
export interface DeleteNotificationDTO {
  id: string;
}
