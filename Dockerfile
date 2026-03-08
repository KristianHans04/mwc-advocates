FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY server/package.json server/package-lock.json* ./server/
COPY client/package.json client/package-lock.json* ./client/

WORKDIR /app/server
RUN npm ci --legacy-peer-deps

WORKDIR /app/client
RUN npm ci --legacy-peer-deps

WORKDIR /app
COPY server ./server
COPY client ./client

WORKDIR /app/server
RUN npm run build

WORKDIR /app/client
RUN npm run build

WORKDIR /app/server
RUN npx prisma generate

ENV NODE_ENV=production
EXPOSE 80

CMD ["node", "dist/server.js"]
