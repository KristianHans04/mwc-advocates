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

- `esbuild` instead of `tsc` — uses a fraction of the memory
- Single-stage build — avoids BuildKit's multi-stage pipe crashes
- `NODE_ENV=development` inline on both `npm ci` commands — Coolify passes `NODE_ENV=production` as a build ARG which causes `npm ci` to skip devDependencies (Vite, esbuild), breaking the build

```dockerfile
RUN NODE_ENV=development npm ci --legacy-peer-deps  # server
RUN NODE_ENV=development npm ci --legacy-peer-deps  # client
```

- Prisma must include the Alpine binary target:

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

## Updating the Domain

When Coolify assigns a new domain (e.g. switching from sslip.io to a custom domain):

1. Update `SERVICE_FQDN_WEB`, `SERVICE_URL_WEB`, `FRONTEND_URL`, `WEBSITE_URL`, `APP_URL` in Coolify's env panel to the new plain-string domain
2. Redeploy

---

## SSL Certificate

Let's Encrypt HTTP-01 challenge requires inbound port 80 TCP open on the Azure NSG. Confirm in:

Azure Portal → VM → Networking → Inbound port rules → `AllowWebTraffic` (ports 80, 443, TCP)

The cert is auto-managed by Traefik. After first deploy, it may take 1-2 minutes to issue. A "not secure" warning on a browser that previously loaded the site with the old self-signed cert is a browser cache issue — clear site data for the domain to resolve it.
