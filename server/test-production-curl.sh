#!/bin/bash

# Production Test Script using curl
# This script tests the production API endpoints

echo "========================================"
echo "🧪 MWC ADVOCATES PRODUCTION API TEST"
echo "========================================"
echo ""

# Configuration - Change this to your production URL
PRODUCTION_URL="https://your-production-url.com"
API_URL="${1:-$PRODUCTION_URL}"

echo "📍 Testing URL: $API_URL"
echo "⏰ Test started: $(date)"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Health Check
echo "TEST 1: Health Check"
echo "------------------------------------"
echo "Testing: GET $API_URL/api/health"
response=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/api/health")
if [ "$response" = "200" ]; then
    echo -e "${GREEN}✅ Health check: SUCCESS (Status: $response)${NC}"
else
    echo -e "${RED}❌ Health check: FAILED (Status: $response)${NC}"
fi
echo ""

# Test 2: Services Endpoint
echo "TEST 2: Services Endpoint"
echo "------------------------------------"
echo "Testing: GET $API_URL/api/services"
response=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/api/services")
if [ "$response" = "200" ]; then
    echo -e "${GREEN}✅ Services endpoint: SUCCESS (Status: $response)${NC}"
    # Get a sample of the data
    data=$(curl -s "$API_URL/api/services" | head -c 200)
    echo "   Sample data: $data..."
else
    echo -e "${RED}❌ Services endpoint: FAILED (Status: $response)${NC}"
fi
echo ""

# Test 3: Testimonials Endpoint
echo "TEST 3: Testimonials Endpoint"
echo "------------------------------------"
echo "Testing: GET $API_URL/api/testimonials"
response=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/api/testimonials")
if [ "$response" = "200" ]; then
    echo -e "${GREEN}✅ Testimonials endpoint: SUCCESS (Status: $response)${NC}"
    # Get a sample of the data
    data=$(curl -s "$API_URL/api/testimonials" | head -c 200)
    echo "   Sample data: $data..."
else
    echo -e "${RED}❌ Testimonials endpoint: FAILED (Status: $response)${NC}"
fi
echo ""

# Test 4: Contact Form Submission
echo "TEST 4: Contact Form Submission"
echo "------------------------------------"
echo "Testing: POST $API_URL/api/contact"

# Create test data
TEST_DATA='{
  "name": "Production Test",
  "email": "test@example.com",
  "phone": "+1234567890",
  "subject": "API Test",
  "message": "This is an automated test from the production test script. Timestamp: '"$(date +%s)"'"
}'

echo "Sending test data:"
echo "$TEST_DATA" | python3 -m json.tool 2>/dev/null || echo "$TEST_DATA"

# Send the request and capture both status and response
response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d "$TEST_DATA")

# Extract status code (last line) and body (everything else)
status=$(echo "$response" | tail -n 1)
body=$(echo "$response" | head -n -1)

if [ "$status" = "201" ] || [ "$status" = "200" ]; then
    echo -e "${GREEN}✅ Contact form submission: SUCCESS (Status: $status)${NC}"
    echo "   Response body:"
    echo "$body" | python3 -m json.tool 2>/dev/null || echo "$body"
else
    echo -e "${RED}❌ Contact form submission: FAILED (Status: $status)${NC}"
    echo "   Response body:"
    echo "$body" | python3 -m json.tool 2>/dev/null || echo "$body"
fi
echo ""

# Test 5: Invalid Contact Form (Validation Test)
echo "TEST 5: Contact Form Validation"
echo "------------------------------------"
echo "Testing: POST $API_URL/api/contact (with invalid data)"

# Create invalid test data
INVALID_DATA='{
  "name": "A",
  "email": "invalid-email",
  "message": "Short"
}'

# Send the request
response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d "$INVALID_DATA")

status=$(echo "$response" | tail -n 1)
body=$(echo "$response" | head -n -1)

if [ "$status" = "400" ]; then
    echo -e "${GREEN}✅ Validation test: SUCCESS (correctly rejected with status $status)${NC}"
else
    echo -e "${YELLOW}⚠️ Validation test: Unexpected status $status${NC}"
fi
echo ""

# Summary
echo "========================================"
echo "📊 TEST SUMMARY"
echo "========================================"
echo ""
echo "If any tests failed, check:"
echo "1. Is the server running and accessible?"
echo "2. Are all environment variables set correctly?"
echo "3. Check server logs for detailed error messages"
echo "4. For database issues: verify DATABASE_URL and connection"
echo "5. For email issues: verify ZOHO_SMTP_* credentials"
echo ""
echo "⏰ Test completed: $(date)"
echo "========================================"