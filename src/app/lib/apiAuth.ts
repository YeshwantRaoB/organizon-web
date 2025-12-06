import type { NextApiRequest } from "next";
import { adminAuth } from "./firebaseAdmin";
import { DecodedIdToken } from 'firebase-admin/auth';

export interface NextApiRequestWithCookies extends NextApiRequest {
  cookies: {
    [key: string]: string;
  };
}

export async function verifyFirebaseIdTokenFromReq(req: NextApiRequestWithCookies) {
  // check Authorization header, then cookie, then body
  const authHeader = req.headers.authorization;
  let token = undefined;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split("Bearer ")[1];
  } else if (req.cookies?.firebase_token) {
    token = req.cookies.firebase_token;
  } else if (req.body?.token) {
    token = req.body.token;
  }
  if (!token) throw new Error("No token provided");
  const decoded = await adminAuth.verifyIdToken(token);
  return decoded; // has uid, email, admin claims if present
}

/**
 * Admin guard: Checks for admin custom claim
 * Priority: Custom claim (admin: true) > Email whitelist (fallback)
 */
export async function requireAdmin(req: NextApiRequestWithCookies) {
  const decoded = await verifyFirebaseIdTokenFromReq(req);
  
  // Check custom claim first (preferred method)
  const isAdminClaim = Boolean(decoded.admin);
  
  // Fallback to email whitelist (for backward compatibility)
  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
  const isAdminEmail = decoded.email ? adminEmails.includes(decoded.email) : false;
  
  if (!isAdminClaim && !isAdminEmail) {
    throw new Error("Forbidden: admin only");
  }
  
  return decoded;
}

/**
 * Check if user is admin (for client-side use)
 */

export function isAdmin(decodedToken: DecodedIdToken | null | undefined): boolean {
  return Boolean(decodedToken?.admin);
}
