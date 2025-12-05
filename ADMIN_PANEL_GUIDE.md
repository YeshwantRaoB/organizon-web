# Admin Panel Guide

Complete guide to using the Organizon Organics admin panel.

---

## Overview

The admin panel provides a comprehensive interface for managing your e-commerce store. Only users with admin privileges can access these features.

---

## Features

### 1. Admin Bar (Floating Panel)

**Location:** Bottom of every page (only visible to admins)

**Features:**
- Quick access to all admin features
- Shows current page path
- "Edit This Page" button for direct page editing
- Collapsible interface to stay out of the way

**How to Use:**
1. Sign in with your admin account
2. The admin bar appears at the bottom of every page
3. Click "Show Admin Panel" to expand
4. Click any icon to navigate to that section
5. Click "Edit This Page" to edit the current page

---

### 2. Dashboard

**URL:** `/admin`

**Features:**
- Overview of store statistics
- Product counts (total, low stock, out of stock)
- Order statistics
- Quick action cards for common tasks
- Category breakdown

**Quick Actions:**
- Manage Products
- Add Product
- Bulk Upload
- Orders
- Users
- Pages
- Settings

---

### 3. Product Management

**URL:** `/admin/products`

**Features:**
- View all products in a table
- Search and filter products
- Edit product details
- Delete products
- Bulk upload via CSV/JSON
- Image upload to Cloudinary

**How to Add a Product:**
1. Go to `/admin/products`
2. Click "Create Product"
3. Fill in product details:
   - Name
   - Description
   - Price
   - Category
   - Stock quantity
   - Unit (kg, g, L, etc.)
4. Upload product image
5. Click "Create Product"

**How to Edit a Product:**
1. Go to `/admin/products`
2. Click "Edit" on any product
3. Update the fields
4. Click "Update Product"

**Bulk Upload:**
1. Go to `/admin/bulk-upload`
2. Download CSV or JSON template
3. Fill in product data
4. Upload the file
5. Preview and confirm
6. Products are created automatically

---

### 4. Page Management

**URL:** `/admin/pages`

**Features:**
- View all website pages
- Edit page content
- Update page titles and meta descriptions
- Customize page layouts (coming soon: visual editor)

**Available Pages:**
- Homepage
- Product Catalog
- About Us
- Contact
- Gallery
- FAQ
- Shipping Policy
- Returns Policy
- Privacy Policy
- Terms of Service

**How to Edit a Page:**
1. Go to `/admin/pages`
2. Click "Edit Page" on any page
3. Update page settings:
   - Page title
   - Meta description (for SEO)
   - Page content (HTML)
4. Click "Save Changes"
5. Preview the page to see changes

**Alternative Method:**
1. Navigate to any page on your website
2. Click "Edit This Page" in the admin bar
3. Make your changes
4. Save

---

### 5. Orders Management

**URL:** `/admin/orders`

**Features:**
- View all customer orders
- Filter by status (pending, processing, completed, cancelled)
- Search by order number, customer name, or email
- Update order status
- View order details

**Order Statuses:**
- **Pending:** New order, awaiting processing
- **Processing:** Order is being prepared/shipped
- **Completed:** Order delivered successfully
- **Cancelled:** Order was cancelled

**How to Manage Orders:**
1. Go to `/admin/orders`
2. View order statistics at the top
3. Use filters to find specific orders
4. Click status dropdown to update order status
5. Click "View Details" to see full order information

**Order Workflow:**
1. Customer places order → Status: Pending
2. You confirm and prepare order → Status: Processing
3. Order is shipped and delivered → Status: Completed
4. If cancelled → Status: Cancelled

---

### 6. Users Management

**URL:** `/admin/users`

**Features:**
- View all registered users
- See user details (name, email, join date)
- Manage admin privileges
- View user order history

**How to Make Someone an Admin:**
1. Use the admin claim script:
   ```bash
   node scripts/set-admin-claim.js user@example.com
   ```
2. User must sign out and sign back in
3. They now have admin access

**How to Remove Admin Access:**
1. Go to Firebase Console
2. Authentication → Users
3. Find the user
4. Edit custom claims
5. Remove `admin: true`

---

### 7. Settings

**URL:** `/admin/settings`

**Features:**
- Configure site-wide settings
- Update contact information
- Set social media links
- Configure store settings (currency, tax, shipping)
- Enable/disable features

**Settings Categories:**

#### General Settings
- Site Name
- Site Tagline

#### Contact Information
- Contact Email
- Contact Phone
- WhatsApp Number
- FSSAI License Number
- Business Address

#### Social Media
- Facebook URL
- Instagram URL
- Twitter URL

#### Store Settings
- Currency (INR, USD, EUR)
- Tax Rate (%)
- Shipping Fee (₹)
- Free Shipping Threshold (₹)

#### Features
- Enable Product Reviews
- Enable Wishlist
- Maintenance Mode

**How to Update Settings:**
1. Go to `/admin/settings`
2. Update any fields
3. Click "Save Settings"
4. Changes apply immediately

---

## Admin Workflows

### Daily Tasks

1. **Check New Orders**
   - Go to `/admin/orders`
   - Filter by "Pending"
   - Process new orders
   - Update status to "Processing"

