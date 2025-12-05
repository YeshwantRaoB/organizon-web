// pages/api/products/index.ts
import type { NextApiResponse } from "next";
import type { NextApiRequestWithCookies } from "../../../lib/apiAuth";
import { getDb } from "../../../lib/mongo";
import { requireAdmin } from "../../../lib/apiAuth";
import { z } from "zod";
import { ObjectId } from "mongodb";

type Product = {
  _id?: ObjectId;
  sku: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  price: number;
  mrp?: number;
  stock: number;
  unit?: string;
  images: string[]; // relative URLs in /public or storage URLs
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
};

const createSchema = z.object({
  sku: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  subcategory: z.string().optional(),
  description: z.string().optional().default(""),
  price: z.number().min(0),
  mrp: z.number().optional(),
  stock: z.number().int().min(0).default(0),
  unit: z.string().optional().default("1 kg"),
  images: z.array(z.string()).optional().default(["/placeholder.png"]),
  tags: z.array(z.string()).optional().default([]),
});

export default async function handler(req: NextApiRequestWithCookies, res: NextApiResponse) {
  const db = await getDb();
  const products = db.collection("products");

  try {
    if (req.method === "GET") {
      // query params: page, limit, category, search, sort
      const page = Math.max(1, Number(req.query.page) || 1);
      const limit = Math.min(100, Number(req.query.limit) || 24);
      const skip = (page - 1) * limit;

      const filter: { category?: string; subcategory?: string; $text?: { $search: string } } = {};
      if (req.query.category) filter.category = String(req.query.category);
      if (req.query.subcategory) filter.subcategory = String(req.query.subcategory);
      if (req.query.search) {
        const q = String(req.query.search);
        filter.$text = { $search: q };
      }

      const cursor = products.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
      const total = await products.countDocuments(filter);
      const items = await cursor.toArray();

      return res.status(200).json({ ok: true, total, page, limit, items });
    }

    if (req.method === "POST") {
      // protected - admin only
      await requireAdmin(req);
      const parsed = createSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ ok: false, error: parsed.error.flatten() });

      const data: Product = {
        ...parsed.data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const existing = await products.findOne({ sku: data.sku });
      if (existing) return res.status(409).json({ ok: false, error: "SKU already exists" });

      const r = await products.insertOne(data);
      const created = await products.findOne({ _id: r.insertedId });
      return res.status(201).json({ ok: true, product: created });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" });
  } catch (err) {
    console.error("products(index) error:", err);
    if (err instanceof Error) {
      return res.status(500).json({ ok: false, error: err.message });
    } else {
      return res.status(500).json({ ok: false, error: "Server error" });
    }
  }
}
