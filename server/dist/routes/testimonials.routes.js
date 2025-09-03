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
        const testimonials = await db.prisma.$queryRaw `
      SELECT id, name, position, company, content, rating, initials, "isActive", "createdAt", "updatedAt"
      FROM testimonials 
      WHERE "isActive" = true
      ORDER BY "createdAt" DESC
    `;
        res.json({
            success: true,
            data: testimonials,
        });
    }
    catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch testimonials',
        });
    }
});
router.post('/', [
    (0, express_validator_1.body)('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    (0, express_validator_1.body)('position').notEmpty().withMessage('Position is required'),
    (0, express_validator_1.body)('content').isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
    (0, express_validator_1.body)('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    (0, express_validator_1.body)('initials').isLength({ min: 1, max: 3 }).withMessage('Initials must be 1-3 characters'),
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
    }
    catch (error) {
        console.error('Error creating testimonial:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create testimonial',
        });
    }
});
exports.default = router;
//# sourceMappingURL=testimonials.routes.js.map