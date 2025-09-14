import nodemailer from 'nodemailer';
import { EmailRecipient, EmailContent, ContactFormData, EmailSendResult, EmailService } from '../types/email.types';

class ZohoEmailService implements EmailService {
  private transporter: nodemailer.Transporter;
  private fromEmail: string;
  private adminEmail: string;

  constructor() {
    console.log('🔧 Initializing Zoho Email Service...');
    console.log('📊 Environment:', process.env.NODE_ENV);
    
    this.fromEmail = process.env.EMAIL_FROM || 'MWC Advocates <hello@kristianhans.com>';
    this.adminEmail = process.env.ADMIN_EMAIL || 'hello@kristianhans.com';

    console.log('📧 Email Configuration:');
    console.log('   From Email:', this.fromEmail);
    console.log('   Admin Email:', this.adminEmail);
    console.log('   SMTP Host:', process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com');
    console.log('   SMTP Port:', process.env.ZOHO_SMTP_PORT || '587');
    console.log('   SMTP User exists:', !!process.env.ZOHO_SMTP_USER);
    console.log('   SMTP Pass exists:', !!process.env.ZOHO_SMTP_PASS);

    // Create Zoho SMTP transporter
    this.transporter = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
      port: parseInt(process.env.ZOHO_SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.ZOHO_SMTP_USER,
        pass: process.env.ZOHO_SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      },
      debug: process.env.NODE_ENV === 'production', // Enable debug in production
      logger: process.env.NODE_ENV === 'production' // Enable logger in production
    });

