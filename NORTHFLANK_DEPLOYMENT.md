# Northflank Deployment Guide for MWC Advocates

This guide will help you deploy the MWC Advocates PERN stack application on Northflank.

## Prerequisites

- Northflank account
- GitHub repository connected to Northflank
- PostgreSQL database (can be created on Northflank)

## Step 1: Create PostgreSQL Database on Northflank

1. Go to your Northflank project
2. Click **"Add Service"** → **"Database"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `mwc-advocates-db`
   - **Plan**: Choose based on your needs (Start with smallest for testing)
   - **Version**: PostgreSQL 14 or higher
4. Click **"Create Database"**
5. Wait for database to be created
6. **Important**: Copy the connection string from the database overview page

## Step 2: Configure Combined Service

### Basic Information
1. Go to **"Add Service"** → **"Combined"** (Build and deploy a Git repo)
2. **Service name**: `mwc-advocates` (or your preferred name)
3. **Tags**: `production`, `web`, `law-firm` (optional)

### Repository
1. **Repository**: Select `KristianHans04/mwc-advocates`
2. **Branch**: `main` (or your production branch)

### Build Options
1. **Build type**: Select **"Dockerfile"**
   - The repository now includes a production-ready Dockerfile
   - Buildpack won't work for this complex PERN stack setup

### Resources
**For Production (Recommended)**:
- **Plan**: `nf-compute-50` or higher
- **vCPU**: 0.5 shared minimum
- **Memory**: 512 MB minimum (1 GB recommended)
- **Instances**: 1 (can scale later)

**For Testing (Minimal)**:
- **Plan**: `nf-compute-10`
- **vCPU**: 0.1 shared
- **Memory**: 256 MB
- **Instances**: 1

⚠️ **Note**: The 256MB plan may cause build failures or slow performance. 512MB+ is recommended.

### Networking - **REQUIRED**
1. Click **"Add port"**
2. Configure:
   - **Name**: `http`
   - **Port**: `5000`
   - **Protocol**: `HTTP`
   - **Public**: ✅ **Enabled** (MUST be enabled for public access)
   - **Domain**: (Optional) Add custom domain later
3. **Load balancing mode**: `Least connection` (default)

### Environment Variables - **REQUIRED**

Click **"Add Variable"** for each of these:

#### Runtime Variables (Required)

| Name | Value | Description |
|------|-------|-------------|
| `NODE_ENV` | `production` | Sets production mode |
| `PORT` | `5000` | Application port (must match networking port) |
| `DATABASE_URL` | `postgresql://...` | Copy from database service connection string |
| `FRONTEND_URL` | `https://your-service-name.northflank.app` | Your Northflank service URL |

#### Email Configuration (Zoho SMTP) - Required for contact form

| Name | Value | Description |
|------|-------|-------------|
| `SMTP_HOST` | `smtp.zoho.com` | Zoho SMTP server |
| `SMTP_PORT` | `465` | SMTP port (use 465 for SSL) |
| `SMTP_SECURE` | `true` | Enable SSL |
| `SMTP_USER` | `your-email@domain.com` | Your Zoho email |
| `SMTP_PASS` | `your-app-password` | Zoho app-specific password |
| `SMTP_FROM` | `your-email@domain.com` | From email address |
| `CONTACT_EMAIL` | `contact@mwcadvocates.co.ke` | Recipient for contact forms |

#### Optional Variables

| Name | Value | Description |
|------|-------|-------------|
| `API_RATE_LIMIT_WINDOW_MS` | `900000` | Rate limit window (15 min) |
| `API_RATE_LIMIT_MAX_REQUESTS` | `100` | Max requests per window |

### Build Arguments (Optional)
No build arguments needed for this setup.

### Advanced Configuration

#### Docker Runtime Mode
- Select: **"Default configuration"**
- This uses the ENTRYPOINT & CMD from Dockerfile

#### Health Checks
Northflank can use the built-in health check from the Dockerfile, or configure custom:
- **Path**: `/health`
- **Port**: `5000`
- **Initial Delay**: `40` seconds
- **Period**: `30` seconds
- **Timeout**: `10` seconds
- **Success Threshold**: `1`
- **Failure Threshold**: `3`

## Step 3: Deploy

