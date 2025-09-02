/**
 * Manual schema creation for Supabase using raw SQL
 * This bypasses Prisma's migration system which has issues with PgBouncer
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createSchema() {
  try {
    console.log('🚀 Creating database schema manually...');

    // Create Services table
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "services" (
        "id" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "icon" TEXT NOT NULL,
        "features" TEXT[],
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "services_pkey" PRIMARY KEY ("id")
      );
    `;

    await prisma.$executeRaw`
      CREATE UNIQUE INDEX IF NOT EXISTS "services_title_key" ON "services"("title");
    `;

    // Create Testimonials table
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "testimonials" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "position" TEXT,
        "company" TEXT,
        "content" TEXT NOT NULL,
        "rating" INTEGER NOT NULL DEFAULT 5,
        "initials" TEXT NOT NULL,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
      );
    `;

    // Create Contact Submissions table
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "contact_submissions" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "phone" TEXT,
        "subject" TEXT,
        "message" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'new',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id")
      );
    `;

    // Create Newsletter Subscriptions table
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "newsletter_subscriptions" (
        "id" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "name" TEXT,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "newsletter_subscriptions_pkey" PRIMARY KEY ("id")
      );
    `;

    await prisma.$executeRaw`
      CREATE UNIQUE INDEX IF NOT EXISTS "newsletter_subscriptions_email_key" ON "newsletter_subscriptions"("email");
    `;

    // Create Blog Posts table
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "blog_posts" (
        "id" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "excerpt" TEXT,
        "content" TEXT NOT NULL,
        "author" TEXT NOT NULL,
        "tags" TEXT[],
        "isPublished" BOOLEAN NOT NULL DEFAULT false,
        "publishedAt" TIMESTAMP(3),
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
      );
    `;

    await prisma.$executeRaw`
      CREATE UNIQUE INDEX IF NOT EXISTS "blog_posts_slug_key" ON "blog_posts"("slug");
    `;

    // Create FAQs table
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "faqs" (
        "id" TEXT NOT NULL,
        "question" TEXT NOT NULL,
        "answer" TEXT NOT NULL,
        "category" TEXT,
        "order" INTEGER NOT NULL DEFAULT 0,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
      );
    `;

    console.log('✅ Database schema created successfully!');
    
    // Test the tables
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      AND table_name IN ('services', 'testimonials', 'contact_submissions', 'newsletter_subscriptions', 'blog_posts', 'faqs')
    `;
    
    console.log('📋 Created tables:', tables);

  } catch (error) {
    console.error('❌ Error creating schema:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createSchema();
