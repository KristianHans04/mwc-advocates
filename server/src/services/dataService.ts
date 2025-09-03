/**
 * Data Service - JSON-based content management
 * Provides fallback to database if needed, but primarily uses JSON files
 */

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(__dirname, 'data');

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  featured: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  rating: number;
  testimonial: string;
  image: string;
  date: string;
  service: string;
}

interface TeamMember {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: string;
  education: string;
  bio: string;
  image: string;
  email: string;
  phone: string;
  linkedin: string;
}

interface FirmInfo {
  firm: {
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
      fax: string;
    };
    hours: Record<string, string>;
    social: {
      linkedin: string;
      twitter: string;
      facebook: string;
    };
    stats: {
      clients: string;
      cases: string;
      experience: string;
      attorneys: string;
    };
  };
}

class DataService {
  private cache: Map<string, any> = new Map();

  private readJsonFile<T>(filename: string): T | null {
    try {
      // Check cache first
      if (this.cache.has(filename)) {
        return this.cache.get(filename);
      }

      const filePath = path.join(DATA_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(fileContent);
      
      // Cache the result
      this.cache.set(filename, data);
      return data;
    } catch (error) {
      console.error(`Error reading ${filename}:`, error);
      return null;
    }
  }

  /**
   * Clear cache (useful for development)
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get all services
   */
  getServices(): Service[] {
    const data = this.readJsonFile<{ services: Service[] }>('services.json');
    return data?.services || [];
  }

  /**
   * Get featured services only
   */
  getFeaturedServices(): Service[] {
    return this.getServices().filter(service => service.featured);
  }

  /**
   * Get service by ID
   */
  getServiceById(id: string): Service | null {
    const services = this.getServices();
    return services.find(service => service.id === id) || null;
  }

  /**
   * Get all testimonials
   */
  getTestimonials(): Testimonial[] {
    const data = this.readJsonFile<{ testimonials: Testimonial[] }>('testimonials.json');
    return data?.testimonials || [];
  }

  /**
   * Get recent testimonials (last 3)
   */
  getRecentTestimonials(): Testimonial[] {
    const testimonials = this.getTestimonials();
    return testimonials
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }

  /**
   * Get testimonials by service
   */
  getTestimonialsByService(service: string): Testimonial[] {
    return this.getTestimonials().filter(t => t.service === service);
  }

  /**
   * Get all team members
   */
  getTeamMembers(): TeamMember[] {
    const data = this.readJsonFile<{ team: TeamMember[] }>('team.json');
    return data?.team || [];
  }

  /**
   * Get team member by ID
   */
  getTeamMemberById(id: string): TeamMember | null {
    const team = this.getTeamMembers();
    return team.find(member => member.id === id) || null;
  }

  /**
   * Get firm information
   */
  getFirmInfo(): FirmInfo['firm'] | null {
    const data = this.readJsonFile<FirmInfo>('firm.json');
    return data?.firm || null;
  }

  /**
   * Search content across all data
   */
  searchContent(query: string): {
    services: Service[];
    testimonials: Testimonial[];
    team: TeamMember[];
  } {
    const searchTerm = query.toLowerCase();
    
    const services = this.getServices().filter(service =>
      service.title.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm) ||
      service.features.some(feature => feature.toLowerCase().includes(searchTerm))
    );

    const testimonials = this.getTestimonials().filter(testimonial =>
      testimonial.name.toLowerCase().includes(searchTerm) ||
      testimonial.company.toLowerCase().includes(searchTerm) ||
      testimonial.testimonial.toLowerCase().includes(searchTerm) ||
      testimonial.service.toLowerCase().includes(searchTerm)
    );

    const team = this.getTeamMembers().filter(member =>
      member.name.toLowerCase().includes(searchTerm) ||
      member.title.toLowerCase().includes(searchTerm) ||
      member.specialization.toLowerCase().includes(searchTerm) ||
      member.bio.toLowerCase().includes(searchTerm)
    );

    return { services, testimonials, team };
  }
}

export default new DataService();
