"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const client_1 = require("@prisma/client");
const PORT = parseInt(process.env.PORT || '8080', 10);
const prisma = new client_1.PrismaClient();
async function startServer() {
    try {
        const server = app_1.default.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`🏥 Health check: http://0.0.0.0:${PORT}/health`);
            console.log(`📚 API base URL: http://0.0.0.0:${PORT}/api`);
            if (process.env.NODE_ENV === 'production') {
                console.log('🌐 Production server ready for connections');
            }
        });
        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`❌ Port ${PORT} is already in use`);
            }
            else {
                console.error('❌ Server error:', error);
            }
            process.exit(1);
        });
        console.log('🔌 Attempting database connection...');
        connectToDatabase().catch(error => {
            console.log('🔄 Server running without database connection - API will use fallback data');
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}
async function connectToDatabase(retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            await Promise.race([
                prisma.$connect(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Database connection timeout')), 15000))
            ]);
            console.log('✅ Database connected successfully');
            return;
        }
        catch (error) {
            console.warn(`⚠️ Database connection attempt ${i + 1}/${retries} failed:`, error instanceof Error ? error.message : error);
            if (i === retries - 1) {
                console.error('❌ All database connection attempts failed');
                console.log('🔄 Server will continue running without database - some features may be limited');
                return;
            }
            await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
        }
    }
}
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});
startServer();
//# sourceMappingURL=server.js.map