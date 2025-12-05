# Organizon Organics - E-commerce Platform

A modern, fully-featured e-commerce platform for selling organic food products. Built with Next.js 16, TypeScript, Tailwind CSS, and Firebase.

## Features

- **Modern Design**: Clean, professional design inspired by Shopify with a focus on organic/natural aesthetics
- **Responsive Layout**: Fully responsive design that works seamlessly on desktop, tablet, and mobile
- **Product Catalog**: Browse 200+ organic products with filtering and sorting capabilities
- **Shopping Cart**: Full-featured cart with quantity management and order summary
- **User Authentication**: Firebase-based Google Sign-In with user profile management
- **Product Gallery**: Beautiful image gallery with lightbox functionality
- **Contact Form**: Professional contact page with multiple contact methods
- **Admin Panel**: Product management system for administrators

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: Firebase Auth
- **Database**: MongoDB
- **Image Upload**: Cloudinary
- **State Management**: React Hooks

## Color Scheme

The design uses a natural, organic color palette:
- Primary Green: `#2d5016` (Dark forest green)
- Secondary Green: `#3d6820` (Medium green)
- Background: `#f8f9f5` (Light cream/beige)
- Text: Gray scale for optimal readability

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env.local`:
```
MONGODB_URI=your_mongodb_connection_string
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
organizon-web/
├── src/
│   └── app/
│       ├── components/          # Reusable components
│       │   ├── PlaceholderImage.tsx
│       │   ├── ProductCard.tsx
│       │   └── SignInButton.tsx
│       ├── lib/                 # Utilities and configurations
│       │   ├── firebaseClient.ts
│       │   ├── firebaseAdmin.ts
│       │   ├── mongo.ts
│       │   └── cloudinary.ts
│       ├── admin/               # Admin pages
│       ├── cart/                # Shopping cart
│       ├── catalog/             # Product catalog
│       ├── contact/             # Contact page
│       ├── gallery/             # Image gallery
│       ├── layout.tsx           # Root layout
│       ├── page.tsx             # Homepage
│       └── globals.css          # Global styles
├── public/                      # Static assets
└── scripts/                     # Utility scripts
    └── seed-products.js         # Database seeding
```

## Key Pages

### Customer Pages
- **Homepage** (`/`): Hero section with brand story and featured content
- **Catalog** (`/catalog`): Product listing with filters and sorting
- **Product Detail** (`/products/[id]`): Individual product pages with full details
- **Cart** (`/cart`): Shopping cart with quantity management
- **Search** (`/search`): Product search functionality
- **Gallery** (`/gallery`): Product image gallery with lightbox
- **About** (`/about`): Company story, values, and process
- **Contact** (`/contact`): Contact form and information
- **FAQ** (`/faq`): Frequently asked questions

### Policy Pages
- **Shipping Policy** (`/policies/shipping`): Delivery information
- **Return & Refund** (`/policies/returns`): Return process and refunds
- **Privacy Policy** (`/policies/privacy`): Data protection and privacy
- **Terms of Service** (`/policies/terms`): Legal terms and conditions

### Admin Pages
- **Admin Dashboard** (`/admin/products`): Product management (requires authentication)
- **Create Product** (`/admin/products/create`): Add new products
- **Edit Product** (`/admin/products/edit/[id]`): Update products

## Design Philosophy

The design follows these principles:
1. **Clean & Minimal**: Focus on products and content
2. **Natural Colors**: Earth tones that reflect organic nature
3. **Clear Typography**: Easy-to-read fonts with proper hierarchy
4. **Smooth Interactions**: Subtle animations and transitions
5. **Mobile-First**: Responsive design that works on all devices

## Implemented Features

✅ Complete product catalog with filtering and sorting
✅ Product detail pages with image galleries
✅ Shopping cart with full functionality
✅ Search functionality
✅ User authentication (Google Sign-In)
✅ Admin panel for product management
✅ About page with company information
✅ Contact form
✅ FAQ page with categorized questions
✅ All policy pages (Shipping, Returns, Privacy, Terms)
✅ Image gallery with lightbox
✅ Responsive design for all devices
✅ SEO optimization
✅ Accessibility compliance

## Future Enhancements

- Payment gateway integration (Razorpay - package installed)
- Order tracking system
- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Newsletter subscription
- Multi-language support

## License

Private - All rights reserved by Organizon Organics
