// src/app/admin/products/create/page.tsx
"use client";

import React, { useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { useRouter } from "next/navigation";

export default function AdminCreateProduct() {
  const router = useRouter();
  const [form, setForm] = useState({
    sku: "",
    name: "",
    category: "Rice",
    description: "",
    price: 100,
    stock: 10,
    unit: "1 kg",
  });
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "price" || name === "stock" ? Number(value) : value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);
    try {
      // upload images first
      const uploadedUrls: string[] = [];
      for (const f of images) {
        const res = await uploadToCloudinary(f);
        uploadedUrls.push(res.url);
      }

      // require admin token via api/admin/check already in list page; here we simply post
      const resp = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, images: uploadedUrls }),
      });
      const j = await resp.json();
      if (!resp.ok) throw new Error(j?.error || "Create failed");
      alert("Created");
      router.push("/admin/products");
    } catch (err: any) {
      alert("Create failed: " + (err.message || err));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Create Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white border p-6 rounded">
        <div>
          <label className="block text-sm font-medium">SKU</label>
          <input name="sku" value={form.sku} onChange={onChange} required className="mt-1 input" />
        </div>

        <div>
          <label className="block text-sm font-medium">Name</label>
          <input name="name" value={form.name} onChange={onChange} required className="mt-1 input" />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <select name="category" value={form.category} onChange={onChange} className="mt-1 input">
            <option>Rice</option><option>Millets</option><option>Pulses</option><option>Cereals</option><option>Flours</option><option>Cold-Pressed Oils</option><option>Spices & Herbs</option><option>Value-Added Products</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Price (₹)</label>
          <input name="price" type="number" value={String(form.price)} onChange={onChange} className="mt-1 input" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Stock</label>
          <input name="stock" type="number" value={String(form.stock)} onChange={onChange} className="mt-1 input" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Unit</label>
          <input name="unit" value={form.unit} onChange={onChange} className="mt-1 input" />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" value={form.description} onChange={onChange} className="mt-1 input" rows={4} />
        </div>

        <div>
          <label className="block text-sm font-medium">Images</label>
          <input type="file" accept="image/*" multiple onChange={(e) => {
            if (!e.target.files) return;
            setImages(Array.from(e.target.files));
          }} className="mt-1" />
          <div className="flex gap-2 mt-2">
            {images.map((f, i) => <div key={i} className="text-xs text-slate-600">{f.name}</div>)}
          </div>
        </div>

        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={uploading}>{uploading ? "Creating..." : "Create"}</button>
          <button type="button" onClick={() => window.history.back()} className="btn">Cancel</button>
        </div>
      </form>
    </div>
  );
}
