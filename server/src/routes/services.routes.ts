/**
 * Services routes for MWC Advocates API
 * Uses JSON-based data management for reliability
 */

import express, { Request, Response } from 'express';
import dataService from '../services/dataService';

const router = express.Router();

// GET /api/services - Get all services
router.get('/', async (req: Request, res: Response) => {
  try {
    console.log('🔍 Fetching services from JSON...');
    const services = dataService.getServices();
    console.log(`✅ Found ${services.length} services`);
    
    return res.json({ 
      success: true, 
      data: services,
      source: 'json',
      count: services.length
    });
  } catch (error) {
    console.error('❌ Error fetching services:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error loading services',
      data: []
    });
  }
});

// GET /api/services/featured - Get featured services only
router.get('/featured', async (req: Request, res: Response) => {
  try {
    const services = dataService.getFeaturedServices();
    console.log(`✅ Found ${services.length} featured services`);
    
    return res.json({ 
      success: true, 
      data: services,
      source: 'json',
      count: services.length
    });
  } catch (error) {
    console.error('❌ Error fetching featured services:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error loading featured services',
      data: []
    });
  }
});

// GET /api/services/:id - Get service by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        message: 'Service ID is required' 
      });
    }
    
    const service = dataService.getServiceById(id);
    
    if (!service) {
      return res.status(404).json({ 
        success: false, 
        message: 'Service not found' 
      });
    }
    
    return res.json({ 
      success: true, 
      data: service,
      source: 'json'
    });
  } catch (error) {
    console.error('❌ Error fetching service:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

export default router;
