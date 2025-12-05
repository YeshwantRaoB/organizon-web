// pages/api/admin/check.ts
import type { NextApiResponse } from "next";
import type { NextApiRequestWithCookies } from "../../../lib/apiAuth";
import { requireAdmin } from "../../../lib/apiAuth";

export default async function handler(req: NextApiRequestWithCookies, res: NextApiResponse) {
  try {
    // verify admin — requireAdmin will throw if not admin
    const decoded = await requireAdmin(req);
    return res.status(200).json({ ok: true, uid: decoded.uid, email: decoded.email });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(403).json({ ok: false, error: err.message });
    } else {
      return res.status(403).json({ ok: false, error: "Forbidden" });
    }
  }
}
