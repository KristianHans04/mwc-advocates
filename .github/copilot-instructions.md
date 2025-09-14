# MWC Advocates - AI Coding Agent Instructions

## Architecture Overview

MWC Advocates is a **PERN stack law firm website** using a hybrid JSON/database architecture for flexible content management. The core architecture follows a **separation of concerns pattern** where static content is managed via JSON files and dynamic data flows through PostgreSQL:

```
Frontend (React + TypeScript) → API Layer (Express) → Services → Data (JSON + PostgreSQL)
```

## Server Management & Control

### Server Authority
**Human-Only Server Control**: Only human developers have authority to manage server processes. AI assistants must request server operations rather than executing them directly.

**Restricted Commands**:
- `npm run dev` - Development server startup
- `npm start` - Production server management  
- `node server.js` - Direct server execution
- Server restart/shutdown operations
- Process management (kill, restart, etc.)

### Database Protection Rules
**CRITICAL: NEVER EXECUTE DESTRUCTIVE DATABASE COMMANDS**

**ABSOLUTELY FORBIDDEN Commands** (Never run these under ANY circumstances):
```bash
# NEVER RUN THESE COMMANDS:
npx prisma db push --force-reset    # Destroys entire database
npx prisma migrate reset            # Drops and recreates database (DATA LOSS)
npx prisma db execute --stdin      # Direct SQL execution
npm run db:reset                   # Custom reset script (if exists)

# NEVER use force flags:
npx prisma db push --force-reset   # Force overwrites database
npx prisma migrate reset --force   # Force database reset
```

**ALLOWED Database Commands**:
```bash
# SAFE commands that preserve data:
npx prisma migrate dev             # Apply pending migrations
npx prisma db seed                 # Add seed data (non-destructive)
npx prisma migrate status          # Check migration status
npx prisma db push                 # Push schema changes (safe)
npx prisma generate               # Generate Prisma client
npx prisma studio                 # Database GUI
```

**Database Safety Protocol**:
1. If a destructive database operation is needed, AI must:
   - **NEVER execute the command directly**
   - Explain why it might be needed
   - Warn about data loss implications
   - Request human confirmation and execution
   - Suggest backing up the database first

2. Example AI response for destructive requests:
   ```
   "You're asking me to reset the database, which would DELETE ALL DATA. 
   I cannot and will not execute this command. 
   
   If you really need to do this:
   1. First backup your database: pg_dump your_database > backup.sql
   2. Then YOU can run: npx prisma migrate reset
   
   This will destroy all data. Are you absolutely sure?"
   ```

**AI Request Pattern**:
When server operations are needed, AI should request using this format:
"I need to start the development server. Please run: `npm run dev` in the server/ directory"


## Key PERN Architecture Patterns

### Hybrid Data Strategy
**Static Content Pattern**: JSON files in `server/src/data/` serve as the primary content management system:
```typescript
// server/src/services/dataService.ts
class DataService {
  private static cache = new Map<string, any>();
  
  static async getServices(): Promise<Service[]> {
    // Intelligent path resolution for dev/production
    const dataPath = this.resolveDataPath('services.json');
    return this.loadJsonFile(dataPath);
  }
}
```

**Dynamic Data Pattern**: PostgreSQL via Prisma for user-generated content:
```typescript
// server/src/services/databaseService.ts  
class DatabaseService {
  static async createContactSubmission(data: ContactFormData) {
    return prisma.contactSubmission.create({ data });
  }
}
```

### API Response Format
**All API endpoints MUST return consistent format**:
```typescript
// Standard success response
{ success: boolean, data?: any, error?: string }

// Implementation in routes
app.get('/api/services', async (req, res) => {
  try {
    const services = await dataService.getServices();
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### Service Layer Architecture
```
server/src/services/
├── dataService.ts       # JSON file operations with intelligent path resolution
├── emailService.zoho.ts # Zoho SMTP integration with MailHog fallback
├── databaseService.ts   # Prisma operations wrapper with error handling
└── validationService.ts # Centralized Zod validation schemas
```

## Request Context & API Architecture

### API Client Pattern
All frontend HTTP requests go through a centralized API service:
```typescript
// client/src/services/api.ts
class ApiService {
  private api: AxiosInstance;
  
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
      timeout: 10000,
    });
    
    // Request/response interceptors for error handling
    this.setupInterceptors();
  }
}
```

### Environment Configuration
**Development vs Production**: Environment-aware configuration throughout the stack:
```typescript
// Development: Vite proxy
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});

// Production: Direct HTTPS calls to Render backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://mwc-advocates-api.onrender.com';
```

### CORS & Security Configuration
**Dynamic Origin Checking**: Handles multiple deployment environments:
```typescript
// server/src/app.ts
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'https://mwc-advocates-frontend.onrender.com',
  // Pattern matching for Render deployments
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Enhanced logging for CORS debugging
    console.log(`❌ CORS blocked origin: ${origin}`);
    callback(new Error('CORS policy violation'), false);
  },
  credentials: true,
}));
```

## Frontend Architecture Patterns

### React Component Architecture
**Component Hierarchy**: Organized by scope and reusability:
```typescript
// client/src/components/
├── layout/           # App-wide components (Header, Footer, Layout)
├── ui/              # Reusable UI components (Button, Modal, Form)
└── pages/           # Page-specific components (Contact, Services)

// Example: Layout component structure
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
```

### SEO & Meta Management
**useSEO Hook**: Centralized meta tag management for all pages:
```typescript
// client/src/hooks/useSEO.ts
const useSEO = ({ title, description, keywords }: SEOProps) => {
  useEffect(() => {
    document.title = title;
    // Meta tag updates
  }, [title, description, keywords]);
};

// Usage in every page component
const Contact: React.FC = () => {
  useSEO({
    title: 'Contact Us - MWC Advocates',
    description: 'Contact MASINDE WANYONYI & COMPANY ADVOCATES for professional legal consultation',
    keywords: 'contact MWC Advocates, legal consultation Nairobi'
  });
  
  return <ContactForm />;
};
```

### Form Handling Pattern
**React Hook Form + Zod**: Consistent form validation across the application:
```typescript
// Example from Contact.tsx
interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  // ... other validations
});

const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>({
  resolver: zodResolver(contactSchema)
});
```

### Animation & Motion Patterns
**Framer Motion**: Consistent micro-interactions and page transitions:
```typescript
// Standard animation pattern used throughout
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  {content}
</motion.div>

