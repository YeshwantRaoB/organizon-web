// pages/api/admin/bulk-products.ts
import type { NextApiResponse } from "next";
import type { NextApiRequestWithCookies } from "../../../lib/apiAuth";
import { requireAdmin } from "../../../lib/apiAuth";
import { getDb } from "../../../lib/mongo";
import { z } from "zod";

const productSchema = z.object({
  sku: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  subcategory: z.string().optional(),
  description: z.string().optional().default(""),
  price: z.number().min(0),
  mrp: z.number().optional(),
  stock: z.number().int().min(0).default(0),
  unit: z.string().optional().default("1 kg"),
  images: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
});

const bulkSchema = z.object({
  products: z.array(productSchema),
  skipDuplicates: z.boolean().optional().default(true),
});

export default async function handler(req: NextApiRequestWithCookies, res: NextApiResponse) {
  try {
    await requireAdmin(req);

    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    const parsed = bulkSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ 
        ok: false, 
        error: "Validation failed", 
        details: parsed.error.issues 
      });
    }

    const { products, skipDuplicates } = parsed.data;
    const db = await getDb();
    const productsCollection = db.collection("products");

    const results = {
      total: products.length,
      inserted: 0,
      skipped: 0,
      errors: [] as Array<{ sku: string; error: string }>,
    };

    for (const product of products) {
      try {
        // Check if SKU already exists
        const existing = await productsCollection.findOne({ sku: product.sku });
        
        if (existing) {
          if (skipDuplicates) {
            results.skipped++;
            continue;
          } else {
            results.errors.push({ 
              sku: product.sku, 
              error: "SKU already exists" 
            });
            continue;
          }
        }

        // Insert product
        await productsCollection.insertOne({
          ...product,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        results.inserted++;
      } catch (error) {
        results.errors.push({ 
          sku: product.sku, 
          error: error instanceof Error ? error.message : "Unknown error" 
        });
      }
    }

    return res.status(200).json({
      ok: true,
      count: results.inserted,
      results,
    });
  } catch (error) {
    console.error("Bulk products API error:", error);
    if (error instanceof Error) {
      return res.status(500).json({ ok: false, error: error.message });
    }
    return res.status(500).json({ ok: false, error: "Server error" });
  }
}
