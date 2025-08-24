# API Documentation - MWC Advocates Backend

This document provides comprehensive information about the MWC Advocates API endpoints, request/response formats, and usage examples.

## 🔗 **Base URL**

- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-backend-url.onrender.com/api`

## 🛡️ **Authentication**

Currently, the API is public for client-facing endpoints. Admin endpoints will require authentication in future versions.

## 📊 **Response Format**

All API responses follow a consistent format:

```json
{
  "success": boolean,
  "data": any,
  "error": string,
  "errors": Array<{field: string, message: string}>,
  "message": string
}
```

## 🏥 **Health Check**

### **GET /health**

Check if the API is running and database is connected.

**Response:**
```json
{
  "status": "OK",
  "message": "MWC Advocates API is running",
  "timestamp": "2025-08-24T12:00:00.000Z"
}
```

## 🏢 **Services**

### **GET /api/services**

Retrieve all legal services offered by the firm.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cuid123",
      "title": "Corporate Law",
      "description": "Comprehensive corporate legal services...",
      "icon": "building",
      "features": [
        "Company incorporation and registration",
        "Corporate governance and compliance",
        "Mergers and acquisitions"
      ],
      "createdAt": "2025-08-24T12:00:00.000Z",
      "updatedAt": "2025-08-24T12:00:00.000Z"
    }
  ]
}
```

### **GET /api/services/:id**

Retrieve a specific service by ID.

**Parameters:**
- `id` (string): Service ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cuid123",
    "title": "Corporate Law",
    "description": "Comprehensive corporate legal services...",
    "icon": "building",
    "features": ["feature1", "feature2"],
    "createdAt": "2025-08-24T12:00:00.000Z",
    "updatedAt": "2025-08-24T12:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Service not found"
}
```

### **POST /api/services** (Admin Only)

Create a new service.

**Request Body:**
```json
{
  "title": "Employment Law",
  "description": "Expert employment law services...",
  "icon": "users",
  "features": [
    "Employment contracts",
    "Workplace disputes",
    "HR compliance"
  ]
}
```

**Validation Rules:**
- `title`: Minimum 3 characters
- `description`: Minimum 10 characters
- `icon`: Required
- `features`: Must be an array

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cuid124",
    "title": "Employment Law",
    "description": "Expert employment law services...",
    "icon": "users",
    "features": ["Employment contracts", "Workplace disputes"],
    "createdAt": "2025-08-24T12:00:00.000Z",
    "updatedAt": "2025-08-24T12:00:00.000Z"
  }
}
```

## 💬 **Testimonials**

### **GET /api/testimonials**

Retrieve all active client testimonials.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cuid125",
      "name": "John Mwangi",
      "position": "CEO",
      "company": "Tech Solutions Ltd",
      "content": "MWC Advocates provided exceptional legal support...",
      "rating": 5,
      "initials": "JM",
      "isActive": true,
      "createdAt": "2025-08-24T12:00:00.000Z",
      "updatedAt": "2025-08-24T12:00:00.000Z"
    }
  ]
}
```

### **POST /api/testimonials** (Admin Only)

Create a new testimonial.

**Request Body:**
```json
{
  "name": "Sarah Kiprotich",
  "position": "Property Developer",
  "company": "Real Estate Corp",
  "content": "Outstanding representation in our property dispute...",
  "rating": 5,
  "initials": "SK"
}
```

**Validation Rules:**
- `name`: Minimum 2 characters
- `position`: Required
- `content`: Minimum 10 characters
- `rating`: Integer between 1 and 5
- `initials`: 1-3 characters
- `company`: Optional

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cuid126",
    "name": "Sarah Kiprotich",
    "position": "Property Developer",
    "company": "Real Estate Corp",
    "content": "Outstanding representation...",
    "rating": 5,
    "initials": "SK",
    "isActive": true,
    "createdAt": "2025-08-24T12:00:00.000Z",
    "updatedAt": "2025-08-24T12:00:00.000Z"
  }
}
```

## 📧 **Contact**

### **POST /api/contact**

Submit a contact form.

**Rate Limit:** 5 requests per hour per IP

**Request Body:**
```json
{
  "name": "Robert Ochieng",
  "email": "robert@example.com",
  "phone": "+254700123456",
  "subject": "Legal Consultation",
  "message": "I need legal advice regarding employment law..."
}
```

