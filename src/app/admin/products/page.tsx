// src/app/admin/products/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedClient from "../../components/ProtectedClient";

type Product = {
  _id: string;
  sku: string;
  name: string;
  price: number;
  stock: number;
  images?: string[];
};

export default function AdminProductsPageClient() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function checkAndLoad() {
      try {
        // verify admin server-side (fast)
        const r = await fetch("/api/admin/check");
        if (!r.ok) {
          const d = await r.json();
          throw new Error(d?.error || "Not authorized");
        }
        // fetch products
        const resp = await fetch("/api/products?limit=200");
        const j = await resp.json();
        if (!mounted) return;
        if (!resp.ok) throw new Error(j?.error || "Failed to load");
        setProducts(j.items || []);
      } catch (err: any) {
        setError(err.message || "Error");
      } finally {
        setLoading(false);
      }
    }
    checkAndLoad();
    return () => { mounted = false; };
  }, []);

  const handleDelete = async (skuOrId: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      const tokenResp = await fetch("/api/admin/check");
      if (!tokenResp.ok) throw new Error("Not admin");
      const res = await fetch(`/api/products/${encodeURIComponent(skuOrId)}`, { method: "DELETE" });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || "Delete failed");
      setProducts(prev => prev ? prev.filter(p => p._id !== j.product._id && p.sku !== j.product.sku) : prev);
      alert("Deleted");
    } catch (err: any) {
      alert("Delete failed: " + (err.message || err));
    }
  };

  return (
    <ProtectedClient>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Admin — Products</h1>
          <Link href="/admin/products/create" className="btn btn-primary">Create Product</Link>
        </div>

        <div className="mt-4">
          {loading && <div className="text-sm text-slate-500">Loading…</div>}
          {error && <div className="text-sm text-red-500">{error}</div>}

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.map(p => (
              <div key={p._id || p.sku} className="border rounded-lg p-4">
                <div className="h-40 bg-gray-50 flex items-center justify-center rounded">
                  {p.images && p.images.length ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.images[0]} alt={p.name} className="object-contain h-full" />
                  ) : (
                    <div className="text-sm text-slate-400">No image</div>
                  )}
                </div>
                <div className="mt-3">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-slate-500">SKU: {p.sku}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-sm font-semibold">₹{p.price}</div>
                    <div className="text-xs text-slate-500">Stock: {p.stock}</div>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <Link href={`/admin/products/edit/${encodeURIComponent(p._id || p.sku)}`} className="btn !py-1 px-3">Edit</Link>
                  <button onClick={() => handleDelete(p._id || p.sku)} className="btn !py-1 px-3">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedClient>
  );
}
