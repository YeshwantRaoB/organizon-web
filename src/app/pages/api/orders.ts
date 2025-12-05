// pages/api/orders.ts
import type { NextApiResponse } from "next";
import { getDb } from "../../lib/mongo";
import { verifyFirebaseIdTokenFromReq, NextApiRequestWithCookies } from "../../lib/apiAuth";

type OrderItem = {
  sku: string;
  name: string;
  qty: number;
  price: number;
};

type Order = {
  id: string;
  uid: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: OrderItem[];
  createdAt: string;
};

type Data =
  | { ok: true; orders: Order[] }
  | { ok: false; error: string };

  
export default async function handler(req: NextApiRequestWithCookies, res: NextApiResponse<Data>) {
  try {
    // Only allow GET for now
    if (req.method !== "GET") return res.status(405).json({ ok: false, error: "Method not allowed" });

    const decoded = await verifyFirebaseIdTokenFromReq(req);
    const uid = decoded.uid;

    const db = await getDb();
    const ordersCollection = db.collection("orders");

    const orders = await ordersCollection.find({ uid }).sort({ createdAt: -1 }).toArray() as unknown as Order[];

    return res.status(200).json({ ok: true, orders });
  } catch (err) {
    console.error("orders api error:", err);
    if (err instanceof Error) {
      return res.status(401).json({ ok: false, error: err.message });
    } else {
      return res.status(401).json({ ok: false, error: "Unauthorized" });
    }
  }
}
