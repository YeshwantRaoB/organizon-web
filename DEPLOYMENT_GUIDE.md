# Deployment Guide

This guide will help you deploy your Organizon Organics e-commerce platform to production.

---

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All environment variables are ready
- [ ] Images are added (or placeholders are acceptable)
- [ ] Content is updated (contact info, etc.)
- [ ] Local build succeeds (`npm run build`)
- [ ] All tests pass
- [ ] No console errors

---

## Option 1: Vercel (Recommended)

Vercel is the easiest and fastest way to deploy Next.js applications.

### Step 1: Prepare Your Repository

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Ensure .gitignore is correct:**
   ```
   node_modules/
   .next/
   .env.local
   .DS_Store
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign up or log in with GitHub

2. **Import Project:**
   - Click "Add New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project:**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (or `organizon-web` if in subfolder)
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Add Environment Variables:**
   Click "Environment Variables" and add:
   ```
   MONGODB_URI=your_mongodb_uri
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_CLIENT_EMAIL=your_service_account_email
   FIREBASE_PRIVATE_KEY=your_private_key
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ADMIN_EMAIL=your_admin_email
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (2-5 minutes)
   - Your site will be live at `your-project.vercel.app`

### Step 3: Configure Custom Domain (Optional)

1. **Add Domain:**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update DNS:**
   - Add CNAME record pointing to Vercel
   - Wait for DNS propagation (up to 48 hours)

3. **SSL Certificate:**
   - Automatically provisioned by Vercel
   - No additional configuration needed

---

## Option 2: Netlify

### Step 1: Prepare Repository

Same as Vercel - push to GitHub.

### Step 2: Deploy to Netlify

1. **Go to Netlify:**
   - Visit https://netlify.com
   - Sign up or log in

2. **Import Project:**
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository

3. **Configure Build:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Base directory: `organizon-web` (if in subfolder)

4. **Add Environment Variables:**
   - Go to Site settings → Environment variables
   - Add all environment variables (same as Vercel)

5. **Deploy:**
   - Click "Deploy site"
   - Wait for build to complete

---

## Option 3: Custom Server (VPS/Cloud)

For more control, deploy to your own server.

### Requirements:
- Ubuntu 20.04+ or similar Linux distribution
- Node.js 18+
- Nginx (for reverse proxy)
- PM2 (for process management)
- SSL certificate (Let's Encrypt)

### Step 1: Server Setup

1. **Update System:**
   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```

2. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

3. **Install PM2:**
   ```bash
   sudo npm install -g pm2
   ```

4. **Install Nginx:**
   ```bash
   sudo apt install -y nginx
   ```

### Step 2: Deploy Application

1. **Clone Repository:**
   ```bash
   cd /var/www
   git clone YOUR_REPO_URL organizon
   cd organizon/organizon-web
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Create .env.local:**
   ```bash
   nano .env.local
   # Add all environment variables
   ```

4. **Build Application:**
   ```bash
   npm run build
   ```

5. **Start with PM2:**
   ```bash
   pm2 start npm --name "organizon" -- start
   pm2 save
   pm2 startup
   ```

### Step 3: Configure Nginx

1. **Create Nginx Config:**
   ```bash
   sudo nano /etc/nginx/sites-available/organizon
   ```

2. **Add Configuration:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. **Enable Site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/organizon /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Step 4: SSL Certificate

1. **Install Certbot:**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   ```

2. **Get Certificate:**
   ```bash
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

3. **Auto-Renewal:**
   ```bash
   sudo certbot renew --dry-run
   ```

---

## Common Deployment Issues

### Issue: Build Fails

**Error:** `useSearchParams() should be wrapped in a suspense boundary`

**Solution:** Already fixed in the code. The search page now uses Suspense.

**Error:** `Module not found`

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: Environment Variables Not Working

**Solution:**
- Ensure all variables are added in deployment platform
- Check variable names match exactly
- Restart deployment after adding variables
- For Vercel/Netlify, redeploy after adding variables

### Issue: Database Connection Fails

**Solution:**
- Verify MongoDB URI is correct
- Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for all IPs)
- Ensure database user has correct permissions
- Test connection locally first

