# Quick Start Guide

Get your Organizon Organics website up and running in minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- MongoDB database (local or Atlas)
- Firebase project setup
- Cloudinary account (for image uploads)

## Step 1: Install Dependencies

```bash
cd organizon-web
npm install
```

## Step 2: Environment Setup

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/organizon
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/organizon

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (for server-side)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Email (for admin access)
ADMIN_EMAIL=your-admin@email.com
```

## Step 3: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Enable Google Authentication:
   - Go to Authentication > Sign-in method
   - Enable Google provider
4. Get your config:
   - Project Settings > General
   - Copy the config values to `.env.local`
5. Generate service account key:
   - Project Settings > Service Accounts
   - Generate new private key
   - Copy values to `.env.local`

## Step 4: MongoDB Setup

### Option A: Local MongoDB
```bash
# Install MongoDB locally
# Start MongoDB service
mongod

# Database will be created automatically
```

### Option B: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address
5. Get connection string
6. Add to `.env.local`

## Step 5: Cloudinary Setup

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for free account
3. Get your credentials from Dashboard
4. Create an upload preset:
   - Settings > Upload
   - Add upload preset
   - Set to "unsigned"
   - Copy preset name to `.env.local`

## Step 6: Seed Database (Optional)

Add sample products to your database:

```bash
node scripts/seed-products.js
```

This will create 50+ sample organic products.

## Step 7: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 8: Test the Application

### Test User Authentication
1. Click "Sign In" button
2. Sign in with Google
3. Check if your profile appears

### Test Product Catalog
1. Go to "Shop" or `/catalog`
2. Try filtering by category
3. Try sorting products

### Test Shopping Cart
1. Add products to cart
2. Update quantities
3. Remove items
4. Check order summary

### Test Admin Panel (if you're admin)
1. Sign in with admin email
2. Go to `/admin/products`
3. Try creating a product
4. Upload an image
5. Edit/delete products

## Common Issues & Solutions

### Issue: "Firebase not initialized"
**Solution:** Check your Firebase config in `.env.local`

### Issue: "MongoDB connection failed"
**Solution:** 
- Verify MongoDB is running
- Check connection string
- Whitelist IP in Atlas

### Issue: "Images not uploading"
**Solution:**
- Verify Cloudinary credentials
- Check upload preset is unsigned
- Check browser console for errors

### Issue: "Admin panel not accessible"
**Solution:**
- Verify your email matches ADMIN_EMAIL in `.env.local`
- Sign out and sign in again
- Check Firebase Auth user email

### Issue: "Build fails"
**Solution:**
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## Project Structure Overview

```
organizon-web/
├── src/app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── catalog/              # Product catalog
│   ├── cart/                 # Shopping cart
│   ├── contact/              # Contact page
│   ├── gallery/              # Image gallery
│   ├── admin/                # Admin panel
│   ├── components/           # Reusable components
│   └── lib/                  # Utilities
├── public/                   # Static files
├── scripts/                  # Utility scripts
└── .env.local               # Environment variables
```

## Next Steps

1. **Add Your Images**
   - See `IMAGE_GUIDE.md` for details
   - Replace placeholders with actual images

2. **Customize Content**
   - Update contact information
   - Modify brand story
   - Add your products

3. **Configure Admin**
   - Set admin email in `.env.local`
   - Test admin panel access

4. **Deploy**
   - See `DEPLOYMENT.md` for deployment guide
   - Deploy to Vercel, Netlify, or your server

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Seed database
node scripts/seed-products.js
```

## Getting Help

- Check `README.md` for detailed documentation
- See `DESIGN_CHANGES.md` for design details
- Read `IMAGE_GUIDE.md` for image instructions
- Review code comments for inline help

## Production Checklist

Before deploying to production:

- [ ] All environment variables set
- [ ] Firebase authentication working
- [ ] MongoDB connected and seeded
- [ ] Images uploaded and optimized
- [ ] Contact information updated
- [ ] Admin access configured
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Analytics added (optional)
- [ ] Error tracking setup (optional)

## Support

For issues or questions:
- Check documentation files
- Review code comments
- Test in development first
- Check browser console for errors

Happy coding! 🚀
