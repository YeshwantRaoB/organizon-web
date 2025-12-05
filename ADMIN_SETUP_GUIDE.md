# Admin Setup Guide - Firebase Custom Claims

This guide explains how to set up admin access using Firebase Custom Claims.

---

## Overview

The system uses **Firebase Custom Claims** to identify admin users. When you sign in with an admin account, your Firebase ID token will include `{ admin: true }`, which grants access to admin routes and features.

---

## Prerequisites

Before setting up admin access, ensure:

1. ✅ Firebase project is configured
2. ✅ You have signed in at least once (to create your Firebase user)
3. ✅ You have the Firebase Admin SDK private key

---

## Step 1: Get Firebase Admin Private Key

### Option A: From Firebase Console (Recommended)

1. **Go to Firebase Console:**
   - Visit https://console.firebase.google.com
   - Select your project: `organizon-2da0c`

2. **Navigate to Service Accounts:**
   - Click the gear icon (⚙️) → Project Settings
   - Go to "Service Accounts" tab

3. **Generate New Private Key:**
   - Click "Generate New Private Key"
   - Click "Generate Key" in the dialog
   - A JSON file will download

4. **Extract the Private Key:**
   - Open the downloaded JSON file
   - Find the `private_key` field
   - Copy the entire value (including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)

### Option B: Use Existing Service Account File

If you already have the file `organizon-2da0c-firebase-adminsdk-fbsvc-b2e9714223.json`:

1. Open the file
2. Find the `private_key` field
3. Copy the value

---

## Step 2: Add Private Key to .env.local

1. **Open `.env.local` file**

2. **Add the private key:**
   ```env
   FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
   ```

3. **IMPORTANT:** Replace actual newlines with `\n`:
   - The private key in the JSON has actual line breaks
   - In `.env.local`, replace them with `\n` (backslash-n)
   - Keep the quotes around the entire key

**Example:**
```env
# Before (from JSON - won't work):
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASC...
-----END PRIVATE KEY-----"

# After (for .env.local - correct):
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----\n"
```

---

## Step 3: Set Admin Claim

You have **two methods** to set the admin claim:

### Method A: Using Node Script (Recommended)

1. **Run the script:**
   ```bash
   node scripts/set-admin-claim.js organizonorganics@gmail.com
   ```
   
   **Note:** The script uses ES modules, so make sure you have Node.js 14+ installed.

2. **Expected output:**
   ```
   🚀 Setting admin claim for: organizonorganics@gmail.com
   🔍 Looking for user with email: organizonorganics@gmail.com
   ✅ Found user: Your Name (UID: abc123...)
   📋 Current claims: {}
   ✅ Admin claim set successfully!
   ✅ Refresh tokens revoked
   ✅ Verified custom claims: { admin: true }
   
   🎉 Success! organizonorganics@gmail.com is now an admin.
   
   ⚠️  IMPORTANT: The user must sign out and sign back in for the changes to take effect.
   ```

3. **If you get an error:**
   - **"FIREBASE_ADMIN_PRIVATE_KEY not found"**: Add the private key to `.env.local`
   - **"User not found"**: Sign in to the website first to create your Firebase user
   - **"Invalid email format"**: Check the email address

### Method B: Using API Endpoint

1. **Use curl or Postman:**
   ```bash
   curl -X POST http://localhost:3000/api/admin/set-admin-claim \
     -H "Content-Type: application/json" \
     -d '{
       "email": "organizonorganics@gmail.com",
       "secret": "Y67R6hDNEvfebwtcrI8ofAnckXdMhxX4"
     }'
   ```

2. **Expected response:**
   ```json
   {
     "ok": true,
     "message": "Admin claim set successfully. User must sign out and sign back in.",
     "uid": "abc123...",
     "email": "organizonorganics@gmail.com"
   }
   ```

**Note:** The `secret` value should match `AUTH_COOKIE_SECRET` in your `.env.local`

---

## Step 4: Sign Out and Sign Back In

**CRITICAL:** The admin claim won't take effect until you refresh your ID token.

1. **Go to your website:**
   - http://localhost:3000 (development)
   - Or your production URL

2. **Sign out:**
   - Click your profile picture/name
   - Click "Sign Out"

3. **Sign back in:**
   - Click "Sign In"
   - Sign in with Google using `organizonorganics@gmail.com`

4. **Verify admin access:**
   - Go to http://localhost:3000/admin/products
   - You should see the admin panel
   - If you see "Not authorized", the claim didn't apply (check steps above)

---

## Step 5: Verify Admin Access

### Test Admin Routes:

1. **Admin Products Page:**
   - URL: `/admin/products`
   - Should show product list with Create/Edit/Delete buttons

2. **Create Product:**
   - URL: `/admin/products/create`
   - Should show product creation form

