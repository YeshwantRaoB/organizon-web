import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin, type NextApiRequestWithCookies } from "../../../../lib/apiAuth";
import { connectToDatabase } from "../../../../lib/mongo";

export default async function handler(req: NextApiRequestWithCookies, res: NextApiResponse) {
  try {
    await requireAdmin(req);

    const { db } = await connectToDatabase();

    if (req.method === "GET") {
      const orders = await db
        .collection("orders")
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      return res.status(200).json({ ok: true, orders });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" });
  } catch (error) {
    console.error("Orders API error:", error);
    return res.status(500).json({ 
      ok: false, 
      error: error instanceof Error ? error.message : "Server error" 
    });
  }
}
