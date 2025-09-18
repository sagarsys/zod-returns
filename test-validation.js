// Test script to verify API validation is working
const testValidation = async () => {
  try {
    console.log('🧪 Testing API Validation...\n');
    
    // Test 1: Valid data
    console.log('1. Testing with valid data');
    const validFormData = new FormData();
    validFormData.append('name', 'John Doe');
    validFormData.append('email', 'john.doe@example.com');
    
    const validResponse = await fetch('http://localhost:3001/api/profile', {
      method: 'PUT',
      body: validFormData,
    });
    const validData = await validResponse.json();
    console.log('✅ Valid data response:', validData.success ? 'SUCCESS' : 'FAILED');
    
    // Test 2: Invalid name (too short)
    console.log('\n2. Testing with invalid name (too short)');
    const invalidNameFormData = new FormData();
    invalidNameFormData.append('name', 'J'); // Too short
    invalidNameFormData.append('email', 'john.doe@example.com');
    
    const invalidNameResponse = await fetch('http://localhost:3001/api/profile', {
      method: 'PUT',
      body: invalidNameFormData,
    });
    const invalidNameData = await invalidNameResponse.json();
    console.log('❌ Invalid name response:', invalidNameData.success ? 'UNEXPECTED SUCCESS' : 'EXPECTED FAILURE');
    if (!invalidNameData.success) {
      console.log('   Validation errors:', invalidNameData.details);
    }
    
    // Test 3: Invalid email
    console.log('\n3. Testing with invalid email');
    const invalidEmailFormData = new FormData();
    invalidEmailFormData.append('name', 'John Doe');
    invalidEmailFormData.append('email', 'invalid-email');
    
    const invalidEmailResponse = await fetch('http://localhost:3001/api/profile', {
      method: 'PUT',
      body: invalidEmailFormData,
    });
    const invalidEmailData = await invalidEmailResponse.json();
    console.log('❌ Invalid email response:', invalidEmailData.success ? 'UNEXPECTED SUCCESS' : 'EXPECTED FAILURE');
    if (!invalidEmailData.success) {
      console.log('   Validation errors:', invalidEmailData.details);
    }
    
    // Test 4: Missing required fields
    console.log('\n4. Testing with missing required fields');
    const missingFieldsFormData = new FormData();
    missingFieldsFormData.append('name', 'John Doe');
    // Missing email
    
    const missingFieldsResponse = await fetch('http://localhost:3001/api/profile', {
      method: 'PUT',
      body: missingFieldsFormData,
    });
    const missingFieldsData = await missingFieldsResponse.json();
    console.log('❌ Missing fields response:', missingFieldsData.success ? 'UNEXPECTED SUCCESS' : 'EXPECTED FAILURE');
    if (!missingFieldsData.success) {
      console.log('   Validation errors:', missingFieldsData.details);
    }
    
    // Test 5: PATCH with partial validation
    console.log('\n5. Testing PATCH with partial validation');
    const patchResponse = await fetch('http://localhost:3001/api/profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Jane Doe Updated',
      }),
    });
    const patchData = await patchResponse.json();
    console.log('✅ PATCH response:', patchData.success ? 'SUCCESS' : 'FAILED');
    
    console.log('\n🎉 API validation tests completed!');
  } catch (error) {
    console.error('❌ Validation test failed:', error.message);
  }
};

// Run the test
testValidation();
