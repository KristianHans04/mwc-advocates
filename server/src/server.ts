/**
 * MWC Advocates - Server Entry Point
 * Starts the Express server with database connection
 */

import app from './app';
import { PrismaClient } from '@prisma/client';

const PORT = parseInt(process.env.PORT || '5000', 10);
const prisma = new PrismaClient();

/**
 * Start the server and connect to database
 */
async function startServer() {
  try {
    // Start server first - don't block on database connection
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🏥 Health check: http://0.0.0.0:${PORT}/health`);
      console.log(`📚 API base URL: http://0.0.0.0:${PORT}/api`);
      
      // For Render deployment, ensure the port is properly exposed
      if (process.env.NODE_ENV === 'production') {
        console.log('🌐 Production server ready for connections');
      }
    });

    // Handle server startup errors
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use`);
      } else {
        console.error('❌ Server error:', error);
      }
      process.exit(1);
    });

    // Try database connection with retries - but don't let it crash the server
    console.log('🔌 Attempting database connection...');
    connectToDatabase().catch(error => {
      console.log('🔄 Server running without database connection - API will use fallback data');
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

/**
 * Connect to database with retry logic
 */
async function connectToDatabase(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await Promise.race([
        prisma.$connect(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database connection timeout')), 15000)
        )
      ]);
      console.log('✅ Database connected successfully');
      return;
    } catch (error) {
      console.warn(`⚠️ Database connection attempt ${i + 1}/${retries} failed:`, error instanceof Error ? error.message : error);
      
      if (i === retries - 1) {
        console.error('❌ All database connection attempts failed');
        console.log('🔄 Server will continue running without database - some features may be limited');
        return; // Don't exit - continue without database
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
    }
  }
}

/**
 * Graceful shutdown
 */
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start the server
startServer();
