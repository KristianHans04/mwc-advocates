# Google Sheets Database Setup Guide

## Step 1: Create Google Cloud Project & Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

4. Create Service Account:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Name it (e.g., "mwc-advocates-sheets")
   - Click "Create and Continue"
   - Grant role: "Editor" or "Owner"
   - Click "Done"

5. Generate JSON Key:
   - Click on the service account you created
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose JSON format
   - Download the file (keep it secure!)

## Step 2: Create Your Google Sheets Database

1. Create a new Google Sheet
2. Create these sheets (tabs):
   - `services` - For legal services
   - `testimonials` - For client testimonials
   - `contact_submissions` - For contact form submissions
   - `team_members` - For team/attorney information
   - `faqs` - For frequently asked questions

3. Set up column headers:

### Services Sheet:
| id | title | description | icon | features | active | created_at |
|----|-------|-------------|------|----------|--------|------------|

### Testimonials Sheet:
| id | client_name | position | company | content | rating | active | created_at |
|----|-------------|----------|---------|---------|--------|--------|------------|

### Contact Submissions Sheet:
| id | name | email | phone | subject | message | created_at |
|----|------|-------|-------|---------|---------|------------|

### Team Members Sheet:
| id | name | position | bio | image_url | email | active | created_at |
|----|------|----------|-----|-----------|-------|--------|------------|

### FAQs Sheet:
| id | question | answer | category | order | active | created_at |
|----|----------|--------|----------|-------|--------|------------|

4. Share the Sheet with Service Account:
   - Open your Google Sheet
   - Click "Share" button
   - Add the service account email (found in the JSON key file, looks like: xxxxx@xxxxx.iam.gserviceaccount.com)
   - Give "Editor" permission
   - Click "Send"

## Step 3: Get Your Sheet ID

1. Open your Google Sheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
3. Copy the SHEET_ID part

## Step 4: Set Environment Variables

Add these to your `.env` file:

```env
# Google Sheets Configuration
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email@xxxxx.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"
```

**For Render deployment:**
1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Add these variables:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY` (paste the entire private key including BEGIN/END lines)

## Step 5: Add Sample Data

Add some sample data to your sheets:

### Services Sheet Example:
```
1 | Corporate Law | Legal services for businesses | briefcase | Formation, Contracts, Compliance | true | 2024-01-01
2 | Family Law | Divorce and custody matters | users | Divorce, Custody, Support | true | 2024-01-01
```

### Testimonials Sheet Example:
```
1 | John Doe | CEO | Tech Corp | Excellent legal services! | 5 | true | 2024-01-01
2 | Jane Smith | Director | Finance Inc | Very professional team | 5 | true | 2024-01-01
```

## Limitations & Considerations

1. **Rate Limits**: Google Sheets API has quotas (100 requests per 100 seconds)
2. **Performance**: Not suitable for high-traffic sites (>1000 requests/day)
3. **Size Limits**: 10 million cells per spreadsheet
4. **No complex queries**: Limited to basic CRUD operations
5. **Caching recommended**: Implement caching to reduce API calls

## Benefits

1. **Free**: No database hosting costs
2. **Easy Management**: Edit data directly in Google Sheets
3. **Version History**: Google Sheets tracks all changes
4. **Collaboration**: Multiple people can manage content
5. **Export Options**: Easy to export/backup data