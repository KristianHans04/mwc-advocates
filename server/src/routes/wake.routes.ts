/**
 * Wake-up route for Render free tier
 * Lightweight endpoint to wake up the server quickly
 */

import express, { Request, Response } from 'express';

const router = express.Router();

/**
 * GET /api/wake
 * Simple endpoint to wake up the server
 */
router.get('/', (_req: Request, res: Response) => {
  res.json({
    status: 'awake',
    timestamp: new Date().toISOString()
  });
});

export default router;