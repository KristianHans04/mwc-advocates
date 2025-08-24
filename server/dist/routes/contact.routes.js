"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const nodemailer_1 = __importDefault(require("nodemailer"));
const database_service_1 = __importDefault(require("../services/database.service"));
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
        if (process.env.SMTP_HOST && process.env.CONTACT_EMAIL) {
            try {
                await sendContactNotification({ name, email, phone, subject, message });
            }
            catch (emailError) {
                console.error('Failed to send email notification:', emailError);
            }
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
async function sendContactNotification(data) {
    const transporter = nodemailer_1.default.createTransport({
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
exports.default = router;
//# sourceMappingURL=contact.routes.js.map