/**
 * Firm routes for MWC Advocates API
 * Handles firm information and search functionality
 */

import express, { Request, Response } from 'express';
import dataService from '../services/dataService';

const router = express.Router();

// GET /api/firm - Get firm information
router.get('/', async (req: Request, res: Response) => {
  try {
    const firmInfo = dataService.getFirmInfo();
    return res.json({ 
      success: true, 
      data: firmInfo,
      source: 'json'
    });
  } catch (error) {
    console.error('Error fetching firm info:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error loading firm information',
      data: null
    });
  }
});

// GET /api/firm/search - Search across all content
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Search query parameter "q" is required'
      });
    }

    const results = dataService.searchContent(q);
    const totalResults = results.services.length + results.testimonials.length + results.team.length;
    
    return res.json({ 
      success: true, 
      data: results,
      source: 'json',
      query: q,
      totalResults
    });
  } catch (error) {
    console.error('Error performing search:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error performing search',
      data: { services: [], testimonials: [], team: [] }
    });
  }
});

export default router;
