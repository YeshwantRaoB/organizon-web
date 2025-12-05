// pages/api/admin/set-admin-claim.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "../../../lib/firebaseAdmin";

/**
 * API endpoint to set admin custom claim for a user
 * This is a secure endpoint that requires a secret key
 * 
 * Usage:
 * POST /api/admin/set-admin-claim
 * Body: { email: "user@example.com", secret: "your_admin_secret" }
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { email, secret } = req.body;

    if (!email) {
      return res.status(400).json({ ok: false, error: "Email is required" });
    }

    // Check secret key (use AUTH_COOKIE_SECRET from .env.local)
    const adminSecret = process.env.AUTH_COOKIE_SECRET;
    if (!adminSecret || secret !== adminSecret) {
      return res.status(403).json({ ok: false, error: "Invalid or missing secret" });
    }

    // Get user by email
    const user = await adminAuth.getUserByEmail(email);
    
    // Check if already admin
    const currentClaims = user.customClaims || {};
    if (currentClaims.admin === true) {
      return res.status(200).json({ 
        ok: true, 
        message: "User is already an admin",
        alreadyAdmin: true,
        uid: user.uid,
        email: user.email,
      });
    }

    // Set admin custom claim
    await adminAuth.setCustomUserClaims(user.uid, {
      ...currentClaims,
      admin: true,
    });

    // Revoke refresh tokens to force new token generation
    await adminAuth.revokeRefreshTokens(user.uid);

    return res.status(200).json({ 
      ok: true, 
      message: "Admin claim set successfully. User must sign out and sign back in.",
      uid: user.uid,
      email: user.email,
    });
  } catch (error) {
    console.error("Set admin claim error:", error);
    
    if (error instanceof Error) {
      if (error.message.includes('user-not-found')) {
        return res.status(404).json({ 
          ok: false, 
          error: "User not found. Make sure the user has signed in at least once." 
        });
      }
    }
    
    return res.status(500).json({ 
      ok: false, 
      error: error instanceof Error ? error.message : "Server error" 
    });
  }
}
