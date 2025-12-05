// pages/api/admin/check.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin } from "../../../lib/apiAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // verify admin — requireAdmin will throw if not admin
    const decoded = await requireAdmin(req);
    return res.status(200).json({ ok: true, uid: decoded.uid, email: decoded.email });
  } catch (err: any) {
    return res.status(403).json({ ok: false, error: err.message || "Forbidden" });
  }
}
