// Create Category DTO
export interface CreateCategoryDTO {
  name: string;
}

// Update Category DTO
export interface UpdateCategoryDTO {
  name?: string;
}

// Read Category DTO
export interface ReadCategoryDTO {
  id: string;
  name: string;
  created_at: string;
}

// Delete Category DTO
export interface DeleteCategoryDTO {
  id: string;
}
