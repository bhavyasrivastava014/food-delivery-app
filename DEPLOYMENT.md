# GoFood MERN Stack Deployment Guide

## Overview
This guide covers deploying your GoFood application with:
- **Frontend (React)**: Vercel
- **Backend (Node.js/Express)**: Render
- **Database**: MongoDB Atlas

## Prerequisites
- Node.js installed
- Git repository
- Accounts on Vercel, Render, and MongoDB Atlas

## 1. MongoDB Atlas Setup

### Database Configuration
1. Create MongoDB Atlas account at https://cloud.mongodb.com/
2. Create a new cluster or use existing one
3. Create database user with read/write permissions
4. Whitelist IP addresses (0.0.0.0/0 for all IPs or specific IPs)
5. Get connection string from "Connect" → "Connect your application"

### Connection String Format:
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

## 2. Backend Deployment on Render

### Steps:
1. **Create Render Account**: Sign up at https://render.com/
2. **Connect Repository**: Link your GitHub/GitLab repository
3. **Create Web Service**:
   - Select your repository
   - Choose `backend` folder as root directory
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`

### Environment Variables on Render:
Set these in Render dashboard → Your Service → Environment:
```
mongoURI=mongodb+srv://testuser:testpass123@cluster0.syf7z.mongodb.net/gofoodmern?retryWrites=true&w=majority
NODE_ENV=production
JWT_SECRET=your_secure_jwt_secret_key_here_minimum_32_characters
FRONTEND_URL=https://your-gofood-app.vercel.app
PORT=5000
```

### PM2 Setup (Optional for Render):
PM2 is configured but not necessary on Render. Use for VPS deployments:
```bash
npm install -g pm2
npm run pm2:start
```

## 3. Frontend Deployment on Vercel

### Steps:
1. **Create Vercel Account**: Sign up at https://vercel.com/
2. **Import Project**: Connect your GitHub repository
3. **Configure Build**:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

### Environment Variables on Vercel:
Set these in Vercel dashboard → Your Project → Settings → Environment Variables:
```
REACT_APP_API_URL=https://your-backend-app.onrender.com
REACT_APP_ENVIRONMENT=production
GENERATE_SOURCEMAP=false
```

### Domain Configuration:
1. After deployment, note your Vercel domain (e.g., `your-app.vercel.app`)
2. Update backend CORS configuration with your actual domain
3. Update `FRONTEND_URL` in Render environment variables

## 4. Post-Deployment Configuration

### Update CORS in Backend:
Replace `https://your-gofood-app.vercel.app` in `backend/index.js` with your actual Vercel domain.

### Update API URLs in Frontend:
Replace all `http://localhost:5000` with your Render backend URL in:
- `src/screens/Cart.js`
- `src/screens/Login.js`
- `src/screens/Signup.js`
- Any other files making API calls

## 5. Testing Deployment

### Backend Testing:
1. Visit your Render URL: `https://your-backend-app.onrender.com/`
2. Should see "Hello World!" message
3. Test API endpoints: `https://your-backend-app.onrender.com/api/foodData`

### Frontend Testing:
1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Test all functionality:
   - User registration/login
   - Food browsing
   - Cart operations
   - Order placement

## 6. Troubleshooting

### Common Issues:
1. **CORS Errors**: Verify frontend URL in backend CORS configuration
2. **Database Connection**: Check MongoDB Atlas IP whitelist and credentials
3. **Environment Variables**: Ensure all variables are set correctly on both platforms
4. **Build Failures**: Check package.json scripts and dependencies

### Logs:
- **Render**: View logs in Render dashboard → Your Service → Logs
- **Vercel**: View logs in Vercel dashboard → Your Project → Functions

## 7. Custom Domain (Optional)

### Vercel Custom Domain:
1. Go to Vercel dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Configure DNS as instructed

### Render Custom Domain:
1. Go to Render dashboard → Your Service → Settings
2. Add custom domain under "Custom Domains"
3. Configure DNS as instructed

## 8. Security Considerations

### Production Checklist:
- [ ] Use strong JWT secret (minimum 32 characters)
- [ ] Enable HTTPS only
- [ ] Restrict CORS origins to your domains only
- [ ] Use environment variables for all secrets
- [ ] Enable MongoDB Atlas IP restrictions
- [ ] Regular security updates

## 9. Monitoring and Maintenance

### Recommended Tools:
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Error Tracking**: Sentry
- **Performance**: Google Analytics, Vercel Analytics
- **Database**: MongoDB Atlas monitoring

### Backup Strategy:
- MongoDB Atlas automatic backups
- Git repository backups
- Environment variables documentation

## Support

For issues:
1. Check service status pages (Vercel, Render, MongoDB Atlas)
2. Review deployment logs
3. Test locally first
4. Contact platform support if needed

---

**Last Updated**: December 2024
**Version**: 1.0
