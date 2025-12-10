import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/mongoose";
import Product from "../../lib/models/product";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    await dbConnect();

    // Build query
    const query: { 
      category?: string;
      $or?: ({ name: { $regex: string; $options: string; } } | { description: { $regex: string; $options: string; } })[];
    } = {};
    
    if (category && category !== "all") {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query).limit(limit);

    return NextResponse.json({ ok: true, products });
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