// Stagger animations for lists
<motion.div variants={staggerContainer}>
  {items.map((item, index) => (
    <motion.div key={item.id} variants={fadeInUp}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## Development Workflows & Commands

### Essential Development Commands
```bash
# Backend Development (from server/)
npm run dev                    # Development with nodemon + TypeScript hot reload
npm run dev:email             # Start with MailHog for email testing (Docker)
npm run build                 # TypeScript compile + copy JSON data to dist/
npm run start                 # Production server (compiled JavaScript)
npm run db:studio             # Prisma Studio database GUI (localhost:5555)
npm run db:push               # Push schema changes without migration
npm run db:seed               # Populate database from JSON seed files
npm run db:migrate            # Apply pending migrations
npm run type-check            # TypeScript type checking without emit

# Frontend Development (from client/)
npm run dev                   # Vite dev server with HMR (localhost:5173)
npm run build                 # Production build with Tailwind optimization
npm run preview               # Preview production build locally
npm run type-check            # TypeScript validation for frontend
```

### Email Development Workflow
**Local Testing with MailHog**:
```bash
# Start backend with email testing
cd server && npm run dev:email

# Access MailHog UI: http://localhost:8025
# All emails sent locally are captured by MailHog
```

**Email Service Architecture**:
```typescript
// server/src/services/emailService.zoho.ts
class ZohoEmailService {
  async sendContactEmail(data: ContactFormData) {
    // Production: Uses Zoho SMTP
    // Development: Routes through MailHog
    if (process.env.NODE_ENV === 'development') {
      return this.sendViaMailHog(data);
    }
    return this.sendViaZoho(data);
  }
}
```

### Database Development Workflow
**Prisma Schema Management**:
```prisma
// server/prisma/schema.prisma
model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  message   String
  status    ContactStatus @default(NEW)
  createdAt DateTime @default(now())
  
  @@map("contact_submissions")
}
```

**Safe Database Operations**:
```bash
# Check current migration status
npx prisma migrate status

# Apply new migrations (safe)
npx prisma migrate dev --name add_new_feature

# Reset development database (ONLY in development)
npx prisma migrate reset  # Will prompt for confirmation

# Generate Prisma client after schema changes
npx prisma generate
```

## Frontend Architecture (Hotwire + Stimulus)

## Testing Strategy & Patterns

### Testing Requirements
**Every new feature MUST include comprehensive tests**. Follow the testing hierarchy for complete coverage:

### Test Organization Structure
```
client/src/
├── __tests__/           # Frontend tests
│   ├── components/      # Component unit tests
│   ├── pages/          # Page integration tests
│   ├── services/       # API service tests
│   └── utils/          # Utility function tests

server/src/
├── __tests__/          # Backend tests
│   ├── routes/         # API endpoint tests
│   ├── services/       # Business logic tests
│   └── utils/          # Helper function tests
```

### Frontend Testing Patterns
1. **Component Tests** (Required for all components):
   ```typescript
   // client/src/__tests__/components/Contact.test.tsx
   describe('Contact Component', () => {
     it('renders contact form with all fields', () => {
       render(<Contact />);
       expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
       expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
       expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
     });
     
     it('validates form submission', async () => {
       render(<Contact />);
       fireEvent.click(screen.getByText(/send message/i));
       
       await waitFor(() => {
         expect(screen.getByText(/name is required/i)).toBeInTheDocument();
       });
     });
   });
   ```

2. **API Service Tests**:
   ```typescript
   // client/src/__tests__/services/api.test.ts
   describe('ApiService', () => {
     it('returns services data in correct format', async () => {
       const services = await apiService.getServices();
       
       expect(services.success).toBe(true);
       expect(Array.isArray(services.data)).toBe(true);
       expect(services.data[0]).toHaveProperty('id');
       expect(services.data[0]).toHaveProperty('title');
     });
   });
   ```

### Backend Testing Patterns
1. **API Endpoint Tests** (Required for all routes):
   ```typescript
   // server/src/__tests__/routes/services.test.ts
   describe('Services API', () => {
     describe('GET /api/services', () => {
       it('returns success with services data', async () => {
         const response = await request(app).get('/api/services');
         
         expect(response.status).toBe(200);
         expect(response.body).toEqual({
           success: true,
           data: expect.arrayContaining([
             expect.objectContaining({
               id: expect.any(String),
               title: expect.any(String),
               description: expect.any(String)
             })
           ])
         });
       });
       
       it('handles errors gracefully', async () => {
         // Mock data service failure
         jest.spyOn(dataService, 'getServices').mockRejectedValue(new Error('File not found'));
         
         const response = await request(app).get('/api/services');
         
         expect(response.status).toBe(500);
         expect(response.body).toEqual({
           success: false,
           error: expect.any(String)
         });
       });
     });
   });
   ```

2. **Service Layer Tests**:
   ```typescript
   // server/src/__tests__/services/dataService.test.ts
   describe('DataService', () => {
     it('loads JSON data correctly', async () => {
       const services = await DataService.getServices();
       
       expect(Array.isArray(services)).toBe(true);
       expect(services.length).toBeGreaterThan(0);
       expect(services[0]).toHaveProperty('id');
     });
     
     it('caches data for subsequent calls', async () => {
       const spy = jest.spyOn(fs, 'readFile');
       
       await DataService.getServices();
       await DataService.getServices();
       
       expect(spy).toHaveBeenCalledTimes(1); // Should only read file once
     });
   });
   ```

### Hotwire Integration
**Turbo Configuration**:
```ruby
# config/importmap.rb
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"

# Auto-refresh with Turbo
connect() {
  document.addEventListener("turbo:before-visit", this.navigationHandler);
  this.refreshInterval = setInterval(() => this.refreshData(), 30000);
}
```

### Real-time Features
**Action Cable Setup**: Uses Solid Cable (PostgreSQL-backed)
```yaml
# config/cable.yml
production:
  adapter: solid_cable
  polling_interval: 0.1.seconds
```

**WebSocket Patterns**:
```javascript
// Setup WebSocket with fallback to polling
setupWebSocketConnection() {
  // WebSocket code with Action Cable integration
  // Falls back to HTTP polling if WebSocket unavailable
}
```

### Component Patterns (Phlex)
**Phlex Component Architecture**: Ruby-based view components replacing ERB
```ruby
# app/components/components/base.rb
class Components::Base < Phlex::HTML
  # Base component with common patterns
end

# Feature components inherit from Base
class Components::Projects::Dashboard < Components::Base
  def view_template
    div(class: "dashboard-container") do
      render_header
      render_content  
    end
  end
end
```

**Stimulus Integration in Phlex**:
```ruby
# Components use data attributes for Stimulus
button(
  class: "btn btn-primary",
  data: { 
    action: "click->project-dashboard#handleAction",
    controller: "project-dashboard",
    project_id: @project.id
  }
) { "Action Button" }
```

## Notification & UI Patterns

### Toast/Alert System
**Centralized Notification Handling**: Consistent user feedback across the application:
```typescript
// client/src/hooks/useNotification.ts
interface NotificationOptions {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const showNotification = (options: NotificationOptions) => {
    const id = crypto.randomUUID();
    const notification = { id, ...options };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto-dismiss after duration
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, options.duration || 5000);
  };
  
  return { notifications, showNotification };
};
```

**Multi-layer Notifications**:
1. **Toast notifications**: Real-time user feedback for actions
2. **Form validation errors**: Inline validation messages
3. **API error handling**: Network failure notifications
4. **Success confirmations**: Action completion feedback

### Email Service Integration
**Development vs Production Email Handling**:
```typescript
// server/src/services/emailService.zoho.ts
class EmailService {
  static async sendContactEmail(data: ContactFormData) {
    if (process.env.NODE_ENV === 'development') {
      // Route through MailHog for testing
      return this.sendViaMailHog(data);
    }
    
    // Production: Use Zoho SMTP
    return this.sendViaZoho(data);
  }
  
  private static async sendViaMailHog(data: ContactFormData) {
    // Configure nodemailer for MailHog
    const transporter = nodemailer.createTransporter({
      host: 'localhost',
      port: 1025,
      ignoreTLS: true
    });
    
    return transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact: ${data.subject}`,
      html: this.generateContactEmailTemplate(data)
    });
  }
}
```

**Email Template Patterns**:
- Contact form submissions with structured data
- Email verification flows (if implemented)
- Notification preferences per feature
- Email tracking and analytics

## Services & Error Handling

### Centralized Error Handling
**Backend Error Patterns**: Consistent error responses across all API endpoints:
```typescript
// server/src/middleware/errorHandler.ts
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('API Error:', err.message);
  
  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: err.message
    });
  }
  
  // Database errors
  if (err.name === 'PrismaClientKnownRequestError') {
    return res.status(500).json({
      success: false,
      error: 'Database operation failed'
    });
  }
  
  // Default error response
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
};
```

**Frontend Error Handling**: Consistent error boundaries and user feedback:
```typescript
// client/src/components/ErrorBoundary.tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error reporting service
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    
    return this.props.children;
  }
}
```

### Business Logic Services
**Email Service Architecture**: Environment-aware email handling with fallbacks:
```typescript
// server/src/services/emailService.zoho.ts
class ZohoEmailService {
  private transporter: nodemailer.Transporter;
  
