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
        const services = await db.prisma.$queryRaw `
      SELECT id, title, description, icon, features, "createdAt", "updatedAt"
      FROM services 
      ORDER BY "createdAt" ASC
    `;
        res.json({
            success: true,
            data: services,
        });
    }
    catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch services',
        });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const service = await db.prisma.service.findUnique({
            where: { id },
        });
        if (!service) {
            res.status(404).json({
                success: false,
                error: 'Service not found',
            });
            return;
        }
        res.json({
            success: true,
            data: service,
        });
    }
    catch (error) {
        console.error('Error fetching service:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch service',
        });
    }
});
router.post('/', [
    (0, express_validator_1.body)('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
    (0, express_validator_1.body)('description').isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
    (0, express_validator_1.body)('icon').notEmpty().withMessage('Icon is required'),
    (0, express_validator_1.body)('features').isArray().withMessage('Features must be an array'),
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
        const { title, description, icon, features } = req.body;
        const service = await db.prisma.service.create({
            data: {
                title,
                description,
                icon,
                features,
            },
        });
        res.status(201).json({
            success: true,
            data: service,
        });
    }
    catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create service',
        });
    }
});
exports.default = router;
//# sourceMappingURL=services.routes.js.map