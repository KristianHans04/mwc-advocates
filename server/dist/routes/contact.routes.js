"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const unifiedData_service_1 = __importDefault(require("../services/unifiedData.service"));
const emailService = process.env.NODE_ENV === 'development'
    ? require('../services/email.service.mailhog').default
    : require('../services/email.service.zoho').default;
const router = express_1.default.Router();
const dataService = unifiedData_service_1.default.getInstance();
router.post('/', [
    (0, express_validator_1.body)('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Please provide a valid email address'),
    (0, express_validator_1.body)('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
    (0, express_validator_1.body)('phone').optional().custom((value) => {
        if (!value)
            return true;
        const phoneRegex = /^[\+]?[\d\s\-\(\)\.]{7,20}$/;
        if (!phoneRegex.test(value)) {
            throw new Error('Please provide a valid phone number');
        }
        return true;
    }),
], async (req, res) => {
    console.log('========================================');
    console.log('📨 NEW CONTACT FORM SUBMISSION');
    console.log('========================================');
    console.log('⏰ Timestamp:', new Date().toISOString());
    console.log('📊 Environment:', process.env.NODE_ENV);
    try {
        console.log('\n[STEP 1] Validating form input...');
        const errors = (0, express_validator_1.validationResult)(req);
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
        console.log('\n[STEP 2] Sending email notifications...');
        let emailResult = {
            adminSent: false,
            clientSent: false,
            adminError: undefined,
            clientError: undefined
        };
        try {
            console.log('🔄 Initializing Zoho Mail service...');
            emailResult = await emailService.sendContactFormEmails({
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
            }
            else {
                console.log('❌ Admin email failed:', emailResult.adminError);
            }
            if (emailResult.clientSent) {
                console.log('✅ Client confirmation email sent successfully');
            }
            else {
                console.log('❌ Client email failed:', emailResult.clientError);
            }
            if (!emailResult.adminSent && !emailResult.clientSent) {
                console.warn('⚠️ WARNING: Both emails failed to send');
            }
        }
        catch (emailError) {
            console.error('❌ CRITICAL: Email service error:', {
                message: emailError instanceof Error ? emailError.message : 'Unknown error',
                stack: emailError instanceof Error ? emailError.stack : undefined
            });
        }
        console.log('\n[STEP 3] Saving to database...');
        let contactSubmission;
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
        }
        else {
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
    }
    catch (error) {
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
});
router.get('/submissions', async (req, res) => {
    try {
        console.warn('Contact submissions endpoint not fully implemented for unified service');
        res.json({
            success: true,
            data: [],
            message: 'This endpoint needs implementation for unified data service'
        });
    }
    catch (error) {
        console.error('Error fetching contact submissions:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch contact submissions',
        });
    }
});
exports.default = router;
//# sourceMappingURL=contact.routes.js.map