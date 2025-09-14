/**
 * Contact routes for MWC Advocates API
 * Handles contact form submissions and email notifications
 */

import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import UnifiedDataService from '../services/unifiedData.service';
import zohoEmailService from '../services/email.service.zoho';

const router = express.Router();
const dataService = UnifiedDataService.getInstance();

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
    console.log('========================================');
    console.log('📨 NEW CONTACT FORM SUBMISSION');
    console.log('========================================');
    console.log('⏰ Timestamp:', new Date().toISOString());
    console.log('📊 Environment:', process.env.NODE_ENV);
    
    try {
      // Step 1: Validate input
      console.log('\n[STEP 1] Validating form input...');
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('❌ Validation failed:', errors.array());
        res.status(400).json({
          success: false,
          errors: errors.array(),
        });
        return;
      }
      console.log('✅ Form validation passed');

      const { name, email, phone, subject, message } = req.body;
      console.log('📝 Form data:', { name, email, phone: phone || 'Not provided', subject: subject || 'General Inquiry' });

      // Step 2: Send email notifications FIRST (before database)
      console.log('\n[STEP 2] Sending email notifications...');
      let emailResult: any = {
        adminSent: false,
        clientSent: false,
        adminError: undefined,
        clientError: undefined
      };
      
      try {
        console.log('🔄 Initializing Zoho Mail service...');
        
        emailResult = await zohoEmailService.sendContactFormEmails({
          name,
          email,
          phone,
          subject,
          message
        });

        console.log('📧 Email Results:', {
          adminSent: emailResult.adminSent,
          clientSent: emailResult.clientSent,
          adminError: emailResult.adminError,
          clientError: emailResult.clientError
        });
        
        if (emailResult.adminSent) {
          console.log('✅ Admin notification email sent successfully');
        } else {
          console.log('❌ Admin email failed:', emailResult.adminError);
        }
        
        if (emailResult.clientSent) {
          console.log('✅ Client confirmation email sent successfully');
        } else {
          console.log('❌ Client email failed:', emailResult.clientError);
        }
        
        if (!emailResult.adminSent && !emailResult.clientSent) {
          console.warn('⚠️ WARNING: Both emails failed to send');
        }
      } catch (emailError) {
        console.error('❌ CRITICAL: Email service error:', {
          message: emailError instanceof Error ? emailError.message : 'Unknown error',
          stack: emailError instanceof Error ? emailError.stack : undefined
        });
      }

      // Step 3: Save to database (after email)
      console.log('\n[STEP 3] Saving to database...');
      let contactSubmission: any;
      
      // Use unified service with automatic fallback
      const saved = await dataService.saveContactSubmission({
        name,
        email,
        phone,
        subject,
        message
      });
      
      const status = await dataService.getDatabaseStatus();
      
      if (saved) {
        contactSubmission = {
          id: Date.now().toString(),
          name,
          email,
          subject,
          message
        };
        console.log(`✅ Contact submission saved to ${status.currentlyUsing}`);
      } else {
        console.warn('⚠️ Failed to save to any database');
        contactSubmission = {
          id: `temp_${Date.now()}`,
          name,
          email,
          subject,
          message
        };
        console.log('📝 Created temporary submission ID:', contactSubmission.id);
      }

      // Step 4: Send response
      console.log('\n[STEP 4] Sending response to client...');
      const responseData = {
        success: true,
        message: 'Thank you for your message. We will get back to you soon.',
        data: { 
          id: contactSubmission.id,
          emailsSent: {
            admin: emailResult.adminSent,
            client: emailResult.clientSent
          }
        },
      };
      
      console.log('✅ SUCCESS: Contact form processed');
      console.log('📊 Summary:', {
        submissionId: contactSubmission.id,
        emailsSent: `Admin: ${emailResult.adminSent}, Client: ${emailResult.clientSent}`,
        databaseSaved: !contactSubmission.id.startsWith('temp_')
      });
      console.log('========================================\n');
      
      res.status(201).json(responseData);
    } catch (error) {
      console.error('❌ CRITICAL ERROR in contact form submission:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      console.log('========================================\n');
      
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
    // This endpoint might need to be implemented in UnifiedDataService
    // For now, returning empty array as Google Sheets doesn't have a method for this yet
    console.warn('Contact submissions endpoint not fully implemented for unified service');
    
    res.json({
      success: true,
      data: [],
      message: 'This endpoint needs implementation for unified data service'
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
