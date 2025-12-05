import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "../../../lib/firebaseAdmin";
import { getDb } from "../../../lib/mongo";

async function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cookieToken = request.cookies.get("firebase_token")?.value;
  
  let token: string | undefined;
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split("Bearer ")[1];
  } else if (cookieToken) {
    token = cookieToken;
  }

  if (!token) {
    throw new Error("No token provided");
  }

  const decoded = await adminAuth.verifyIdToken(token);
  
  const isAdminClaim = Boolean(decoded.admin);
  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
  const isAdminEmail = decoded.email ? adminEmails.includes(decoded.email) : false;
  
  if (!isAdminClaim && !isAdminEmail) {
    throw new Error("Forbidden: admin only");
  }
  
  return decoded;
}

export async function GET(request: NextRequest) {
  try {
    await verifyAdmin(request);

    const db = await getDb();
    
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

    const revenueResult = await ordersCollection.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]).toArray();

    const totalRevenue = revenueResult[0]?.total || 0;

    return NextResponse.json({
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
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Server error" },
      { status: error instanceof Error && error.message.includes("Forbidden") ? 403 : 500 }
    );
  }
}
