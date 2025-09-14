/**
 * Services routes for MWC Advocates API
 * Handles legal services data management
 * Supports Google Sheets, Prisma, and JSON fallback
 */

import express, { Request, Response } from 'express';
import UnifiedDataService from '../services/unifiedData.service';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const dataService = UnifiedDataService.getInstance();

/**
 * GET /api/services
 * Get all active services
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    // Get services with automatic fallback
    const services = await dataService.getServices();
    const status = await dataService.getDatabaseStatus();
    
    if (services.length > 0) {
      console.log(`✅ Loaded ${services.length} services from ${status.currentlyUsing}`);
      return res.json({
        success: true,
        data: services,
        source: status.currentlyUsing,
        count: services.length
      });
    }

    // If unified service returns empty, try JSON fallback
    const dataPath = path.join(__dirname, '../../src/data/services.json');
    console.log('🔍 Falling back to services JSON at:', dataPath);
    
    if (!fs.existsSync(dataPath)) {
      console.error('❌ Services file not found at:', dataPath);
      return res.json({ success: true, data: [], source: 'none-available' });
    }
    
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(fileContent);
    const jsonServices = data.services || [];
    
    console.log(`✅ Loaded ${jsonServices.length} services from JSON fallback`);
    return res.json({ 
      success: true, 
      data: jsonServices, 
      source: 'json',
      count: jsonServices.length
    });
  } catch (error: any) {
    console.error('❌ Error loading services:', error.message);
    return res.json({ 
      success: true, 
      data: [], 
      source: 'error',
      error: error.message 
    });
  }
});

/**
 * GET /api/services/:id
 * Get single service by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Get all services and find the one with matching ID
    const services = await dataService.getServices();
    const service = services.find(s => s.id === id);
    const status = await dataService.getDatabaseStatus();
    
    if (service) {
      return res.json({
        success: true,
        data: service,
        source: status.currentlyUsing
      });
    }

    // Fallback to JSON
    const dataPath = path.join(__dirname, '../../src/data/services.json');
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, 'utf-8');
      const data = JSON.parse(fileContent);
      const jsonService = data.services?.find((s: any) => s.id === id);
      
      if (jsonService) {
        return res.json({
          success: true,
          data: jsonService,
          source: 'json'
        });
      }
    }

    return res.status(404).json({
      success: false,
      error: 'Service not found',
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch service',
    });
  }
});

export default router;