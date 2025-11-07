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
        console.log('🔍 Fetching testimonials from JSON...');
        const testimonials = dataService_1.default.getTestimonials();
        console.log(`✅ Found ${testimonials.length} testimonials`);
        return res.json({
            success: true,
            data: testimonials,
            source: 'json',
            count: testimonials.length
        });
    }
    catch (error) {
        console.error('❌ Error fetching testimonials:', error);
        return res.status(500).json({
            success: false,
            message: 'Error loading testimonials',
            data: []
        });
    }
});
router.get('/recent', async (req, res) => {
    try {
        const testimonials = dataService_1.default.getRecentTestimonials();
        console.log(`✅ Found ${testimonials.length} recent testimonials`);
        return res.json({
            success: true,
            data: testimonials,
            source: 'json',
            count: testimonials.length
        });
    }
    catch (error) {
        console.error('❌ Error fetching recent testimonials:', error);
        return res.status(500).json({
            success: false,
            message: 'Error loading recent testimonials',
            data: []
        });
    }
});
router.get('/service/:service', async (req, res) => {
    try {
        const { service } = req.params;
        if (!service) {
            return res.status(400).json({
                success: false,
                message: 'Service parameter is required'
            });
        }
        const testimonials = dataService_1.default.getTestimonialsByService(service);
        return res.json({
            success: true,
            data: testimonials,
            source: 'json',
            count: testimonials.length
        });
    }
    catch (error) {
        console.error('❌ Error fetching testimonials by service:', error);
        return res.status(500).json({
            success: false,
            message: 'Error loading testimonials by service',
            data: []
        });
    }
});
exports.default = router;
//# sourceMappingURL=testimonials.routes.js.map