    this.verifyConnection();
  }

  private async verifyConnection(): Promise<void> {
    try {
      console.log('🔍 Verifying Zoho SMTP connection...');
      await this.transporter.verify();
      console.log('✅ Zoho SMTP connection verified successfully');
    } catch (error) {
      console.error('❌ Zoho SMTP connection failed:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        code: (error as any)?.code,
        command: (error as any)?.command,
        response: (error as any)?.response,
        responseCode: (error as any)?.responseCode
      });
      console.warn('⚠️ Please check your Zoho SMTP credentials in .env file');
      console.warn('⚠️ Common issues:');
      console.warn('   - Wrong SMTP credentials');
      console.warn('   - Port blocked by firewall');
      console.warn('   - Two-factor authentication enabled (use app-specific password)');
    }
  }

  async sendContactFormEmails(contactData: ContactFormData): Promise<EmailSendResult> {
    console.log('📧 Sending contact form emails via Zoho...');
    console.log('Contact data:', { 
      name: contactData.name, 
      email: contactData.email, 
      subject: contactData.subject || 'General Inquiry' 
    });

    const results: EmailSendResult = {
      adminSent: false,
      clientSent: false,
      adminError: undefined,
      clientError: undefined
    };

    // Send email to admin (law firm)
    try {
      const adminEmailContent = this.generateAdminEmail(contactData);
      await this.transporter.sendMail({
        from: this.fromEmail,
        to: this.adminEmail,
        subject: `New Contact Form Submission - ${contactData.subject || 'General Inquiry'}`,
        html: adminEmailContent.htmlContent,
        text: adminEmailContent.textContent
      });
      
      results.adminSent = true;
      console.log('✅ Admin notification email sent successfully');
    } catch (error) {
      results.adminError = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Failed to send admin email:', error);
    }

    // Send confirmation email to client
    try {
      const clientEmailContent = this.generateClientEmail(contactData);
      await this.transporter.sendMail({
        from: this.fromEmail,
        to: contactData.email,
        subject: 'Thank you for contacting MWC Advocates',
        html: clientEmailContent.htmlContent,
        text: clientEmailContent.textContent
      });
      
      results.clientSent = true;
      console.log('✅ Client confirmation email sent successfully');
    } catch (error) {
      results.clientError = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Failed to send client email:', error);
    }

    return results;
  }

  private generateAdminEmail(contactData: ContactFormData): EmailContent {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1a365d; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">MWC Advocates</h1>
          <h2 style="margin: 10px 0 0 0; font-weight: normal;">New Contact Form Submission</h2>
        </div>
        
        <div style="padding: 30px; background-color: #f8f9fa;">
          <div style="background-color: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #1a365d; margin-top: 0;">Contact Details</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Name:</td>
                <td style="padding: 8px 0;">${contactData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 8px 0;">${contactData.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                <td style="padding: 8px 0;">${contactData.phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td>
                <td style="padding: 8px 0;">${contactData.subject || 'General Inquiry'}</td>
              </tr>
            </table>
            
            <h3 style="color: #1a365d; margin-top: 25px;">Message</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; border-left: 4px solid #1a365d;">
              ${contactData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
        
        <div style="background-color: #1a365d; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">This email was sent from the MWC Advocates contact form</p>
          <p style="margin: 5px 0 0 0;">Please respond to ${contactData.email} directly</p>
        </div>
      </div>
    `;

    const text = `
MWC Advocates - New Contact Form Submission

Contact Details:
Name: ${contactData.name}
Email: ${contactData.email}
Phone: ${contactData.phone || 'Not provided'}
Subject: ${contactData.subject || 'General Inquiry'}

Message:
${contactData.message}

---
This email was sent from the MWC Advocates contact form.
Please respond to ${contactData.email} directly.
    `;

    return { 
      subject: `New Contact Form Submission - ${contactData.subject || 'General Inquiry'}`,
      htmlContent: html, 
      textContent: text 
    };
  }

  private generateClientEmail(contactData: ContactFormData): EmailContent {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1a365d; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">MWC Advocates</h1>
          <h2 style="margin: 10px 0 0 0; font-weight: normal;">Thank You for Contacting Us</h2>
        </div>
        
        <div style="padding: 30px; background-color: #f8f9fa;">
          <div style="background-color: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="font-size: 16px; line-height: 1.6; margin-top: 0;">Dear ${contactData.name},</p>
            
            <p style="font-size: 16px; line-height: 1.6;">
              Thank you for reaching out to MWC Advocates. We have received your message regarding 
              <strong>"${contactData.subject || 'General Inquiry'}"</strong> and appreciate you taking the time to contact us.
            </p>
            
            <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; border-left: 4px solid #1a365d; margin: 20px 0;">
              <h3 style="color: #1a365d; margin-top: 0;">What happens next?</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">We will review your inquiry within 24 hours</li>
                <li style="margin-bottom: 8px;">A member of our legal team will contact you directly</li>
                <li style="margin-bottom: 8px;">We'll schedule a consultation if needed</li>
              </ul>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6;">
              If you have any urgent legal matters or additional questions, please don't hesitate to call us directly.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; text-align: center; margin: 20px 0;">
              <p style="margin: 0; font-weight: bold; color: #1a365d;">Contact Information</p>
              <p style="margin: 5px 0;">Email: hello@kristianhans.com</p>
              <p style="margin: 5px 0;">Website: www.kristianhans.com</p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 0;">
              Best regards,<br>
              <strong>The MWC Advocates Team</strong>
            </p>
          </div>
        </div>
        
        <div style="background-color: #1a365d; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">© 2025 MWC Advocates. All rights reserved.</p>
          <p style="margin: 5px 0 0 0;">This is an automated confirmation email.</p>
        </div>
      </div>
    `;

    const text = `
MWC Advocates - Thank You for Contacting Us

Dear ${contactData.name},

Thank you for reaching out to MWC Advocates. We have received your message regarding "${contactData.subject || 'General Inquiry'}" and appreciate you taking the time to contact us.

What happens next?
- We will review your inquiry within 24 hours
- A member of our legal team will contact you directly
- We'll schedule a consultation if needed

If you have any urgent legal matters or additional questions, please don't hesitate to call us directly.

Contact Information:
Email: hello@kristianhans.com
Website: www.kristianhans.com

Best regards,
The MWC Advocates Team

---
© 2025 MWC Advocates. All rights reserved.
This is an automated confirmation email.
    `;

    return { 
      subject: 'Thank you for contacting MWC Advocates',
      htmlContent: html, 
      textContent: text 
    };
  }
}

export { ZohoEmailService };
export default new ZohoEmailService();
