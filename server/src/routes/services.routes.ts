import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const dataPath = path.join(__dirname, '../../src/data/services.json');
    console.log('🔍 Looking for services at:', dataPath);
    
    if (!fs.existsSync(dataPath)) {
      console.error('❌ Services file not found at:', dataPath);
      return res.json({ success: true, data: [], source: 'file-not-found' });
    }
    
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(fileContent);
    const services = data.services || [];
    
    console.log(`✅ Loaded ${services.length} services from JSON`);
    return res.json({ 
      success: true, 
      data: services, 
      source: 'json',
      count: services.length
    });
  } catch (error: any) {
    console.error('❌ Error loading services:', error.message);
    return res.json({ 
      success: true, 
      data: [], 
      source: 'error',
      error: error.message 
    });
  }
});

export default router;
