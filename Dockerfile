# Multi-stage Dockerfile for PERN stack deployment on Northflank
# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy server and client package files
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies for all workspaces
RUN npm install --legacy-peer-deps
RUN cd server && npm install --legacy-peer-deps
RUN cd client && npm install --legacy-peer-deps

# Copy source code
COPY . .

# Generate Prisma client
RUN cd server && npx prisma generate

# Build server (TypeScript compilation + copy data files)
RUN cd server && npm run build

# Build client (React production build)
RUN cd client && npm run build

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
COPY server/package*.json ./server/
RUN npm install --production --legacy-peer-deps
RUN cd server && npm install --production --legacy-peer-deps

# Copy Prisma schema and generate client
COPY server/prisma ./server/prisma
RUN cd server && npx prisma generate

# Copy built artifacts from builder stage
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/client/dist ./client/dist

# Copy necessary configuration files
COPY server/.env.example ./server/.env.example

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the server
CMD ["node", "server/dist/server.js"]
