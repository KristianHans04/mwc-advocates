import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const dataPath = path.join(__dirname, '../../src/data/testimonials.json');
    console.log('🔍 Looking for testimonials at:', dataPath);
    
    if (!fs.existsSync(dataPath)) {
      console.error('❌ Testimonials file not found at:', dataPath);
      return res.json({ success: true, data: [], source: 'file-not-found' });
    }
    
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(fileContent);
    const testimonials = data.testimonials || [];
    
    console.log(`✅ Loaded ${testimonials.length} testimonials from JSON`);
    return res.json({ 
      success: true, 
      data: testimonials, 
      source: 'json',
      count: testimonials.length
    });
  } catch (error: any) {
    console.error('❌ Error loading testimonials:', error.message);
    return res.json({ 
      success: true, 
      data: [], 
      source: 'error',
      error: error.message 
    });
  }
});

export default router;
