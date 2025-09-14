"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const googleSheets_service_1 = __importDefault(require("./googleSheets.service"));
class DatabaseService {
    constructor() {
        this.useGoogleSheets = false;
        console.log('🔧 Initializing DatabaseService...');
        console.log('📊 Environment:', process.env.NODE_ENV);
        console.log('🔗 DATABASE_URL exists:', !!process.env.DATABASE_URL);
        if (process.env.DATABASE_URL) {
            const dbUrl = process.env.DATABASE_URL;
            console.log('🔗 Database URL pattern:', dbUrl.substring(0, 20) + '...');
            if (dbUrl.includes('supabase')) {
                console.log('📦 Detected Supabase database');
            }
        }
        this.prisma = new client_1.PrismaClient({
            log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error', 'warn', 'info'],
            datasources: {
                db: {
                    url: process.env.DATABASE_URL
                }
            }
        });
        this.prisma.$connect()
            .then(() => {
            console.log('✅ Prisma connected successfully to database');
        })
            .catch(async (error) => {
            console.error('❌ Prisma connection failed with error:', {
                message: error.message,
                code: error.code,
                meta: error.meta
            });
            console.log('🔄 Attempting to use Google Sheets as fallback...');
            const sheetsInitialized = await googleSheets_service_1.default.initialize();
            if (sheetsInitialized) {
                this.useGoogleSheets = true;
                console.log('✅ Using Google Sheets as database');
            }
            else {
                console.log('⚠️ Both database connections failed - using local data only');
            }
        });
    }
    static getInstance() {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }
    async connect() {
        try {
            await this.prisma.$connect();
            console.log('📦 Database connected successfully');
        }
        catch (error) {
            console.error('❌ Database connection failed:', error);
            throw error;
        }
    }
    async disconnect() {
        try {
            await this.prisma.$disconnect();
            console.log('📦 Database disconnected');
        }
        catch (error) {
            console.error('❌ Database disconnection failed:', error);
            throw error;
        }
    }
    async healthCheck() {
        try {
            await this.prisma.$queryRaw `SELECT 1`;
            return true;
        }
        catch (error) {
            console.error('❌ Database health check failed:', error);
            return false;
        }
    }
    async isConnected() {
        try {
            await this.prisma.$queryRaw `SELECT 1`;
            return true;
        }
        catch (error) {
            if (googleSheets_service_1.default.isAvailable()) {
                this.useGoogleSheets = true;
                return true;
            }
            return false;
        }
    }
    isUsingGoogleSheets() {
        return this.useGoogleSheets;
    }
    getGoogleSheetsService() {
        return googleSheets_service_1.default;
    }
}
exports.default = DatabaseService;
//# sourceMappingURL=database.service.js.map