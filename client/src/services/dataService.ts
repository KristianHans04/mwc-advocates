/**
 * Local Data Service for MWC Advocates
 * Loads data from local JSON files instead of API calls
 * Only loads data that would normally come from database tables
 */

import servicesData from '../data/services.json';
import testimonialsData from '../data/testimonials.json';
import teamData from '../data/team.json';
import firmData from '../data/firm.json';
import faqsData from '../data/faqs.json';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  initials: string;
  rating: number;
  isActive?: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  service?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  specialization: string;
  bio: string;
  image: string;
  email: string;
  linkedin?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive?: boolean;
}

export interface FirmInfo {
  name: string;
  tagline: string;
  description: string;
  founded: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    fax?: string;
  };
  hours: Record<string, string>;
  social?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  stats?: {
    clients?: string;
    cases?: string;
    experience?: string;
    attorneys?: string;
  };
}

class DataService {
  /**
   * Get all services
   */
  getServices(): Service[] {
    return servicesData.services || [];
  }

  /**
   * Get featured services
   */
  getFeaturedServices(): Service[] {
    return this.getServices().filter(service => service.featured);
  }

  /**
   * Get service by ID
   */
  getServiceById(id: string): Service | null {
    return this.getServices().find(service => service.id === id) || null;
  }

  /**
   * Get all testimonials
   */
  getTestimonials(): Testimonial[] {
    return testimonialsData.testimonials || [];
  }

  /**
   * Get active testimonials
   */
  getActiveTestimonials(): Testimonial[] {
    return this.getTestimonials().filter(t => t.isActive !== false);
  }

  /**
   * Get testimonials by service
   */
  getTestimonialsByService(service: string): Testimonial[] {
    return this.getTestimonials().filter(
      t => t.service?.toLowerCase() === service.toLowerCase()
    );
  }

  /**
   * Get all team members
   */
  getTeamMembers(): TeamMember[] {
    return teamData.team || [];
  }

  /**
   * Get team member by ID
   */
  getTeamMemberById(id: string): TeamMember | null {
    return this.getTeamMembers().find(member => member.id === id) || null;
  }

  /**
   * Get firm information
   */
  getFirmInfo(): FirmInfo {
    return firmData.firm;
  }

  /**
   * Get all FAQs
   */
  getFAQs(): FAQ[] {
    return faqsData.faqs || [];
  }

  /**
   * Get active FAQs
   */
  getActiveFAQs(): FAQ[] {
    return this.getFAQs()
      .filter(faq => faq.isActive !== false)
      .sort((a, b) => a.order - b.order);
  }

  /**
   * Get FAQs by category
   */
  getFAQsByCategory(category: string): FAQ[] {
    return this.getActiveFAQs().filter(
      faq => faq.category.toLowerCase() === category.toLowerCase()
    );
  }
}

// Export singleton instance
export const dataService = new DataService();
export default dataService;
