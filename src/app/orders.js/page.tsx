// src/app/orders/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import ProtectedClient from "../components/ProtectedClient";
import { auth } from "../lib/firebaseClient";

type OrderItem = {
  sku: string;
  name: string;
  qty: number;
  price: number;
};

type Order = {
  id: string;
  status: string;
  total: number;
  items: OrderItem[];
  createdAt: string;
};

export default function OrdersPageClient() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchOrders() {
      try {
        setLoading(true);
        // prefer Authorization header with fresh ID token
        const currentUser = auth.currentUser;
        if (!currentUser) {
          setError("Not signed in");
          setLoading(false);
          return;
        }
        const token = await currentUser.getIdToken();
        const resp = await fetch("/api/orders", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await resp.json();
        if (!mounted) return;
        if (!resp.ok) {
          setError(data?.error || "Failed to fetch orders");
          setLoading(false);
          return;
        }
        setOrders(data.orders || []);
        setLoading(false);
      } catch (err) {
        console.error("fetchOrders error:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
        setLoading(false);
      }
    }

    fetchOrders();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ProtectedClient>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

        {loading && <div className="text-sm text-slate-500">Loading orders…</div>}
        {error && <div className="text-sm text-red-500">{error}</div>}

        {!loading && !error && orders && orders.length === 0 && (
          <div className="text-sm text-slate-500">You have no orders yet.</div>
        )}

        <div className="space-y-4 mt-4">
          {orders?.map((o) => (
            <div key={o.id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start justify-between p-6">
                <div>
                  <div className="text-sm text-slate-500">Order ID</div>
                  <div className="font-medium">{o.id}</div>
                  <div className="text-xs text-slate-400 mt-1">{new Date(o.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-500">Status</div>
                  <div className="font-semibold capitalize">{o.status}</div>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {o.items.map((it) => (
                    <li key={it.sku} className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-xs">Img</div>
                        <div>
                          <div className="font-medium text-sm">{it.name}</div>
                          <div className="text-xs text-slate-500">SKU: {it.sku}</div>
                        </div>
                      </div>
                      <div className="text-sm text-slate-600">
                        {it.qty} × ₹{it.price}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center justify-between p-6 bg-gray-50 rounded-b-lg">
                  <div className="text-sm text-slate-500">Total</div>
                  <div className="font-semibold">₹{o.total}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedClient>
  );
}