  constructor() {
    this.transporter = this.createTransporter();
  }
  
  private createTransporter() {
    if (process.env.NODE_ENV === 'development') {
      // MailHog configuration for development
      return nodemailer.createTransporter({
        host: 'localhost',
        port: 1025,
        ignoreTLS: true
      });
    }
    
    // Production Zoho SMTP configuration
    return nodemailer.createTransporter({
      host: process.env.ZOHO_SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.ZOHO_SMTP_USER,
        pass: process.env.ZOHO_SMTP_PASS
      }
    });
  }
  
  async sendContactEmail(data: ContactFormData): Promise<EmailResult> {
    try {
      const result = await this.transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.CONTACT_EMAIL,
        subject: `New Contact: ${data.subject}`,
        html: this.generateContactTemplate(data)
      });
      
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Email sending failed:', error);
      return { success: false, error: error.message };
    }
  }
}
```

**Validation Service**: Centralized Zod schemas for type-safe validation:
```typescript
// server/src/services/validationService.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

export const validateContactForm = (data: unknown) => {
  return contactFormSchema.parse(data);
};
```

## API Route Patterns

### Express Route Structure
All API routes follow consistent patterns for error handling and response format:
```typescript
// server/src/routes/services.routes.ts
import express from 'express';
import { dataService } from '../services/dataService';
import { errorHandler } from '../middleware/errorHandler';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const services = await dataService.getServices();
    res.json({ success: true, data: services });
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const service = await dataService.getServiceById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
});

export default router;
```

### Middleware Integration
**Route-Level Middleware**: Rate limiting and validation:
```typescript
// server/src/routes/contact.routes.ts
import rateLimit from 'express-rate-limit';
import { validateContactForm } from '../services/validationService';

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 submissions per hour per IP
  message: { success: false, error: 'Too many contact submissions' }
});

router.post('/', contactLimiter, async (req, res, next) => {
  try {
    // Validate request body
    const validatedData = validateContactForm(req.body);
    
    // Save to database
    const submission = await databaseService.createContactSubmission(validatedData);
    
    // Send email notification
    const emailResult = await emailService.sendContactEmail(validatedData);
    
    res.json({ 
      success: true, 
      data: { id: submission.id } 
    });
  } catch (error) {
    next(error);
  }
});
```

### Dynamic Route Registration
**App-Level Route Configuration**:
```typescript
// server/src/app.ts
import servicesRoutes from './routes/services.routes';
import testimonialsRoutes from './routes/testimonials.routes';
import contactRoutes from './routes/contact.routes';

class App {
  private configureRoutes(): void {
    // API routes with versioning
    this.app.use('/api/services', servicesRoutes);
    this.app.use('/api/testimonials', testimonialsRoutes);
    this.app.use('/api/contact', contactRoutes);
    
    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.json({ success: true, status: 'healthy', timestamp: new Date().toISOString() });
    });
    
    // Catch-all for undefined routes
    this.app.use('*', (req, res) => {
      res.status(404).json({ success: false, error: 'Route not found' });
    });
  }
}
```

## File Organization Conventions

### Backend Structure
```
server/
├── src/
│   ├── routes/             # API endpoint definitions
│   ├── services/           # Business logic layer
│   ├── middleware/         # Express middleware
│   ├── types/              # TypeScript interfaces
│   ├── utils/              # Helper functions
│   ├── data/               # JSON content files
│   ├── app.ts              # Express app configuration
│   └── server.ts           # Server entry point
├── prisma/
│   ├── schema.prisma       # Database schema
│   ├── migrations/         # Database migrations
│   └── seed.ts            # Database seeding
├── dist/                   # Compiled JavaScript (gitignored)
└── package.json           # Dependencies and scripts
```

### Frontend Structure
```
client/
├── src/
│   ├── components/
│   │   ├── layout/         # App-wide components
│   │   └── ui/            # Reusable UI components
│   ├── pages/              # Route components
│   ├── services/           # API client and external services
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript definitions
│   ├── assets/            # Static assets
│   ├── App.tsx            # Main app component
│   └── main.tsx           # React entry point
├── public/                 # Static files
├── dist/                   # Build output (gitignored)
└── package.json           # Dependencies and scripts
```

### Data Management
- **JSON Files**: `server/src/data/` for static content (services, testimonials, team)
- **Database**: Prisma for dynamic data (contact submissions, analytics)
- **Build Process**: JSON files copied to `dist/data/` during build
- **Environment Configs**: `.env` files for sensitive configuration

## URL Structure & Routing

### Frontend Routing Pattern
React Router with clean, semantic URLs:
```typescript
// client/src/App.tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/services" element={<Services />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/privacy" element={<Privacy />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### API Endpoint Structure
RESTful API with consistent patterns:
```
GET    /api/services           # List all services
GET    /api/services/:id       # Get specific service
GET    /api/testimonials       # List all testimonials
GET    /api/testimonials/:id   # Get specific testimonial
POST   /api/contact           # Submit contact form
GET    /api/team              # Get team members
GET    /health                # Health check
```

