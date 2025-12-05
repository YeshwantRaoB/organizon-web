# Bulk Upload Guide

This guide explains how to use the bulk upload feature to add multiple products at once.

---

## Overview

The bulk upload feature allows you to add hundreds of products quickly using CSV or JSON files. This is perfect for:
- Initial product catalog setup
- Importing products from other systems
- Updating multiple products at once
- Migrating from other platforms

---

## Access Bulk Upload

1. Sign in as admin
2. Go to `/admin/products`
3. Click the "Bulk Upload" button
4. Or navigate directly to `/admin/bulk-upload`

---

## Step-by-Step Process

### Step 1: Download Template

Choose your preferred format:

**CSV Template:**
- Best for Excel/Google Sheets users
- Easy to edit in spreadsheet software
- Simple comma-separated format

**JSON Template:**
- Best for developers
- Easy to generate programmatically
- Supports complex data structures

Click the appropriate "Download Template" button to get a sample file.

### Step 2: Fill in Your Products

#### Required Fields:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `sku` | String | Unique product identifier | PROD001 |
| `name` | String | Product name | Organic Basmati Rice |
| `category` | String | Product category | Rice & Grains |
| `description` | String | Product description | Premium quality organic basmati rice |
| `price` | Number | Price in rupees | 150 |
| `stock` | Number | Available quantity | 100 |
| `unit` | String | Unit of measurement | 1 kg |

#### Available Categories:
- Rice & Grains
- Oils
- Spices & Condiments
- Sweeteners
- Dairy

### Step 3: Format Your File

#### CSV Format:

```csv
sku,name,category,description,price,stock,unit
PROD001,Organic Basmati Rice,Rice & Grains,Premium quality organic basmati rice,150,100,1 kg
PROD002,Cold-Pressed Coconut Oil,Oils,Pure cold-pressed coconut oil,350,50,500 ml
PROD003,Himalayan Pink Salt,Spices & Condiments,Natural pink salt from Himalayas,120,200,500 g
```

**CSV Tips:**
- First row must be headers
- No spaces after commas (unless part of the value)
- Use quotes for values containing commas
- Save as UTF-8 encoding

#### JSON Format:

```json
[
  {
    "sku": "PROD001",
    "name": "Organic Basmati Rice",
    "category": "Rice & Grains",
    "description": "Premium quality organic basmati rice",
    "price": 150,
    "stock": 100,
    "unit": "1 kg"
  },
  {
    "sku": "PROD002",
    "name": "Cold-Pressed Coconut Oil",
    "category": "Oils",
    "description": "Pure cold-pressed coconut oil",
    "price": 350,
    "stock": 50,
    "unit": "500 ml"
  }
]
```

**JSON Tips:**
- Must be valid JSON array
- Use double quotes for strings
- Numbers without quotes
- Validate JSON before uploading

### Step 4: Upload File

1. Click the upload area or drag and drop your file
2. Supported formats: `.csv` or `.json`
3. File will be parsed automatically
4. Preview will appear below

### Step 5: Review Preview

- Check all products are parsed correctly
- Verify prices, stock, and units
- Ensure SKUs are unique
- Look for any formatting errors

### Step 6: Upload Products

1. Click "Upload Products" button
2. Wait for upload to complete
3. Success message will show count of uploaded products
4. You'll be redirected to the products list

---

## Advanced Features

### Duplicate Handling

By default, products with duplicate SKUs are skipped. The system will:
- Check each SKU against existing products
- Skip products with existing SKUs
- Report skipped products in results
- Continue with remaining products

### Error Handling

If errors occur:
- Individual product errors are reported
- Other products continue to upload
- Error details are shown in results
- You can fix errors and re-upload

---

## Best Practices

### 1. Start Small
- Test with 5-10 products first
- Verify format is correct
- Then upload full catalog

### 2. Use Unique SKUs
- SKU must be unique for each product
- Use consistent naming convention
- Example: RICE001, OIL001, SPICE001

### 3. Validate Data
- Check prices are correct
- Verify stock quantities
- Ensure categories match available options
- Proofread descriptions

### 4. Backup First
- Export existing products before bulk upload
- Keep a copy of your upload file
- Test in development environment first

