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
    // Use raw SQL to bypass Prisma's prepared statement issues with PgBouncer
    const services = await db.prisma.$queryRaw`
      SELECT id, title, description, icon, features, "createdAt", "updatedAt"
      FROM services 
      ORDER BY "createdAt" ASC
    `;

    res.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
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
