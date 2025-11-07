"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataService_1 = __importDefault(require("../services/dataService"));
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    try {
        console.log('🔍 Fetching services from JSON...');
        const services = dataService_1.default.getServices();
        console.log(`✅ Found ${services.length} services`);
        return res.json({
            success: true,
            data: services,
            source: 'json',
            count: services.length
        });
    }
    catch (error) {
        console.error('❌ Error fetching services:', error);
        return res.status(500).json({
            success: false,
            message: 'Error loading services',
            data: []
        });
    }
});
router.get('/featured', async (req, res) => {
    try {
        const services = dataService_1.default.getFeaturedServices();
        console.log(`✅ Found ${services.length} featured services`);
        return res.json({
            success: true,
            data: services,
            source: 'json',
            count: services.length
        });
    }
    catch (error) {
        console.error('❌ Error fetching featured services:', error);
        return res.status(500).json({
            success: false,
            message: 'Error loading featured services',
            data: []
        });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Service ID is required'
            });
        }
        const service = dataService_1.default.getServiceById(id);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        return res.json({
            success: true,
            data: service,
            source: 'json'
        });
    }
    catch (error) {
        console.error('❌ Error fetching service:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=services.routes.js.map