### 5. Use Consistent Units
- Standardize unit formats (1 kg, 500 ml, 250 g)
- Be consistent across similar products
- Include space between number and unit

---

## Common Issues & Solutions

### Issue: "Failed to parse file"
**Solution:**
- Check file format (CSV or JSON)
- Ensure proper encoding (UTF-8)
- Validate JSON syntax
- Check for special characters

### Issue: "SKU already exists"
**Solution:**
- Use unique SKUs for each product
- Check existing products first
- Update SKU in your file
- Or use edit feature for existing products

### Issue: "Validation failed"
**Solution:**
- Ensure all required fields are present
- Check data types (numbers vs strings)
- Verify category names match exactly
- Remove empty rows

### Issue: "Some products skipped"
**Solution:**
- Check results for details
- Fix errors in skipped products
- Re-upload only failed products
- Verify SKU uniqueness

---

## Examples

### Example 1: Basic Products

```csv
sku,name,category,description,price,stock,unit
RICE001,Organic Basmati Rice,Rice & Grains,Premium quality organic basmati rice,150,100,1 kg
RICE002,Brown Rice,Rice & Grains,Nutritious brown rice,120,80,1 kg
OIL001,Coconut Oil,Oils,Cold-pressed coconut oil,350,50,500 ml
SPICE001,Turmeric Powder,Spices & Condiments,Pure organic turmeric,80,150,200 g
```

### Example 2: With Detailed Descriptions

```json
[
  {
    "sku": "HONEY001",
    "name": "Raw Wild Honey",
    "category": "Sweeteners",
    "description": "100% pure raw wild honey collected from forest hives. Rich in antioxidants and natural enzymes. No processing, no additives.",
    "price": 450,
    "stock": 30,
    "unit": "500 g"
  },
  {
    "sku": "GHEE001",
    "name": "A2 Desi Ghee",
    "category": "Dairy",
    "description": "Traditional A2 desi ghee made from grass-fed cow milk. Rich aroma and authentic taste. Perfect for cooking and Ayurvedic use.",
    "price": 850,
    "stock": 25,
    "unit": "500 ml"
  }
]
```

---

## Tips for Large Uploads

### For 100+ Products:

1. **Split into batches**
   - Upload 50-100 products at a time
   - Easier to manage and troubleshoot
   - Reduces risk of timeout

2. **Use spreadsheet software**
   - Excel or Google Sheets for CSV
   - Use formulas for calculations
   - Easy to sort and filter

3. **Validate before upload**
   - Check for duplicates
   - Verify all required fields
   - Test with small batch first

4. **Monitor progress**
   - Watch for success messages
   - Check product count increases
   - Verify products appear in list

---

## After Upload

### Verify Products:
1. Go to product list
2. Check product count
3. Spot-check random products
4. Verify prices and stock

### Add Images:
1. Products upload without images
2. Edit each product to add images
3. Or use Cloudinary bulk upload
4. Images can be added later

### Test Products:
1. View products on catalog page
2. Check product detail pages
3. Test add to cart
4. Verify all information displays correctly

---

## Exporting Products

To export existing products for backup or editing:

1. Go to `/admin/products`
2. Click "Export" (if available)
3. Or use MongoDB export tools
4. Save as CSV or JSON
5. Edit and re-upload if needed

---

## API Usage (Advanced)

For programmatic bulk upload:

```javascript
const products = [
  {
    sku: "PROD001",
    name: "Product Name",
    category: "Category",
    description: "Description",
    price: 100,
    stock: 50,
    unit: "1 kg"
  }
];

const response = await fetch('/api/admin/bulk-products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ products }),
});

const result = await response.json();
console.log(`Uploaded ${result.count} products`);
```

---

## Support

If you encounter issues:
1. Check this guide first
2. Verify file format
3. Test with template file
4. Contact support if needed

---

## Summary

✅ Download template (CSV or JSON)
✅ Fill in product information
✅ Upload file
✅ Review preview
✅ Click "Upload Products"
✅ Verify products in list

**Time Saved:** Upload 100 products in 5 minutes vs 2+ hours manually!

---

**Last Updated:** December 5, 2025
**Version:** 1.0.0
