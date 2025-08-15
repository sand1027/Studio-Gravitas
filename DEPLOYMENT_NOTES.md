# Deployment Notes

## Data Persistence

### Current Setup (Development)
- Projects are stored in `src/app/data/projects.json`
- When you upload/edit projects, they modify this JSON file
- This works locally but has limitations when deployed

### For Production Deployment

#### Option 1: Database (Recommended)
- Use a database like MongoDB, PostgreSQL, or Supabase
- Store projects in database tables instead of JSON files
- Provides true persistence across all users and deployments

#### Option 2: Cloud Storage
- Use services like AWS S3, Google Cloud Storage
- Store JSON file in cloud storage
- Update API routes to read/write from cloud storage

#### Option 3: Headless CMS
- Use services like Strapi, Contentful, or Sanity
- Manage projects through CMS interface
- API routes fetch from CMS

### Current Limitations
- JSON file changes are lost on redeployment (Vercel, Netlify)
- File system writes don't work on serverless platforms
- Changes are not shared across multiple server instances

### Quick Fix for Hosting
If you need to deploy quickly:
1. Use a database service like Supabase (free tier available)
2. Replace JSON file operations with database queries
3. This ensures all users see the same data globally

## Image Storage
- Currently using external URLs (Pexels)
- For production, consider:
  - Cloudinary for image management
  - AWS S3 for file storage
  - Next.js Image Optimization