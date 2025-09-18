import { useForm } from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileApi } from '@/app/lib/api';
import { Profile, profileSchema, ProfileFormData } from '@/app/types/profile';

export const useProfileForm = () => {
  // State management
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form setup
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange', // Validate on change for better UX
  });

  const { register, handleSubmit, formState: { errors }, setValue } = form;

  // Load initial profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const profile = await profileApi.getProfile();
        setProfileData(profile);
        
        // Set form values
        setValue('name', profile.name);
        setValue('email', profile.email);
        
        // Set image preview if profile has an image
        if (profile.profileImage) {
          setImagePreview(profile.profileImage);
        }
      } catch (err) {
        setError('Failed to load profile data');
        console.error('Error loading profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [setValue]);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      setValue('profileImage', file);
      
      // Create preview URL for the new file
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const removeImage = () => {
    setProfileImageFile(null);
    setValue('profileImage', null);
    setImagePreview(profileData?.profileImage || null); // Reset to original image or null
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Form submission
  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const updatedProfile = await profileApi.updateProfile({
        name: data.name,
        email: data.email,
        profileImage: profileImageFile,
      });
      
      // Update local state with the response
      setProfileData(updatedProfile);
      setImagePreview(updatedProfile.profileImage || null);
      setProfileImageFile(null); // Clear the file since it's now uploaded
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      setIsSubmitted(true);
      // Reset success message after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // Form methods
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    
    // State
    isSubmitted,
    isLoading,
    isSubmitting,
    profileData,
    profileImageFile,
    imagePreview,
    error,
    fileInputRef,
    
    // Handlers
    handleFileUpload,
    removeImage,
  };
};
