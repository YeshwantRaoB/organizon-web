// pages/api/products/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getDb } from "../../../lib/mongo";
import { requireAdmin } from "../../../lib/apiAuth";
import { ObjectId } from "mongodb";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  mrp: z.number().optional(),
  stock: z.number().int().optional(),
  unit: z.string().optional(),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await getDb();
  const products = db.collection("products");
  const { id } = req.query;

  try {
    if (!id) return res.status(400).json({ ok: false, error: "Missing id" });

    // GET single product by ObjectId or SKU
    if (req.method === "GET") {
      let doc = null;
      if (ObjectId.isValid(String(id))) {
        doc = await products.findOne({ _id: new ObjectId(String(id)) });
      }
      if (!doc) {
        doc = await products.findOne({ sku: String(id) });
      }
      if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
      return res.status(200).json({ ok: true, product: doc });
    }

    // PUT update (admin)
    if (req.method === "PUT") {
      await requireAdmin(req);
      const parsed = updateSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ ok: false, error: parsed.error.errors });

      const update = { ...parsed.data, updatedAt: new Date().toISOString() } as any;

      let filter: any = {};
      if (ObjectId.isValid(String(id))) filter = { _id: new ObjectId(String(id)) };
      else filter = { sku: String(id) };

      const r = await products.findOneAndUpdate(filter, { $set: update }, { returnDocument: "after" });
      if (!r.value) return res.status(404).json({ ok: false, error: "Not found" });
      return res.status(200).json({ ok: true, product: r.value });
    }

    // DELETE (admin)
    if (req.method === "DELETE") {
      await requireAdmin(req);
      let filter: any = {};
      if (ObjectId.isValid(String(id))) filter = { _id: new ObjectId(String(id)) };
      else filter = { sku: String(id) };
      const r = await products.findOneAndDelete(filter);
      if (!r.value) return res.status(404).json({ ok: false, error: "Not found" });
      return res.status(200).json({ ok: true, product: r.value });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" });
  } catch (err: any) {
    console.error("products/[id] error:", err);
    return res.status(500).json({ ok: false, error: err.message || "Server error" });
  }
}
