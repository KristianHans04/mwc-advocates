/**
 * Development Email Service for MWC Advocates
 * Uses MailHog for local email testing (like MailCatcher in Rails)
 */

import nodemailer from 'nodemailer';
import { EmailRecipient, EmailContent, ContactFormData, EmailSendResult, EmailService } from '../types/email.types';

class DevEmailService implements EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Create transporter for MailHog
    this.transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      secure: false, // MailHog doesn't use SSL
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log('Development Email Service initialized');
    console.log('MailHog Web UI: http://localhost:8025');
  }

  /**
   * Send email using MailHog (development only)
   */
  private async sendEmail(
    recipients: EmailRecipient[],
    content: EmailContent,
    fromEmail: string = process.env.EMAIL_FROM || 'noreply@kristianhans.com'
  ): Promise<boolean> {
    try {
      for (const recipient of recipients) {
        const mailOptions = {
          from: fromEmail,
          to: recipient.email,
          subject: content.subject,
          html: content.htmlContent,
          text: content.textContent
        };

        const result = await this.transporter.sendMail(mailOptions);
        console.log(`Email sent to ${recipient.email} via MailHog:`, result.messageId);
      }
      
      return true;
    } catch (error: any) {
      console.error('Failed to send email via MailHog:', error.message);
      return false;
    }
  }

  /**
   * Generate admin notification email HTML (same as production)
   */
  private generateAdminEmailHTML(data: ContactFormData): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission - MWC Advocates</title>
    <style>
        body { font-family: 'Georgia', serif; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); color: white; padding: 30px; text-align: center; }
        .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .content { padding: 30px; }
        .submission-details { background-color: #f7fafc; border-left: 4px solid #3182ce; padding: 20px; margin: 20px 0; }
        .detail-row { margin: 15px 0; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
        .label { font-weight: bold; color: #2d3748; display: inline-block; width: 100px; }
        .value { color: #4a5568; }
        .message-content { background-color: #fff; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin: 15px 0; }
        .footer { background-color: #2d3748; color: white; text-align: center; padding: 20px; font-size: 14px; }
        .dev-notice { background-color: #fed7d7; color: #c53030; padding: 15px; margin: 20px 0; border-radius: 5px; text-align: center; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">⚖️ MWC ADVOCATES</div>
            <p style="margin: 0; font-size: 18px;">New Contact Form Submission</p>
        </div>
        
        <div class="content">
            <div class="dev-notice">
                🧪 DEVELOPMENT MODE - Email captured by MailHog
            </div>
            
            <h2 style="color: #2d3748; border-bottom: 2px solid #3182ce; padding-bottom: 10px;">Contact Details</h2>
            
            <div class="submission-details">
                <div class="detail-row">
                    <span class="label">Name:</span>
                    <span class="value">${data.name}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Email:</span>
                    <span class="value">${data.email}</span>
                </div>
                ${data.phone ? `
                <div class="detail-row">
                    <span class="label">Phone:</span>
                    <span class="value">${data.phone}</span>
                </div>
                ` : ''}
                <div class="detail-row">
                    <span class="label">Subject:</span>
                    <span class="value">${data.subject || 'General Inquiry'}</span>
                </div>
            </div>
            
            <h3 style="color: #2d3748;">Message:</h3>
            <div class="message-content">
                ${data.message.replace(/\n/g, '<br>')}
            </div>
            
            <p style="margin-top: 30px; color: #718096;">
                📅 Received: ${new Date().toLocaleString()}<br>
                🌐 Website: ${process.env.WEBSITE_URL || 'http://localhost:5173'}
            </p>
        </div>
        
        <div class="footer">
            <p><strong>MWC Advocates</strong> - Development Environment</p>
            <p>This email was captured in MailHog - View at http://localhost:8025</p>
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * Generate client thank you email HTML (same as production)
   */
  private generateClientEmailHTML(data: ContactFormData): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank you for contacting MWC Advocates</title>
    <style>
        body { font-family: 'Georgia', serif; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); color: white; padding: 30px; text-align: center; }
        .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .content { padding: 30px; line-height: 1.6; }
        .highlight-box { background-color: #f0f9ff; border-left: 4px solid #3182ce; padding: 20px; margin: 20px 0; }
        .contact-info { background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .contact-item { margin: 10px 0; }
        .contact-icon { display: inline-block; width: 20px; margin-right: 10px; }
        .footer { background-color: #2d3748; color: white; text-align: center; padding: 20px; font-size: 14px; }
        .social-links { margin-top: 15px; }
        .social-link { color: #63b3ed; text-decoration: none; margin: 0 10px; }
        .dev-notice { background-color: #fed7d7; color: #c53030; padding: 15px; margin: 20px 0; border-radius: 5px; text-align: center; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">⚖️ MWC ADVOCATES</div>
            <p style="margin: 0; font-size: 18px;">Thank You for Your Inquiry</p>
        </div>
        
        <div class="content">
            <div class="dev-notice">
                🧪 DEVELOPMENT MODE - Email captured by MailHog
            </div>
            
            <h2 style="color: #2d3748;">Dear ${data.name},</h2>
            
            <p>Thank you for contacting <strong>MWC Advocates</strong>. We have received your message regarding "<em>${data.subject || 'your inquiry'}</em>" and appreciate you taking the time to reach out to us.</p>
            
            <div class="highlight-box">
                <h3 style="margin-top: 0; color: #2c5282;">What happens next?</h3>
                <ul style="margin: 0; padding-left: 20px;">
                    <li>One of our experienced attorneys will review your inquiry</li>
                    <li>We will respond within 24-48 hours during business days</li>
                    <li>If urgent, please call us directly at the number below</li>
                </ul>
            </div>
            
            <p>Our team of dedicated legal professionals is committed to providing you with the highest quality legal services and personalized attention your case deserves.</p>
            
            <div class="contact-info">
                <h3 style="margin-top: 0; color: #2c5282;">Contact Information</h3>
                <div class="contact-item">
                    <span class="contact-icon">📧</span>
                    <strong>Email:</strong> info@kristianhans.com
                </div>
                <div class="contact-item">
                    <span class="contact-icon">📱</span>
                    <strong>Phone:</strong> +254 (0) 123 456 789
                </div>
                <div class="contact-item">
                    <span class="contact-icon">📍</span>
                    <strong>Office:</strong> Nairobi, Kenya
                </div>
                <div class="contact-item">
                    <span class="contact-icon">🕒</span>
                    Mon-Fri: 9:00 AM - 6:00 PM (EAT)
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>MWC Advocates</strong> - Development Environment</p>
            <p>This email was captured in MailHog - View at http://localhost:8025</p>
            
            <div class="social-links">
                <a href="#" class="social-link">LinkedIn</a>
                <a href="#" class="social-link">Twitter</a>
                <a href="#" class="social-link">Website</a>
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * Send admin notification email
   */
  private async sendAdminNotification(data: ContactFormData): Promise<boolean> {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@kristianhans.com';
    
    return await this.sendEmail(
      [{ email: adminEmail, name: 'MWC Advocates Team' }],
      {
        subject: `[DEV] New Contact Form Submission - ${data.subject || 'General Inquiry'}`,
        htmlContent: this.generateAdminEmailHTML(data),
        textContent: `[DEVELOPMENT] New contact form submission from ${data.name} (${data.email}): ${data.message}`
      }
    );
  }

  /**
   * Send client thank you email
   */
  private async sendClientThankYou(data: ContactFormData): Promise<boolean> {
    return await this.sendEmail(
      [{ email: data.email, name: data.name }],
      {
        subject: '[DEV] Thank you for contacting MWC Advocates',
        htmlContent: this.generateClientEmailHTML(data),
        textContent: `[DEVELOPMENT] Dear ${data.name}, thank you for contacting MWC Advocates. We have received your message and will get back to you soon.`
      }
    );
  }

  /**
   * Send contact form emails (admin notification + client thank you)
   */
  async sendContactFormEmails(contactData: ContactFormData): Promise<EmailSendResult> {
    console.log('[DEV] Starting email sending process...');
    console.log('Contact data:', { 
      name: contactData.name, 
      email: contactData.email, 
      subject: contactData.subject || 'General Inquiry' 
    });
    console.log('View emails at: http://localhost:8025');

    const results = {
      adminSent: false,
      clientSent: false,
      adminError: undefined as string | undefined,
      clientError: undefined as string | undefined
    };

    // Send admin notification email
    try {
      console.log('[DEV] Sending admin notification email...');
      await this.sendAdminNotification(contactData);
      results.adminSent = true;
      console.log('[DEV] Admin notification sent to MailHog');
    } catch (error) {
      console.error('[DEV] Failed to send admin notification:', error);
      results.adminError = error instanceof Error ? error.message : 'Unknown error';
    }

    // Send client thank you email
    try {
      console.log('[DEV] Sending client thank you email...');
      await this.sendClientThankYou(contactData);
      results.clientSent = true;
      console.log('[DEV] Client thank you email sent to MailHog');
    } catch (error) {
      console.error('[DEV] Failed to send client thank you email:', error);
      results.clientError = error instanceof Error ? error.message : 'Unknown error';
    }

    console.log('[DEV] Final email results:', results);
    console.log('Check MailHog UI: http://localhost:8025');
    return results;
  }
}

export default new DevEmailService();