2. **Monitor Stock Levels**
   - Go to `/admin` (dashboard)
   - Check "Low Stock" count
   - Restock products as needed

3. **Respond to Inquiries**
   - Check contact form submissions
   - Reply to customer emails

### Weekly Tasks

1. **Add New Products**
   - Go to `/admin/products/create`
   - Add new seasonal products
   - Upload high-quality images

2. **Update Content**
   - Review and update page content
   - Add new FAQ entries
   - Update gallery images

3. **Review Analytics**
   - Check order statistics
   - Identify best-selling products
   - Adjust pricing if needed

### Monthly Tasks

1. **Inventory Audit**
   - Review all product stock levels
   - Remove discontinued products
   - Update product descriptions

2. **Content Refresh**
   - Update homepage content
   - Refresh product images
   - Update policies if needed

3. **Performance Review**
   - Check total orders and revenue
   - Analyze customer feedback
   - Plan promotions

---

## Tips & Best Practices

### Product Management

1. **Use High-Quality Images**
   - Minimum 800x800px
   - White or transparent background
   - Show product clearly

2. **Write Detailed Descriptions**
   - Include benefits and features
   - Mention certifications (organic, etc.)
   - Add usage instructions

3. **Keep Stock Updated**
   - Update stock levels regularly
   - Set low stock alerts
   - Remove out-of-stock items

### Order Management

1. **Process Orders Quickly**
   - Aim to process within 24 hours
   - Update customers on status
   - Provide tracking information

2. **Communicate Clearly**
   - Send order confirmation emails
   - Notify about shipping
   - Follow up after delivery

3. **Handle Issues Promptly**
   - Respond to complaints quickly
   - Offer solutions (refund, replacement)
   - Learn from feedback

### Content Management

1. **Keep Content Fresh**
   - Update homepage regularly
   - Add seasonal content
   - Highlight new products

2. **Optimize for SEO**
   - Use descriptive page titles
   - Write meta descriptions
   - Include relevant keywords

3. **Maintain Consistency**
   - Use consistent tone and style
   - Keep branding uniform
   - Update all pages regularly

---

## Security Best Practices

1. **Protect Admin Access**
   - Use strong passwords
   - Don't share admin credentials
   - Limit number of admins

2. **Regular Backups**
   - MongoDB Atlas auto-backups enabled
   - Download important data regularly
   - Test restore procedures

3. **Monitor Activity**
   - Review order patterns
   - Check for suspicious activity
   - Keep logs of admin actions

4. **Keep Software Updated**
   - Update dependencies regularly
   - Apply security patches
   - Monitor for vulnerabilities

---

## Troubleshooting

### Can't Access Admin Panel

**Problem:** Admin bar not showing

**Solutions:**
1. Verify you're signed in
2. Check you have admin claim set
3. Sign out and sign back in
4. Clear browser cache

### Orders Not Showing

**Problem:** Orders page is empty

**Solutions:**
1. Check MongoDB connection
2. Verify orders collection exists
3. Check API endpoint logs
4. Test with sample order

### Images Not Uploading

**Problem:** Product images fail to upload

**Solutions:**
1. Check Cloudinary credentials
2. Verify file size (< 10MB)
3. Check file format (JPG, PNG, WebP)
4. Test Cloudinary connection

### Settings Not Saving

**Problem:** Settings changes don't persist

**Solutions:**
1. Check MongoDB connection
2. Verify admin permissions
3. Check browser console for errors
4. Try different browser

---

## Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save (on edit pages)
- `Esc` - Close modals
- `/` - Focus search (on list pages)

---

## Mobile Admin Access

The admin panel is fully responsive and works on mobile devices:

1. **Dashboard:** View stats and quick actions
2. **Products:** Browse and edit products
3. **Orders:** Manage orders on the go
4. **Settings:** Update settings from anywhere

**Tip:** For best experience, use tablet or desktop for bulk operations.

---

## Getting Help

### Documentation
- `README.md` - Project overview
- `QUICK_START.md` - Setup guide
- `ADMIN_SETUP_GUIDE.md` - Admin authentication
- `BULK_UPLOAD_GUIDE.md` - Bulk product upload
- `IMAGE_GUIDE.md` - Image management

### Support Resources
- Check documentation first
- Review error messages in browser console
- Test in incognito mode
- Contact developer if issues persist

---

## Future Features (Coming Soon)

- [ ] Visual page builder (drag-and-drop)
- [ ] Email template editor
- [ ] Advanced analytics dashboard
- [ ] Customer management
- [ ] Discount/coupon system
- [ ] Inventory alerts
- [ ] Automated reports
- [ ] Multi-language support

---

## Summary

The admin panel provides everything you need to manage your e-commerce store:

✅ **Product Management** - Add, edit, delete products
✅ **Order Management** - Process and track orders
✅ **Page Editing** - Customize website content
✅ **Settings** - Configure store settings
✅ **User Management** - Manage admins
✅ **Analytics** - View store statistics

**Quick Access:** Admin bar at bottom of every page (when signed in as admin)

---

**Last Updated:** December 5, 2025
**Version:** 1.0.0
