/**
 * Testimonials routes for MWC Advocates API
 * Uses JSON-based data management for reliability
 */

import express, { Request, Response } from 'express';
import dataService from '../services/dataService';

const router = express.Router();

// GET /api/testimonials - Get all testimonials
router.get('/', async (req: Request, res: Response) => {
  try {
    console.log('🔍 Fetching testimonials from JSON...');
    const testimonials = dataService.getTestimonials();
    console.log(`✅ Found ${testimonials.length} testimonials`);
    
    return res.json({ 
      success: true, 
      data: testimonials,
      source: 'json',
      count: testimonials.length
    });
  } catch (error) {
    console.error('❌ Error fetching testimonials:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error loading testimonials',
      data: []
    });
  }
});

// GET /api/testimonials/recent - Get recent testimonials
router.get('/recent', async (req: Request, res: Response) => {
  try {
    const testimonials = dataService.getRecentTestimonials();
    console.log(`✅ Found ${testimonials.length} recent testimonials`);
    
    return res.json({ 
      success: true, 
      data: testimonials,
      source: 'json',
      count: testimonials.length
    });
  } catch (error) {
    console.error('❌ Error fetching recent testimonials:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error loading recent testimonials',
      data: []
    });
  }
});

// GET /api/testimonials/service/:service - Get testimonials by service
router.get('/service/:service', async (req: Request, res: Response) => {
  try {
    const { service } = req.params;
    
    if (!service) {
      return res.status(400).json({ 
        success: false, 
        message: 'Service parameter is required' 
      });
    }
    
    const testimonials = dataService.getTestimonialsByService(service);
    
    return res.json({ 
      success: true, 
      data: testimonials,
      source: 'json',
      count: testimonials.length
    });
  } catch (error) {
    console.error('❌ Error fetching testimonials by service:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error loading testimonials by service',
      data: []
    });
  }
});

export default router;