### Development vs Production URLs
```typescript
// Development (Vite proxy)
Frontend: http://localhost:5173
Backend:  http://localhost:5000
API:      http://localhost:5173/api (proxied)

// Production (Render deployment)
Frontend: https://mwc-advocates-frontend.onrender.com
Backend:  https://mwc-advocates-api.onrender.com
API:      https://mwc-advocates-api.onrender.com/api
```

## Testing Patterns

### Testing Requirements
**Every new feature MUST include comprehensive RSpec tests**. Do not rely on quick scripts like `test_email.rb` for production code.

### Test Coverage Standards
1. **Model Specs** (Required for all models):
   ```ruby
   # spec/models/work_cabinet_spec.rb
   RSpec.describe WorkCabinet, type: :model do
     describe 'associations' do
       it { should have_one(:cabinet).dependent(:destroy) }
       it { should have_many(:records).through(:cabinet) }
     end
     
     describe 'validations' do
       it { should validate_presence_of(:name) }
     end
     
     describe 'concerns' do
       it_behaves_like 'Cabinetable'
       it_behaves_like 'SoftDeletable'
     end
   end
   ```

2. **Request Specs** (Required for all controllers):
   ```ruby
   # spec/requests/organizations/work_cabinets_spec.rb
   RSpec.describe "Organizations::WorkCabinets", type: :request do
     describe "GET /index" do
       context "when user is authorized" do
         it "returns successful response" do
           get organization_work_cabinets_path(organization)
           expect(response).to have_http_status(:success)
         end
       end
       
       context "when user is unauthorized" do
         it "redirects to signin" do
           get organization_work_cabinets_path(organization)
           expect(response).to redirect_to(users_signin_path)
         end
       end
     end
   end
   ```

3. **System Specs** (Required for UI features):
   ```ruby
   # spec/system/work_cabinets_spec.rb
   RSpec.describe "WorkCabinets", type: :system do
     before { driven_by(:selenium_chrome_headless) }
     
     scenario "User creates a new work cabinet" do
       visit organization_work_cabinets_path(organization)
       click_link "New Cabinet"
       fill_in "Name", with: "Test Cabinet"
       click_button "Create"
       
       expect(page).to have_content("Cabinet created successfully")
       expect(page).to have_content("Test Cabinet")
     end
   end
   ```

4. **Component Specs** (For Phlex components):
   ```ruby
   # spec/components/navigation/navbar_spec.rb
   RSpec.describe Components::Navigation::Navbar, type: :component do
     it "renders navigation with user menu" do
       render_inline(described_class.new(current_user: user))
       
       expect(page).to have_css(".navbar")
       expect(page).to have_content(user.name)
     end
   end
   ```

### Factory Structure
Test data setup for comprehensive testing:
```typescript
// server/src/__tests__/factories/contactSubmission.factory.ts
export const createContactSubmission = (overrides = {}) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  subject: faker.lorem.sentence(),
  message: faker.lorem.paragraph(),
  status: 'NEW' as const,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides
});

// client/src/__tests__/factories/service.factory.ts  
export const createService = (overrides = {}) => ({
  id: faker.string.uuid(),
  title: faker.company.name(),
  description: faker.lorem.paragraph(),
  icon: 'building',
  features: [faker.lorem.sentence(), faker.lorem.sentence()],
  featured: faker.datatype.boolean(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides
});
```

### Test Organization
```
client/src/__tests__/
├── components/      # React component tests
├── pages/          # Page component integration tests
├── services/       # API service tests
├── hooks/          # Custom hook tests
├── utils/          # Utility function tests
└── factories/      # Test data factories

server/src/__tests__/
├── routes/         # API endpoint tests
├── services/       # Business logic tests
├── middleware/     # Express middleware tests
├── utils/          # Helper function tests
└── factories/      # Test data factories
```

### Key Test Types
- **Component tests**: React component rendering and interaction
- **API tests**: Express route handlers and middleware
- **Service tests**: Business logic and data manipulation
- **Integration tests**: End-to-end user workflows
- **Unit tests**: Individual function and utility testing

## UI/UX Development Guidelines

### Design System Requirements
When building or modifying UI components, **always maintain**:

1. **Responsive Design**: Mobile-first approach using Tailwind breakpoints
   - Use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
   - Test layouts on mobile (320px), tablet (768px), and desktop (1024px+)
   - Ensure touch targets are at least 44x44px on mobile
   - Navigation and critical actions must be easily accessible on small screens

2. **Theme Consistency**: Use CSS custom properties defined in `client/src/index.css`
   ```css
   /* Use these instead of hardcoded colors */
   --color-primary-green: #2C5530;
   --color-accent-gold: #B8860B;
   --color-neutral-gray: #6B7280;
   ```

3. **UI Consistency**: Maintain visual harmony across the application
   - Follow existing component patterns (cards, buttons, forms)
   - Use consistent spacing: `p-4`, `p-6`, `gap-4`, `gap-6`
   - Maintain consistent border radius: `rounded-lg`, `rounded-xl`, `rounded-2xl`
   - Keep shadow patterns uniform: `shadow-sm`, `shadow-md`, `shadow-lg`

4. **Accessibility Standards**:
   - All interactive elements must have proper ARIA labels
   - Color contrast must meet WCAG AA standards
   - Keyboard navigation must work for all interactive elements
   - Form inputs must have associated labels

### Component Styling Patterns
```typescript
// Example of proper responsive component structure
<div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 
                rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
  {/* Mobile-first responsive design */}
</div>
```

### CSS Class Organization
When adding classes, follow this order:
1. Layout (flex, grid, positioning)
2. Spacing (padding, margin, gap)
3. Sizing (width, height)
4. Typography (text size, weight, color)
5. Background and borders
6. Effects (shadows, transitions)
7. Responsive modifiers (sm:, md:, lg:)
8. State modifiers (hover:, focus:, active:)

