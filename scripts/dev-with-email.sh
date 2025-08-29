#!/bin/bash

# Start MailHog if not already running
if ! sudo docker ps | grep -q mwc-mailhog; then
    echo "🚀 Starting MailHog for email testing..."
    sudo docker run -d --name mwc-mailhog -p 1025:1025 -p 8025:8025 mailhog/mailhog:latest > /dev/null 2>&1
    echo "📧 MailHog started! Access at: http://localhost:8025"
else
    echo "📧 MailHog already running at: http://localhost:8025"
fi

# Start the development servers
echo "🚀 Starting PERN development environment..."
concurrently "npm run server:dev" "npm run client:dev"