### Issue: Firebase Authentication Not Working

**Solution:**
- Add deployment domain to Firebase authorized domains
- Go to Firebase Console → Authentication → Settings → Authorized domains
- Add your Vercel/Netlify domain
- Wait a few minutes for changes to propagate

### Issue: Images Not Loading

**Solution:**
- Check Cloudinary credentials
- Verify upload preset is "unsigned"
- Ensure images are uploaded to correct folder
- Check browser console for CORS errors

---

## Post-Deployment Steps

### 1. Verify Deployment

- [ ] Visit your deployed URL
- [ ] Test all pages load correctly
- [ ] Try signing in
- [ ] Test adding products to cart
- [ ] Check admin panel access
- [ ] Verify images display

### 2. Configure DNS

- [ ] Point domain to deployment
- [ ] Wait for DNS propagation
- [ ] Verify SSL certificate

### 3. Set Up Monitoring

**Vercel:**
- Analytics automatically enabled
- Check deployment logs
- Set up error tracking

**Custom Server:**
- Set up PM2 monitoring: `pm2 monit`
- Configure log rotation
- Set up uptime monitoring (UptimeRobot, etc.)

### 4. Enable Analytics

1. **Google Analytics:**
   - Create GA4 property
   - Add tracking code to layout.tsx
   - Verify tracking works

2. **Search Console:**
   - Add property
   - Verify ownership
   - Submit sitemap

### 5. Performance Optimization

- [ ] Enable caching
- [ ] Optimize images
- [ ] Enable compression
- [ ] Set up CDN (if not using Vercel)

---

## Continuous Deployment

### Vercel/Netlify (Automatic)

- Push to main branch → Automatic deployment
- Pull requests → Preview deployments
- No additional configuration needed

### Custom Server (Manual)

1. **Create Deploy Script:**
   ```bash
   #!/bin/bash
   cd /var/www/organizon/organizon-web
   git pull origin main
   npm install
   npm run build
   pm2 restart organizon
   ```

2. **Make Executable:**
   ```bash
   chmod +x deploy.sh
   ```

3. **Deploy:**
   ```bash
   ./deploy.sh
   ```

---

## Rollback Procedure

### Vercel/Netlify

1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

### Custom Server

1. **Revert Git:**
   ```bash
   git revert HEAD
   git push
   ```

2. **Or Checkout Previous Commit:**
   ```bash
   git checkout PREVIOUS_COMMIT_HASH
   npm install
   npm run build
   pm2 restart organizon
   ```

---

## Backup Strategy

### Database Backups

**MongoDB Atlas:**
- Automatic backups enabled by default
- Configure backup schedule
- Test restore procedure

**Self-Hosted MongoDB:**
```bash
# Backup
mongodump --uri="mongodb://localhost:27017/organizon" --out=/backups/$(date +%Y%m%d)

# Restore
mongorestore --uri="mongodb://localhost:27017/organizon" /backups/20231205
```

### Code Backups

- GitHub repository (primary backup)
- Local clone (secondary backup)
- Deployment platform (tertiary backup)

---

## Security Checklist

- [ ] Environment variables secured
- [ ] HTTPS enabled
- [ ] Firebase security rules configured
- [ ] MongoDB access restricted
- [ ] Admin routes protected
- [ ] API rate limiting (optional)
- [ ] CORS configured correctly
- [ ] Security headers set

---

## Support Resources

**Vercel:**
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

**Netlify:**
- Docs: https://docs.netlify.com
- Support: https://www.netlify.com/support

**Next.js:**
- Docs: https://nextjs.org/docs
- Deployment: https://nextjs.org/docs/deployment

---

## Quick Reference

**Build Command:** `npm run build`
**Start Command:** `npm start`
**Dev Command:** `npm run dev`
**Port:** 3000 (default)

**Environment Variables:** See `.env.local.example`
**Node Version:** 18+
**Package Manager:** npm

---

**Last Updated:** December 5, 2025
**Version:** 1.0.0
