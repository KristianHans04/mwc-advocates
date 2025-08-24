/**
 * Contact routes for MWC Advocates API
 * Handles contact form submissions and email notifications
 */

import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import DatabaseService from '../services/database.service';

const router = express.Router();
const db = DatabaseService.getInstance();

/**
 * POST /api/contact
 * Submit contact form
 */
router.post('/',
  [
    body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
    body('phone').optional().isMobilePhone('any').withMessage('Please provide a valid phone number'),
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

      // Save to database
      const contactSubmission = await db.prisma.contactSubmission.create({
        data: {
          name,
          email,
          phone,
          subject,
          message,
        },
      });

      // Send email notification (if configured)
      if (process.env.SMTP_HOST && process.env.CONTACT_EMAIL) {
        try {
          await sendContactNotification({ name, email, phone, subject, message });
        } catch (emailError) {
          console.error('Failed to send email notification:', emailError);
          // Don't fail the request if email fails
        }
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

/**
 * Send email notification for contact form submission
 */
async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL,
    subject: `New Contact Form Submission - ${data.subject || 'General Inquiry'}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export default router;
