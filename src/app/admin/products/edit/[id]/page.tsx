// src/app/admin/products/edit/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { uploadToCloudinary } from "@/app/lib/cloudinary";
import { useRouter, useParams } from "next/navigation";
import toast from 'react-hot-toast';
import { ProductFormData } from "@/app/lib/types";
import ProductForm from "../../ProductForm";

export default function AdminEditProduct() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ProductFormData | null>(null);
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
      } catch (err) {
        if (err instanceof Error) {
          toast.error(`Failed to load product: ${err.message}`);
        } else {
          toast.error('An unknown error occurred while loading the product.');
        }
        router.push("/admin/products");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    if (id) load();
    return () => { mounted = false; };
  }, [id, router]);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => {
      if (!prev) return null;
      return { ...prev, [name]: name === "price" || name === "stock" ? Number(value) : value };
    });
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    const toastId = toast.loading('Saving product...');
    setSaving(true);
    try {
      const uploaded: string[] = [];
      if (images.length > 0) {
        toast.loading('Uploading images...', { id: toastId });
        for (const f of images) {
          const r = await uploadToCloudinary(f);
          uploaded.push(r.url);
        }
      }
      const finalImages = [...(form.images || []), ...uploaded];

      toast.loading('Saving product details...', { id: toastId });
      const resp = await fetch(`/api/products/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, images: finalImages }),
      });
      const j = await resp.json();
      if (!resp.ok) throw new Error(j?.error || "Save failed");
      toast.success('Product saved successfully!', { id: toastId });
      router.push("/admin/products");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Save failed: ${err.message}`, { id: toastId });
      } else {
        toast.error('An unknown error occurred while saving.', { id: toastId });
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading || !form) return <div className="p-6">Loading…</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
      <div className="bg-white border rounded-lg p-6">
        <ProductForm
          form={form}
          onChange={onChange}
          images={images}
          setImages={setImages}
          handleSubmit={onSave}
          uploading={saving}
          buttonText={saving ? "Saving..." : "Save Changes"}
        />
      </div>
    </div>
  );
}
