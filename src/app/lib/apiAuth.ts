// lib/apiAuth.ts
import type { NextApiRequest } from "next";
import { adminAuth } from "./firebaseAdmin";

export async function verifyFirebaseIdTokenFromReq(req: NextApiRequest) {
  // check Authorization header, then cookie, then body
  const authHeader = req.headers.authorization;
  let token = undefined;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split("Bearer ")[1];
  } else if ((req as any).cookies?.firebase_token) {
    token = (req as any).cookies.firebase_token;
  } else if (req.body?.token) {
    token = req.body.token;
  }
  if (!token) throw new Error("No token provided");
  const decoded = await adminAuth.verifyIdToken(token);
  return decoded; // has uid, email, admin claims if present
}

// admin guard: simple check for custom claim "admin" OR check email in env list
export async function requireAdmin(req: NextApiRequest) {
  const decoded = await verifyFirebaseIdTokenFromReq(req);
  const isAdminClaim = Boolean(decoded.admin);
  const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map(s => s.trim()).filter(Boolean);
  const isAdminEmail = decoded.email ? adminEmails.includes(decoded.email) : false;
  if (!isAdminClaim && !isAdminEmail) {
    throw new Error("Forbidden: admin only");
  }
  return decoded;
}
