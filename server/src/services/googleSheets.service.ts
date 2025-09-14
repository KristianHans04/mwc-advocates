/**
 * Google Sheets Database Service
 * Free alternative to traditional databases using Google Sheets API
 */

import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export interface SheetRow {
  [key: string]: any;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  created_at?: string;
}

class GoogleSheetsService {
  private sheets: any;
  private auth: JWT;
  private spreadsheetId: string;
  private isInitialized: boolean = false;

  constructor() {
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID || '';
    
    // Initialize auth with service account
    this.auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
  }

  /**
   * Initialize connection and verify access
   */
  async initialize(): Promise<boolean> {
    try {
      if (!this.spreadsheetId || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
        console.warn('⚠️ Google Sheets credentials not configured');
        return false;
      }

      // Test connection by getting spreadsheet metadata
      await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId,
      });

      this.isInitialized = true;
      console.log('✅ Google Sheets connected successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to connect to Google Sheets:', error);
      this.isInitialized = false;
      return false;
    }
  }

  /**
   * Get all rows from a specific sheet
   */
  async getRows(sheetName: string): Promise<SheetRow[]> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:Z`, // Get all columns A to Z
      });

      const rows = response.data.values || [];
      if (rows.length === 0) return [];

      // First row contains headers
      const headers = rows[0];
      const data = rows.slice(1);

      // Convert to objects
      return data.map((row: any[]) => {
        const obj: SheetRow = {};
        headers.forEach((header: string, index: number) => {
          obj[header] = row[index] || '';
        });
        return obj;
      });
    } catch (error) {
      console.error(`Error reading ${sheetName}:`, error);
      return [];
    }
  }

  /**
   * Append a new row to a sheet
   */
  async appendRow(sheetName: string, data: SheetRow): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      // Get headers first
      const headersResponse = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!1:1`,
      });

      const headers = headersResponse.data.values?.[0] || [];
      
      // Create row data in correct order
      const rowData = headers.map((header: string) => {
        if (header === 'id' && !data.id) {
          return Date.now().toString(); // Generate ID
        }
        if (header === 'created_at' && !data.created_at) {
          return new Date().toISOString();
        }
        return data[header] || '';
      });

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:Z`,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [rowData],
        },
      });

      return true;
    } catch (error) {
      console.error(`Error appending to ${sheetName}:`, error);
      return false;
    }
  }

  /**
   * Update a specific row
   */
  async updateRow(sheetName: string, rowIndex: number, data: SheetRow): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      // Get headers
      const headersResponse = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!1:1`,
      });

      const headers = headersResponse.data.values?.[0] || [];
      
      // Create row data in correct order
      const rowData = headers.map((header: string) => data[header] || '');

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A${rowIndex + 2}:Z${rowIndex + 2}`, // +2 because row 1 is headers, and sheets are 1-indexed
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [rowData],
        },
      });

      return true;
    } catch (error) {
      console.error(`Error updating ${sheetName}:`, error);
      return false;
    }
  }

  /**
   * Delete a row (actually just marks it as inactive)
   */
  async deleteRow(sheetName: string, rowIndex: number): Promise<boolean> {
    try {
      const rows = await this.getRows(sheetName);
      if (rowIndex >= rows.length) return false;

      const row = rows[rowIndex];
      if (!row) return false;
      
      row.active = 'false';
      row.deleted_at = new Date().toISOString();

      return await this.updateRow(sheetName, rowIndex, row);
    } catch (error) {
      console.error(`Error deleting from ${sheetName}:`, error);
      return false;
    }
  }

  /**
   * Service-specific methods
   */
  async getServices() {
    const rows = await this.getRows('services');
    return rows.filter(row => row.active !== 'false').map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      icon: row.icon,
      features: row.features ? row.features.split(',').map((f: string) => f.trim()) : [],
    }));
  }

  async getTestimonials() {
    const rows = await this.getRows('testimonials');
    return rows.filter(row => row.active !== 'false').map(row => ({
      id: row.id,
      client_name: row.client_name,
      position: row.position,
      company: row.company,
      content: row.content,
      rating: parseInt(row.rating) || 5,
    }));
  }

  async saveContactSubmission(data: ContactSubmission) {
    return await this.appendRow('contact_submissions', {
      ...data,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    });
  }

  async getTeamMembers() {
    const rows = await this.getRows('team_members');
    return rows.filter(row => row.active !== 'false').map(row => ({
      id: row.id,
      name: row.name,
      position: row.position,
      bio: row.bio,
      image_url: row.image_url,
      email: row.email,
    }));
  }

  async getFAQs() {
    const rows = await this.getRows('faqs');
    return rows
      .filter(row => row.active !== 'false')
      .sort((a, b) => (parseInt(a.order) || 0) - (parseInt(b.order) || 0))
      .map(row => ({
        id: row.id,
        question: row.question,
        answer: row.answer,
        category: row.category,
      }));
  }

  /**
   * Check if service is available
   */
  isAvailable(): boolean {
    return this.isInitialized;
  }
}

// Export singleton instance
export default new GoogleSheetsService();