"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const unifiedData_service_1 = __importDefault(require("../services/unifiedData.service"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const dataService = unifiedData_service_1.default.getInstance();
router.get('/', async (req, res) => {
    try {
        const testimonials = await dataService.getTestimonials();
        const status = await dataService.getDatabaseStatus();
        if (testimonials.length > 0) {
            console.log(`✅ Loaded ${testimonials.length} testimonials from ${status.currentlyUsing}`);
            return res.json({
                success: true,
                data: testimonials,
                source: status.currentlyUsing,
                count: testimonials.length
            });
        }
        const dataPath = path_1.default.join(__dirname, '../../src/data/testimonials.json');
        console.log('🔍 Falling back to testimonials JSON at:', dataPath);
        if (!fs_1.default.existsSync(dataPath)) {
            console.error('❌ Testimonials file not found at:', dataPath);
            return res.json({ success: true, data: [], source: 'none-available' });
        }
        const fileContent = fs_1.default.readFileSync(dataPath, 'utf-8');
        const data = JSON.parse(fileContent);
        const jsonTestimonials = data.testimonials || [];
        console.log(`✅ Loaded ${jsonTestimonials.length} testimonials from JSON fallback`);
        return res.json({
            success: true,
            data: jsonTestimonials,
            source: 'json',
            count: jsonTestimonials.length
        });
    }
    catch (error) {
        console.error('❌ Error loading testimonials:', error.message);
        return res.json({
            success: true,
            data: [],
            source: 'error',
            error: error.message
        });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const testimonials = await dataService.getTestimonials();
        const testimonial = testimonials.find(t => t.id === id);
        const status = await dataService.getDatabaseStatus();
        if (testimonial) {
            return res.json({
                success: true,
                data: testimonial,
                source: status.currentlyUsing
            });
        }
        const dataPath = path_1.default.join(__dirname, '../../src/data/testimonials.json');
        if (fs_1.default.existsSync(dataPath)) {
            const fileContent = fs_1.default.readFileSync(dataPath, 'utf-8');
            const data = JSON.parse(fileContent);
            const jsonTestimonial = data.testimonials?.find((t) => t.id === id);
            if (jsonTestimonial) {
                return res.json({
                    success: true,
                    data: jsonTestimonial,
                    source: 'json'
                });
            }
        }
        return res.status(404).json({
            success: false,
            error: 'Testimonial not found',
        });
    }
    catch (error) {
        console.error('Error fetching testimonial:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch testimonial',
        });
    }
});
exports.default = router;
//# sourceMappingURL=testimonials.routes.js.map