3. **Bulk Upload:**
   - URL: `/admin/bulk-upload`
   - Should show bulk upload interface

### Check Your Token:

1. **Open browser console** (F12)

2. **Run this code:**
   ```javascript
   firebase.auth().currentUser.getIdTokenResult()
     .then(result => console.log('Claims:', result.claims))
   ```

3. **Expected output:**
   ```javascript
   Claims: {
     admin: true,
     email: "organizonorganics@gmail.com",
     // ... other claims
   }
   ```

---

## Troubleshooting

### Issue: "User not found"

**Solution:**
1. Sign in to the website first
2. This creates your Firebase user
3. Then run the admin claim script

### Issue: "FIREBASE_ADMIN_PRIVATE_KEY not found"

**Solution:**
1. Check `.env.local` has the private key
2. Ensure it's properly formatted with `\n` for newlines
3. Restart your dev server after adding it

### Issue: "Still not admin after signing in"

**Solution:**
1. Make sure you signed OUT completely
2. Clear browser cache/cookies
3. Sign in again
4. Check the token claims in console

### Issue: "Invalid secret"

**Solution:**
- The `secret` parameter must match `AUTH_COOKIE_SECRET` in `.env.local`
- Current value: `Y67R6hDNEvfebwtcrI8ofAnckXdMhxX4`

### Issue: "Forbidden: admin only" on API routes

**Solution:**
1. Verify your token has `admin: true` claim
2. Check you're signed in
3. Try signing out and back in
4. Check browser console for errors

---

## How It Works

### 1. Custom Claims

Firebase allows you to add custom data to user tokens:
```javascript
{
  uid: "abc123",
  email: "user@example.com",
  admin: true  // ← Custom claim
}
```

### 2. Server-Side Verification

When you access admin routes, the server:
1. Extracts your ID token from cookies/headers
2. Verifies the token with Firebase Admin SDK
3. Checks if `decoded.admin === true`
4. Grants or denies access

### 3. Client-Side Protection

Admin pages use `ProtectedClient` component:
- Checks if you're signed in
- Verifies admin status via API
- Redirects if not authorized

---

## Adding More Admins

To add another admin user:

1. **Have them sign in first** (creates their Firebase user)

2. **Run the script with their email:**
   ```bash
   node scripts/set-admin-claim.js their-email@example.com
   ```

3. **They must sign out and back in**

---

## Removing Admin Access

To remove admin access from a user:

1. **Create a removal script** (or modify the existing one):
   ```javascript
   await admin.auth().setCustomUserClaims(uid, { admin: false });
   await admin.auth().revokeRefreshTokens(uid);
   ```

2. **Or manually in Firebase Console:**
   - Go to Authentication → Users
   - Find the user
   - Edit custom claims
   - Remove `admin: true`

---

## Security Best Practices

1. **Protect the Script:**
   - Don't commit `.env.local` to Git
   - Keep `FIREBASE_ADMIN_PRIVATE_KEY` secret
   - Only run the script on trusted machines

2. **Limit Admin Users:**
   - Only give admin access to trusted people
   - Regularly audit admin users
   - Remove access when no longer needed

3. **Monitor Admin Actions:**
   - Log admin operations
   - Set up alerts for sensitive actions
   - Review logs regularly

4. **Use Strong Secrets:**
   - Change `AUTH_COOKIE_SECRET` to a strong random value
   - Don't share the secret
   - Rotate secrets periodically

---

## Quick Reference

### Set Admin Claim:
```bash
node scripts/set-admin-claim.js YOUR_EMAIL@example.com
```

**Note:** Requires Node.js 14+ (ES modules support)

### Check Token Claims (Browser Console):
```javascript
firebase.auth().currentUser.getIdTokenResult()
  .then(r => console.log(r.claims))
```

### API Endpoint:
```bash
POST /api/admin/set-admin-claim
Body: { email: "user@example.com", secret: "your_secret" }
```

### Environment Variables:
```env
FIREBASE_ADMIN_PROJECT_ID=organizon-2da0c
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-fbsvc@organizon-2da0c.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
AUTH_COOKIE_SECRET=Y67R6hDNEvfebwtcrI8ofAnckXdMhxX4
ADMIN_EMAILS=organizonorganics@gmail.com
```

---

## Summary

✅ **Setup Steps:**
1. Get Firebase Admin private key
2. Add to `.env.local`
3. Run `node scripts/set-admin-claim.js YOUR_EMAIL`
4. Sign out and sign back in
5. Access admin panel

✅ **Verification:**
- Go to `/admin/products`
- Should see admin interface
- Check token claims in console

✅ **Security:**
- Custom claims are secure
- Server-side verification
- Token-based authentication

---

**Last Updated:** December 5, 2025
**Version:** 1.0.0
