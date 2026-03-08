# ─── Stage 1: Builder ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat

# Copy root package.json first (required by server's local file: dependency resolution)
COPY package.json ./

# Install dependencies (separate layer for better cache reuse)
COPY server/package.json server/package-lock.json* ./server/
COPY client/package.json client/package-lock.json* ./client/

WORKDIR /app/server
RUN npm ci --legacy-peer-deps

WORKDIR /app/client
RUN npm ci --legacy-peer-deps

# Copy source code
WORKDIR /app
COPY server ./server
COPY client ./client

# Build server
WORKDIR /app/server
RUN npm run build

# Generate Prisma client
RUN npx prisma generate

# Build client
WORKDIR /app/client
RUN npm run build

# ─── Stage 2: Runner ───────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache libc6-compat

# Copy server production artifacts and dependencies
COPY --from=builder /app/server/package.json ./server/package.json
COPY --from=builder /app/server/package-lock.json* ./server/
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/node_modules ./server/node_modules
COPY --from=builder /app/server/prisma ./server/prisma

# Copy built client to path expected by server: path.join(__dirname, '../../client/dist')
# __dirname = /app/server/dist, so ../../client/dist = /app/client/dist
COPY --from=builder /app/client/dist ./client/dist

ENV NODE_ENV=production
EXPOSE 80

WORKDIR /app/server
CMD ["node", "dist/server.js"]
