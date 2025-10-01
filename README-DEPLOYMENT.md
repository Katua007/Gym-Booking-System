# Vercel Deployment Guide

## Prerequisites
1. GitHub account
2. Vercel account (free)

## Deployment Steps

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to vercel.com
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

3. **Environment Variables (Optional):**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add: `JWT_SECRET_KEY` = your-secret-key
   - Add: `DATABASE_URL` = your-database-url (for production DB)

## Project Structure for Vercel
```
/
├── api/                    # Backend (Python/Flask)
│   ├── index.py           # Main API file
│   └── requirements.txt   # Python dependencies
├── Gym Booking System/    # Frontend (React)
│   ├── src/
│   ├── public/
│   └── package.json
├── vercel.json           # Vercel configuration
└── README.md
```

## API Endpoints
- `/api/register` - User registration
- `/api/login` - User login
- `/api/profile` - User profile

## Notes
- SQLite database will reset on each deployment (use PostgreSQL for production)
- Frontend builds automatically
- API runs on serverless functions