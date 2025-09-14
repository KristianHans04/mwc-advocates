/**
 * Testimonials routes for MWC Advocates API
 * Handles client testimonials data management
 * Supports Google Sheets, Prisma, and JSON fallback
 */

import express, { Request, Response } from 'express';
import UnifiedDataService from '../services/unifiedData.service';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const dataService = UnifiedDataService.getInstance();

/**
 * GET /api/testimonials
 * Get all active testimonials
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    // Get testimonials with automatic fallback
    const testimonials = await dataService.getTestimonials();
    const status = await dataService.getDatabaseStatus();
    
    if (testimonials.length > 0) {
      console.log(`✅ Loaded ${testimonials.length} testimonials from ${status.currentlyUsing}`);
      return res.json({
        success: true,
        data: testimonials,
        source: status.currentlyUsing,
        count: testimonials.length
      });
    }

    // If unified service returns empty, try JSON fallback
    const dataPath = path.join(__dirname, '../../src/data/testimonials.json');
    console.log('🔍 Falling back to testimonials JSON at:', dataPath);
    
    if (!fs.existsSync(dataPath)) {
      console.error('❌ Testimonials file not found at:', dataPath);
      return res.json({ success: true, data: [], source: 'none-available' });
    }
    
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(fileContent);
    const jsonTestimonials = data.testimonials || [];
    
    console.log(`✅ Loaded ${jsonTestimonials.length} testimonials from JSON fallback`);
    return res.json({ 
      success: true, 
      data: jsonTestimonials, 
      source: 'json',
      count: jsonTestimonials.length
    });
  } catch (error: any) {
    console.error('❌ Error loading testimonials:', error.message);
    return res.json({ 
      success: true, 
      data: [], 
      source: 'error',
      error: error.message 
    });
  }
});

/**
 * GET /api/testimonials/:id
 * Get single testimonial by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Get all testimonials and find the one with matching ID
    const testimonials = await dataService.getTestimonials();
    const testimonial = testimonials.find(t => t.id === id);
    const status = await dataService.getDatabaseStatus();
    
    if (testimonial) {
      return res.json({
        success: true,
        data: testimonial,
        source: status.currentlyUsing
      });
    }

    // Fallback to JSON
    const dataPath = path.join(__dirname, '../../src/data/testimonials.json');
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, 'utf-8');
      const data = JSON.parse(fileContent);
      const jsonTestimonial = data.testimonials?.find((t: any) => t.id === id);
      
      if (jsonTestimonial) {
        return res.json({
          success: true,
          data: jsonTestimonial,
          source: 'json'
        });
      }
    }

    res.status(404).json({
      success: false,
      error: 'Testimonial not found',
    });
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch testimonial',
    });
  }
});

export default router;