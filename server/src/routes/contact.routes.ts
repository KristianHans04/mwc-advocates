/**
 * Contact routes for MWC Advocates API
 * Handles contact form submissions and email notifications
 */

import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import DatabaseService from '../services/database.service';
import zohoEmailService from '../services/email.service.zoho';

const router = express.Router();
const db = DatabaseService.getInstance();

/**
 * POST /api/contact
 * Submit contact form
 */
router.post('/',
  [
    body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
    body('phone').optional().custom((value) => {
      if (!value) return true; // Optional field
      // Allow various phone formats: digits, spaces, dashes, parentheses, plus signs
      const phoneRegex = /^[\+]?[\d\s\-\(\)\.]{7,20}$/;
      if (!phoneRegex.test(value)) {
        throw new Error('Please provide a valid phone number');
      }
      return true;
    }),
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

      const { name, email, phone, subject, message } = req.body;

      // Save to database using Prisma client
      const contactSubmission = await db.prisma.contactSubmission.create({
        data: {
          name,
          email,
          phone,
          subject,
          message
        }
      });

      // Send email notifications via Zoho Mail
      try {
        console.log('Using Zoho Mail SMTP service');
        
        const emailResult = await zohoEmailService.sendContactFormEmails({
          name,
          email,
          phone,
          subject,
          message
        });

        console.log('Email sending results:', emailResult);
        
        if (!emailResult.adminSent && !emailResult.clientSent) {
          console.warn('Both emails failed to send, but form submission was saved');
        }
      } catch (emailError) {
        console.error('Failed to send email notifications:', emailError);
        // Don't fail the request if email fails
      }

      res.status(201).json({
        success: true,
        message: 'Thank you for your message. We will get back to you soon.',
        data: { id: contactSubmission.id },
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to submit contact form',
      });
    }
  }
);

/**
 * GET /api/contact/submissions
 * Get all contact submissions (admin only)
 */
router.get('/submissions', async (req: Request, res: Response) => {
  try {
    const submissions = await db.prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact submissions',
    });
  }
});

export default router;
