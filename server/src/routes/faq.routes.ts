/**
 * FAQ routes for MWC Advocates API
 * Handles frequently asked questions
 */

import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import DatabaseService from '../services/database.service';

const router = express.Router();
const db = DatabaseService.getInstance();

/**
 * GET /api/faq
 * Retrieve all active FAQs
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    
    const whereClause: any = { isActive: true };
    if (category) {
      whereClause.category = category;
    }

    const faqs = await db.prisma.fAQ.findMany({
      where: whereClause,
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });

    res.json({
      success: true,
      data: faqs,
    });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch FAQs',
    });
  }
});

/**
 * POST /api/faq
 * Create a new FAQ (admin only)
 */
router.post('/',
  [
    body('question').isLength({ min: 5 }).withMessage('Question must be at least 5 characters'),
    body('answer').isLength({ min: 10 }).withMessage('Answer must be at least 10 characters'),
    body('category').notEmpty().withMessage('Category is required'),
    body('order').optional().isInt().withMessage('Order must be a number'),
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

      const { question, answer, category, order = 0 } = req.body;

      const faq = await db.prisma.fAQ.create({
        data: {
          question,
          answer,
          category,
          order,
        },
      });

      res.status(201).json({
        success: true,
        data: faq,
      });
    } catch (error) {
      console.error('Error creating FAQ:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create FAQ',
      });
    }
  }
);

export default router;
