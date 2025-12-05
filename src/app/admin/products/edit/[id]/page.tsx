// src/app/admin/products/edit/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { uploadToCloudinary } from "../../../../lib/cloudinary";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminEditProduct() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params?.get("id") || ""; // Next router app params not available inside "use client" page; using search param trick
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<any>(null);
  const [images, setImages] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const resp = await fetch(`/api/products/${encodeURIComponent(id)}`);
        const j = await resp.json();
        if (!mounted) return;
        if (!resp.ok) throw new Error(j?.error || "Failed");
        const product = j.product;
        setForm({
          sku: product.sku,
          name: product.name,
          category: product.category,
          description: product.description || "",
          price: product.price,
          stock: product.stock,
          unit: product.unit || "1 kg",
          images: product.images || [],
        });
      } catch (err: any) {
        alert("Failed to load product: " + (err.message || err));
        router.push("/admin/products");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    if (id) load();
    return () => { mounted = false; };
  }, [id]);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: name === "price" || name === "stock" ? Number(value) : value }));
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const uploaded: string[] = [];
      for (const f of images) {
        const r = await uploadToCloudinary(f);
        uploaded.push(r.url);
      }
      const finalImages = [...(form.images || []), ...uploaded];
      const resp = await fetch(`/api/products/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, images: finalImages }),
      });
      const j = await resp.json();
      if (!resp.ok) throw new Error(j?.error || "Save failed");
      alert("Saved");
      router.push("/admin/products");
    } catch (err: any) {
      alert("Save failed: " + (err.message || err));
    } finally {
      setSaving(false);
    }
  }

  if (loading || !form) return <div className="p-6">Loading…</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>

      <form onSubmit={onSave} className="bg-white border p-6 rounded space-y-4">
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
          <input name="category" value={form.category} onChange={onChange} className="mt-1 input" />
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
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" value={form.description} onChange={onChange} className="mt-1 input" rows={4} />
        </div>

        <div>
          <label className="block text-sm font-medium">Add Images</label>
          <input type="file" accept="image/*" multiple onChange={(e) => {
            if (!e.target.files) return;
            setImages(Array.from(e.target.files));
          }} className="mt-1" />
          <div className="flex gap-2 mt-2">
            {images.map((f, i) => <div key={i} className="text-xs text-slate-600">{f.name}</div>)}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Existing Images</label>
          <div className="flex gap-2 mt-2">
            {(form.images || []).map((u: string, idx: number) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={idx} src={u} alt={`img-${idx}`} className="w-20 h-20 object-cover rounded border" />
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
          <button type="button" onClick={() => router.push("/admin/products")} className="btn">Cancel</button>
        </div>
      </form>
    </div>
  );
}
