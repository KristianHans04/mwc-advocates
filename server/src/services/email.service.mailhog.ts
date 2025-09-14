/**
 * MailHog Email Service for Development
 * Uses local MailHog SMTP server for testing emails
 */

import nodemailer from 'nodemailer';
import { EmailRecipient, EmailContent, ContactFormData, EmailSendResult, EmailService } from '../types/email.types';

class MailHogEmailService implements EmailService {
  private transporter: nodemailer.Transporter;
  private fromEmail: string;
  private adminEmail: string;

  constructor() {
    this.fromEmail = process.env.EMAIL_FROM || 'MWC Advocates <noreply@mwc-advocates.local>';
    this.adminEmail = process.env.ADMIN_EMAIL || 'admin@mwc-advocates.local';

    console.log('🔧 Initializing MailHog Email Service (Development)...');
    console.log('📧 MailHog Configuration:');
    console.log('   SMTP Host: localhost');
    console.log('   SMTP Port: 1025');
    console.log('   Web UI: http://localhost:8025');
    console.log('   From Email:', this.fromEmail);
    console.log('   Admin Email:', this.adminEmail);

    // Create MailHog SMTP transporter (no auth required)
    this.transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      secure: false,
      // No authentication required for MailHog
      tls: {
        rejectUnauthorized: false
      }
    });

    this.verifyConnection();
  }

  private async verifyConnection(): Promise<void> {
    try {
      await this.transporter.verify();
      console.log('✅ MailHog connection verified successfully');
      console.log('📧 View emails at: http://localhost:8025');
    } catch (error) {
      console.error('❌ MailHog connection failed:', error);
      console.warn('🔧 Make sure MailHog is running: docker run -p 1025:1025 -p 8025:8025 mailhog/mailhog');
    }
  }

  async sendContactFormEmails(contactData: ContactFormData): Promise<EmailSendResult> {
    console.log('📧 Sending contact form emails via MailHog (Development)...');
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
      console.log('✅ Admin notification email sent to MailHog');
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
      console.log('✅ Client confirmation email sent to MailHog');
    } catch (error) {
      results.clientError = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Failed to send client email:', error);
    }

    console.log('📧 Check MailHog at http://localhost:8025 to view sent emails');
    return results;
  }

  private generateAdminEmail(contactData: ContactFormData): EmailContent {
    const html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb;">
        <div style="background: linear-gradient(135deg, #14532d 0%, #166534 100%); color: white; padding: 30px; text-align: center;">
          <img src="https://mwc-advocates-frontend.onrender.com/img/MWC_WHITE.png" alt="MWC Advocates Logo" style="height: 60px; margin-bottom: 15px;" />
          <h1 style="margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">MASINDE WANYONYI & COMPANY ADVOCATES</h1>
          <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.95;">Commissioners for Oaths and Notary Public</p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
            <h2 style="margin: 0; font-size: 20px; font-weight: 400;">New Contact Form Submission</h2>
          </div>
        </div>
        
        <div style="padding: 30px; background-color: #fafafa;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <h3 style="color: #14532d; margin-top: 0; font-size: 18px; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">Contact Details</h3>
            
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
            
            <h3 style="color: #14532d; margin-top: 30px; font-size: 18px; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">Message</h3>
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 6px; border-left: 4px solid #16a34a; margin-top: 15px;">
              <p style="margin: 0; line-height: 1.6; color: #1f2937;">${contactData.message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-radius: 6px; border: 1px solid #fbbf24;">
              <p style="margin: 0; color: #92400e; font-weight: 600;">Development Mode:</p>
              <p style="margin: 8px 0 0 0; color: #78350f;">This email was sent via MailHog. Check http://localhost:8025</p>
            </div>
          </div>
        </div>
        
        <div style="background-color: #14532d; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0; font-size: 12px; opacity: 0.9;">This email was sent from the MWC Advocates contact form (Development)</p>
          <p style="margin: 8px 0 0 0; font-size: 12px; opacity: 0.9;">Please respond to ${contactData.email} directly</p>
          <p style="margin: 16px 0 0 0; font-size: 11px; opacity: 0.7;">Providing excellence in legal solutions</p>
        </div>
      </div>
    `;

    const text = `
MWC Advocates - New Contact Form Submission (Development)

Contact Details:
Name: ${contactData.name}
Email: ${contactData.email}
Phone: ${contactData.phone || 'Not provided'}
Subject: ${contactData.subject || 'General Inquiry'}

Message:
${contactData.message}

---
⚠️ Development Mode: This email was sent via MailHog
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
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb;">
        <div style="background: linear-gradient(135deg, #14532d 0%, #166534 100%); color: white; padding: 30px; text-align: center;">
          <img src="https://mwc-advocates-frontend.onrender.com/img/MWC_WHITE.png" alt="MWC Advocates Logo" style="height: 60px; margin-bottom: 15px;" />
          <h1 style="margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">MASINDE WANYONYI & COMPANY ADVOCATES</h1>
          <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.95;">Commissioners for Oaths and Notary Public</p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
            <h2 style="margin: 0; font-size: 20px; font-weight: 400;">Welcome to MWC Advocates</h2>
          </div>
        </div>
        
        <div style="padding: 30px; background-color: #fafafa;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <p style="font-size: 16px; line-height: 1.8; margin-top: 0; color: #1f2937;">Dear ${contactData.name},</p>
            
            <p style="font-size: 16px; line-height: 1.8; color: #374151;">
              Welcome to MWC Advocates. We are delighted to receive your inquiry and thank you for considering our firm for your legal needs.
            </p>
            
            <p style="font-size: 16px; line-height: 1.8; color: #374151;">
              We have successfully received your message regarding <strong style="color: #14532d;">"${contactData.subject || 'General Inquiry'}"</strong> and our team is already reviewing your request.
            </p>
            
            <div style="background-color: #f0fdf4; padding: 25px; border-radius: 8px; border-left: 4px solid #16a34a; margin: 30px 0;">
              <h3 style="color: #14532d; margin-top: 0; font-size: 18px;">Your Next Steps</h3>
              <ol style="margin: 0; padding-left: 20px; color: #374151; line-height: 1.8;">
                <li style="margin-bottom: 10px;">Your inquiry will be reviewed by our legal team within 24 hours</li>
                <li style="margin-bottom: 10px;">A qualified advocate will contact you directly to discuss your matter</li>
                <li style="margin-bottom: 10px;">We will schedule a consultation at your convenience</li>
                <li style="margin-bottom: 0;">You will receive clear guidance on how we can assist you</li>
              </ol>
            </div>
            
            <div style="background-color: #fff7ed; padding: 25px; border-radius: 8px; margin: 30px 0; border: 1px solid #fed7aa;">
              <h3 style="color: #14532d; margin-top: 0; font-size: 18px;">Why Choose MWC Advocates?</h3>
              <p style="margin: 12px 0 0 0; color: #374151; line-height: 1.8;">
                With years of experience serving clients across Kenya, we combine deep legal expertise with a commitment to personalized service. Our team of qualified advocates, commissioners for oaths, and notary public professionals are dedicated to providing excellence in legal solutions.
              </p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.8; color: #374151;">
              Should you require immediate assistance or have any urgent legal matters, please do not hesitate to contact us directly using the information below.
            </p>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; text-align: center; margin: 30px 0; border: 1px solid #e5e7eb;">
              <h4 style="margin: 0 0 15px 0; color: #14532d; font-size: 16px;">Contact Information</h4>
              <p style="margin: 8px 0; color: #374151;"><strong>Phone:</strong> +254 702 073 800 / +254 708 792 078</p>
              <p style="margin: 8px 0; color: #374151;"><strong>Email:</strong> masindewanyonyi.co@gmail.com</p>
              <p style="margin: 8px 0; color: #374151;"><strong>Office:</strong> Suite 58 Duplex Suites, Lower Hill Road, Upperhill, Nairobi</p>
              <p style="margin: 8px 0 0 0; color: #374151;"><strong>Hours:</strong> Monday - Friday: 8:00 AM - 6:00 PM</p>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-radius: 6px; border: 1px solid #fbbf24;">
              <p style="margin: 0; color: #92400e; font-weight: 600;">Development Mode:</p>
              <p style="margin: 8px 0 0 0; color: #78350f;">This is a test email sent via MailHog. View at http://localhost:8025</p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.8; color: #374151;">
              We look forward to serving you and building a lasting professional relationship.
            </p>
            
            <p style="font-size: 16px; line-height: 1.8; margin-bottom: 0; color: #1f2937;">
              Warm regards,<br><br>
              <strong style="color: #14532d;">The MWC Advocates Team</strong><br>
              <span style="font-size: 14px; color: #6b7280;">Providing excellence in legal solutions</span>
            </p>
          </div>
        </div>
        
        <div style="background-color: #14532d; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0; font-size: 12px; opacity: 0.9;">© 2025 Masinde Wanyonyi & Company Advocates. All rights reserved.</p>
          <p style="margin: 8px 0 0 0; font-size: 11px; opacity: 0.7;">This is an automated confirmation email (Development). Please do not reply.</p>
          <p style="margin: 8px 0 0 0; font-size: 11px; opacity: 0.7;">Commissioners for Oaths and Notary Public</p>
        </div>
      </div>
    `;

    const text = `
MWC Advocates - Thank You for Contacting Us (Development)

Dear ${contactData.name},

Thank you for reaching out to MWC Advocates. We have received your message regarding "${contactData.subject || 'General Inquiry'}" and appreciate you taking the time to contact us.

What happens next?
- We will review your inquiry within 24 hours
- A member of our legal team will contact you directly
- We'll schedule a consultation if needed

⚠️ Development Mode: This is a test email sent via MailHog

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

export { MailHogEmailService };
export default new MailHogEmailService();