/**
 * Health check routes for monitoring database status
 */

import express, { Request, Response } from 'express';
import UnifiedDataService from '../services/unifiedData.service';
import DatabaseService from '../services/database.service';

const router = express.Router();
const dataService = UnifiedDataService.getInstance();
const dbService = DatabaseService.getInstance();

/**
 * GET /api/health
 * Basic health check
 */
router.get('/', async (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'MWC Advocates API'
  });
});

/**
 * GET /api/health/databases
 * Check status of both databases
 */
router.get('/databases', async (_req: Request, res: Response) => {
  try {
    const status = await dataService.getDatabaseStatus();
    
    res.json({
      status: 'operational',
      databases: status,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: 'error',
      error: 'Failed to check database status',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/health/supabase
 * Check Supabase connection specifically
 */
router.get('/supabase', async (_req: Request, res: Response) => {
  try {
    const healthy = await dbService.healthCheck();
    
    res.json({
      status: healthy ? 'healthy' : 'unhealthy',
      database: 'supabase',
      connected: healthy,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Supabase health check error:', error);
    res.status(500).json({
      status: 'error',
      database: 'supabase',
      error: 'Failed to check Supabase connection',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/health/google-sheets
 * Check Google Sheets connection specifically
 */
router.get('/google-sheets', async (_req: Request, res: Response) => {
  try {
    const googleSheetsService = dbService.getGoogleSheetsService();
    const available = googleSheetsService.isAvailable();
    
    // Try to initialize if not already available
    if (!available) {
      await googleSheetsService.initialize();
    }
    
    const finalStatus = googleSheetsService.isAvailable();
    
    res.json({
      status: finalStatus ? 'available' : 'unavailable',
      database: 'google_sheets',
      connected: finalStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Google Sheets health check error:', error);
    res.status(500).json({
      status: 'error',
      database: 'google_sheets',
      error: 'Failed to check Google Sheets connection',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * POST /api/health/sync
 * Sync data from Google Sheets to Supabase
 */
router.post('/sync', async (_req: Request, res: Response) => {
  try {
    const result = await dataService.syncFromSheetsToSupabase();
    
    if (result.success) {
      res.json({
        status: 'success',
        message: result.message,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(400).json({
        status: 'failed',
        message: result.message,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({
      status: 'error',
      error: 'Failed to sync data',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * POST /api/health/force-google-sheets
 * Force the system to use Google Sheets (for testing)
 */
router.post('/force-google-sheets', async (_req: Request, res: Response) => {
  try {
    const success = await dataService.forceGoogleSheets();
    
    res.json({
      status: success ? 'switched' : 'failed',
      message: success ? 'Forced switch to Google Sheets' : 'Failed to switch to Google Sheets',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Force switch error:', error);
    res.status(500).json({
      status: 'error',
      error: 'Failed to force switch',
      timestamp: new Date().toISOString()
    });
  }
});

export default router;