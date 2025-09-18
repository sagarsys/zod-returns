// Demo functions showing how to use the profile API
import { profileApi } from './api';
import { Profile } from '@/app/types/profile';

// Example: Load profile data on component mount
export async function loadProfileData(): Promise<Profile | null> {
  try {
    const profile = await profileApi.getProfile();
    console.log('Loaded profile:', profile);
    return profile;
  } catch (error) {
    console.error('Failed to load profile:', error);
    return null;
  }
}

// Example: Update profile with form data
export async function updateProfileData(formData: {
  name: string;
  email: string;
  profileImage?: File | null;
}): Promise<Profile | null> {
  try {
    const updateData = {
      name: formData.name,
      email: formData.email,
      profileImage: formData.profileImage,
    };

    const updatedProfile = await profileApi.updateProfile(updateData);
    console.log('Updated profile:', updatedProfile);
    return updatedProfile;
  } catch (error) {
    console.error('Failed to update profile:', error);
    return null;
  }
}

// Example: Partial update (e.g., just the profile image)
export async function updateProfileImage(imageFile: File): Promise<Profile | null> {
  try {
    const updatedProfile = await profileApi.patchProfile({
      profileImage: imageFile,
    });
    console.log('Updated profile image:', updatedProfile);
    return updatedProfile;
  } catch (error) {
    console.error('Failed to update profile image:', error);
    return null;
  }
}

// Example: Test the API endpoints
export async function testApiEndpoints() {
  console.log('Testing API endpoints...');
  
  try {
    // Test GET
    console.log('1. Testing GET /api/profile');
    const profile = await profileApi.getProfile();
    console.log('✅ GET successful:', profile);
    
    // Test PATCH
    console.log('2. Testing PATCH /api/profile');
    const patchedProfile = await profileApi.patchProfile({
      name: 'Jane Doe Updated',
    });
    console.log('✅ PATCH successful:', patchedProfile);
    
    // Test PUT
    console.log('3. Testing PUT /api/profile');
    const updatedProfile = await profileApi.updateProfile({
      name: 'John Doe',
      email: 'john.doe@example.com',
      profileImage: null, // No file upload in test
    });
    console.log('✅ PUT successful:', updatedProfile);
    
    console.log('🎉 All API tests passed!');
  } catch (error) {
    console.error('❌ API test failed:', error);
  }
}
