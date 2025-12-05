# Image Replacement Guide

This guide explains how to replace placeholder images with actual images throughout the website.

## Image Locations

### 1. Homepage Hero Section

**Location:** `src/app/page.tsx` (lines ~15-20)

**Current Code:**
```tsx
<div className="relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-green-50 to-green-100">
  <PlaceholderImage width="100%" height="100%" />
</div>
```

**Replace With:**
```tsx
<div className="relative w-full h-[500px] md:h-[600px]">
  <img 
    src="/hero-image.jpg" 
    alt="Organizon Organics - Pure Organic Foods"
    className="w-full h-full object-cover"
  />
</div>
```

**Recommended Image:**
- Size: 1500x600px minimum
- Format: JPG or WebP
- Subject: Farm landscape, organic products, or farmers
- From Shopify: The main banner image

### 2. Homepage Two-Column Images

**Location:** `src/app/page.tsx` (lines ~28-40)

**Left Image (Farmers):**
```tsx
<div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
  <img 
    src="/farmers-image.jpg" 
    alt="Indian farmers working in organic fields"
    className="w-full h-full object-cover"
  />
</div>
```

**Right Image (Products):**
```tsx
<div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
  <img 
    src="/products-image.jpg" 
    alt="Organic products from Organizon"
    className="w-full h-full object-cover"
  />
</div>
```

**Recommended Images:**
- Size: 800x600px minimum each
- Format: JPG or WebP
- From Shopify: The two images showing farmers and products

### 3. Product Images

**Location:** Product data in various files

**In Catalog/Cart/Gallery:**
```tsx
// Update product objects
{
  id: '1',
  name: 'Organic Basmati Rice',
  price: 150,
  imageUrl: '/products/basmati-rice.jpg', // Add this
  unit: '1 kg',
  stock: 50,
}
```

**Recommended:**
- Size: 600x600px (square)
- Format: JPG or WebP
- Background: White or transparent
- Quality: High resolution for zoom

### 4. Logo

**Location:** `src/app/layout.tsx` (line ~30)

**Current Code:**
```tsx
<Image
  src="/logo.jpg"
  alt="Organizon Organics Logo"
  fill
  className="object-cover group-hover:scale-110 transition-transform duration-300"
/>
```

**Instructions:**
- Place your logo at `public/logo.jpg`
- Recommended size: 200x200px
- Format: PNG with transparent background or JPG
- Should be square or circular

## Image Optimization Tips

### 1. Use Next.js Image Component

For better performance, use Next.js Image component:

```tsx
import Image from 'next/image';

<Image
  src="/your-image.jpg"
  alt="Description"
  width={800}
  height={600}
  className="object-cover"
  priority // For above-the-fold images
/>
```

### 2. Image Formats

- **JPG**: For photos and complex images
- **PNG**: For logos and images with transparency
- **WebP**: Best compression, modern browsers
- **SVG**: For icons and simple graphics

### 3. Image Sizes

**Homepage Hero:**
- Desktop: 1500x600px
- Mobile: 800x600px (use responsive images)

**Product Images:**
- Thumbnail: 300x300px
- Full size: 800x800px

**Gallery Images:**
- 600x600px minimum

### 4. Compression

Use tools to compress images:
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)
- [ImageOptim](https://imageoptim.com/)

Target: < 200KB per image

## Cloudinary Integration

The project already has Cloudinary setup for dynamic image uploads.

**Upload via Admin Panel:**
1. Go to `/admin/products`
2. Sign in with admin account
3. Create/Edit product
4. Upload images through the form
5. Images are automatically uploaded to Cloudinary

**Manual Cloudinary Upload:**
```tsx
import { uploadToCloudinary } from '../lib/cloudinary';

const handleUpload = async (file: File) => {
  const result = await uploadToCloudinary(file);
  console.log(result.url); // Use this URL
};
```

## Responsive Images

Use responsive images for different screen sizes:

```tsx
<picture>
  <source 
    media="(min-width: 768px)" 
    srcSet="/hero-desktop.jpg" 
  />
  <source 
    media="(max-width: 767px)" 
    srcSet="/hero-mobile.jpg" 
  />
  <img 
    src="/hero-desktop.jpg" 
    alt="Hero" 
    className="w-full h-full object-cover"
  />
</picture>
```

## Image Checklist

Before going live, ensure:

- [ ] Hero section has main banner image
- [ ] Two homepage images (farmers & products) added
- [ ] Logo is in place and looks good
- [ ] All product images are uploaded
- [ ] Images are optimized (< 200KB each)
- [ ] Alt text is descriptive for accessibility
- [ ] Images load quickly on mobile
- [ ] Fallback images work if main images fail

## Getting Images from Shopify

1. Visit your Shopify site
2. Right-click on images
3. Select "Open image in new tab"
4. Download the image
5. Optimize and resize as needed
6. Upload to your Next.js project

## Image Storage Options

### Option 1: Public Folder (Simple)
- Place images in `public/` folder
- Reference as `/image-name.jpg`
- Good for: Static images, logos

### Option 2: Cloudinary (Recommended)
- Upload via admin panel
- Automatic optimization
- CDN delivery
- Good for: Product images, user uploads

### Option 3: External CDN
- Use any CDN service
- Reference full URL
- Good for: Large image libraries

## Example: Complete Product with Image

```tsx
const product = {
  id: '1',
  name: 'Organic Basmati Rice',
  description: 'Premium quality organic basmati rice',
  price: 150,
  unit: '1 kg',
  stock: 50,
  category: 'Rice & Grains',
  imageUrl: '/products/basmati-rice.jpg',
  images: [
    '/products/basmati-rice-1.jpg',
    '/products/basmati-rice-2.jpg',
    '/products/basmati-rice-3.jpg',
  ],
};
```

## Need Help?

If you encounter issues with images:
1. Check browser console for errors
2. Verify image paths are correct
3. Ensure images are in the right format
4. Check file permissions
5. Clear Next.js cache: `rm -rf .next`
