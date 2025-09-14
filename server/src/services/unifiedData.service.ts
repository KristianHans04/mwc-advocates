/**
 * Unified Data Service
 * Manages data operations with automatic fallback between Supabase and Google Sheets
 */

import DatabaseService from './database.service';
import googleSheetsService from './googleSheets.service';
import { PrismaClient } from '@prisma/client';

interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
}

interface TestimonialData {
  id: string;
  client_name: string;
  position?: string;
  company?: string;
  content: string;
  rating: number;
}

interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

class UnifiedDataService {
  private static instance: UnifiedDataService;
  private dbService: DatabaseService;
  private prisma: PrismaClient;

  private constructor() {
    this.dbService = DatabaseService.getInstance();
    this.prisma = this.dbService.prisma;
  }

  public static getInstance(): UnifiedDataService {
    if (!UnifiedDataService.instance) {
      UnifiedDataService.instance = new UnifiedDataService();
    }
    return UnifiedDataService.instance;
  }

  /**
   * Get current database status
   */
  async getDatabaseStatus() {
    const supabaseHealthy = await this.dbService.healthCheck();
    const googleSheetsAvailable = googleSheetsService.isAvailable();
    
    return {
      primary: {
        type: 'supabase',
        status: supabaseHealthy ? 'healthy' : 'unhealthy',
        connected: supabaseHealthy
      },
      fallback: {
        type: 'google_sheets',
        status: googleSheetsAvailable ? 'available' : 'unavailable',
        connected: googleSheetsAvailable
      },
      currentlyUsing: this.dbService.isUsingGoogleSheets() ? 'google_sheets' : 'supabase'
    };
  }

  /**
   * Get services with automatic fallback
   */
  async getServices(): Promise<ServiceData[]> {
    try {
      // Try Supabase first
      if (!this.dbService.isUsingGoogleSheets()) {
        try {
          const services = await this.prisma.services.findMany({
            where: { active: true },
            orderBy: { created_at: 'desc' }
          });

          return services.map(service => ({
            id: service.id,
            title: service.title,
            description: service.description,
            icon: service.icon || undefined,
            features: service.features ? JSON.parse(service.features as string) : []
          }));
        } catch (error) {
          console.log('⚠️ Supabase query failed, falling back to Google Sheets:', error);
        }
      }

      // Fallback to Google Sheets
      const sheetsInitialized = await googleSheetsService.initialize();
      if (sheetsInitialized) {
        return await googleSheetsService.getServices();
      }

      // If both fail, return empty array
      console.error('❌ Both databases unavailable for services');
      return [];
    } catch (error) {
      console.error('Error in getServices:', error);
      return [];
    }
  }

  /**
   * Get testimonials with automatic fallback
   */
  async getTestimonials(): Promise<TestimonialData[]> {
    try {
      // Try Supabase first
      if (!this.dbService.isUsingGoogleSheets()) {
        try {
          const testimonials = await this.prisma.testimonials.findMany({
            where: { active: true },
            orderBy: { created_at: 'desc' }
          });

          return testimonials.map(testimonial => ({
            id: testimonial.id,
            client_name: testimonial.client_name,
            position: testimonial.position || undefined,
            company: testimonial.company || undefined,
            content: testimonial.content,
            rating: testimonial.rating
          }));
        } catch (error) {
          console.log('⚠️ Supabase query failed, falling back to Google Sheets:', error);
        }
      }

      // Fallback to Google Sheets
      const sheetsInitialized = await googleSheetsService.initialize();
      if (sheetsInitialized) {
        return await googleSheetsService.getTestimonials();
      }

      // If both fail, return empty array
      console.error('❌ Both databases unavailable for testimonials');
      return [];
    } catch (error) {
      console.error('Error in getTestimonials:', error);
      return [];
    }
  }

  /**
   * Save contact submission with automatic fallback
   */
  async saveContactSubmission(data: ContactSubmission): Promise<boolean> {
    try {
      // Try Supabase first
      if (!this.dbService.isUsingGoogleSheets()) {
        try {
          await this.prisma.contact_submissions.create({
            data: {
              name: data.name,
              email: data.email,
              phone: data.phone,
              subject: data.subject,
              message: data.message
            }
          });
          console.log('✅ Contact saved to Supabase');
          return true;
        } catch (error) {
          console.log('⚠️ Supabase save failed, falling back to Google Sheets:', error);
        }
      }

      // Fallback to Google Sheets
      const sheetsInitialized = await googleSheetsService.initialize();
      if (sheetsInitialized) {
        const success = await googleSheetsService.saveContactSubmission(data);
        if (success) {
          console.log('✅ Contact saved to Google Sheets');
        }
        return success;
      }

      // If both fail
      console.error('❌ Both databases unavailable for saving contact');
      return false;
    } catch (error) {
      console.error('Error in saveContactSubmission:', error);
      return false;
    }
  }

