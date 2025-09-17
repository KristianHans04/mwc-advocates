"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const services_routes_1 = __importDefault(require("./routes/services.routes"));
const testimonials_routes_1 = __importDefault(require("./routes/testimonials.routes"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
const faq_routes_1 = __importDefault(require("./routes/faq.routes"));
const health_routes_1 = __importDefault(require("./routes/health.routes"));
const wake_routes_1 = __importDefault(require("./routes/wake.routes"));
dotenv_1.default.config();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.configureMiddleware();
        this.configureRoutes();
        this.configureErrorHandling();
    }
    configureMiddleware() {
        this.app.use((req, res, next) => {
            console.log(`📡 ${req.method} ${req.path} from origin: ${req.headers.origin || 'NO ORIGIN'}`);
            next();
        });
        this.app.use((0, helmet_1.default)());
        const allowedOrigins = [
            process.env.FRONTEND_URL || 'http://localhost:5173',
            'https://mwc-advocates-frontend.onrender.com',
            'https://mwc-advocates-1.onrender.com',
            'https://mwc-advocates-web.onrender.com',
            'http://localhost:5173',
            'http://localhost:3000',
            'https://mwc-advocates.onrender.com',
            'https://mwc-advocates-frontend-*.onrender.com'
        ];
        console.log('🔒 CORS Configuration initialized');
        console.log('   Allowed origins:', allowedOrigins);
        this.app.use((0, cors_1.default)({
            origin: (origin, callback) => {
                console.log(`📡 CORS request from origin: ${origin || 'NO ORIGIN'}`);
                if (!origin) {
                    console.log('✅ Allowing request with no origin');
                    return callback(null, true);
                }
                if (allowedOrigins.includes(origin)) {
                    console.log(`✅ CORS allowed (exact match): ${origin}`);
                    return callback(null, true);
                }
                if (origin.includes('mwc-advocates') && origin.includes('onrender.com')) {
                    console.log(`✅ CORS allowed (Render pattern): ${origin}`);
                    return callback(null, true);
                }
                console.log(`❌ CORS BLOCKED: ${origin}`);
                console.log('   Not in allowed origins:', allowedOrigins);
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            },
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
            preflightContinue: false,
            optionsSuccessStatus: 204
        }));
        const limiter = (0, express_rate_limit_1.default)({
            windowMs: 15 * 60 * 1000,
            max: 100,
            message: 'Too many requests from this IP, please try again later.',
        });
        this.app.use('/api/', limiter);
        const contactLimiter = (0, express_rate_limit_1.default)({
            windowMs: 60 * 60 * 1000,
            max: 5,
            message: 'Too many contact form submissions, please try again later.',
        });
        this.app.use('/api/contact', contactLimiter);
        this.app.use((0, morgan_1.default)('combined'));
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json({ limit: '10mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
        this.app.use('/uploads', express_1.default.static('uploads'));
    }
    configureRoutes() {
        this.app.get('/health', (req, res) => {
            res.status(200).json({
                status: 'OK',
                message: 'MWC Advocates API is running',
                timestamp: new Date().toISOString(),
            });
        });
        this.app.use('/api/wake', wake_routes_1.default);
        this.app.use('/api/services', services_routes_1.default);
        this.app.use('/api/testimonials', testimonials_routes_1.default);
        this.app.use('/api/contact', contact_routes_1.default);
        this.app.use('/api/faq', faq_routes_1.default);
        this.app.use('/api/health', health_routes_1.default);
        this.app.use('*', (req, res) => {
            res.status(404).json({
                error: 'Route not found',
                message: `Cannot ${req.method} ${req.originalUrl}`,
            });
        });
    }
    configureErrorHandling() {
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(err.status || 500).json({
                error: 'Internal server error',
                message: process.env.NODE_ENV === 'production'
                    ? 'Something went wrong!'
                    : err.message,
            });
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map