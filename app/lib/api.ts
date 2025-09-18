import { Profile, ApiResponse, UpdateProfileRequest } from '@/app/types/profile';

const API_BASE_URL = '/api';

// Generic API call function
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Profile API functions
export const profileApi = {
  // Get profile data
  async getProfile(): Promise<Profile> {
    const response = await apiCall<Profile>('/profile');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch profile');
    }
    return response.data;
  },

  // Update profile data (full update)
  async updateProfile(data: {
    name: string;
    email: string;
    profileImage?: File | null;
  }): Promise<Profile> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    
    if (data.profileImage) {
      formData.append('profileImage', data.profileImage);
    } else {
      formData.append('profileImage', '');
    }

    const response = await fetch('/api/profile', {
      method: 'PUT',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success || !result.data) {
      throw new Error(result.error || 'Failed to update profile');
    }
    return result.data;
  },

  // Partial update profile data
  async patchProfile(data: UpdateProfileRequest): Promise<Profile> {
    const response = await apiCall<Profile>('/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to update profile');
    }
    return response.data;
  },
};
