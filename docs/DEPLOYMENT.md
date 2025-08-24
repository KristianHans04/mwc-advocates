# Deployment Guide for MWC Advocates PERN Application

This guide provides step-by-step instructions for deploying the MWC Advocates application to Render.

## 📋 **Prerequisites**

- GitHub repository with your code
- Render account (https://render.com)
- PostgreSQL database credentials
- SMTP credentials for email functionality (optional)

## 🗄️ **Database Setup**

### **1. Create PostgreSQL Database on Render**

1. Log into your Render dashboard
2. Click "New" → "PostgreSQL"
3. Fill in the database details:
   - **Name**: `mwc-advocates-db`
   - **Database**: `mwc_advocates`
   - **User**: `mwc_user` (or any preferred username)
   - **Region**: Choose closest to your users
   - **PostgreSQL Version**: Latest stable version
4. Click "Create Database"
5. Wait for database to be created
6. Copy the "External Database URL" from the database dashboard

## 🖥️ **Backend Deployment**

### **1. Create Web Service**

1. In Render dashboard, click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `mwc-advocates-api`
   - **Environment**: `Node`
   - **Region**: Same as your database
   - **Branch**: `PERN`
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### **2. Environment Variables**

Add the following environment variables in the Render dashboard:

```env
DATABASE_URL=postgresql://[your-database-url-from-step-above]
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://[your-frontend-url].onrender.com
JWT_SECRET=your-super-secret-production-jwt-key-minimum-32-chars
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_FROM=MWC Advocates <noreply@mwcadvocates.com>
CONTACT_EMAIL=info@mwcadvocates.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CONTACT_RATE_LIMIT_MAX=5
```

### **3. Deploy Backend**

1. Click "Create Web Service"
2. Wait for the initial deployment to complete
3. Check logs for any errors
4. Test the API health endpoint: `https://your-api-url.onrender.com/health`

### **4. Database Migration & Seeding**

After successful deployment, run database migrations:

1. In Render dashboard, go to your web service
2. Open the "Shell" tab
3. Run the following commands:

```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed database with initial data
npm run db:seed
```

## 🌐 **Frontend Deployment**

### **1. Create Static Site**

1. In Render dashboard, click "New" → "Static Site"
2. Connect the same GitHub repository
3. Configure the static site:
   - **Name**: `mwc-advocates-web`
   - **Branch**: `PERN`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### **2. Environment Variables**

Add the following environment variables:

```env
VITE_API_BASE_URL=https://[your-backend-url].onrender.com/api
VITE_APP_NAME=MWC Advocates
VITE_APP_DESCRIPTION=Premier law firm in Nairobi, Kenya
VITE_APP_URL=https://[your-frontend-url].onrender.com
VITE_CONTACT_PHONE=+254702073800
VITE_CONTACT_EMAIL=masindewanyonyi.co@gmail.com
VITE_CONTACT_ADDRESS=SUITE 58 Duplex Suites, Lower Hill Road, Upperhill, Nairobi, Kenya
```

### **3. Deploy Frontend**

1. Click "Create Static Site"
2. Wait for deployment to complete
3. Test the frontend by visiting the provided URL

## 🔗 **Custom Domain Setup (Optional)**

### **For Backend**
1. In your web service settings, go to "Custom Domains"
2. Add your API subdomain (e.g., `api.mwcadvocates.com`)
3. Follow DNS configuration instructions

### **For Frontend**
1. In your static site settings, go to "Custom Domains"
2. Add your main domain (e.g., `www.mwcadvocates.com`)
3. Follow DNS configuration instructions

## 📧 **Email Configuration**

### **Gmail SMTP Setup**
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → App passwords
   - Generate password for "Mail"
3. Use this app password in the `SMTP_PASS` environment variable

### **Alternative Email Providers**
- **SendGrid**: More reliable for production
- **Mailgun**: Good for transactional emails
- **AWS SES**: Cost-effective for high volume

## 🔍 **Testing Deployment**

### **Backend Tests**
```bash
# Health check
curl https://your-api-url.onrender.com/health

# Services endpoint
curl https://your-api-url.onrender.com/api/services

# Testimonials endpoint
curl https://your-api-url.onrender.com/api/testimonials
```

### **Frontend Tests**
1. Visit your frontend URL
2. Test navigation between pages
3. Test contact form submission
4. Verify responsive design on mobile

## 🚨 **Troubleshooting**

### **Common Issues**

**Database Connection Errors**
- Verify `DATABASE_URL` is correct
- Check database is in the same region as your web service
- Ensure database is not paused (happens on free tier)

**Build Failures**
- Check Node.js version compatibility
- Verify all dependencies are in `package.json`
- Review build logs for specific errors

**CORS Errors**
- Ensure `FRONTEND_URL` environment variable is set correctly
- Check that frontend is making requests to correct API URL

**Email Not Working**
- Verify SMTP credentials are correct
- Check Gmail app password is used (not regular password)
- Test email sending with a simple tool first

### **Monitoring**

**Render Logs**
- Backend: Check web service logs for API errors
- Frontend: Check static site build logs for deployment issues

**Database Monitoring**
- Monitor connection count
- Check query performance in Prisma Studio
- Set up alerts for high usage

## 🔄 **Continuous Deployment**

### **Automatic Deployments**
Render automatically deploys when you push to the connected branch:

1. **Backend**: Pushes to `PERN` branch trigger backend redeploy
2. **Frontend**: Pushes to `PERN` branch trigger frontend rebuild
3. **Database**: Schema changes require manual migration

### **Manual Deployments**
You can trigger manual deployments from the Render dashboard:

1. Go to your service
2. Click "Manual Deploy"
3. Select "Clear build cache" if needed

## 📊 **Performance Optimization**

### **Backend Optimization**
- Enable connection pooling in Prisma
- Implement Redis caching for frequently accessed data
- Use environment-specific logging levels

### **Frontend Optimization**
- Enable gzip compression
- Implement lazy loading for components
- Use Vite's built-in code splitting

## 🔐 **Security Checklist**

- [ ] Environment variables are properly set
- [ ] Database credentials are secure
- [ ] CORS is configured correctly
- [ ] Rate limiting is enabled
- [ ] HTTPS is enforced
- [ ] Sensitive data is not logged
- [ ] Input validation is implemented

## 📈 **Monitoring & Analytics**

### **Application Monitoring**
- Set up error tracking (e.g., Sentry)
- Monitor API response times
- Track database performance

### **Business Analytics**
- Implement Google Analytics
- Track contact form submissions
- Monitor user engagement

---

**Deployment completed! Your MWC Advocates application should now be live and accessible to users worldwide.**