## Modern Development Practices

### File Organization Standards
**Always place code in the correct location following PERN stack conventions**:

1. **TypeScript Organization**:
   ```
   client/src/
   ├── components/           # React components
   │   ├── layout/          # App-wide components
   │   └── ui/             # Reusable UI components
   ├── pages/              # Route components
   ├── services/           # API clients and external services
   ├── hooks/              # Custom React hooks
   ├── types/              # TypeScript interfaces
   └── utils/              # Helper functions
   
   server/src/
   ├── routes/             # Express route handlers
   ├── services/           # Business logic
   ├── middleware/         # Express middleware
   ├── types/              # Shared TypeScript definitions
   └── utils/              # Server utilities
   ```
   **NEVER**:
   - Mix frontend and backend logic
   - Put business logic in route handlers
   - Use inline event handlers in JSX

2. **API Organization**:
   ```
   server/src/
   ├── routes/             # Route definitions
   ├── services/           # Business logic services
   ├── middleware/         # Request/response middleware
   ├── types/              # Shared interfaces
   └── data/              # JSON content files
   ```

3. **CSS/Styling**:
   ```
   client/src/
   ├── index.css           # Main CSS with custom properties
   └── components/         # Component-specific styles (if needed)
   ```
   **NEVER**:
   - Use inline styles in JSX
   - Create separate CSS files without Tailwind
   - Override CSS custom properties directly in components

4. **Database/Migrations**:
   - One migration per change
   - Never edit existing migrations
   - Use Prisma migrate for schema changes
   - Always backup before destructive operations

5. **Configuration**:
   ```
   server/
   ├── .env.example        # Environment variable template
   ├── prisma/schema.prisma # Database schema
   └── package.json        # Dependencies and scripts
   
   client/
   ├── .env.example        # Frontend environment template
   ├── vite.config.ts      # Vite configuration
   └── package.json        # Frontend dependencies
   ```

### Code Quality Standards

