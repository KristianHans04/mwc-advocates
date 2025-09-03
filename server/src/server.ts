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
    // Test database connection with timeout
    console.log('🔌 Connecting to database...');
    await Promise.race([
      prisma.$connect(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timeout')), 10000)
      )
    ]);
    console.log('✅ Database connected successfully');

    // Start server - bind to 0.0.0.0 for Render deployment
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

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
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
