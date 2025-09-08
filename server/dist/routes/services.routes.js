"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    try {
        const dataPath = path_1.default.join(__dirname, '../../src/data/services.json');
        console.log('🔍 Looking for services at:', dataPath);
        if (!fs_1.default.existsSync(dataPath)) {
            console.error('❌ Services file not found at:', dataPath);
            return res.json({ success: true, data: [], source: 'file-not-found' });
        }
        const fileContent = fs_1.default.readFileSync(dataPath, 'utf-8');
        const data = JSON.parse(fileContent);
        const services = data.services || [];
        console.log(`✅ Loaded ${services.length} services from JSON`);
        return res.json({
            success: true,
            data: services,
            source: 'json',
            count: services.length
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
exports.default = router;
//# sourceMappingURL=services.routes.js.map