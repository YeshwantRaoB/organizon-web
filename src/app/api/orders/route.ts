import { NextRequest, NextResponse } from "next/server";
import type { ObjectId, Collection, WithId } from "mongodb";
import { adminAuth } from "../../lib/firebaseAdmin";
import { getDb } from "../../lib/mongo";

interface OrderItemDoc {
  sku?: string;
  productId?: string;
  name?: string;
  qty?: number;
  quantity?: number;
  price?: number;
}

interface OrderDoc {
  _id?: ObjectId;
  userId: string;
  status?: string;
  total?: number;
  createdAt?: string | Date;
  items?: OrderItemDoc[];
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idToken = authHeader.split("Bearer ")[1];

    let decoded;
    try {
      decoded = await adminAuth.verifyIdToken(idToken);
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = decoded.uid as string;

    const db = await getDb();
    const ordersCollection: Collection<OrderDoc> = db.collection<OrderDoc>("orders");

    const rawOrders = await ordersCollection
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    const orders = rawOrders.map((order: WithId<OrderDoc>) => ({
      id: order._id?.toString() ?? "",
      status: order.status ?? "pending",
      total: typeof order.total === "number" ? order.total : 0,
      createdAt:
        typeof order.createdAt === "string"
          ? order.createdAt
          : order.createdAt instanceof Date
          ? order.createdAt.toISOString()
          : new Date().toISOString(),
      items: Array.isArray(order.items)
        ? order.items.map((item) => ({
            sku: item.sku ?? item.productId ?? "",
            name: item.name ?? "Item",
            qty:
              typeof item.qty === "number"
                ? item.qty
                : typeof item.quantity === "number"
                ? item.quantity
                : 1,
            price: typeof item.price === "number" ? item.price : 0,
          }))
        : [],
    }));

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("User orders API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
