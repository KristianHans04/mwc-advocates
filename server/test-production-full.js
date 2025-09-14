/**
 * Production Test Script for MWC Advocates API
 * Tests database connection, email service, and contact form submission
 */

require('dotenv').config();
const axios = require('axios');

// Configuration
const PRODUCTION_URL = process.env.PRODUCTION_URL || 'https://your-production-url.com';
const LOCAL_URL = 'http://localhost:3000';

// Choose which URL to test
const API_URL = process.env.TEST_PRODUCTION === 'true' ? PRODUCTION_URL : LOCAL_URL;

console.log('========================================');
console.log('🧪 MWC ADVOCATES PRODUCTION TEST SUITE');
console.log('========================================');
console.log('📍 Testing URL:', API_URL);
console.log('📊 Environment:', process.env.NODE_ENV || 'not set');
console.log('⏰ Test started:', new Date().toISOString());
console.log('');

// Test 1: Check Environment Variables
console.log('TEST 1: Environment Variables Check');
console.log('------------------------------------');
console.log('✓ DATABASE_URL exists:', !!process.env.DATABASE_URL);
if (process.env.DATABASE_URL) {
  const dbUrl = process.env.DATABASE_URL;
  console.log('  - URL pattern:', dbUrl.substring(0, 30) + '...');
  console.log('  - Is Supabase:', dbUrl.includes('supabase'));
}
console.log('✓ ZOHO_SMTP_HOST:', process.env.ZOHO_SMTP_HOST || 'not set');
console.log('✓ ZOHO_SMTP_PORT:', process.env.ZOHO_SMTP_PORT || 'not set');
console.log('✓ ZOHO_SMTP_USER exists:', !!process.env.ZOHO_SMTP_USER);
console.log('✓ ZOHO_SMTP_PASS exists:', !!process.env.ZOHO_SMTP_PASS);
console.log('✓ EMAIL_FROM:', process.env.EMAIL_FROM || 'not set');
console.log('✓ ADMIN_EMAIL:', process.env.ADMIN_EMAIL || 'not set');
console.log('');

// Test 2: Direct Database Connection Test
console.log('TEST 2: Database Connection Test');
console.log('------------------------------------');

async function testDatabase() {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient({
      log: ['error', 'warn', 'info'],
    });

    console.log('🔄 Attempting to connect to database...');
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    // Try a simple query
    console.log('🔄 Testing database query...');
    const count = await prisma.contactSubmission.count();
    console.log(`✅ Database query successful! Found ${count} contact submissions`);
    
    await prisma.$disconnect();
    console.log('✅ Database disconnected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database test failed:', {
      message: error.message,
      code: error.code,
      meta: error.meta
    });
    return false;
  }
}

// Test 3: Email Service Test
console.log('\nTEST 3: Email Service Test');
console.log('------------------------------------');

async function testEmailService() {
  try {
    const nodemailer = require('nodemailer');
    
    console.log('🔄 Creating SMTP transporter...');
    const transporter = nodemailer.createTransporter({
      host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
      port: parseInt(process.env.ZOHO_SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.ZOHO_SMTP_USER,
        pass: process.env.ZOHO_SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      },
      debug: true,
      logger: true
    });

    console.log('🔄 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
    
    // Optional: Send a test email
    if (process.env.SEND_TEST_EMAIL === 'true') {
      console.log('🔄 Sending test email...');
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'hello@kristianhans.com',
        to: process.env.ADMIN_EMAIL || 'hello@kristianhans.com',
        subject: 'MWC Advocates - Production Test Email',
        text: 'This is a test email from the production test script.',
        html: '<p>This is a <b>test email</b> from the production test script.</p>'
      });
      console.log('✅ Test email sent:', info.messageId);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Email service test failed:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    });
    return false;
  }
}

// Test 4: API Endpoints Test
console.log('\nTEST 4: API Endpoints Test');
console.log('------------------------------------');

async function testAPIEndpoints() {
  const tests = [
    {
      name: 'Health Check',
      method: 'GET',
      url: `${API_URL}/api/health`,
      expectedStatus: 200
    },
    {
      name: 'Services Endpoint',
      method: 'GET',
      url: `${API_URL}/api/services`,
      expectedStatus: 200
    },
    {
      name: 'Testimonials Endpoint',
      method: 'GET',
      url: `${API_URL}/api/testimonials`,
      expectedStatus: 200
    }
  ];

  for (const test of tests) {
    try {
      console.log(`🔄 Testing ${test.name}...`);
      const response = await axios({
        method: test.method,
        url: test.url,
        timeout: 10000
      });
      
      if (response.status === test.expectedStatus) {
        console.log(`✅ ${test.name}: SUCCESS (Status: ${response.status})`);
        if (response.data) {
          console.log(`   Data received:`, typeof response.data === 'object' ? 
            JSON.stringify(response.data).substring(0, 100) + '...' : 
            response.data.substring(0, 100));
        }
      } else {
        console.log(`⚠️ ${test.name}: Unexpected status ${response.status}`);
      }
    } catch (error) {
      console.error(`❌ ${test.name}: FAILED`, {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    }
  }
}

// Test 5: Contact Form Submission Test
console.log('\nTEST 5: Contact Form Submission Test');
console.log('------------------------------------');

async function testContactForm() {
  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      subject: 'Production Test',
      message: 'This is a test submission from the production test script. Time: ' + new Date().toISOString()
    };

    console.log('🔄 Submitting test contact form...');
    console.log('   Test data:', testData);
    
    const response = await axios.post(`${API_URL}/api/contact`, testData, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    if (response.status === 201 || response.status === 200) {
      console.log('✅ Contact form submission: SUCCESS');
      console.log('   Response:', response.data);
      
      if (response.data.data?.emailsSent) {
        console.log('   Email status:', response.data.data.emailsSent);
      }
    } else {
      console.log(`⚠️ Contact form submission: Unexpected status ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Contact form submission: FAILED', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      errors: error.response?.data?.errors
    });
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('\n🚀 Starting comprehensive production tests...\n');
  
  // Run database test
  const dbResult = await testDatabase();
  console.log('');
  
  // Run email test
  const emailResult = await testEmailService();
  console.log('');
  
  // Run API tests (only if not testing database/email directly)
  if (API_URL !== LOCAL_URL || process.env.TEST_API === 'true') {
    await testAPIEndpoints();
    console.log('');
    
    // Run contact form test
    await testContactForm();
    console.log('');
  }
  
  // Summary
  console.log('========================================');
  console.log('📊 TEST SUMMARY');
  console.log('========================================');
  console.log('Database Connection:', dbResult ? '✅ PASSED' : '❌ FAILED');
  console.log('Email Service:', emailResult ? '✅ PASSED' : '❌ FAILED');
  console.log('');
  console.log('⚠️ IMPORTANT NOTES:');
  console.log('1. Make sure all environment variables are set correctly');
  console.log('2. For Supabase, ensure the connection pooler URL is used in production');
  console.log('3. For Zoho, ensure app-specific password is used if 2FA is enabled');
  console.log('4. Check firewall rules if SMTP port 587 is blocked');
  console.log('');
  console.log('⏰ Test completed:', new Date().toISOString());
  console.log('========================================');
}

// Execute tests
runAllTests().catch(console.error);