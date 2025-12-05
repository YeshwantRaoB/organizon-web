import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin, type NextApiRequestWithCookies } from "../../../lib/apiAuth";
import { connectToDatabase } from "../../../lib/mongo";

export default async function handler(req: NextApiRequestWithCookies, res: NextApiResponse) {
  try {
    await requireAdmin(req);

    if (req.method === "GET") {
      const { path } = req.query;
      
      if (!path) {
        return res.status(400).json({ ok: false, error: "Path is required" });
      }

      const { db } = await connectToDatabase();
      const page = await db.collection("pages").findOne({ path });

      if (!page) {
        return res.status(404).json({ ok: false, error: "Page not found" });
      }

      return res.status(200).json({ ok: true, page });
    }

    if (req.method === "POST") {
      const pageData = req.body;

      if (!pageData.path) {
        return res.status(400).json({ ok: false, error: "Path is required" });
      }

      const { db } = await connectToDatabase();
      
      await db.collection("pages").updateOne(
        { path: pageData.path },
        { 
          $set: {
            ...pageData,
            updatedAt: new Date(),
          }
        },
        { upsert: true }
      );

      return res.status(200).json({ ok: true, message: "Page saved successfully" });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" });
  } catch (error) {
    console.error("Pages API error:", error);
    return res.status(500).json({ 
      ok: false, 
      error: error instanceof Error ? error.message : "Server error" 
    });
  }
}
