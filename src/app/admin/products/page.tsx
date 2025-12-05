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
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Delete failed: " + err.message);
      } else {
        alert("An unknown error occurred while deleting.");
      }
    }
  };

  return (
    <ProtectedClient>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Admin — Products</h1>
          <Link href="/admin/products/create" className="bg-organicGreen text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300">Create Product</Link>
        </div>

        <div className="mt-4">
          {loading && <div className="text-center py-10">Loading...</div>}
          {error && <div className="text-center py-10 text-red-500">Error: {error}</div>}
          {!loading && !error && (
            <div className="bg-white border rounded-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map(p => (
                    <tr key={p._id || p.sku}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {p.images && p.images.length ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img className="h-10 w-10 rounded-full object-cover" src={p.images[0]} alt={p.name} />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">No Image</div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{p.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.sku}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{p.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/admin/products/edit/${encodeURIComponent(p._id || p.sku)}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                        <button onClick={() => handleDelete(p._id || p.sku)} className="ml-4 text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </ProtectedClient>
  );
}
