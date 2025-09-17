/**
 * API service layer for MWC Advocates frontend
 * Handles all HTTP requests to the backend API
 */

import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { 
  Service, 
  Testimonial, 
  ContactFormData, 
  ContactSubmission, 
  FAQ, 
  ApiResponse 
} from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
      timeout: 60000, // Increased to 60 seconds for cold starts
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Services API
   */
  async getServices(): Promise<Service[]> {
    try {
      const response: AxiosResponse<ApiResponse<Service[]>> = await this.api.get('/services');
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch services:', error);
      throw new Error('Failed to load services');
    }
  }

  async getServiceById(id: string): Promise<Service | null> {
    try {
      const response: AxiosResponse<ApiResponse<Service>> = await this.api.get(`/services/${id}`);
      return response.data.data || null;
    } catch (error) {
      console.error('Failed to fetch service:', error);
      return null;
    }
  }

  /**
   * Testimonials API
   */
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const response: AxiosResponse<ApiResponse<Testimonial[]>> = await this.api.get('/testimonials');
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
      throw new Error('Failed to load testimonials');
    }
  }

  /**
   * Contact API with retry logic for cold starts
   */
  async submitContactForm(data: ContactFormData): Promise<ApiResponse> {
    const maxRetries = 3;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Submitting contact form (attempt ${attempt}/${maxRetries})...`);
        const response: AxiosResponse<ApiResponse> = await this.api.post('/contact', data);
        return response.data;
      } catch (error: any) {
        // If it's a timeout or network error and not the last attempt, retry
        if (attempt < maxRetries && (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK')) {
          console.log(`Attempt ${attempt} failed, retrying in ${attempt * 2} seconds...`);
          await new Promise(resolve => setTimeout(resolve, attempt * 2000));
          continue;
        }
        
        // If it's a server error response, don't retry
        if (error.response?.data) {
          throw error.response.data;
        }
        
        // If it's the last attempt, throw a helpful error
        if (attempt === maxRetries) {
          throw new Error('Server is starting up. Please try again in a moment.');
        }
      }
    }
    
    throw new Error('Failed to submit contact form');
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    try {
      const response: AxiosResponse<ApiResponse<ContactSubmission[]>> = await this.api.get('/contact/submissions');
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch contact submissions:', error);
      throw new Error('Failed to load contact submissions');
    }
  }

  /**
   * FAQ API
   */
  async getFAQs(category?: string): Promise<FAQ[]> {
    try {
      const params = category ? { category } : {};
      const response: AxiosResponse<ApiResponse<FAQ[]>> = await this.api.get('/faq', { params });
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
      throw new Error('Failed to load FAQs');
    }
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.api.get('/health');
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
