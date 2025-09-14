import { PrismaClient } from '@prisma/client';
import googleSheetsService from './googleSheets.service';
declare class DatabaseService {
    private static instance;
    prisma: PrismaClient;
    private useGoogleSheets;
    private constructor();
    static getInstance(): DatabaseService;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    healthCheck(): Promise<boolean>;
    isConnected(): Promise<boolean>;
    isUsingGoogleSheets(): boolean;
    getGoogleSheetsService(): typeof googleSheetsService;
}
export default DatabaseService;
//# sourceMappingURL=database.service.d.ts.map