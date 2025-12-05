// pages/api/orders.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "../../lib/firebaseAdmin";

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

async function verifyTokenFromRequest(req: NextApiRequest) {
  // try Authorization header first
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
  return decoded;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    // Only allow GET for now
    if (req.method !== "GET") return res.status(405).json({ ok: false, error: "Method not allowed" });

    const decoded = await verifyTokenFromRequest(req);
    const uid = decoded.uid;

    // TODO: Replace this mock with DB lookup (Mongo DB) for real orders tied to uid.
    // Mock sample orders
    const orders: Order[] = [
      {
        id: "ORD-1001",
        uid,
        status: "delivered",
        total: 899,
        items: [
          { sku: "RICE-001", name: "Traditional Red Rice - 1kg", qty: 1, price: 349 },
          { sku: "JAG-002", name: "Organic Jaggery - 500g", qty: 1, price: 150 },
          { sku: "OIL-001", name: "Cold-Pressed Sesame Oil - 500ml", qty: 1, price: 400 },
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
      },
      {
        id: "ORD-1005",
        uid,
        status: "shipped",
        total: 299,
        items: [
          { sku: "MIL-003", name: "Finger Millet (Ragi) - 1kg", qty: 1, price: 99 },
          { sku: "PUL-002", name: "Organic Toor Dal - 1kg", qty: 1, price: 200 },
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      },
    ];

    return res.status(200).json({ ok: true, orders });
  } catch (err: any) {
    console.error("orders api error:", err);
    return res.status(401).json({ ok: false, error: err.message || "Unauthorized" });
  }
}
