/**
 * Test script for dual database setup
 * Tests both Supabase and Google Sheets with automatic fallback
 */

const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:3000';

console.log('🧪 Testing Dual Database Setup');
console.log('================================\n');

async function testHealthEndpoints() {
  console.log('📊 Testing Health Check Endpoints...\n');
  
  try {
    // Test general health
    console.log('1. General Health Check:');
    const healthResponse = await axios.get(`${API_URL}/api/health`);
    console.log('   Status:', healthResponse.data.status);
    console.log('   Service:', healthResponse.data.service);
    
    // Test database status
    console.log('\n2. Database Status:');
    const dbResponse = await axios.get(`${API_URL}/api/health/databases`);
    console.log('   Currently Using:', dbResponse.data.databases.currentlyUsing);
    console.log('   Supabase:', dbResponse.data.databases.primary.status);
    console.log('   Google Sheets:', dbResponse.data.databases.fallback.status);
    
    // Test Supabase specifically
    console.log('\n3. Supabase Connection:');
    const supabaseResponse = await axios.get(`${API_URL}/api/health/supabase`);
    console.log('   Status:', supabaseResponse.data.status);
    console.log('   Connected:', supabaseResponse.data.connected);
    
    // Test Google Sheets specifically
    console.log('\n4. Google Sheets Connection:');
    const sheetsResponse = await axios.get(`${API_URL}/api/health/google-sheets`);
    console.log('   Status:', sheetsResponse.data.status);
    console.log('   Connected:', sheetsResponse.data.connected);
    
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
  }
}

async function testDataEndpoints() {
  console.log('\n📝 Testing Data Endpoints with Fallback...\n');
  
  try {
    // Test services endpoint
    console.log('1. Services Endpoint:');
    const servicesResponse = await axios.get(`${API_URL}/api/services`);
    console.log('   Source:', servicesResponse.data.source);
    console.log('   Count:', servicesResponse.data.count);
    console.log('   Success:', servicesResponse.data.success);
    
    // Test testimonials endpoint
    console.log('\n2. Testimonials Endpoint:');
    const testimonialsResponse = await axios.get(`${API_URL}/api/testimonials`);
    console.log('   Source:', testimonialsResponse.data.source);
    console.log('   Count:', testimonialsResponse.data.count);
    console.log('   Success:', testimonialsResponse.data.success);
    
  } catch (error) {
    console.error('❌ Data endpoints test failed:', error.message);
  }
}

async function testContactSubmission() {
  console.log('\n📧 Testing Contact Form with Fallback...\n');
  
  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '555-0123',
      subject: 'Test Submission',
      message: 'This is a test submission to verify dual database setup.'
    };
    
    const response = await axios.post(`${API_URL}/api/contact`, testData);
    console.log('   Success:', response.data.success);
    console.log('   Message:', response.data.message);
    console.log('   Submission ID:', response.data.data?.id);
    console.log('   Emails Sent:', response.data.data?.emailsSent);
    
  } catch (error) {
    console.error('❌ Contact submission test failed:', error.message);
  }
}

async function testFallbackScenario() {
  console.log('\n🔄 Testing Fallback Scenario...\n');
  
  try {
    // Force Google Sheets
    console.log('1. Forcing Google Sheets mode:');
    const forceResponse = await axios.post(`${API_URL}/api/health/force-google-sheets`);
    console.log('   Status:', forceResponse.data.status);
    console.log('   Message:', forceResponse.data.message);
    
    // Test data retrieval with forced Google Sheets
    console.log('\n2. Testing data retrieval with Google Sheets:');
    const servicesResponse = await axios.get(`${API_URL}/api/services`);
    console.log('   Source:', servicesResponse.data.source);
    console.log('   Success:', servicesResponse.data.success);
    
  } catch (error) {
    console.error('❌ Fallback scenario test failed:', error.message);
  }
}

async function runAllTests() {
  console.log('🚀 Starting all tests...\n');
  console.log('API URL:', API_URL);
  console.log('================================\n');
  
  await testHealthEndpoints();
  await testDataEndpoints();
  await testContactSubmission();
  await testFallbackScenario();
  
  console.log('\n================================');
  console.log('✅ All tests completed!');
  console.log('================================\n');
}

// Run tests
runAllTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});