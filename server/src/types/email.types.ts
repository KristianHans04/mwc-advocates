/**
 * Shared email types for MWC Advocates
 */

export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface EmailContent {
  subject: string;
  htmlContent: string;
  textContent: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface EmailSendResult {
  adminSent: boolean;
  clientSent: boolean;
  adminError?: string;
  clientError?: string;
}

export interface EmailService {
  sendContactFormEmails(contactData: ContactFormData): Promise<EmailSendResult>;
}
