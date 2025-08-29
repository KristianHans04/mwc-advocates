# Email Development Setup for MWC Advocates

This document explains how to test emails in development using MailHog (the Node.js equivalent of Rails' MailCatcher).

## 🚀 Quick Start

### 1. Start MailHog and Development Server
```bash
# Start both MailHog and the development server
npm run dev:email

# Or start them separately:
npm run mailhog:start  # Start MailHog container
npm run dev           # Start the development server
```

### 2. View Emails
- **MailHog Web UI**: http://localhost:8025
- All development emails are captured here instead of being sent to real addresses

### 3. Test the Contact Form
```bash
# Test via curl
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "phone": "5551234567",
    "subject": "Development Test",
    "message": "Testing the email system in development"
  }'
```

## 📧 How It Works

### Development vs Production
- **Development (`NODE_ENV=development`)**: Uses MailHog via nodemailer
- **Production (`NODE_ENV=production`)**: Uses SparkPost API

### Email Services
1. **`email.service.ts`** - Production SparkPost service
2. **`email.dev.service.ts`** - Development MailHog service

The contact route automatically chooses the right service based on `NODE_ENV`.

### Development Email Features
- ✅ Same HTML templates as production
- ✅ Clear development mode indicators
- ✅ No API costs or real email delivery
- ✅ Perfect for testing email content and flow
- ✅ Instant delivery to MailHog inbox

## 🐳 MailHog Commands

```bash
# Start MailHog
npm run mailhog:start

# Stop MailHog  
npm run mailhog:stop

# View MailHog logs
npm run mailhog:logs

# Open MailHog UI (attempts to open browser)
npm run mailhog:ui
```

## 🔧 Configuration

### MailHog Ports
- **SMTP Server**: localhost:1025
- **Web UI**: localhost:8025

### Environment Variables
The development email service uses the same environment variables as production:
```env
EMAIL_FROM="MWC Advocates <noreply@kristianhans.com>"
ADMIN_EMAIL=info@kristianhans.com
WEBSITE_URL=http://localhost:5173
```

## 🎯 Testing Workflow

1. **Start MailHog**: `npm run mailhog:start`
2. **Start Development Server**: `npm run dev`
3. **Submit Contact Form**: Use the frontend or curl
4. **Check MailHog**: Open http://localhost:8025
5. **Verify Emails**: Both admin notification and client thank you emails should appear

## 📱 Email Types Captured

### Admin Notification Email
- **To**: `info@kristianhans.com`
- **Subject**: `[DEV] New Contact Form Submission - {subject}`
- **Content**: Contact form details with development styling

### Client Thank You Email  
- **To**: User's email address
- **Subject**: `[DEV] Thank you for contacting MWC Advocates`
- **Content**: Professional thank you message with development styling

## 🐛 Troubleshooting

### MailHog Not Starting
```bash
# Check if Docker is running
docker ps

# Check if ports are available
lsof -i :1025
lsof -i :8025

# Restart MailHog
npm run mailhog:stop && npm run mailhog:start
```

### Emails Not Appearing
1. Check server logs for email sending confirmation
2. Verify NODE_ENV is set to 'development' (default)
3. Ensure MailHog is running: `docker ps | grep mailhog`
4. Check MailHog logs: `npm run mailhog:logs`

### Wrong Email Service Used
- **Development**: Should log `[DEV]` prefixes and MailHog URLs
- **Production**: Should log SparkPost API calls
- Check `NODE_ENV` value in server startup logs

## 💡 Tips

- **Email Content Testing**: Perfect for testing HTML templates and styling
- **No API Costs**: Test unlimited emails without SparkPost API charges  
- **Real Email Flow**: Tests the complete email sending process
- **Cross-Device Testing**: MailHog UI works on mobile for testing responsive emails
- **Email Debugging**: View both HTML and plain text versions

## 🚀 Production Deployment

When deploying to production:
1. Set `NODE_ENV=production`  
2. Configure SparkPost API key
3. The system automatically switches to SparkPost service
4. No code changes needed!

---

## Alternative Solutions

If you prefer other tools:

### Option 2: Mailtrap (SaaS)
- Sign up at https://mailtrap.io
- Get SMTP credentials
- Update development service configuration

### Option 3: Ethereal Email (Temporary) 
- Automatic temporary accounts
- Good for quick testing
- No setup required

### Option 4: Console Logging (Simple)
- Log email content to console instead
- No external dependencies
- Quick debugging option
