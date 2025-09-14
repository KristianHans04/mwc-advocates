# Development Setup Guide

## Overview
This guide helps you set up the MWC Advocates application for local development with proper email testing and database configuration.

## Prerequisites
- Node.js 18+ and npm
- PostgreSQL (for local database) OR Supabase account (for cloud database)
- Docker (optional, for MailHog)

## Quick Start

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
cd ..
```

### 2. Set Up Environment Variables

The application now uses separate environment files for development and production:
- `.env.development` - Local development settings (uses MailHog for emails)
- `.env` - Production settings (uses Zoho for emails)

```bash
# Copy the development environment template
cd server
cp .env.development .env

# The development file is already configured to:
# - Use MailHog for email (no real emails sent)
# - Use local PostgreSQL database
# - Disable Zoho email service
```

### 3. Database Setup

#### Option A: Local PostgreSQL (Recommended for Development)
```bash
# Install PostgreSQL if not already installed
sudo apt install postgresql postgresql-contrib  # Ubuntu/Debian
brew install postgresql                          # macOS

# Run the setup script
cd server
chmod +x scripts/setup-local-db.sh
./scripts/setup-local-db.sh

# This will:
# - Create a local database named 'mwc_advocates_dev'
# - Run Prisma migrations
# - Seed with sample data
```

#### Option B: Use Supabase (Cloud Database)
```bash
# Edit server/.env.development
# Comment out the local DATABASE_URL and uncomment the Supabase one
# DATABASE_URL="your-supabase-url-here"
```

### 4. Start Development Server

```bash
# From root directory
npm run dev

# This will start:
# - MailHog on port 8025 (email viewer)
# - Backend on port 5000
# - Frontend on port 5173
```

## Email Testing with MailHog

In development, all emails are caught by MailHog instead of being sent to real addresses.

### View Emails
Open http://localhost:8025 to see all emails sent by the application.

### How It Works
- Contact form submissions send emails to MailHog
- No real emails are sent in development
- Both admin and client emails are visible in MailHog UI
- Emails show a "Development Mode" warning

## Environment Variables Explained

### Development (.env.development)
```env
# Server
NODE_ENV=development
PORT=5000

# Database - Local PostgreSQL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mwc_advocates_dev?schema=public"

# Email - MailHog (no auth needed)
EMAIL_FROM="MWC Advocates <noreply@mwc-advocates.local>"
ADMIN_EMAIL=admin@mwc-advocates.local

# Frontend
FRONTEND_URL=http://localhost:5173
```

### Production (.env)
```env
# Server
NODE_ENV=production
PORT=5000

# Database - Supabase
DATABASE_URL="your-supabase-pooler-url"

# Email - Zoho (real emails)
ZOHO_SMTP_HOST=smtp.zoho.com
ZOHO_SMTP_PORT=587
ZOHO_SMTP_USER=your-email@domain.com
ZOHO_SMTP_PASS=your-app-password

# Frontend
FRONTEND_URL=https://your-production-frontend.com
```

## Troubleshooting

### Database Connection Issues
If you see "Can't reach database server":

1. **For Local PostgreSQL:**
   ```bash
   # Check if PostgreSQL is running
   sudo systemctl status postgresql
   
   # Start PostgreSQL if needed
   sudo systemctl start postgresql
   
   # Create the database manually if needed
   sudo -u postgres createdb mwc_advocates_dev
   ```

2. **For Supabase:**
   - Check your internet connection
   - Verify the DATABASE_URL is correct
   - Ensure your Supabase project is not paused

### Email Issues
If emails aren't showing in MailHog:

1. **Check MailHog is running:**
   ```bash
   # Should see MailHog UI at http://localhost:8025
   # If not, start it manually:
   docker run -p 1025:1025 -p 8025:8025 mailhog/mailhog
   ```

2. **Verify development mode:**
   - Check that `NODE_ENV=development` in your .env
   - The server should log: "Initializing MailHog Email Service (Development)"

### Port Conflicts
If ports are already in use:

```bash
# Find what's using a port (e.g., 5000)
lsof -i :5000

# Kill the process if needed
kill -9 <PID>

# Or change the port in .env.development
PORT=5001  # Use a different port
```

## Development Workflow

### 1. Making Changes
- Frontend changes auto-reload at http://localhost:5173
- Backend changes auto-restart with nodemon
- Database changes require migrations:
  ```bash
  cd server
  npx prisma migrate dev --name your_migration_name
  ```

### 2. Testing Emails
1. Submit a contact form on the frontend
2. Open http://localhost:8025
3. See both admin and client emails
4. Click on emails to view full content

### 3. Database Management
```bash
# View database with Prisma Studio
cd server
npx prisma studio  # Opens at http://localhost:5555

# Reset database
npx prisma migrate reset

# Seed with sample data
npx prisma db seed
```

## Scripts Reference

### Root Directory
- `npm run dev` - Start full development environment
- `npm run build` - Build both frontend and backend
- `npm run client:dev` - Start only frontend
- `npm run server:dev` - Start only backend

### Server Directory
- `npm run dev` - Start backend with nodemon
- `npm run build` - Compile TypeScript
- `npm run start` - Start compiled server
- `npx prisma studio` - Open database GUI
- `npx prisma migrate dev` - Run migrations

### Client Directory
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Important Notes

1. **Never commit .env files** - They contain sensitive data
2. **Use .env.development for local work** - Keeps production credentials safe
3. **MailHog catches all emails in development** - No accidental emails to real users
4. **The app works without database** - Falls back to JSON files if DB fails
5. **CORS is configured for localhost** - Frontend and backend can communicate locally

## Next Steps

1. Set up your local database
2. Configure your development environment
3. Start the development server
4. Test the contact form with MailHog
5. Make your changes and test locally
6. Push to GitHub when ready for production