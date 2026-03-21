# Azure Coolify Deployment Guide

## Server

| Property | Value |
|---|---|
| Platform | Azure VM |
| Specs | 2 vCPU / 1 GB RAM |
| Swap | 8 GB (required for Node.js Docker builds) |
| Deployment tool | Coolify |
| Reverse proxy | Traefik v3 |

> Without swap, `tsc`, Vite, and Prisma generate OOM-kill the build on a 1 GB VM. Always configure swap before building.
>
> Setup: `sudo fallocate -l 8G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile`
> Persist: add `/swapfile none swap sw 0 0` to `/etc/fstab`

---

## Stack

Single Docker container serving both the Express API and the React frontend (static files served from `/app/client/dist`). Traefik handles TLS termination via Let's Encrypt.

---

## Critical Configuration Files

### Dockerfile

Key decisions driven by the 1 GB RAM constraint:

**Memory Management:**

- **Use absolute paths with `cd` commands** instead of `WORKDIR` — Coolify injects ARG declarations at the top of the Dockerfile which can shift line numbers and cause context issues
- **Set `NODE_OPTIONS="--max-old-space-size=XXXX"` for memory-intensive builds**:
  - `npm ci` for client: 1536MB minimum
  - Vite build (simple React apps): 1536-2048MB
  - Vite build (with Three.js/heavy dependencies): 2560MB (2.5GB)
  - With 8GB swap, these limits are safe and prevent OOM-kill
- **Clear `NODE_OPTIONS=""` after build** to avoid constraining runtime

**Dependencies:**

- `NODE_ENV=development` inline on `npm ci` commands — Coolify passes `NODE_ENV=production` as a build ARG which causes `npm ci` to skip devDependencies (Vite, esbuild, TypeScript), breaking the build

```dockerfile
# Install server dependencies
COPY server/package*.json /app/server/
RUN cd /app/server && NODE_ENV=development npm ci --legacy-peer-deps

# Install client dependencies with memory limit
COPY client/package*.json /app/client/
RUN cd /app/client && NODE_OPTIONS="--max-old-space-size=1536" NODE_ENV=development npm ci --legacy-peer-deps

# Build Vite client (allocate 2.5GB for heavy apps with Three.js, etc.)
RUN cd /app/client && NODE_OPTIONS="--max-old-space-size=2560" npm run build

# Clear NODE_OPTIONS for runtime
ENV NODE_ENV=production
ENV NODE_OPTIONS=""
```

**Example Structure:**

```dockerfile
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat

# Install server dependencies
COPY server/package*.json /app/server/
RUN cd /app/server && NODE_ENV=development npm ci --legacy-peer-deps

# Install client dependencies
COPY client/package*.json /app/client/
RUN cd /app/client && NODE_OPTIONS="--max-old-space-size=1536" NODE_ENV=development npm ci --legacy-peer-deps

# Copy source code
COPY server /app/server
COPY client /app/client

# Build Vite client
RUN cd /app/client && NODE_OPTIONS="--max-old-space-size=2560" npm run build

ENV NODE_ENV=production
ENV NODE_OPTIONS=""
EXPOSE 80

WORKDIR /app/server
CMD ["node", "src/index.js"]
```

**Static File Path:**

Ensure server code uses correct relative paths. From `/app/server/src/app.js`:

```javascript
// CORRECT: Goes up 2 levels from /app/server/src to /app, then into client/dist
const clientDist = path.resolve(__dirname, '../../client/dist');

// WRONG: Goes up 3 levels, exits container
const clientDist = path.resolve(__dirname, '../../../client/dist');
```

**Prisma (if used):**

