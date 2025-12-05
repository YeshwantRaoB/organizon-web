#!/usr/bin/env node

/**
 * Script to set admin custom claim for a Firebase user
 * Usage: node scripts/set-admin-claim.js YOUR_EMAIL@example.com
 */

import dotenv from 'dotenv';
import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

// Initialize Firebase Admin
if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY
    ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined;

  if (!privateKey) {
    console.error('❌ Error: FIREBASE_ADMIN_PRIVATE_KEY not found in .env.local');
    console.log('\n📝 To fix this:');
    console.log('1. Go to Firebase Console → Project Settings → Service Accounts');
    console.log('2. Click "Generate New Private Key"');
    console.log('3. Open the downloaded JSON file');
    console.log('4. Copy the "private_key" value');
    console.log('5. Add to .env.local as FIREBASE_ADMIN_PRIVATE_KEY="your_key_here"');
    console.log('6. Replace actual newlines in the key with \\n');
    process.exit(1);
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });
}

async function setAdminClaim(email) {
  try {
    console.log(`\n🔍 Looking for user with email: ${email}`);
    
    // Get user by email
    const user = await admin.auth().getUserByEmail(email);
    console.log(`✅ Found user: ${user.displayName || user.email} (UID: ${user.uid})`);

    // Check current custom claims
    const currentClaims = user.customClaims || {};
    console.log(`📋 Current claims:`, currentClaims);

    // Set admin custom claim
    await admin.auth().setCustomUserClaims(user.uid, {
      ...currentClaims,
      admin: true,
    });

    console.log(`✅ Admin claim set successfully!`);

    // Revoke refresh tokens to force new token generation
    await admin.auth().revokeRefreshTokens(user.uid);
    console.log(`✅ Refresh tokens revoked`);

    // Verify the claim was set
    const updatedUser = await admin.auth().getUser(user.uid);
    console.log(`\n✅ Verified custom claims:`, updatedUser.customClaims);

    console.log(`\n🎉 Success! ${email} is now an admin.`);
    console.log(`\n⚠️  IMPORTANT: The user must sign out and sign back in for the changes to take effect.`);
    console.log(`\n📝 Next steps:`);
    console.log(`1. Go to your website`);
    console.log(`2. Sign out if currently signed in`);
    console.log(`3. Sign in again with ${email}`);
    console.log(`4. You should now have admin access`);

    process.exit(0);
  } catch (error) {
    console.error(`\n❌ Error:`, error.message);
    
    if (error.code === 'auth/user-not-found') {
      console.log(`\n💡 User not found. Make sure:`);
      console.log(`1. The email is correct`);
      console.log(`2. The user has signed in at least once`);
      console.log(`3. You're using the correct Firebase project`);
    }
    
    process.exit(1);
  }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.error(`\n❌ Error: Email address required`);
  console.log(`\nUsage: node scripts/set-admin-claim.js YOUR_EMAIL@example.com`);
  console.log(`\nExample: node scripts/set-admin-claim.js organizonorganics@gmail.com`);
  process.exit(1);
}

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  console.error(`\n❌ Error: Invalid email format`);
  console.log(`\nPlease provide a valid email address.`);
  process.exit(1);
}

// Run the script
console.log(`\n🚀 Setting admin claim for: ${email}`);
setAdminClaim(email);
