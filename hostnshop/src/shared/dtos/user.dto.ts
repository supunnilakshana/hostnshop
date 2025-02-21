// Create User DTO
export interface CreateUserDTO {
  role: "Admin" | "Customer";
  name: string;
  email: string;
  password_hash: string;
  phone_number: string;
  address?: string;
}

// Update User DTO
export interface UpdateUserDTO {
  role?: "Admin" | "Customer";
  name?: string;
  email?: string;
  password_hash?: string;
  phone_number?: string;
  address?: string;
  is_email_verified?: boolean;
}

// Read User DTO (for fetching user data)
export interface ReadUserDTO {
  id: string;
  role: "Admin" | "Customer";
  name: string;
  email: string;
  phone_number: string;
  address?: string;
  password_hash?: string;
  is_email_verified: boolean;
  created_at: string;
}

// Delete User DTO
export interface DeleteUserDTO {
  id: string;
}
