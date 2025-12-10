import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { adminAuth } from "@/app/lib/firebaseAdmin";
import { getDb } from "@/app/lib/mongo";

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
    .map((s) => s.trim())
    .filter(Boolean);
  const isAdminEmail = decoded.email ? adminEmails.includes(decoded.email) : false;

  if (!isAdminClaim && !isAdminEmail) {
    throw new Error("Forbidden: admin only");
  }

  return decoded;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    await verifyAdmin(request);

    const { orderId } = await params;
    const { status } = await request.json();

    const allowedStatuses = ["pending", "processing", "completed", "cancelled"] as const;
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { ok: false, error: "Invalid status value" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const ordersCollection = db.collection("orders");

    const result = await ordersCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { ok: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin update order API error:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Server error" },
      { status: error instanceof Error && error.message.includes("Forbidden") ? 403 : 500 }
    );
  }
}
