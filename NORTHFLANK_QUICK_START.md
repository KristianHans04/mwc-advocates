# Northflank Quick Setup - TL;DR

## What I've Added

✅ **Dockerfile** - Multi-stage build for optimized production deployment  
✅ **.dockerignore** - Excludes unnecessary files from Docker build  
✅ **northflank.json** - Northflank service configuration  
✅ **NORTHFLANK_DEPLOYMENT.md** - Complete step-by-step deployment guide  
✅ **Updated app.ts** - Now serves frontend static files in production

## Quick Start (5 Minutes)

### 1. Push Changes to GitHub
```bash
git push origin PERN  # or your branch name
```

### 2. Create Northflank Service

**Basic Info:**
- Service name: `mwc-advocates`
- Repository: `KristianHans04/mwc-advocates`
- Branch: `PERN` (or your branch)

**Build:**
- Build type: **Dockerfile** ✅

**Resources:**
- Memory: **512 MB minimum** (256 MB may fail)
- CPU: 0.5 shared or higher

**Networking:** ⚠️ **CRITICAL**
- Add port: `5000`, HTTP, **Public enabled** ✅

**Environment Variables:** ⚠️ **REQUIRED**
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:pass@host:5432/dbname
FRONTEND_URL=https://your-service.northflank.app

# Email (optional but recommended)
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@domain.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@domain.com
CONTACT_EMAIL=contact@mwcadvocates.co.ke
```

### 3. Create Database (if needed)

**Before deploying app:**
1. Add Service → Database → PostgreSQL
2. Name: `mwc-advocates-db`
3. Copy connection string
4. Add to app's `DATABASE_URL` environment variable

### 4. Deploy

Click **"Create Service"** and wait 5-10 minutes for build.

### 5. Initialize Database

After first deployment, run once:
```bash
cd server && npx prisma db push && npx prisma db seed
```

Run this in: Service → Jobs & Tasks → One-time command

### 6. Verify

Visit: `https://your-service-name.northflank.app`

## Common Issues & Fixes

### ❌ Build fails: "Out of memory"
**Fix**: Increase memory to 512 MB or 1 GB

### ❌ Can't access website
**Fix**: Ensure port 5000 is **Public enabled** in Networking

### ❌ Database connection error
**Fix**: Verify `DATABASE_URL` is correct and database is running

### ❌ "No such file or directory" in build
**Fix**: Ensure you pushed all files to GitHub

## What This Setup Does

- ✅ Builds frontend (React + Vite)
- ✅ Builds backend (Express + TypeScript)
- ✅ Serves both from single container
- ✅ Includes health checks
- ✅ Production optimizations
- ✅ Automatic SSL/HTTPS
- ✅ CI/CD on every commit

## Next Steps

1. Push changes: `git push origin PERN`
2. Follow setup above
3. Read full guide: `NORTHFLANK_DEPLOYMENT.md`

---

**Need help?** Check `NORTHFLANK_DEPLOYMENT.md` for detailed instructions.
