#!/bin/bash

# Setup Local PostgreSQL Database for Development
echo "🔧 Setting up local PostgreSQL database for MWC Advocates development..."

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install it first:"
    echo "   Ubuntu/Debian: sudo apt install postgresql postgresql-contrib"
    echo "   Mac: brew install postgresql"
    exit 1
fi

# Database configuration
DB_NAME="mwc_advocates_dev"
DB_USER="postgres"
DB_PASSWORD="postgres"

echo "📦 Creating database: $DB_NAME"

# Create database if it doesn't exist
sudo -u postgres psql <<EOF
-- Create database if not exists
SELECT 'CREATE DATABASE $DB_NAME'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME')\\gexec

-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
EOF

echo "✅ Database created/verified: $DB_NAME"

# Run Prisma migrations
echo "🔄 Running Prisma migrations..."
cd ..
npx prisma migrate dev --name init

echo "🌱 Seeding database with sample data..."
npx prisma db seed

echo "✅ Local database setup complete!"
echo ""
echo "📋 Connection details:"
echo "   Database: $DB_NAME"
echo "   User: $DB_USER"
echo "   Password: $DB_PASSWORD"
echo "   Connection URL: postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME?schema=public"
echo ""
echo "💡 To connect to the database:"
echo "   psql -U $DB_USER -d $DB_NAME"