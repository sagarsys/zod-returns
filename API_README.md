# Profile API Documentation

This project includes a mock API for profile management built with Next.js API routes.

## API Endpoints

### GET `/api/profile`
Fetches the current profile data.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "profileImage": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T14:45:00Z"
  }
}
```

### PUT `/api/profile`
Updates the entire profile with new data.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "profileImage": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "profileImage": "https://example.com/image.jpg",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T15:30:00Z"
  },
  "message": "Profile updated successfully"
}
```

### PATCH `/api/profile`
Partially updates the profile with only the provided fields.

**Request Body:**
```json
{
  "name": "Jane Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Jane Doe",
    "email": "john.doe@example.com",
    "profileImage": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T15:30:00Z"
  },
  "message": "Profile updated successfully"
}
```

## Usage Examples

### Using the API utility functions

```javascript
import { profileApi } from '@/app/lib/api';

// Fetch profile data
const profile = await profileApi.getProfile();

// Update entire profile
const updatedProfile = await profileApi.updateProfile({
  name: 'John Doe',
  email: 'john.doe@example.com',
  profileImage: 'https://example.com/image.jpg'
});

// Partial update
const patchedProfile = await profileApi.patchProfile({
  name: 'Jane Doe'
});
```

### Using fetch directly

```javascript
// GET profile
const response = await fetch('/api/profile');
const data = await response.json();

// PUT profile
const updateResponse = await fetch('/api/profile', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: 'https://example.com/image.jpg'
  })
});
const updateData = await updateResponse.json();
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (validation errors)
- `500` - Internal Server Error

## Testing the API

You can test the API endpoints using the demo functions:

```javascript
import { testApiEndpoints } from '@/app/lib/profile-demo';

// Run all API tests
await testApiEndpoints();
```

## File Structure

```
app/
├── api/
│   └── profile/
│       └── route.ts          # API route handlers
├── lib/
│   ├── api.ts               # API utility functions
│   └── profile-demo.ts      # Demo and test functions
└── types/
    └── profile.ts           # TypeScript type definitions
```

## Notes

- This is a mock API with simulated delays (500-800ms)
- Data is stored in memory and will reset on server restart
- In a production app, you would connect this to a real database
- The API includes proper TypeScript typing for better development experience
