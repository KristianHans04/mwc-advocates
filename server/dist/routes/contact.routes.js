"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const database_service_1 = __importDefault(require("../services/database.service"));
const email_service_1 = __importDefault(require("../services/email.service"));
const email_dev_service_1 = __importDefault(require("../services/email.dev.service"));
const router = express_1.default.Router();
const db = database_service_1.default.getInstance();
router.post('/', [
    (0, express_validator_1.body)('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Please provide a valid email'),
    (0, express_validator_1.body)('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
    (0, express_validator_1.body)('phone').optional().isMobilePhone('any').withMessage('Please provide a valid phone number'),
], async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                errors: errors.array(),
            });
            return;
        }
        const { name, email, phone, subject, message } = req.body;
        const contactSubmission = await db.prisma.contactSubmission.create({
            data: {
                name,
                email,
                phone,
                subject,
                message,
            },
        });
        try {
            const isProduction = process.env.NODE_ENV === 'production';
            const currentEmailService = isProduction ? email_service_1.default : email_dev_service_1.default;
            console.log(`📧 Using ${isProduction ? 'SparkPost (production)' : 'MailHog (development)'} email service`);
            const emailResult = await currentEmailService.sendContactFormEmails({
                name,
                email,
                phone,
                subject,
                message
            });
            console.log('📧 Email sending results:', emailResult);
            if (!emailResult.adminSent && !emailResult.clientSent) {
                console.warn('⚠️ Both emails failed to send, but form submission was saved');
            }
        }
        catch (emailError) {
            console.error('❌ Failed to send email notifications:', emailError);
        }
        res.status(201).json({
            success: true,
            message: 'Thank you for your message. We will get back to you soon.',
            data: { id: contactSubmission.id },
        });
    }
    catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to submit contact form',
        });
    }
});
router.get('/submissions', async (req, res) => {
    try {
        const submissions = await db.prisma.contactSubmission.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json({
            success: true,
            data: submissions,
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