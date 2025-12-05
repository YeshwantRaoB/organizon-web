import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin, type NextApiRequestWithCookies } from "../../../../lib/apiAuth";
import { connectToDatabase } from "../../../../lib/mongo";
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequestWithCookies, res: NextApiResponse) {
  try {
    await requireAdmin(req);

    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ ok: false, error: "Invalid order ID" });
    }

    const { db } = await connectToDatabase();

    if (req.method === "GET") {
      const order = await db.collection("orders").findOne({ _id: new ObjectId(id) });

      if (!order) {
        return res.status(404).json({ ok: false, error: "Order not found" });
      }

      return res.status(200).json({ ok: true, order });
    }

    if (req.method === "PATCH") {
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ ok: false, error: "Status is required" });
      }

      const result = await db.collection("orders").updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            status,
            updatedAt: new Date(),
          }
        }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ ok: false, error: "Order not found" });
      }

      return res.status(200).json({ ok: true, message: "Order updated successfully" });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" });
  } catch (error) {
    console.error("Order API error:", error);
    return res.status(500).json({ 
      ok: false, 
      error: error instanceof Error ? error.message : "Server error" 
    });
  }
}
