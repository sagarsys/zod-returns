import { z } from 'zod';

// Zod schema for form validation
export const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  profileImage: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024, // 5MB max
      'Image must be less than 5MB'
    )
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type),
      'Image must be JPEG, PNG, GIF, or WebP'
    )
    .optional()
    .nullable(),
});

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

// Profile form data type (inferred from Zod schema)
export type ProfileFormData = z.infer<typeof profileSchema>;
