// Quick test for the SparkPost email functionality
const axios = require('axios');

async function testContactForm() {
  try {
    console.log('🧪 Testing contact form email functionality...');
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '5551234567',
      subject: 'Email System Test',
      message: 'This is a test message to verify that the SparkPost email system is working correctly.'
    };

    const response = await axios.post('http://localhost:5000/api/contact', testData);
    
    console.log('✅ Contact form submission successful!');
    console.log('Response:', response.data);
    
  } catch (error) {
    console.error('❌ Contact form test failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testContactForm();
