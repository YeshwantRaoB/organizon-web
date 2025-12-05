// src/app/admin/page.tsx
import { redirect } from "next/navigation";

export default function AdminIndex() {
  // quick redirect to products admin
  redirect("/admin/products");
}
