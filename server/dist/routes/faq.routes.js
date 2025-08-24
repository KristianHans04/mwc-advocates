"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const database_service_1 = __importDefault(require("../services/database.service"));
const router = express_1.default.Router();
const db = database_service_1.default.getInstance();
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const whereClause = { isActive: true };
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
    }
    catch (error) {
        console.error('Error fetching FAQs:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch FAQs',
        });
    }
});
router.post('/', [
    (0, express_validator_1.body)('question').isLength({ min: 5 }).withMessage('Question must be at least 5 characters'),
    (0, express_validator_1.body)('answer').isLength({ min: 10 }).withMessage('Answer must be at least 10 characters'),
    (0, express_validator_1.body)('category').notEmpty().withMessage('Category is required'),
    (0, express_validator_1.body)('order').optional().isInt().withMessage('Order must be a number'),
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
    }
    catch (error) {
        console.error('Error creating FAQ:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create FAQ',
        });
    }
});
exports.default = router;
//# sourceMappingURL=faq.routes.js.map