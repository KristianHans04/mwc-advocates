# Production Troubleshooting Guide

## Overview
This guide helps diagnose and fix common production issues with the MWC Advocates API, specifically for Supabase database and Zoho email integration.

## Quick Diagnostics

### 1. Run the Test Scripts

```bash
# Full test (requires Node.js and dependencies)
node test-production-full.js

# Quick curl test (no dependencies needed)
./test-production-curl.sh https://your-production-url.com

# Test with local setup
TEST_PRODUCTION=false node test-production-full.js
```

## Common Issues and Solutions

### Supabase Database Issues

#### Problem: "Connection refused" or "Connection timeout"
**Solutions:**
1. Check DATABASE_URL in production environment:
   ```bash
   # Should look like:
   # postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```

2. Use the **pooler URL** for production (port 6543), not the direct URL (port 5432)

3. Verify Supabase project is active and not paused

4. Check SSL mode:
   ```javascript
   // Add to Prisma connection if needed
   ?sslmode=require&pgbouncer=true
   ```

#### Problem: "Database does not exist"
**Solutions:**
1. Ensure you're using the correct database name (usually `postgres`)
2. Check if migrations have been run:
   ```bash
   npx prisma migrate deploy
   ```

### Zoho Email Issues

#### Problem: "Authentication failed"
**Solutions:**
1. Verify credentials:
   ```env
   ZOHO_SMTP_HOST=smtp.zoho.com
   ZOHO_SMTP_PORT=587
   ZOHO_SMTP_USER=your-email@domain.com
   ZOHO_SMTP_PASS=your-app-specific-password
   ```

2. **IMPORTANT**: If you have 2FA enabled on Zoho:
   - Go to Zoho Mail Settings → Security → Application-specific passwords
   - Generate a new password for "MWC Advocates API"
   - Use this password instead of your regular password

3. Verify the email address in ZOHO_SMTP_USER matches your Zoho account

#### Problem: "Connection timeout" on port 587
**Solutions:**
1. Check if your hosting provider blocks outbound SMTP:
   ```bash
   # Test connectivity
   telnet smtp.zoho.com 587
   ```

2. Try alternative ports:
   - Port 465 (SSL): `ZOHO_SMTP_PORT=465` and set `secure: true`
   - Port 25 (if allowed): `ZOHO_SMTP_PORT=25`

3. Some hosting providers require using their SMTP relay

### Production Environment Variables Checklist

```env
# Database (Supabase)
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true

# Email (Zoho)
ZOHO_SMTP_HOST=smtp.zoho.com
ZOHO_SMTP_PORT=587
ZOHO_SMTP_USER=your-email@yourdomain.com
ZOHO_SMTP_PASS=app-specific-password-here
EMAIL_FROM=MWC Advocates <your-email@yourdomain.com>
ADMIN_EMAIL=admin@yourdomain.com

# Server
NODE_ENV=production
PORT=3000
```

## Debug Mode

To enable detailed logging in production temporarily:

1. Set environment variables:
   ```env
   DEBUG=true
   LOG_LEVEL=debug
   ```

2. The updated code now includes detailed logging that will show:
   - Each step of contact form processing
   - Database connection attempts and errors
   - Email sending process and results
   - Detailed error messages with stack traces

## Monitoring Production Logs

Check your production logs for the following patterns:

### Successful Flow:
```
🔧 Initializing DatabaseService...
✅ Prisma connected successfully to database
🔧 Initializing Zoho Email Service...
✅ Zoho SMTP connection verified successfully
📨 NEW CONTACT FORM SUBMISSION
✅ Form validation passed
✅ Admin notification email sent successfully
✅ Client confirmation email sent successfully
✅ Contact submission saved to Supabase database
✅ SUCCESS: Contact form processed
```

### Failed Database Connection:
```
❌ Prisma connection failed with error: {message: "...", code: "..."}
🔄 Attempting to use Google Sheets as fallback...
```

### Failed Email:
```
❌ Zoho SMTP connection failed: {message: "...", code: "..."}
❌ Admin email failed: [error details]
❌ Client email failed: [error details]
```

## Recovery Strategy

The application now implements a graceful degradation strategy:

1. **Email First**: Emails are sent before database operations
   - If email fails, the error is logged but doesn't block the request
   - Users still get a response even if emails fail

2. **Database Fallback**: Multiple fallback options:
   - Primary: Supabase (Prisma)
   - Secondary: Google Sheets (if configured)
   - Tertiary: In-memory with temporary IDs

3. **Response Always Sent**: Users always receive feedback, even if backend services fail

## Testing Production Locally

To test production configuration locally:

```bash
# 1. Copy production env vars to .env.production
cp .env .env.production

# 2. Edit .env.production with production values

# 3. Run with production env
NODE_ENV=production node -r dotenv/config server.js dotenv_config_path=.env.production

# 4. Test the endpoints
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Testing production configuration locally"
  }'
```

## Contact Form Flow (After Fix)

1. **Validation** → Check input data
2. **Send Emails** → Attempt to send both admin and client emails
3. **Save to Database** → Try Supabase, fallback to Google Sheets
4. **Return Response** → Always return success/failure to user

This ensures emails are sent even if the database is down, addressing the main issue where database failures were blocking email sending.

## Need More Help?

1. Check the server logs for detailed error messages
2. Run the test scripts to identify which component is failing
3. Verify all environment variables are set correctly
4. Ensure your hosting provider supports outbound SMTP
5. Check Supabase and Zoho service status pages for outages