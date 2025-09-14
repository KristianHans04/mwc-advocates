# MWC Advocates - AI Coding Agent Instructions

## Project Overview
PERN stack law firm website with hybrid JSON/database architecture. Frontend: React 19 + TypeScript + Vite + Tailwind CSS v4. Backend: Node.js + Express + TypeScript + Prisma + PostgreSQL. Deployed on Render with separate frontend/backend services.

## 🏗️ Architecture Patterns

### Hybrid Data Strategy
- **Primary**: JSON files in `server/src/data/` for static content (services, testimonials, team, firm info)
- **Secondary**: PostgreSQL via Prisma for dynamic data (contact submissions, user analytics)
- **Data Service**: `server/src/services/dataService.ts` handles intelligent path resolution for dev/production environments
- **Build Process**: `npm run build` copies JSON data to `dist/data/` for production deployment

### API Response Format
**All API endpoints MUST return consistent format**:
```typescript
{ success: boolean, data?: any, error?: string }
```
Examples from existing routes:
- `GET /api/services` → `{ success: true, data: Service[] }`
- `POST /api/contact` → `{ success: true, data: { id: string } }`
- Error case → `{ success: false, error: "Validation failed" }`

### Service Layer Architecture
```
server/src/services/
├── dataService.ts       # JSON file operations with path resolution
├── emailService.zoho.ts # Zoho SMTP integration with fallback
├── databaseService.ts   # Prisma operations wrapper
└── validation.ts        # Centralized validation logic
```

### Frontend Component Hierarchy
```
client/src/
├── components/
│   ├── layout/         # Header, Footer, Layout (app-wide)
│   └── ui/            # Button, Modal, Form elements (reusable)
├── pages/             # Route components with SEO hooks
├── services/api.ts    # Centralized HTTP client
├── hooks/useSEO.ts    # Meta tag management
└── types/            # Shared TypeScript interfaces
```

## 🚀 Development Workflows

### Essential Commands
```bash
# Backend Development (from server/)
npm run dev                    # Development with nodemon + TypeScript
npm run dev:email             # Start with MailHog for email testing  
npm run build                 # TypeScript compile + copy JSON data
npm run start                 # Production server
npm run db:studio             # Prisma database GUI
npm run db:push               # Schema changes without migration
npm run db:seed               # Populate database from JSON files

# Frontend Development (from client/)  
npm run dev                   # Vite dev server on port 5173
npm run build                 # Production build with Tailwind optimization
npm run preview               # Preview production build
```

### Email Development Workflow
- **Local Testing**: Docker Compose with MailHog (`npm run dev:email` from server/)
- **MailHog UI**: http://localhost:8025 for viewing sent emails
- **Production**: Zoho SMTP via `emailService.zoho.ts` with proper error handling
- **Configuration**: Environment variables for SMTP settings (see .env.example)

### Database Development
- **Schema**: `server/prisma/schema.prisma` - models for ContactSubmission, Service, Testimonial
- **Migrations**: `npm run db:migrate` for schema changes
- **Seeding**: `npm run db:seed` populates initial data from JSON files
- **Studio**: `npm run db:studio` opens visual database management at http://localhost:5555

### Testing Strategy
**Every new feature MUST include comprehensive tests**:

1. **API Endpoint Tests**:
   ```typescript
   // Example: Testing services endpoint
   describe('GET /api/services', () => {
     it('returns success with services data', async () => {
       const response = await request(app).get('/api/services');
       expect(response.body).toEqual({ 
         success: true, 
         data: expect.arrayContaining([
           expect.objectContaining({ id: expect.any(String), title: expect.any(String) })
         ])
       });
     });
   });
   ```

2. **Component Integration Tests**:
   ```typescript
   // Example: Contact form submission
   test('submits contact form successfully', async () => {
     render(<Contact />);
     fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
     fireEvent.click(screen.getByText(/send message/i));
     await waitFor(() => expect(screen.getByText(/success/i)).toBeInTheDocument());
   });
   ```

## ⚡ Performance & Complexity Standards

### Algorithm Complexity Requirements
**Before implementing ANY feature, analyze and document complexity**:

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
   ```

2. **Frontend Data Loading**:
   ```typescript
   // BAD: Multiple API calls
   useEffect(() => {
     fetchServices();
     fetchTestimonials();
     fetchTeam();
   }, []);
   
   // GOOD: Parallel loading or combined endpoint
   useEffect(() => {
     Promise.all([
       apiService.getServices(),
       apiService.getTestimonials(),
       apiService.getTeam()
     ]).then(([services, testimonials, team]) => {
       // Handle combined data
     });
   }, []);
   ```

3. **JSON Data Processing**:
   ```typescript
   // Efficient data loading in dataService.ts
   private static cache = new Map<string, any>();
   
   static async getServices(): Promise<Service[]> {
     if (this.cache.has('services')) {
       return this.cache.get('services'); // O(1) cache lookup
     }
     
     const data = await this.loadJsonFile('services.json');
     this.cache.set('services', data); // Cache for subsequent calls
     return data;
   }
   ```

### Memory Optimization
- **Component Memoization**: Use `React.memo()` for expensive render operations
- **Data Caching**: Cache API responses and JSON data loading
- **Image Optimization**: Proper image sizing and lazy loading
- **Bundle Size**: Code splitting and tree shaking with Vite

### Performance Testing Requirements
```typescript
// Example: API response time testing
describe('Performance Tests', () => {
  it('loads services data in under 200ms', async () => {
    const start = Date.now();
    const response = await apiService.getServices();
    const duration = Date.now() - start;
    
    expect(duration).toBeLessThan(200);
    expect(response.success).toBe(true);
  });
});
```

## 🎨 Code Conventions & Standards

### TypeScript Patterns
- **Interfaces**: Shared types in both `client/src/types/` and `server/src/types/`
- **API Responses**: Always `{ success: boolean, data?: any, error?: string }` format
- **Component Props**: Explicit interface definitions, no implicit children
- **Error Handling**: Comprehensive try-catch with consistent error response format

### UI/UX Development Standards
**Every UI component MUST maintain**:

1. **Responsive Design**: Mobile-first approach using Tailwind breakpoints
   ```tsx
   // Example: Responsive component structure
   <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
   ```

2. **Theme Consistency**: Use CSS custom properties defined in `client/src/index.css`
   ```css
   /* Use these instead of hardcoded colors */
   --color-primary-green: #2C5530;
   --color-accent-gold: #B8860B;
   --color-neutral-gray: #6B7280;
   ```

3. **Animation Patterns**: Framer Motion for consistent micro-interactions
   ```tsx
   // Standard animation pattern used throughout
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6 }}
   >
   ```

### File Organization Standards
**Always place code in the correct location**:

```
client/src/
├── components/
│   ├── layout/          # App-wide components (Header, Footer, Layout)
│   └── ui/             # Reusable components (Button, Modal, Form elements)
├── pages/              # Route components with useSEO hooks
├── services/           # API layer and external integrations
├── hooks/              # Custom React hooks (useSEO, etc.)
├── types/              # TypeScript interfaces
└── assets/            # Static files (images, icons)

