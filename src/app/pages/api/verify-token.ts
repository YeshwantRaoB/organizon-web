// pages/api/verify-token.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "../../lib/firebaseAdmin";

type Data = { ok: boolean; uid?: string; email?: string; name?: string; error?: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1] || req.body?.token || req.query?.token;
    if (!token) return res.status(400).json({ ok: false, error: "No token provided" });

    const decoded = await adminAuth.verifyIdToken(token);
    return res.status(200).json({ ok: true, uid: decoded.uid, email: decoded.email || undefined, name: decoded.name || undefined });
  } catch (err: any) {
    console.error("verify-token error:", err);
    return res.status(401).json({ ok: false, error: err.message || "Invalid token" });
  }
}
