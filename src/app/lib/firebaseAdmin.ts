// lib/firebaseAdmin.ts
import admin from "firebase-admin";

if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY || "";
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      // privateKey must have literal newline characters when parsed, so we accept \n sequences
      privateKey: privateKey.replace(/\\n/g, "\n"),
    }),
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  });
}

export const adminAuth = admin.auth();
export default admin;
