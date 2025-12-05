// src/app/admin/products/create/page.tsx
"use client";

import React, { useState } from "react";
import { uploadToCloudinary } from "@/app/lib/cloudinary";
import { ProductFormData } from "@/app/lib/types";
import { useRouter } from "next/navigation";
import ProductForm from "../ProductForm";

export default function AdminCreateProduct() {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>({
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
    setForm((prev: ProductFormData) => ({ ...prev, [name]: name === "price" || name === "stock" ? Number(value) : value }));
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
    } catch (err) {
      if (err instanceof Error) {
        alert("Create failed: " + err.message);
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Create New Product</h1>
      <div className="bg-white border rounded-lg p-6">
        <ProductForm
          form={form}
          onChange={onChange}
          images={images}
          setImages={setImages}
          handleSubmit={handleSubmit}
          uploading={uploading}
          buttonText={uploading ? "Creating..." : "Create Product"}
        />
      </div>
    </div>
  );
}