server/src/
├── routes/             # API endpoints with consistent response format
├── services/           # Business logic (dataService, emailService, etc.)
├── types/              # Shared TypeScript definitions
├── data/               # JSON content files
└── utils/             # Helper functions and utilities
```

### Security Standards
1. **Input Validation**: All user inputs validated with Zod schemas
2. **SQL Injection Prevention**: Always use Prisma parameterized queries
3. **CORS Configuration**: Environment-aware origin checking for production/development
4. **Rate Limiting**: Express rate limiting on contact form and API endpoints
5. **Data Sanitization**: Clean user inputs before database storage

## Environment Configuration

### Required Environment Variables
```bash
# Backend (.env in server/)
DATABASE_URL=postgresql://...     # Supabase/PostgreSQL connection
FRONTEND_URL=https://...          # For CORS configuration
NODE_ENV=production              # Affects path resolution in dataService
ZOHO_SMTP_* variables            # Email service configuration

# Frontend (.env in client/)
VITE_API_BASE_URL=https://...    # Backend API endpoint
```

### Deployment Specifics
- **Render Backend**: Auto-deploys from `PERN` branch, runs `npm run build && npm start`
- **Render Frontend**: Vite build output, environment variables for API URL
- **Build Script**: Critical that `server/package.json` build script copies data directory

## Integration Points

### Frontend-Backend Communication
- **Dev Proxy**: Vite proxies `/api` to `localhost:5000` (see `vite.config.ts`)
- **Production**: Direct HTTPS calls to Render backend service
- **Error States**: Network failures handled gracefully with user feedback

### External Services
- **Email**: Zoho SMTP for production, MailHog for development
- **Database**: Supabase PostgreSQL for production, local PostgreSQL for development
- **Deployment**: Render for both services, GitHub Actions for CI/CD

## 🚨 Anti-Patterns to Avoid

### Backend Anti-Patterns
1. **Direct database queries** without using Prisma ORM
2. **Inconsistent API response formats** - always use `{ success, data, error }` structure
3. **Missing error handling** in async operations
4. **Hardcoded paths** instead of using environment-aware dataService
5. **CORS misconfigurations** - use dynamic origin checking
6. **Missing rate limiting** on public endpoints
7. **Synchronous file operations** - always use async/await for I/O

### Frontend Anti-Patterns
1. **Direct API calls in components** - use centralized apiService
2. **Missing SEO optimization** - every page must use useSEO hook
3. **Hardcoded colors** instead of CSS custom properties
4. **Inline styles** instead of Tailwind classes
5. **Missing responsive design** - always use mobile-first approach
6. **Prop drilling** - use context for deeply nested data
7. **Missing form validation** - use React Hook Form + Zod
8. **Synchronous state updates** that block UI

### Security Anti-Patterns
1. **Trusting user input** without validation/sanitization
2. **Missing CSRF protection** on form submissions
3. **Storing secrets in code** instead of environment variables
4. **SQL injection vulnerabilities** (not applicable with Prisma, but be aware)
5. **Missing input validation** on API endpoints
6. **Weak password requirements** for user accounts
7. **Missing rate limiting** on authentication endpoints

### Performance Anti-Patterns
1. **N+1 query problems** in database operations
2. **Large bundle sizes** due to missing code splitting
3. **Unnecessary re-renders** in React components
4. **Missing data caching** for static/semi-static content
5. **Blocking operations** on main thread
6. **Inefficient algorithms** with poor time complexity
7. **Memory leaks** from missing cleanup in useEffect

## Critical Files for Context
- `server/src/app.ts` - Express configuration, CORS, middleware setup
- `server/src/services/dataService.ts` - JSON data loading with environment awareness
- `client/src/services/api.ts` - Centralized API client with error handling
- `client/src/pages/Contact.tsx` - Example of form handling, validation, API integration
- `server/package.json` - Build script that copies JSON data for production
- `server/prisma/schema.prisma` - Database models and relationships

## Debugging Quick Reference
- **CORS Issues**: Check origin in backend logs, verify FRONTEND_URL environment variable
- **Data Loading**: Check `dataService.ts` console logs for path resolution
- **Email Testing**: Use MailHog on `localhost:8025` in development
- **API Debugging**: Backend logs all requests with emoji indicators for easy scanning
