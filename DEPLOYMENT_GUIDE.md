# Deployment Guide

## Backend Deployment (Render)

1. **Create Render Account**: Go to https://render.com and sign up
2. **Connect GitHub**: Link your GitHub account to Render
3. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect your repository
   - Select the `e-commerce/backend` directory
   - Configure:
     - **Name**: your-app-backend
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: Free

4. **Set Environment Variables** in Render dashboard:
   ```
   MONGO_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_secure_jwt_secret_here
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   ```

5. **Deploy**: Click "Create Web Service"
6. **Note the URL**: Copy your backend URL (e.g., https://your-app-backend.onrender.com)

## Frontend Deployment (Netlify)

1. **Create Netlify Account**: Go to https://netlify.com and sign up
2. **Connect GitHub**: Link your GitHub account
3. **Create New Site**:
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Configure:
     - **Base directory**: `e-commerce`
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`

4. **Set Environment Variables** in Netlify dashboard:
   - Go to Site settings → Environment variables
   - Add:
     ```
     VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
     VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
     ```

5. **Deploy**: Click "Deploy site"

## Post-Deployment Steps

1. **Update CORS**: Add your Netlify domain to backend CORS settings
2. **Test**: Verify all functionality works with production URLs
3. **SSL**: Both platforms provide HTTPS automatically

## Important Notes

- Replace `your-backend-url.onrender.com` with your actual Render URL
- Keep your Stripe keys secure
- MongoDB Atlas is already configured for cloud access
- Free tier limitations: Render spins down after 15 minutes of inactivity