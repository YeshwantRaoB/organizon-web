import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin, type NextApiRequestWithCookies } from "../../../lib/apiAuth";
import { connectToDatabase } from "../../../lib/mongo";

export default async function handler(req: NextApiRequestWithCookies, res: NextApiResponse) {
  try {
    await requireAdmin(req);

    const { db } = await connectToDatabase();

    if (req.method === "GET") {
      const settings = await db.collection("settings").findOne({ _id: "site_settings" });
      
      return res.status(200).json({ 
        ok: true, 
        settings: settings || {} 
      });
    }

    if (req.method === "POST") {
      const settingsData = req.body;

      await db.collection("settings").updateOne(
        { _id: "site_settings" },
        { 
          $set: {
            ...settingsData,
            updatedAt: new Date(),
          }
        },
        { upsert: true }
      );

      return res.status(200).json({ ok: true, message: "Settings saved successfully" });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" });
  } catch (error) {
    console.error("Settings API error:", error);
    return res.status(500).json({ 
      ok: false, 
      error: error instanceof Error ? error.message : "Server error" 
    });
  }
}