**Validation Rules:**
- `name`: Minimum 2 characters
- `email`: Valid email format
- `message`: Minimum 10 characters
- `phone`: Optional, valid phone number format
- `subject`: Optional

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message. We will get back to you soon.",
  "data": {
    "id": "cuid127"
  }
}
```

**Error Response (Validation):**
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    },
    {
      "field": "message",
      "message": "Message must be at least 10 characters"
    }
  ]
}
```

**Error Response (Rate Limited):**
```json
{
  "success": false,
  "error": "Too many contact form submissions, please try again later."
}
```

### **GET /api/contact/submissions** (Admin Only)

Retrieve all contact form submissions.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cuid127",
      "name": "Robert Ochieng",
      "email": "robert@example.com",
      "phone": "+254700123456",
      "subject": "Legal Consultation",
      "message": "I need legal advice...",
      "status": "NEW",
      "createdAt": "2025-08-24T12:00:00.000Z",
      "updatedAt": "2025-08-24T12:00:00.000Z"
    }
  ]
}
```

## ❓ **FAQ**

### **GET /api/faq**

Retrieve frequently asked questions.

**Query Parameters:**
- `category` (optional): Filter by category

**Example:** `/api/faq?category=general`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cuid128",
      "question": "What types of legal services do you offer?",
      "answer": "We offer comprehensive legal services including...",
      "category": "general",
      "order": 1,
      "isActive": true,
      "createdAt": "2025-08-24T12:00:00.000Z",
      "updatedAt": "2025-08-24T12:00:00.000Z"
    }
  ]
}
```

### **POST /api/faq** (Admin Only)

Create a new FAQ item.

**Request Body:**
```json
{
  "question": "How do I schedule a consultation?",
  "answer": "You can schedule a consultation by calling us...",
  "category": "consultation",
  "order": 2
}
```

**Validation Rules:**
- `question`: Minimum 5 characters
- `answer`: Minimum 10 characters
- `category`: Required
- `order`: Optional integer

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cuid129",
    "question": "How do I schedule a consultation?",
    "answer": "You can schedule a consultation...",
    "category": "consultation",
    "order": 2,
    "isActive": true,
    "createdAt": "2025-08-24T12:00:00.000Z",
    "updatedAt": "2025-08-24T12:00:00.000Z"
  }
}
```

## 🚫 **Error Codes**

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (Validation Error) |
| 404 | Not Found |
| 429 | Too Many Requests (Rate Limited) |
| 500 | Internal Server Error |

## 🔄 **Rate Limiting**

### **General API**
- **Window**: 15 minutes
- **Limit**: 100 requests per IP

### **Contact Form**
- **Window**: 1 hour
- **Limit**: 5 submissions per IP

## 📝 **Examples**

### **JavaScript/Fetch**

```javascript
// Get all services
const response = await fetch('/api/services');
const data = await response.json();

// Submit contact form
const contactData = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'I need legal advice'
};

const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(contactData),
});

const result = await response.json();
```

### **cURL**

```bash
# Get services
curl -X GET https://your-api-url.onrender.com/api/services

# Submit contact form
curl -X POST https://your-api-url.onrender.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I need legal advice"
  }'
```

### **Python/Requests**

```python
import requests

# Get testimonials
response = requests.get('https://your-api-url.onrender.com/api/testimonials')
data = response.json()

# Submit contact form
contact_data = {
    'name': 'John Doe',
    'email': 'john@example.com',
    'message': 'I need legal advice'
}

response = requests.post(
    'https://your-api-url.onrender.com/api/contact',
    json=contact_data
)
result = response.json()
```

## 🔮 **Future Endpoints**

These endpoints are planned for future versions:

- **Authentication**: `/api/auth/login`, `/api/auth/register`
- **Blog Posts**: `/api/blog`, `/api/blog/:slug`
- **Newsletter**: `/api/newsletter/subscribe`
- **File Uploads**: `/api/upload`
- **Analytics**: `/api/analytics/stats`

## 🐛 **Error Handling**

The API uses consistent error handling:

### **Validation Errors**
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### **General Errors**
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Something went wrong!"
}
```

### **Not Found Errors**
```json
{
  "success": false,
  "error": "Route not found",
  "message": "Cannot GET /api/invalid-endpoint"
}
```

---

**For additional support or questions about the API, please contact the development team.**
