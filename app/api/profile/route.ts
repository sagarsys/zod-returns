import { NextRequest, NextResponse } from 'next/server';
import { Profile, ApiResponse, UpdateProfileRequest } from '@/app/types/profile';

// Mock profile data
const mockProfile: Profile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  profileImage: 'https://bonzai.iodigital.com/images/677fa8df0ca13e1b58cf4fa1/3f1ed94f-f25e-40af-816d-a4f1d002bb73-image_edit_oai_toolu_vrtx_01DoXseZ1k5EtUSXJSH7szgM_img_3Lgy22kc53A-XgVlDFLo6.png',
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-20T14:45:00Z'
};

// GET /api/profile - Fetch profile data
export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json<ApiResponse<Profile>>({
      success: true,
      data: mockProfile
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json<ApiResponse<never>>(
      { 
        success: false, 
        error: 'Failed to fetch profile data' 
      },
      { status: 500 }
    );
  }
}

// PUT /api/profile - Update profile data
export async function PUT(request: NextRequest) {
  try {
    // Handle FormData for file uploads
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const profileImageFile = formData.get('profileImage') as File | null;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Validate required fields
    if (!name || !email) {
      return NextResponse.json<ApiResponse<never>>(
        { 
          success: false, 
          error: 'Name and email are required' 
        },
        { status: 400 }
      );
    }
    
    // Handle profile image file upload
    let profileImageUrl: string | null = mockProfile.profileImage || null;
    
    if (profileImageFile && profileImageFile.size > 0) {
      // In a real app, you would upload the file to a storage service (AWS S3, Cloudinary, etc.)
      // For demo purposes, we'll simulate converting the file to a URL
      profileImageUrl = `https://bonzai.iodigital.com/images/677fa8df0ca13e1b58cf4fa1/7897fe5c-439f-4aa4-b9cb-e23194141346-image_edit_oai_toolu_vrtx_01NEhvsUbjyjHcP5SMydthqK_img_O1UX8392L40STniGkvHsp.png`;
    } else if (profileImageFile === null) {
      // Explicitly set to null if no file provided
      profileImageUrl = null;
    }
    
    // Update mock profile with new data
    const updatedProfile: Profile = {
      ...mockProfile,
      name,
      email,
      profileImage: profileImageUrl,
      updatedAt: new Date().toISOString()
    };
    
    // In a real app, you would save this to a database
    Object.assign(mockProfile, updatedProfile);
    
    return NextResponse.json<ApiResponse<Profile>>({
      success: true,
      data: updatedProfile,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json<ApiResponse<never>>(
      { 
        success: false, 
        error: 'Failed to update profile' 
      },
      { status: 500 }
    );
  }
}

// PATCH /api/profile - Partial update profile data
export async function PATCH(request: NextRequest) {
  try {
    const body: UpdateProfileRequest = await request.json();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Update only provided fields
    const updatedProfile: Profile = {
      ...mockProfile,
      name: body.name || mockProfile.name,
      email: body.email || mockProfile.email,
      profileImage: body.profileImage ? mockProfile.profileImage : mockProfile.profileImage,
      updatedAt: new Date().toISOString()
    };
    
    // In a real app, you would save this to a database
    Object.assign(mockProfile, updatedProfile);
    
    return NextResponse.json<ApiResponse<Profile>>({
      success: true,
      data: updatedProfile,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json<ApiResponse<never>>(
      { 
        success: false, 
        error: 'Failed to update profile' 
      },
      { status: 500 }
    );
  }
}