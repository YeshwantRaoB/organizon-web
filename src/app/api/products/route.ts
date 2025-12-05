import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../../lib/mongo";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const db = await getDb();
    const productsCollection = db.collection("products");

    // Build query
    const query: any = {};
    
    if (category && category !== "all") {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await productsCollection
      .find(query)
      .limit(limit)
      .toArray();

    return NextResponse.json({ ok: true, products });
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
