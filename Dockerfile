FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat

# Copy root package.json (workspace root)
COPY package.json ./

# Install dependencies
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

ENV NODE_ENV=production
EXPOSE 80

WORKDIR /app/server
CMD ["node", "dist/server.js"]
