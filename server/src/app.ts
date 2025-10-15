/**
 * MWC Advocates - Express Server Application
 * PERN Stack backend for law firm website
 */

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';

// Import routes
import servicesRoutes from './routes/services.routes';
import testimonialsRoutes from './routes/testimonials.routes';
import contactRoutes from './routes/contact.routes';
import faqRoutes from './routes/faq.routes';
import healthRoutes from './routes/health.routes';
import wakeRoutes from './routes/wake.routes';

// Load environment variables
dotenv.config();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  /**
   * Configure middleware for security, logging, and request processing
   */
  private configureMiddleware(): void {
    // Log all incoming requests for debugging
    this.app.use((req, res, next) => {
      console.log(`📡 ${req.method} ${req.path} from origin: ${req.headers.origin || 'NO ORIGIN'}`);
      next();
    });

    // Security middleware
    const frameSources = [
      "'self'",
      'https://www.google.com',
      'https://maps.google.com',
      'https://www.google.co.ke'
    ];

    this.app.use(helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'frame-src': frameSources,
          'child-src': frameSources
        }
      },
      crossOriginEmbedderPolicy: false
    }));
    
    // CORS configuration for frontend
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      'https://mwc-advocates-frontend.onrender.com',
      'https://mwc-advocates-1.onrender.com', // Your new frontend service
      'https://mwc-advocates-web.onrender.com', // Alternative name
      'http://localhost:5173',
      'http://localhost:3000',
      'https://mwc-advocates.onrender.com',
      'https://site--mwc-advocates--tkzbdsdh56l7.code.run/',
      // Add common variations
      'https://mwc-advocates-frontend-*.onrender.com'
    ];

    // Log CORS configuration on startup
    console.log('🔒 CORS Configuration initialized');
    console.log('   Allowed origins:', allowedOrigins);
    
    this.app.use(cors({
      origin: (origin, callback) => {
        // Log every CORS request
        console.log(`📡 CORS request from origin: ${origin || 'NO ORIGIN'}`);
        
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
          console.log('✅ Allowing request with no origin');
          return callback(null, true);
        }
        
        // Check exact matches first
        if (allowedOrigins.includes(origin)) {
          console.log(`✅ CORS allowed (exact match): ${origin}`);
          return callback(null, true);
        }
        
        // For Render deployments, check if origin matches pattern
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

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP, please try again later.',
    });
    this.app.use('/api/', limiter);

    // Contact form specific rate limiting
    const contactLimiter = rateLimit({
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 5, // limit each IP to 5 contact form submissions per hour
      message: 'Too many contact form submissions, please try again later.',
    });
    this.app.use('/api/contact', contactLimiter);

    // Logging
    this.app.use(morgan('combined'));

    // Compression
    this.app.use(compression());

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Static files (for serving images)
    this.app.use('/uploads', express.static('uploads'));
  }

  /**
   * Configure API routes
   */
  private configureRoutes(): void {
    // Health check endpoint
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({
        status: 'OK',
        message: 'MWC Advocates API is running',
        timestamp: new Date().toISOString(),
      });
    });

    // API routes
    this.app.use('/api/wake', wakeRoutes); // Lightweight wake-up endpoint
    this.app.use('/api/services', servicesRoutes);
    this.app.use('/api/testimonials', testimonialsRoutes);
    this.app.use('/api/contact', contactRoutes);
    this.app.use('/api/faq', faqRoutes);
    this.app.use('/api/health', healthRoutes);

    // Serve frontend static files in production
    if (process.env.NODE_ENV === 'production') {
      const clientDistPath = path.join(__dirname, '../../client/dist');
      console.log(`📦 Serving static files from: ${clientDistPath}`);
      
      this.app.use(express.static(clientDistPath));
      
      // Handle client-side routing - send all non-API requests to index.html
      this.app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(clientDistPath, 'index.html'));
      });
    } else {
      // 404 handler for development (API only)
      this.app.use('*', (req: Request, res: Response) => {
        res.status(404).json({
          error: 'Route not found',
          message: `Cannot ${req.method} ${req.originalUrl}`,
        });
      });
    }
  }

  /**
   * Configure error handling middleware
   */
  private configureErrorHandling(): void {
    this.app.use((err: any, req: Request, res: Response, next: any) => {
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

export default new App().app;
