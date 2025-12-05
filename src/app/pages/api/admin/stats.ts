// pages/api/admin/stats.ts
import type { NextApiResponse } from "next";
import type { NextApiRequestWithCookies } from "../../../lib/apiAuth";
import { requireAdmin } from "../../../lib/apiAuth";
import { getDb } from "../../../lib/mongo";

export default async function handler(req: NextApiRequestWithCookies, res: NextApiResponse) {
  try {
    await requireAdmin(req);

    if (req.method !== "GET") {
      return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    const db = await getDb();
    
    // Get product statistics
    const productsCollection = db.collection("products");
    const ordersCollection = db.collection("orders");

    const [
      totalProducts,
      lowStockProducts,
      outOfStockProducts,
      totalOrders,
      categories,
    ] = await Promise.all([
      productsCollection.countDocuments(),
      productsCollection.countDocuments({ stock: { $lt: 10, $gt: 0 } }),
      productsCollection.countDocuments({ stock: 0 }),
      ordersCollection.countDocuments(),
      productsCollection.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]).toArray(),
    ]);

    // Calculate total revenue (if orders exist)
    const revenueResult = await ordersCollection.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]).toArray();

    const totalRevenue = revenueResult[0]?.total || 0;

    return res.status(200).json({
      ok: true,
      stats: {
        products: {
          total: totalProducts,
          lowStock: lowStockProducts,
          outOfStock: outOfStockProducts,
        },
        orders: {
          total: totalOrders,
          revenue: totalRevenue,
        },
        categories: categories.map(c => ({
          name: c._id,
          count: c.count,
        })),
      },
    });
  } catch (error) {
    console.error("Admin stats API error:", error);
    if (error instanceof Error) {
      return res.status(500).json({ ok: false, error: error.message });
    }
    return res.status(500).json({ ok: false, error: "Server error" });
  }
}