Prisma must include the Alpine binary target:

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "linux-musl-openssl-3.0.x"]
}
```

### docker-compose.yaml

Traefik routing uses `${SERVICE_FQDN_WEB}` — Coolify's native variable for the configured service domain:

```yaml
- "traefik.http.routers.mwc-advocates-web.rule=Host(`${SERVICE_FQDN_WEB}`)"
```

Do NOT use these — they do not work:
- `${COOLIFY_FQDN}` — resolves to the Coolify dashboard domain, not the app
- `{{ .FQDN }}` — not valid Docker Compose or Traefik syntax

The Docker **healthcheck is intentionally absent**. If the healthcheck marks the container unhealthy, Coolify stops routing Traefik traffic to it, causing 404.

### .dockerignore

The `.dockerignore` file prevents unnecessary files from being sent to the Docker daemon during build. This speeds up context upload and prevents secrets from being embedded in the image:

```
node_modules/         — never copy, always reinstall inside container
client/node_modules/  — same
.git/ .github/        — build history not needed
*.log                 — noise
.env .env.*           — secrets must never enter the image layer
dist/                 — rebuilt fresh inside container
temp_docs/ uploads/   — not part of the deployed app
```

> [!IMPORTANT]
> `.env.coolify` is covered by the `.env.*` gitignore and dockerignore patterns — it is never committed to Git and never copied into the Docker image. Environment variables are injected at runtime by Coolify's container runtime, not baked into the image.

### server/.env.coolify


Reference file for Coolify's Environment Variables panel. Always keep `SERVICE_FQDN_WEB` and `SERVICE_URL_WEB` set to plain string values — never template strings:

```
SERVICE_FQDN_WEB=<subdomain>.kristianhans.com
SERVICE_URL_WEB=https://<subdomain>.kristianhans.com
```

Coolify internally stores `SERVICE_URL_WEB` as `https://${SERVICE_FQDN_WEB}` (a Go template). When you rely on Coolify's auto-management, it writes this unresolved template into `build-time.env`, and Coolify's Go template engine crashes with `Invalid template: "https://${SERVICE_FQDN_WEB"`. Setting it explicitly as a plain string bypasses this entirely.

Similarly, do not set `FRONTEND_URL` or `WEBSITE_URL` as `https://${SERVICE_FQDN_WEB}` — same crash. Set them to the actual URL string.

`NODE_ENV` must have **"Available at buildtime" unchecked** in Coolify's env panel. If passed as a build ARG, it causes `npm ci` to skip devDependencies.

---

## Environment Variables Reference

| Variable | Notes |
|---|---|
| `DATABASE_URL` | Must include `?sslmode=disable` for Coolify's internal Postgres |
| `SERVICE_FQDN_WEB` | Set explicitly as plain domain string |
| `SERVICE_URL_WEB` | Set explicitly as `https://` + domain |
| `PORT` | `80` — Traefik forwards to port 80 on the container |
| `NODE_ENV` | `production` — uncheck "Available at buildtime" in Coolify |
| `FRONTEND_URL` | Set to actual URL, not a template |
| `WEBSITE_URL` | Set to actual URL, not a template |

---

## Build Performance

**Expected Build Times:**
- Simple React app: 5-10 minutes
- React app with heavy dependencies (Three.js, etc.): 15-20 minutes
- The build uses swap memory (slower), but **runtime is fast** — swap only affects build, not user experience

**Runtime Performance:**
- Memory usage: ~100-200MB (well within 843MB available RAM)
- No swap usage during normal operation
- Users experience no performance degradation

The slow build is a one-time cost per deployment. Your application serves pre-built static files and handles API requests, which is lightweight.

---

## Updating the Domain

When Coolify assigns a new domain (e.g. switching from sslip.io to a custom domain):

1. Update `SERVICE_FQDN_WEB`, `SERVICE_URL_WEB`, `FRONTEND_URL`, `WEBSITE_URL`, `APP_URL` in Coolify's env panel to the new plain-string domain
2. Redeploy

---

## SSL Certificate

Let's Encrypt HTTP-01 challenge requires inbound port 80 TCP open on the Azure NSG. Confirm in:

Azure Portal → VM → Networking → Inbound port rules → `AllowWebTraffic` (ports 80, 443, TCP)

The cert is auto-managed by Traefik. After first deploy, it may take 1-2 minutes to issue. A "not secure" warning on a browser that previously loaded the site with the old self-signed cert is a browser cache issue — clear site data for the domain to resolve it.

---

## Troubleshooting

**Build fails with OOM errors:**
- Verify swap is active: SSH into VM, run `free -h` (should show 8GB swap)
- Increase `NODE_OPTIONS` memory limit in Dockerfile
- Check that Coolify isn't injecting `NODE_ENV=production` as a build ARG

**Static files not found (ENOENT errors):**
- Check static file path in server code uses correct relative path
- From `/app/server/src/app.js`: use `../../client/dist`, not `../../../client/dist`

**Deployment succeeds but site shows 404:**
- Verify Traefik labels in docker-compose.yaml
- Check `SERVICE_FQDN_WEB` is set correctly in Coolify
- Ensure domain DNS is pointing to Azure VM IP