1. **DRY (Don't Repeat Yourself)**:
   - Extract repeated code into utility functions or custom hooks
   - Use TypeScript interfaces for shared types
   - Create service objects for complex business logic

2. **SOLID Principles**:
   - Single Responsibility: One function/component, one purpose
   - Open/Closed: Extend through composition, not modification
   - Dependency Injection for testability

3. **PERN Best Practices**:
   - Use TypeScript throughout the stack
   - Prefer async/await over Promise chains
   - Use Prisma for all database operations
   - Leverage React hooks over class components
   - Use environment variables for configuration

## Performance & Complexity Standards

### Algorithm Complexity Requirements
**Before implementing ANY feature, analyze and document the time and space complexity**:

1. **Database Query Optimization**:
   ```typescript
   // BAD: N+1 queries
   const services = await prisma.service.findMany();
   for (const service of services) {
     const testimonials = await prisma.testimonial.findMany({
       where: { serviceId: service.id }
     });
   }
   
   // GOOD: Single query with includes
   const services = await prisma.service.findMany({
     include: { testimonials: true }
   });
   
   // BETTER: Use dataService caching for static content
   const services = await dataService.getServices(); // O(1) with cache
   ```

2. **Frontend Optimization**:
   ```typescript
   // BAD: Multiple API calls in useEffect
   useEffect(() => {
     fetchServices();
     fetchTestimonials();
     fetchTeam();
   }, []);
   
   // GOOD: Parallel loading
   useEffect(() => {
     Promise.all([
       apiService.getServices(),
       apiService.getTestimonials(),
       apiService.getTeam()
     ]).then(handleAllData);
   }, []);
   
   // BEST: Use React.memo for expensive renders
   const ServiceCard = React.memo(({ service }) => {
     return <ExpensiveComponent service={service} />;
   });
   ```

3. **Data Processing Optimization**:
   ```typescript
   // BAD: O(n²) nested operations
   services.forEach(service => {
     testimonials.forEach(testimonial => {
       // Process relationship
     });
   });
   
   // GOOD: O(n) with Map lookups
   const serviceMap = new Map(services.map(s => [s.id, s]));
   testimonials.forEach(testimonial => {
     const service = serviceMap.get(testimonial.serviceId); // O(1)
   });
   ```

### Space Complexity Optimization

1. **Memory-Efficient Data Loading**:
   ```typescript
   // BAD: O(n) memory - loads all records
   const allServices = await prisma.service.findMany();
   allServices.map(service => processService(service));
   
   // GOOD: O(1) memory - streaming/pagination
   async function processServicesInBatches() {
     let skip = 0;
     const batchSize = 100;
     
     while (true) {
       const batch = await prisma.service.findMany({
         skip,
         take: batchSize
       });
       
       if (batch.length === 0) break;
       
       await Promise.all(batch.map(processService));
       skip += batchSize;
     }
   }
   
   // BEST: O(1) memory - background job queuing
   await processServicesJob.dispatch(serviceIds);
   ```

2. **Caching Strategy**:
   ```typescript
   // Cache frequently accessed, rarely changed data
   class DataService {
     private static cache = new Map<string, any>();
     
     static async getServices(): Promise<Service[]> {
       const cacheKey = 'services';
       
       if (this.cache.has(cacheKey)) {
         return this.cache.get(cacheKey); // O(1) lookup
       }
       
       const services = await this.loadServicesFromFile(); // O(n) load
       this.cache.set(cacheKey, services);
       return services;
     }
   }
   
   // Redis for O(1) distributed caching
   import { Redis } from 'ioredis';
   
   class SessionManager {
     private redis = new Redis(process.env.REDIS_URL);
     
     async getUserSessions(userId: string): Promise<string[]> {
       // O(1) Redis lookup instead of O(n) database scan
       return this.redis.smembers(`user_sessions:${userId}`);
     }
   }
   ```

3. **Pagination & Limiting**:
   ```typescript
   // BAD: Loading unlimited records
   const allContacts = await prisma.contactSubmission.findMany({
     orderBy: { createdAt: 'desc' }
   });
   
   // GOOD: Constant memory with pagination
   const contacts = await prisma.contactSubmission.findMany({
     orderBy: { createdAt: 'desc' },
     skip: (page - 1) * limit,
     take: limit
   });
   
   // BEST: Cursor-based pagination for large datasets
   const contacts = await prisma.contactSubmission.findMany({
     orderBy: { createdAt: 'desc' },
     cursor: cursor ? { id: cursor } : undefined,
     take: limit + 1, // Take one extra to check for next page
     skip: cursor ? 1 : 0
   });
   ```

### Database Index Strategy

1. **Database Index Strategy**:
   ```sql
   -- Analyze query patterns before creating indexes
   -- Single column index for WHERE clauses - O(log n) lookup
   CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
   CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);
   
   -- Composite index for complex queries - O(log n)
   CREATE INDEX idx_contact_submissions_status_date 
   ON contact_submissions(status, created_at);
   
   -- Partial index for filtered queries - Reduces index size
   CREATE INDEX idx_contact_submissions_unread 
   ON contact_submissions(created_at) 
   WHERE status = 'NEW';
   
   -- Full-text search index for content - O(log n)
   CREATE INDEX idx_contact_submissions_search 
   ON contact_submissions 
   USING gin(to_tsvector('english', subject || ' ' || message));
   ```

2. **Prisma Query Optimization**:
   ```typescript
   // Ensure indexes are being used with query analysis
   const result = await prisma.$queryRaw`
     EXPLAIN ANALYZE 
     SELECT * FROM contact_submissions 
     WHERE status = 'NEW' 
     ORDER BY created_at DESC 
     LIMIT 10
   `;
   
   // Look for "Index Scan" instead of "Seq Scan" in results
   console.log(result);
   
   // Use Prisma's query optimization
   const optimizedQuery = await prisma.contactSubmission.findMany({
     where: { status: 'NEW' },
     orderBy: { createdAt: 'desc' },
     take: 10,
     // Prisma automatically uses indexes when available
   });
   ```

### JavaScript Performance

1. **DOM Manipulation** (if needed beyond React):
   ```typescript
   // BAD: O(n) DOM updates
   items.forEach(item => {
     document.getElementById('list')!.innerHTML += `<li>${item}</li>`;
   });
   
   // GOOD: O(1) DOM update with fragment
   const fragment = document.createDocumentFragment();
   items.forEach(item => {
     const li = document.createElement('li');
     li.textContent = item;
     fragment.appendChild(li);
   });
   document.getElementById('list')!.appendChild(fragment);
   
   // BEST: React virtual DOM (let React handle optimization)
   const ItemList = React.memo(({ items }) => (
     <ul>
       {items.map(item => (
         <li key={item.id}>{item.text}</li>
       ))}
     </ul>
   ));
   ```

2. **Event Handling**:
   ```typescript
   // BAD: O(n) event listeners
   document.querySelectorAll('.button').forEach(btn => {
     btn.addEventListener('click', handleClick);
   });
   
   // GOOD: O(1) event delegation
   document.getElementById('container')!.addEventListener('click', (e) => {
     if ((e.target as Element).matches('.button')) {
       handleClick(e);
     }
   });
   
   // BEST: React event handling (automatic delegation)
   const ButtonContainer = ({ onButtonClick }) => (
     <div onClick={onButtonClick}>
       {buttons.map(btn => (
         <button key={btn.id} data-id={btn.id}>
           {btn.text}
         </button>
       ))}
     </div>
   );
   ```

3. **Data Structure Choice**:
   ```typescript
   // Use Map for O(1) lookups instead of Array O(n)
   const userMap = new Map<string, User>();  // O(1) get/set
   const userArray: User[] = [];              // O(n) find
   
   // Use Set for O(1) uniqueness checks
   const uniqueIds = new Set<string>();  // O(1) has()
   const idArray: string[] = [];         // O(n) includes()
   
   // React state optimization
   const [userMap, setUserMap] = useState(new Map<string, User>());
   
   // Update map efficiently
   setUserMap(prev => new Map(prev).set(user.id, user));
   ```

1. **Async Processing Strategy**:
   ```typescript
   // BAD: Synchronous processing - O(n) blocking
   const results = await Promise.all(
     records.map(r => processHeavyOperation(r))
   );
   
   // GOOD: Async with batching - O(1) response time
   import Queue from 'bull';
   const processQueue = new Queue('process records');
   
   processQueue.add('processRecords', { recordIds: records.map(r => r.id) });
   
   // BEST: Optimized queuing with priority
   const batchSize = 100;
   for (let i = 0; i < records.length; i += batchSize) {
     const batch = records.slice(i, i + batchSize);
     processQueue.add('processBatch', 
       { batchIds: batch.map(r => r.id) },
       { priority: 'low' }
     );
   }
   ```

2. **Rate Limiting & Throttling**:
   ```typescript
   // Express middleware for API rate limiting
   import rateLimit from 'express-rate-limit';
   
   const apiLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // Limit each IP to 100 requests per windowMs
     message: {
       error: 'Too many requests from this IP'
     }
   });
   
   // Throttle expensive operations
   import pLimit from 'p-limit';
   const limit = pLimit(10); // Max 10 concurrent operations
   
   const promises = data.map(item => 
     limit(() => expensiveOperation(item))
   );
   ```

1. **Benchmark Requirements**:
   ```typescript
   // __tests__/performance/query_performance.test.ts
   describe("Query Performance", () => {
     it("loads services in under 100ms", async () => {
       const start = performance.now();
       await apiService.getServices();
       const end = performance.now();
       
       expect(end - start).toBeLessThan(100);
     });
     
     it("uses efficient database queries", async () => {
       const queryCount = await countQueries(() =>
         apiService.getServicesWithTestimonials()
       );
       
       expect(queryCount).toBeLessThanOrEqual(2); // Should use joins
     });
     
     it("maintains O(log n) search complexity", async () => {
       const sizes = [100, 1000, 10000];
       const times: number[] = [];
       
       for (const size of sizes) {
         await seedDatabase(size);
         
         const start = performance.now();
         await searchService.search("test");
         const end = performance.now();
         
         times.push(end - start);
       }
       
       // Time should not grow linearly with size
       for (let i = 1; i < times.length; i++) {
         expect(times[i] / times[0]).toBeLessThan(Math.log2(sizes[i] / sizes[0]) * 2);
       }
     });
   });
   ```

2. **Memory Profiling**:
   ```typescript
   // Use clinic.js or similar tools in development
   import { memoryUsage } from 'process';
   
   function profileMemory<T>(fn: () => Promise<T>): Promise<T> {
     const before = memoryUsage();
     return fn().then(result => {
       const after = memoryUsage();
       const diff = {
         rss: after.rss - before.rss,
         heapUsed: after.heapUsed - before.heapUsed
       };
       
       console.log('Memory usage:', diff);
       // Ensure memory usage is O(1) or O(log n), not O(n)
       return result;
     });
   }
   ```

### Complexity Analysis Checklist

Before implementing any feature, document:

1. **Time Complexity**:
   - Best case: O(?)
   - Average case: O(?)
   - Worst case: O(?)

2. **Space Complexity**:
   - Memory usage: O(?)
   - Database storage: O(?)

3. **Optimization Opportunities**:
   - Can we use caching? (Reduce to O(1))
   - Can we use indexes? (Reduce to O(log n))
   - Can we batch process? (Reduce constant factors)
   - Can we use background jobs? (Reduce response time)

4. **Scalability Considerations**:
   - Will this work with 1M records?
   - Will this work with 1000 concurrent users?
   - What's the breaking point?

## Security Standards

### Authentication & Authorization
1. **Multi-layered Security**:
   ```typescript
   // Middleware for API routes
   const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
     const token = req.headers.authorization?.replace('Bearer ', '');
     if (!token) {
       return res.status(401).json({ success: false, error: 'Authentication required' });
     }
     
     // Verify JWT token
     const user = verifyJWT(token);
     req.user = user;
     next();
   };
   
   const authorizeResource = (req: Request, res: Response, next: NextFunction) => {
     // Check permissions for specific resource
     if (!req.user.canAccess(req.params.resourceId)) {
       return res.status(403).json({ success: false, error: 'Access denied' });
     }
     next();
   };
   ```

2. **Session Security**:
   ```typescript
   // Express session configuration
   app.use(session({
     name: 'mwc_session',
     secret: process.env.SESSION_SECRET!,
     resave: false,
     saveUninitialized: false,
     cookie: {
       secure: process.env.NODE_ENV === 'production', // HTTPS only in production
       httpOnly: true,                                // Prevent XSS attacks
       maxAge: 24 * 60 * 60 * 1000,                  // 24 hours
       sameSite: 'lax'                               // CSRF protection
     }
   }));
   ```

3. **Password Requirements**:
   - Minimum 12 characters
   - Complexity requirements enforced
   - Password history tracking
   - Account lockout after failed attempts
   - Two-factor authentication support

### Data Protection

1. **SQL Injection Prevention**:
   ```typescript
   // ALWAYS use parameterized queries with Prisma
   // Good:
   const users = await prisma.user.findMany({
     where: { name: searchName }
   });
   
   const customQuery = await prisma.$queryRaw`
     SELECT * FROM users WHERE name = ${searchName}
   `;
   
   // NEVER:
   const dangerousQuery = `SELECT * FROM users WHERE name = '${searchName}'`;
   ```

2. **XSS (Cross-Site Scripting) Prevention**:
   ```typescript
   // React automatically escapes output
   const UserProfile = ({ user }) => (
     <div>{user.name}</div>  // Safe - automatically escaped
   );
   
   // Only use dangerouslySetInnerHTML with sanitized content
   import DOMPurify from 'dompurify';
   
   const SafeContent = ({ htmlContent }) => (
     <div dangerouslySetInnerHTML={{ 
       __html: DOMPurify.sanitize(htmlContent) 
     }} />
   );
   ```

3. **CSRF Protection**:
   ```typescript
   // Express CSRF protection
   import csrf from 'csurf';
   
   const csrfProtection = csrf({ cookie: true });
   app.use(csrfProtection);
   
   // Include CSRF token in forms
   app.get('/contact', (req, res) => {
     res.render('contact', { csrfToken: req.csrfToken() });
   });
   ```

4. **Mass Assignment Protection**:
   ```typescript
   // Always validate and sanitize input data
   const createContactSchema = z.object({
     name: z.string().min(1).max(100),
     email: z.string().email(),
     message: z.string().min(1).max(1000)
   });
   
   app.post('/api/contact', async (req, res) => {
     try {
       const validatedData = createContactSchema.parse(req.body);
       // Only validated fields are processed
       const contact = await prisma.contactSubmission.create({
         data: validatedData
       });
       res.json({ success: true, data: contact });
     } catch (error) {
       res.status(400).json({ success: false, error: error.message });
     }
   });
   ```

5. **File Upload Security**:
   ```typescript
   import multer from 'multer';
   import path from 'path';
   
   const storage = multer.diskStorage({
     destination: (req, file, cb) => {
       cb(null, 'uploads/'); // Store outside public directory
     },
     filename: (req, file, cb) => {
       // Sanitize filename and add timestamp
       const sanitized = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '');
       cb(null, `${Date.now()}-${sanitized}`);
     }
   });
   
   const upload = multer({
     storage,
     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
     fileFilter: (req, file, cb) => {
       const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
       if (allowedTypes.includes(file.mimetype)) {
         cb(null, true);
       } else {
         cb(new Error('Invalid file type'));
       }
     }
   });
   ```

### API Security

1. **Rate Limiting**:
   ```typescript
   import rateLimit from 'express-rate-limit';
   
   const apiLimiter = rateLimit({
     windowMs: 60 * 1000, // 1 minute
     max: 60, // Limit each IP to 60 requests per minute
     message: { success: false, error: 'Too many requests' }
   });
   
   const contactLimiter = rateLimit({
     windowMs: 60 * 60 * 1000, // 1 hour
     max: 5, // 5 contact submissions per hour per IP
     message: { success: false, error: 'Too many contact submissions' }
   });
   
   app.use('/api', apiLimiter);
   app.use('/api/contact', contactLimiter);
   ```

2. **API Authentication**:
   ```typescript
   import jwt from 'jsonwebtoken';
   
   // JWT token generation
   const generateTokens = (user: User) => {
     const accessToken = jwt.sign(
       { userId: user.id, email: user.email },
       process.env.JWT_SECRET!,
       { expiresIn: '15m' }
     );
     
     const refreshToken = jwt.sign(
       { userId: user.id },
       process.env.JWT_REFRESH_SECRET!,
       { expiresIn: '7d' }
     );
     
     return { accessToken, refreshToken };
   };
   
   // Token verification middleware
   const verifyToken = (req: Request, res: Response, next: NextFunction) => {
     const token = req.headers.authorization?.replace('Bearer ', '');
     
     try {
       const decoded = jwt.verify(token!, process.env.JWT_SECRET!);
       req.user = decoded;
       next();
     } catch (error) {
       return res.status(401).json({ success: false, error: 'Invalid token' });
     }
   };
   ```

3. **Input Validation**:
   ```typescript
   import { z } from 'zod';
   
   // Comprehensive validation schemas
   const emailSchema = z.string().email().max(254);
   const urlSchema = z.string().url().max(2048);
   const phoneSchema = z.string().regex(/^[\+]?[1-9][\d]{0,15}$/);
   
   const contactFormSchema = z.object({
     name: z.string().min(2).max(100).trim(),
     email: emailSchema,
     phone: phoneSchema.optional(),
     subject: z.string().min(5).max(200).trim(),
     message: z.string().min(10).max(2000).trim()
   });
   
   // Validation middleware
   const validateInput = (schema: z.ZodSchema) => {
     return (req: Request, res: Response, next: NextFunction) => {
       try {
         req.body = schema.parse(req.body);
         next();
       } catch (error) {
         return res.status(400).json({
           success: false,
           error: 'Validation failed',
           details: error.errors
         });
       }
     };
   };
   ```

### Security Testing

1. **Security-Focused Tests**:
   ```typescript
   // __tests__/security/api_security.test.ts
   describe("API Security", () => {
     describe("SQL Injection Protection", () => {
       it("prevents SQL injection in search", async () => {
         const response = await request(app)
           .get('/api/search')
           .query({ q: "'; DROP TABLE users; --" });
         
         expect(response.status).toBe(200);
         // Verify database integrity
         const users = await prisma.user.count();
         expect(users).toBeGreaterThan(0);
       });
     });
     
     describe("XSS Protection", () => {
       it("escapes malicious scripts in responses", async () => {
         const maliciousInput = "<script>alert('XSS')</script>";
         
         const response = await request(app)
           .post('/api/contact')
           .send({
             name: maliciousInput,
             email: 'test@example.com',
             message: 'Test message'
           });
         
         expect(response.body.data?.name).not.toContain('<script>');
       });
     });
     
     describe("Authorization Bypass", () => {
       it("prevents accessing unauthorized resources", async () => {
         const otherUserResource = await createResource({ userId: 'other-user' });
         
         const response = await request(app)
           .get(`/api/resources/${otherUserResource.id}`)
           .set('Authorization', `Bearer ${userToken}`);
         
         expect(response.status).toBe(403);
       });
     });
     
     describe("CSRF Protection", () => {
       it("rejects requests without CSRF token", async () => {
         const response = await request(app)
           .post('/api/contact')
           .send({
             name: 'Test User',
             email: 'test@example.com',
             message: 'Test message'
           });
         
         // Assuming CSRF protection is enabled
         expect(response.status).toBe(403);
       });
     });
     
     describe("Rate Limiting", () => {
       it("blocks excessive requests", async () => {
         const requests = Array(65).fill(null).map(() =>
           request(app).get('/api/services')
         );
         
         const responses = await Promise.all(requests);
         const blocked = responses.filter(r => r.status === 429);
         
         expect(blocked.length).toBeGreaterThan(0);
       });
     });
   });
   ```

2. **Penetration Testing Checklist**:
   - OWASP Top 10 vulnerabilities
   - Directory traversal attempts
   - Command injection tests
   - XXE (XML External Entity) attacks
   - LDAP injection protection
   - Header injection prevention
   - Clickjacking protection (X-Frame-Options)
   - Content Security Policy headers

### Security Headers
```typescript
// app.ts - Express security middleware
import helmet from 'helmet';
import cors from 'cors';

// Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", "https:"],
      fontSrc: ["'self'", "https:", "data:"],
      imgSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'", "https:"],
      styleSrc: ["'self'", "https:", "'unsafe-inline'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'https://mwc-advocates-frontend.onrender.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error('CORS policy violation'), false);
  },
  credentials: true
}));
```

### Encryption & Data Privacy

1. **Sensitive Data Encryption**:
   ```typescript
   import crypto from 'crypto';
   
   // Encrypt sensitive data before storing
   class EncryptionService {
     private static algorithm = 'aes-256-gcm';
     private static key = process.env.ENCRYPTION_KEY!;
     
     static encrypt(text: string): string {
       const iv = crypto.randomBytes(16);
       const cipher = crypto.createCipher(this.algorithm, this.key);
       let encrypted = cipher.update(text, 'utf8', 'hex');
       encrypted += cipher.final('hex');
       return iv.toString('hex') + ':' + encrypted;
     }
     
     static decrypt(encryptedText: string): string {
       const [ivHex, encrypted] = encryptedText.split(':');
       const iv = Buffer.from(ivHex, 'hex');
       const decipher = crypto.createDecipher(this.algorithm, this.key);
       let decrypted = decipher.update(encrypted, 'hex', 'utf8');
       decrypted += decipher.final('utf8');
       return decrypted;
     }
   }
   ```

2. **PII (Personally Identifiable Information) Protection**:
   - Audit logs for data access
   - Data retention policies
   - Right to erasure (GDPR)
   - Data anonymization for analytics

3. **Secure Communication**:
   - TLS 1.3 minimum
   - Certificate pinning for mobile apps
   - Encrypted websocket connections

## Anti-Patterns to Avoid

1. **Direct Database queries** without proper service layer abstraction
2. **Bypassing authentication** in API route handlers  
3. **Hard-coding configuration** instead of using environment variables
4. **N+1 queries** when loading relational data - always use Prisma `include` or `select`
5. **Creating API endpoints without proper validation** - always use schema validation
6. **Using fixed colors** instead of CSS custom properties (e.g., `#2C5530` vs `var(--color-primary-green)`)
7. **Ignoring mobile viewports** when designing new features
8. **Breaking UI consistency** by introducing new patterns without updating existing ones
9. **Inline JavaScript or CSS** in React components or HTML files
10. **Storing secrets in code** instead of environment variables
11. **Trusting user input** without validation and sanitization
12. **Using outdated packages** with known vulnerabilities
13. **Logging sensitive data** like passwords or tokens
14. **Weak randomness** for tokens (use crypto.randomBytes)
15. **Direct file system access** without path validation
16. **Mixing frontend and backend logic** - maintain clear separation of concerns
17. **Using synchronous operations** for I/O operations in Node.js
18. **Not handling Promise rejections** properly in async code
19. **Mutating props or state** directly in React components
20. **Using any type** in TypeScript without proper type definitions

## Quick Reference

**Service Pattern**: Use service classes in `server/src/services/` for business logic
**API Response**: Always return `{ success: boolean, data?: any, error?: string }` format
**Data Access**: Use `dataService.getServices()` for static content, Prisma for dynamic data
**Validation**: Always validate input with Zod schemas before processing
**Error Handling**: Use centralized error middleware with proper HTTP status codes
**Authentication**: Implement JWT tokens with proper expiration and refresh logic
**Frontend State**: Use React hooks and context for state management
**Styling**: Use Tailwind CSS with CSS custom properties for theming
**Testing**: Write comprehensive tests for all new features (components, API endpoints, services)
**Database**: Use Prisma for all database operations with proper indexing
**Environment**: Keep development and production configurations separate
**Security**: Never trust user input, always validate and sanitize
**Performance**: Optimize for O(log n) complexity, use caching where appropriate