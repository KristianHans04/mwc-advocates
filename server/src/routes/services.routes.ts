/**
 * Services routes for MWC Advocates API
 * Handles legal services CRUD operations
 */

import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import DatabaseService from '../services/database.service';

const router = express.Router();
const db = DatabaseService.getInstance();

/**
 * GET /api/services
 * Retrieve all legal services
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    // Check if database is connected first
    const isConnected = await db.isConnected();
    if (!isConnected) {
      console.warn('⚠️ Database not available, returning fallback services data');
      // Return fallback data when database is not available
      const fallbackServices = [
        {
          id: 'fallback-1',
          title: 'Corporate Law',
          description: 'Comprehensive corporate legal services including business formation, governance, mergers and acquisitions, and compliance.',
          icon: 'building',
          features: [
            'Company incorporation and registration',
            'Corporate governance and compliance',
            'Mergers and acquisitions',
            'Commercial contracts and agreements',
            'Securities law and regulations'
          ],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'fallback-2',
          title: 'Real Estate Law',
          description: 'Professional real estate legal services for property transactions, disputes, and development matters.',
          icon: 'home',
          features: [
            'Property transactions and conveyancing',
            'Lease agreements and landlord-tenant law',
            'Land acquisition and development',
            'Property disputes and litigation',
            'Zoning and planning applications'
          ],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      return res.json({
        success: true,
        data: fallbackServices,
      });
    }

    // Use Prisma client - data is now clean
    const services = await db.prisma.service.findMany({
      orderBy: { createdAt: 'asc' }
    });

    return res.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch services',
    });
  }
});

/**
 * GET /api/services/:id
 * Retrieve a specific service by ID
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const service = await db.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      res.status(404).json({
        success: false,
        error: 'Service not found',
      });
      return;
    }

    res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch service',
    });
  }
});

/**
 * POST /api/services
 * Create a new service (admin only)
 */
router.post('/',
  [
    body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
    body('description').isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
    body('icon').notEmpty().withMessage('Icon is required'),
    body('features').isArray().withMessage('Features must be an array'),
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          errors: errors.array(),
        });
        return;
      }

      const { title, description, icon, features } = req.body;

      const service = await db.prisma.service.create({
        data: {
          title,
          description,
          icon,
          features,
        },
      });

      res.status(201).json({
        success: true,
        data: service,
      });
    } catch (error) {
      console.error('Error creating service:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create service',
      });
    }
  }
);

export default router;
