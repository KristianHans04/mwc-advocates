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
        const isConnected = await db.isConnected();
        if (!isConnected) {
            console.warn('⚠️ Database not available, returning fallback services data');
            const fallbackServices = [
                {
                    id: 'fallback-1',
                    title: 'Corporate Law',
                    description: 'Comprehensive corporate legal services including business formation, governance, mergers and acquisitions, and compliance.',
                    icon: 'building',
                    features: [
                        'Company incorporation and registration',
                        'Corporate governance and compliance',
                        'Mergers and acquisitions',
                        'Commercial contracts and agreements',
                        'Securities law and regulations'
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 'fallback-2',
                    title: 'Real Estate Law',
                    description: 'Professional real estate legal services for property transactions, disputes, and development matters.',
                    icon: 'home',
                    features: [
                        'Property transactions and conveyancing',
                        'Lease agreements and landlord-tenant law',
                        'Land acquisition and development',
                        'Property disputes and litigation',
                        'Zoning and planning applications'
                    ],
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ];
            return res.json({
                success: true,
                data: fallbackServices,
            });
        }
        const services = await db.prisma.service.findMany({
            orderBy: { createdAt: 'asc' }
        });
        return res.json({
            success: true,
            data: services,
        });
    }
    catch (error) {
        console.error('Error fetching services:', error);
        return res.status(500).json({
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