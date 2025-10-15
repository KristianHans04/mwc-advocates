/**
 * Database service for MWC Advocates
 * Centralizes Prisma client configuration and connection
 * Falls back to Google Sheets if Prisma connection fails
 */

import { PrismaClient } from '@prisma/client';
import googleSheetsService from './googleSheets.service';

class DatabaseService {
  private static instance: DatabaseService;
  public prisma: PrismaClient;
  private useGoogleSheets: boolean = false;

  private constructor() {
    console.log('🔧 Initializing DatabaseService...');
    console.log('📊 Environment:', process.env.NODE_ENV);
    console.log('🔗 DATABASE_URL exists:', !!process.env.DATABASE_URL);
    
    if (process.env.DATABASE_URL) {
      const dbUrl = process.env.DATABASE_URL;
      console.log('🔗 Database URL pattern:', dbUrl.substring(0, 20) + '...');
      
      // Check if it's a Supabase URL
      if (dbUrl.includes('supabase')) {
        console.log('📦 Detected Supabase database');
      }
    }

    this.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error', 'warn', 'info'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    });
    
    // Handle connection gracefully
    this.prisma.$connect()
      .then(() => {
        console.log('✅ Prisma connected successfully to database');
      })
      .catch(async (error: any) => {
        console.error('❌ Prisma connection failed with error:', {
          message: error.message,
          code: error.code,
          meta: error.meta
        });
        console.log('🔄 Attempting to use Google Sheets as fallback...');
        
        // Try Google Sheets as fallback
        const sheetsInitialized = await googleSheetsService.initialize();
        if (sheetsInitialized) {
          this.useGoogleSheets = true;
          console.log('✅ Using Google Sheets as database');
        } else {
          console.log('⚠️ Both database connections failed - using local data only');
        }
      });
  }

  /**
   * Get singleton instance of DatabaseService
   */
  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  /**
   * Connect to database
   */
  public async connect(): Promise<void> {
    try {
      await this.prisma.$connect();
      console.log('📦 Database connected successfully');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  /**
   * Disconnect from database
   */
  public async disconnect(): Promise<void> {
    try {
      await this.prisma.$disconnect();
      console.log('📦 Database disconnected');
    } catch (error) {
      console.error('❌ Database disconnection failed:', error);
      throw error;
    }
  }

  /**
   * Health check for database
   */
  public async healthCheck(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('❌ Database health check failed:', error);
      return false;
    }
  }

  /**
   * Check if database is connected
   */
  public async isConnected(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      // Check if Google Sheets is available as fallback
      if (googleSheetsService.isAvailable()) {
        this.useGoogleSheets = true;
        return true;
      }
      return false;
    }
  }

  /**
   * Check if using Google Sheets
   */
  public isUsingGoogleSheets(): boolean {
    return this.useGoogleSheets;
  }

  /**
   * Get Google Sheets service
   */
  public getGoogleSheetsService(): typeof googleSheetsService {
    return googleSheetsService;
  }
}

export default DatabaseService;
