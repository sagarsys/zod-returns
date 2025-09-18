// Simple test script to verify the API is working
const testApi = async () => {
  try {
    console.log('🧪 Testing Profile API...\n');
    
    // Test GET endpoint
    console.log('1. Testing GET /api/profile');
    const getResponse = await fetch('http://localhost:3000/api/profile');
    const getData = await getResponse.json();
    console.log('✅ GET Response:', getData);
    
    // Test PUT endpoint with FormData
    console.log('\n2. Testing PUT /api/profile');
    const formData = new FormData();
    formData.append('name', 'Test User');
    formData.append('email', 'test@example.com');
    
    const putResponse = await fetch('http://localhost:3000/api/profile', {
      method: 'PUT',
      body: formData,
    });
    const putData = await putResponse.json();
    console.log('✅ PUT Response:', putData);
    
    console.log('\n🎉 API tests completed successfully!');
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
};

// Run the test
testApi();