  /**
   * Get team members with automatic fallback
   */
  async getTeamMembers() {
    try {
      // Try Supabase first
      if (!this.dbService.isUsingGoogleSheets()) {
        try {
          const teamMembers = await this.prisma.team_members.findMany({
            where: { active: true },
            orderBy: { display_order: 'asc' }
          });

          return teamMembers.map(member => ({
            id: member.id,
            name: member.name,
            position: member.position,
            bio: member.bio || undefined,
            image_url: member.image_url || undefined,
            email: member.email || undefined
          }));
        } catch (error) {
          console.log('⚠️ Supabase query failed, falling back to Google Sheets:', error);
        }
      }

      // Fallback to Google Sheets
      const sheetsInitialized = await googleSheetsService.initialize();
      if (sheetsInitialized) {
        return await googleSheetsService.getTeamMembers();
      }

      return [];
    } catch (error) {
      console.error('Error in getTeamMembers:', error);
      return [];
    }
  }

  /**
   * Get FAQs with automatic fallback
   */
  async getFAQs() {
    try {
      // Try Supabase first
      if (!this.dbService.isUsingGoogleSheets()) {
        try {
          const faqs = await this.prisma.faqs.findMany({
            where: { active: true },
            orderBy: { display_order: 'asc' }
          });

          return faqs.map(faq => ({
            id: faq.id,
            question: faq.question,
            answer: faq.answer,
            category: faq.category || undefined
          }));
        } catch (error) {
          console.log('⚠️ Supabase query failed, falling back to Google Sheets:', error);
        }
      }

      // Fallback to Google Sheets
      const sheetsInitialized = await googleSheetsService.initialize();
      if (sheetsInitialized) {
        return await googleSheetsService.getFAQs();
      }

      return [];
    } catch (error) {
      console.error('Error in getFAQs:', error);
      return [];
    }
  }

  /**
   * Force switch to Google Sheets (useful for testing)
   */
  async forceGoogleSheets(): Promise<boolean> {
    const initialized = await googleSheetsService.initialize();
    if (initialized) {
      // This would need to be implemented in DatabaseService
      console.log('🔄 Forced switch to Google Sheets');
    }
    return initialized;
  }

  /**
   * Sync data from Google Sheets to Supabase (one-way sync)
   */
  async syncFromSheetsToSupabase(): Promise<{success: boolean; message: string}> {
    try {
      const supabaseHealthy = await this.dbService.healthCheck();
      if (!supabaseHealthy) {
        return { success: false, message: 'Supabase is not available' };
      }

      const sheetsInitialized = await googleSheetsService.initialize();
      if (!sheetsInitialized) {
        return { success: false, message: 'Google Sheets is not available' };
      }

      // Sync services
      const services = await googleSheetsService.getServices();
      for (const service of services) {
        await this.prisma.services.upsert({
          where: { id: service.id },
          update: {
            title: service.title,
            description: service.description,
            icon: service.icon,
            features: JSON.stringify(service.features)
          },
          create: {
            id: service.id,
            title: service.title,
            description: service.description,
            icon: service.icon,
            features: JSON.stringify(service.features)
          }
        });
      }

      // Sync testimonials
      const testimonials = await googleSheetsService.getTestimonials();
      for (const testimonial of testimonials) {
        await this.prisma.testimonials.upsert({
          where: { id: testimonial.id },
          update: {
            client_name: testimonial.client_name,
            position: testimonial.position,
            company: testimonial.company,
            content: testimonial.content,
            rating: testimonial.rating
          },
          create: {
            id: testimonial.id,
            client_name: testimonial.client_name,
            position: testimonial.position,
            company: testimonial.company,
            content: testimonial.content,
            rating: testimonial.rating
          }
        });
      }

      return { success: true, message: 'Data synced successfully from Google Sheets to Supabase' };
    } catch (error) {
      console.error('Sync error:', error);
      return { success: false, message: `Sync failed: ${error}` };
    }
  }
}

export default UnifiedDataService;