1. Review all configuration
2. Click **"Create Service"** at the bottom
3. Northflank will:
   - Clone your repository
   - Build the Docker image (this takes 5-10 minutes)
   - Deploy the container
   - Run health checks

## Step 4: Monitor Deployment

### Build Logs
1. Go to your service → **"Builds"** tab
2. Click on the running build to see real-time logs
3. Look for:
   ```
   ✅ Building client...
   ✅ Building server...
   ✅ Successfully built image
   ```

### Deployment Logs
1. Go to **"Deployments"** tab
2. Watch for:
   ```
   🚀 Server running on port 5000
   🏥 Health check: http://0.0.0.0:5000/health
   🌐 Production server ready for connections
   ```

### Common Build Issues

**Issue**: Build fails with "out of memory"
- **Solution**: Increase memory to 512MB or 1GB in Resources

**Issue**: Build timeout
- **Solution**: Increase build timeout in Advanced settings

**Issue**: Port binding error
- **Solution**: Ensure PORT environment variable is set to `5000` and matches networking port

**Issue**: Database connection fails
- **Solution**: 
  - Verify DATABASE_URL is correct
  - Check database service is running
  - Ensure database accepts connections from service

## Step 5: Database Setup

After first successful deployment:

1. Go to service → **"Jobs & Tasks"**
2. Run one-time command to setup database:
   ```bash
   cd server && npx prisma db push && npx prisma db seed
   ```
3. This will:
   - Create database tables
   - Seed initial data from JSON files

## Step 6: Verify Deployment

### Health Check
Visit: `https://your-service-name.northflank.app/health`

Should return:
```json
{
  "status": "OK",
  "message": "MWC Advocates API is running",
  "timestamp": "2025-10-15T08:00:00.000Z"
}
```

### Test API Endpoints
- Services: `/api/services`
- Testimonials: `/api/testimonials`
- FAQ: `/api/faq`

### Test Frontend
Visit: `https://your-service-name.northflank.app`

Should load the MWC Advocates website.

## Step 7: Custom Domain (Optional)

1. Go to service → **"Networking"** → **"Domains"**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `www.mwcadvocates.co.ke`)
4. Add DNS records as shown by Northflank
5. Wait for SSL certificate provisioning

## Continuous Deployment

Once configured, Northflank automatically:
- Detects commits to your branch
- Builds new Docker images
- Deploys with zero-downtime rolling updates

## Troubleshooting

### Logs Access
1. Service → **"Logs"** tab
2. Filter by severity: Info, Warning, Error
3. Search specific keywords

### Shell Access
1. Service → **"Tasks"**
2. Create task: **"Open Shell"**
3. Access container for debugging

### Environment Variable Updates
1. Service → **"Environment"** tab
2. Update variables
3. **Restart** service for changes to take effect

## Cost Optimization

### Development/Staging
- Use `nf-compute-10` (0.1 vCPU, 256 MB)
- Set to 0 instances when not needed
- Use free PostgreSQL tier

### Production
- Use `nf-compute-50` (0.5 vCPU, 512 MB) minimum
- Enable autoscaling based on traffic
- Monitor usage and scale accordingly

## Security Checklist

- ✅ All environment variables set correctly
- ✅ No secrets committed to repository
- ✅ CORS configured for production domain
- ✅ Rate limiting enabled
- ✅ HTTPS enforced (automatic with Northflank)
- ✅ Helmet security headers configured
- ✅ Database credentials secure

## Support

If you encounter issues:
1. Check service logs first
2. Review build logs for compilation errors
3. Verify all environment variables
4. Check database connectivity
5. Contact Northflank support if needed

## Quick Reference

### Essential URLs
- Service Dashboard: `https://app.northflank.com/projects/{project}/services/{service}`
- Application: `https://your-service-name.northflank.app`
- Health Check: `https://your-service-name.northflank.app/health`
- API Base: `https://your-service-name.northflank.app/api`

### Essential Commands
```bash
# Database migrations
cd server && npx prisma migrate deploy

# Database seed
cd server && npx prisma db seed

# View logs
cd server && node dist/server.js

# Check Node version
node --version

# Check npm version
npm --version
```

---

**Last Updated**: October 2025
**Application Version**: 1.0.0
**Node Version Required**: >=18.0.0
