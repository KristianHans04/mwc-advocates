#!/bin/bash
# Build script for Render deployment

echo "Starting build process..."

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Build server
echo "Building server..."
cd server
npm install
npm run build
npx prisma generate

# Return to root and build client
echo "Building client..."
cd ../client
npm install
npm run build

echo "Build completed successfully!"
