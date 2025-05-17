// Create File DTO - used when creating a new file record
export interface CreateFileDTO {
  id: string; // UUID for the file
  original_name: string; // Original filename from the user
  file_name: string; // System-generated filename (with UUID)
  mime_type: string; // MIME type of the file
  size: number; // File size in bytes
  path: string; // Relative path to the file
  width?: number; // Image width (if applicable)
  height?: number; // Image height (if applicable)
  entity_id?: string | null; // Related entity ID (product, user, etc.)
  uploaded_by?: string | null; // User ID who uploaded the file
}

// Read File DTO - returned when fetching file information
export interface ReadFileDTO {
  id: string;
  original_name: string;
  file_name: string;
  mime_type: string;
  size: number;
  path: string;
  width?: number;
  height?: number;
  entity_id?: string | null;

  uploaded_by?: string | null;
  uploaded_at: string; // ISO date string
  url: string; // Full URL to access the file
}

// Update File DTO - used when updating file metadata
export interface UpdateFileDTO {
  original_name?: string;
  entity_id?: string | null;
}

// Delete File DTO - used when deleting a file
export interface DeleteFileDTO {
  id: string;
}

// File Query DTO - used when querying files
export interface FileQueryDTO {
  entity_type?: string;
  entity_id?: string;
  mime_type?: string;
  uploaded_by?: string;
  page?: number;
  limit?: number;
}

// File Response DTO - returned when listing files
export interface FileResponseDTO {
  files: ReadFileDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// File Upload DTO - used when uploading a file
export interface FileUploadDTO {
  file: File;
  entity_type: string;
  entity_id?: string;
}

// File URL Options DTO - used when generating URLs
export interface FileUrlOptionsDTO {
  resize?: {
    width?: number;
    height?: number;
  };
  expires?: number; // Expiration time in seconds
  download?: boolean; // Whether to force download
}
