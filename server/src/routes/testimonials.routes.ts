/**
 * Testimonials routes for MWC Advocates API
 * Handles client testimonials CRUD operations
 */

import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import DatabaseService from '../services/database.service';

const router = express.Router();
const db = DatabaseService.getInstance();

/**
 * GET /api/testimonials
 * Retrieve all active testimonials
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const testimonials = await db.prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch testimonials',
    });
  }
});

/**
 * POST /api/testimonials
 * Create a new testimonial (admin only)
 */
router.post('/',
  [
    body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('position').notEmpty().withMessage('Position is required'),
    body('content').isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('initials').isLength({ min: 1, max: 3 }).withMessage('Initials must be 1-3 characters'),
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

      const { name, position, company, content, rating, initials } = req.body;

      const testimonial = await db.prisma.testimonial.create({
        data: {
          name,
          position,
          company,
          content,
          rating,
          initials,
        },
      });

      res.status(201).json({
        success: true,
        data: testimonial,
      });
    } catch (error) {
      console.error('Error creating testimonial:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create testimonial',
      });
    }
  }
);

export default router;
