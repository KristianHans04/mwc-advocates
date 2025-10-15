# Northflank Buildpack Deployment - Simple Guide

## What You Need to Fill Out

### ✅ Basic Information
- **Service name**: `mwc-advocates`

### ✅ Repository
- **Repository**: `KristianHans04/mwc-advocates`
- **Branch**: `PERN`

### ✅ Build Options
- **Build type**: Select **"Buildpack"** → **"Heroku"**
- **Builder**: `heroku/builder:24` (default)
- **Build context**: `/` (default)

### ✅ Resources
**Change port to 8080:**
- Port: Change from `5000` to **`8080`**

**Minimum specs:**
- **Compute plan**: `nf-compute-10` is OK for testing
- **Memory**: 256 MB (will work, but 512 MB is better)
- **vCPU**: 0.1 shared

### ✅ Networking ⚠️ **IMPORTANT**
Your current config shows **port 8080** ✅ - This is correct!

Make sure:
- Port: `8080` ✅
- Protocol: `HTTP` ✅
- **Public**: ✅ **ENABLED**
- Name: `site` ✅

### ✅ Environment Variables ⚠️ **REQUIRED**

Add these Runtime Variables:

```
NODE_ENV=production
PORT=8080
DATABASE_URL=postgresql://your-db-connection-string
```

**Optional (for email):**
```
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@domain.com
SMTP_PASS=your-password
SMTP_FROM=your-email@domain.com
CONTACT_EMAIL=contact@mwcadvocates.co.ke
```

### ✅ Advanced
- **Buildpack runtime mode**: `Default configuration`
- **Health checks**: Can add later

## Before You Deploy

**1. Push changes:**
```bash
git add .
git commit -m "Configure for Northflank Buildpack"
git push origin PERN
```

**2. Create database** (if you need one):
- Add Service → Database → PostgreSQL
- Copy connection string
- Add as `DATABASE_URL` environment variable

**3. Click "Create Service"**

## What Happens

Buildpack will automatically:
1. Detect Node.js project
2. Install dependencies
3. Run `npm run build` (builds server + client)
4. Start with `Procfile` → runs server on port 8080
5. Server serves frontend static files from `/client/dist`

## After Deployment

**Visit your site:**
`https://site--mwc-advocates--tkzbdsdh56l7.code.run`

**Check health:**
`https://site--mwc-advocates--tkzbdsdh56l7.code.run/health`

**Initialize database** (first time only):
Go to: Service → Jobs & Tasks → Run command:
```bash
cd server && npx prisma db push && npx prisma db seed
```

## Troubleshooting

**Build fails:**
- Check build logs for errors
- Make sure all dependencies are in package.json

**Can't access site:**
- Verify port 8080 is **Public enabled**
- Check environment variables

**Database errors:**
- Verify DATABASE_URL is correct
- Check database is running

---

**That's it!** Much simpler than Docker.
