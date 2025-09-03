/**
 * Team routes for MWC Advocates API
 * Handles team member information
 */

import express, { Request, Response } from 'express';
import dataService from '../services/dataService';

const router = express.Router();

// GET /api/team - Get all team members
router.get('/', async (req: Request, res: Response) => {
  try {
    const team = dataService.getTeamMembers();
    return res.json({ 
      success: true, 
      data: team,
      source: 'json',
      count: team.length
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error loading team members',
      data: []
    });
  }
});

// GET /api/team/:id - Get team member by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        message: 'Team member ID is required' 
      });
    }
    
    const member = dataService.getTeamMemberById(id);
    
    if (!member) {
      return res.status(404).json({ 
        success: false, 
        message: 'Team member not found' 
      });
    }
    
    return res.json({ 
      success: true, 
      data: member,
      source: 'json'
    });
  } catch (error) {
    console.error('Error fetching team member:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

export default router;
