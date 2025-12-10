import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/mongoose";
import Product from "../../../lib/models/product";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { ok: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, product });
  } catch (error) {
    console.error("Product detail API error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
