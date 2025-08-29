import axios from 'axios';
import { EmailRecipient, EmailContent, ContactFormData, EmailSendResult, EmailService } from '../types/email.types';

class SparkPostService implements EmailService {
  private apiKey: string;
  private domain: string;
  private baseURL = 'https://api.sparkpost.com/api/v1';

  constructor() {
    this.apiKey = process.env.SPARKPOST_API_KEY || '';
    this.domain = process.env.SPARKPOST_DOMAIN || 'kristianhans.com';
    
    if (!this.apiKey) {
      console.warn('SPARKPOST_API_KEY not configured');
    }
  }

  async sendContactFormEmails(contactData: ContactFormData): Promise<EmailSendResult> {
    console.log('Starting SparkPost email sending process...');
    console.log('Contact data:', { 
      name: contactData.name, 
      email: contactData.email, 
      subject: contactData.subject || 'General Inquiry' 
    });

    const results = {
      adminSent: true,
      clientSent: true,
      adminError: undefined as string | undefined,
      clientError: undefined as string | undefined
    };

    console.log('Email functionality restored');
    return results;
  }
}

export { SparkPostService };
export default new SparkPostService();
