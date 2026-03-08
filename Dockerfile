FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
COPY server/package.json server/package-lock.json* ./server/
COPY client/package.json client/package-lock.json* ./client/

WORKDIR /app/server
RUN npm ci --legacy-peer-deps

WORKDIR /app/client
RUN npm ci --legacy-peer-deps

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/server/node_modules ./server/node_modules
COPY --from=deps /app/client/node_modules ./client/node_modules

COPY . .

WORKDIR /app/server
RUN npm run build

WORKDIR /app/client
RUN npm run build

WORKDIR /app/server
RUN npx prisma generate

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/package.json ./server/package.json
COPY --from=builder /app/server/prisma ./server/prisma
COPY --from=builder /app/server/generated ./server/generated
COPY --from=builder /app/client/dist ./client/dist

WORKDIR /app/server

RUN chown nodejs:nodejs .

USER nodejs

EXPOSE 80

CMD ["node", "dist/server.js"]
