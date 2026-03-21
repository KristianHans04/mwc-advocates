# MWC Advocates - PERN Stack Application

A modern, full-stack web application for **Masinde Wanyonyi & Company Advocates**, a premier law firm in Nairobi, Kenya. Built with the PERN stack (PostgreSQL, Express.js, React, Node.js) and deployed on Render.

## 🚀 **Project Overview**

### **Technology Stack**
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS v4
- **Backend**: Node.js + Express.js + TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Render (both frontend and backend)
- **Styling**: Tailwind CSS v4 with custom design system
- **State Management**: React hooks and context
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **HTTP Client**: Axios

### **Key Features**
- 🎨 **Modern Design**: Clean, professional UI with responsive design
- 🔒 **Type Safety**: Full TypeScript implementation across the stack
- 📱 **Mobile First**: Responsive design optimized for all devices
- ⚡ **Performance**: Optimized with Vite, code splitting, and lazy loading
- 🛡️ **Security**: Rate limiting, input validation, and secure headers
- 📧 **Contact Forms**: Integrated email notifications
- �️ **Database**: PostgreSQL with Prisma for type-safe database access
- 🚀 **Deployment Ready**: Configured for Render deployment

## 📁 **Project Structure**

```
mwc-advocates/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   │   ├── layout/     # Layout components (Header, Footer, Layout)
│   │   │   └── ui/         # UI components (Button, Modal, etc.)
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript type definitions
│   │   ├── assets/         # Static assets (images, logos)
│   │   └── App.tsx         # Main application component
│   ├── public/             # Public assets
│   └── package.json        # Frontend dependencies
│
├── server/                 # Express.js backend application
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic services
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Utility functions and seed data
│   │   ├── app.ts          # Express app configuration
│   │   └── server.ts       # Server entry point
│   ├── prisma/             # Database schema and migrations
│   │   └── schema.prisma   # Prisma schema definition
│   ├── generated/          # Generated Prisma client
│   └── package.json        # Backend dependencies
│
├── database/               # Database documentation and scripts
├── docs/                   # Additional documentation
├── .gitignore              # Git ignore rules
├── README.md               # Project documentation
└── package.json            # Root package.json for scripts
```

## �️ **Development Setup**

### **Prerequisites**
- Node.js 18+ (TypeScript and modern JS support)
- PostgreSQL 13+ (Database)
- Git (Version control)

### **1. Clone Repository**
```bash
git clone https://github.com/KristianHans04/mwc-advocates.git
cd mwc-advocates
git checkout PERN
```

### **2. Backend Setup**
```bash
cd server

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env

# Edit .env file with your database credentials
# DATABASE_URL="postgresql://username:password@localhost:5432/mwc_advocates"
nano .env

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed database with initial data
npm run db:seed

# Start development server
npm run dev
```

### **3. Frontend Setup**
```bash
cd ../client

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env

# Edit .env file with your API URL
# VITE_API_BASE_URL=http://localhost:5000/api
nano .env

# Start development server
npm run dev
```

### **4. Access Application**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health
- **Database Studio**: `npm run db:studio` (in server directory)

## 📋 **Available Scripts**

### **Backend Scripts (server/)**
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:push      # Push schema changes to database
npm run db:seed      # Seed database with initial data
npm run db:studio    # Open Prisma Studio (database GUI)
npm run type-check   # Type check without emitting
```

### **Frontend Scripts (client/)**
```bash
npm run dev          # Start development server with Vite
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Type check without emitting
```

## 🗄️ **Database Schema**

### **Core Models**
- **Services**: Legal service offerings
- **Testimonials**: Client testimonials and reviews
- **ContactSubmissions**: Contact form submissions
- **FAQs**: Frequently asked questions
- **NewsletterSubscriptions**: Email subscriptions
- **BlogPosts**: Legal insights and articles (future feature)

### **Key Features**
- **Type Safety**: Full TypeScript integration with Prisma
- **Migrations**: Version-controlled database schema changes
- **Seeding**: Initial data for development and testing
- **Relations**: Properly structured relational data

## 🎨 **Design System**

### **Color Palette**
- **Primary Green**: `#0c3110` (Brand color)
- **Yellow Accent**: `#fbbf24` (Buttons, highlights)
- **Text Colors**: Dark gray hierarchy
- **Background**: White with subtle gray gradients

### **Typography**
- **Headings**: Bold, professional hierarchy
- **Body Text**: Clean, readable sans-serif
- **Responsive**: Scales appropriately across devices

### **Components**
- **Buttons**: Multiple variants (primary, secondary, accent)
- **Cards**: Clean shadows with hover effects
- **Forms**: Professional styling with validation states
- **Navigation**: Fixed header with mobile hamburger menu

## � **Deployment to Render**

### **Database Setup**
1. Create PostgreSQL database on Render
2. Note the database URL from Render dashboard
3. Update production environment variables

### **Backend Deployment**
1. Connect GitHub repository to Render
2. Create new Web Service
3. Set build command: `cd server && npm install && npm run build`
4. Set start command: `cd server && npm start`
5. Add environment variables from `.env.example`

### **Frontend Deployment**
1. Create new Static Site on Render
2. Set build command: `cd client && npm install && npm run build`
3. Set publish directory: `client/dist`
4. Add environment variables for production API URL

### **Environment Variables**

**Backend (.env)**
```env
DATABASE_URL=postgresql://render_database_url
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-url.onrender.com
JWT_SECRET=your-production-jwt-secret
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=info@mwcadvocates.com
```

**Frontend (.env)**
```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
VITE_APP_URL=https://your-frontend-url.onrender.com
```

## 📧 **Email Configuration**

The application supports email notifications for contact form submissions:

1. **Gmail Setup**: Use Gmail SMTP with app passwords
2. **Environment Variables**: Configure SMTP settings in `.env`
3. **Fallback**: Contact forms work without email (saved to database)

## 🔐 **Security Features**

- **Rate Limiting**: Prevents abuse of API endpoints
- **Input Validation**: Server-side validation with express-validator
- **CORS Configuration**: Properly configured for frontend domain
- **Helmet**: Security headers for Express.js
- **Environment Variables**: Sensitive data stored securely

### **Security Best Practices**

⚠️ **IMPORTANT**: Follow these practices to keep your application secure:

1. **Never commit secrets to git**:
   - Use `.env.example` as a template (with placeholder values)
   - Keep actual `.env` files in `.gitignore`
   - If credentials are ever exposed, rotate them immediately

2. **Use App-Specific Passwords**:
   - For Zoho Mail, generate an app-specific password instead of using your main password
   - Enable 2FA on all service accounts

3. **Generate secure secrets**:
   ```bash
   # Generate secure JWT secret
   openssl rand -base64 32
   ```

## 🧪 **Testing & Quality**

- **TypeScript**: Full type safety across the stack
- **Linting**: ESLint configuration for code quality
- **Error Handling**: Comprehensive error handling and logging
- **Validation**: Client and server-side form validation
- **Performance**: Optimized builds and lazy loading

## 🤝 **Contributing**

1. Create feature branch from `PERN`
2. Make changes with proper TypeScript types
3. Test thoroughly on both frontend and backend
4. Submit pull request with detailed description

## 📝 **License**

This application is created specifically for Masinde Wanyonyi & Company Advocates. All rights reserved.

## 🆘 **Support**

For technical support or deployment issues:
1. Check the logs in Render dashboard
2. Verify environment variables are set correctly
3. Ensure database connection is working
4. Review API endpoints in browser network tab

---
