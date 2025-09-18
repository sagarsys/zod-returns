// Profile data types
export interface Profile {
  id: string;
  name: string;
  email: string;
  profileImage?: string | null;
  createdAt: string;
  updatedAt: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Profile update request types
export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  profileImage?: File | null;
}

// Profile form data type (matches the Zod schema)
export interface ProfileFormData {
  name: string;
  email: string;
  profileImage?: string | File | null;
}
