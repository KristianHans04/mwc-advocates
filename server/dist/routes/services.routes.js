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
        const services = await dataService.getServices();
        const status = await dataService.getDatabaseStatus();
        if (services.length > 0) {
            console.log(`✅ Loaded ${services.length} services from ${status.currentlyUsing}`);
            return res.json({
                success: true,
                data: services,
                source: status.currentlyUsing,
                count: services.length
            });
        }
        const dataPath = path_1.default.join(__dirname, '../../src/data/services.json');
        console.log('🔍 Falling back to services JSON at:', dataPath);
        if (!fs_1.default.existsSync(dataPath)) {
            console.error('❌ Services file not found at:', dataPath);
            return res.json({ success: true, data: [], source: 'none-available' });
        }
        const fileContent = fs_1.default.readFileSync(dataPath, 'utf-8');
        const data = JSON.parse(fileContent);
        const jsonServices = data.services || [];
        console.log(`✅ Loaded ${jsonServices.length} services from JSON fallback`);
        return res.json({
            success: true,
            data: jsonServices,
            source: 'json',
            count: jsonServices.length
        });
    }
    catch (error) {
        console.error('❌ Error loading services:', error.message);
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
        const services = await dataService.getServices();
        const service = services.find(s => s.id === id);
        const status = await dataService.getDatabaseStatus();
        if (service) {
            return res.json({
                success: true,
                data: service,
                source: status.currentlyUsing
            });
        }
        const dataPath = path_1.default.join(__dirname, '../../src/data/services.json');
        if (fs_1.default.existsSync(dataPath)) {
            const fileContent = fs_1.default.readFileSync(dataPath, 'utf-8');
            const data = JSON.parse(fileContent);
            const jsonService = data.services?.find((s) => s.id === id);
            if (jsonService) {
                return res.json({
                    success: true,
                    data: jsonService,
                    source: 'json'
                });
            }
        }
        return res.status(404).json({
            success: false,
            error: 'Service not found',
        });
    }
    catch (error) {
        console.error('Error fetching service:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch service',
        });
    }
});
exports.default = router;
//# sourceMappingURL=services.routes.js.map