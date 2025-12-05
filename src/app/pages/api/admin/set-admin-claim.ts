// pages/api/admin/set-admin-claim.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "../../../lib/firebaseAdmin";

/**
 * API endpoint to set admin custom claim on a user
 * This should be protected and only callable by super admins
 * For initial setup, you can call this manually or protect with a secret key
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, secret } = req.body;

    // Protect this endpoint with a secret key
    const ADMIN_SETUP_SECRET = process.env.ADMIN_SETUP_SECRET || "your-secret-key-change-this";
    
    if (secret !== ADMIN_SETUP_SECRET) {
      return res.status(403).json({ error: "Invalid secret key" });
    }

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Get user by email
    const user = await adminAuth.getUserByEmail(email);
    
    // Set custom claim
    await adminAuth.setCustomUserClaims(user.uid, { admin: true });

    return res.status(200).json({ 
      success: true, 
      message: `Admin claim set for ${email}`,
      uid: user.uid 
    });
  } catch (error) {
    console.error("Error setting admin claim:", error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Failed to set admin claim" });
  }
}
