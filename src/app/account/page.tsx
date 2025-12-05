// src/app/account/page.tsx
"use client";

import React from "react";
import ProtectedClient from "../components/ProtectedClient";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebaseClient";
import Image from "next/image";
import Link from "next/link";

export default function AccountPage() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <ProtectedClient>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">My Account</h2>

        <div className="bg-white border rounded-lg p-6 max-w-2xl">
          <div className="flex items-center gap-4">
            {user?.photoURL ? (
              <Image src={user.photoURL} alt="Profile" width={72} height={72} className="rounded-full" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">U</div>
            )}

            <div>
              <div className="text-lg font-semibold">{user?.displayName}</div>
              <div className="text-sm text-slate-500">{user?.email}</div>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <div>
              <div className="text-xs text-slate-400">User ID</div>
              <div className="font-mono text-xs">{user?.uid}</div>
            </div>

            <div>
              <div className="text-xs text-slate-400">Member since</div>
              <div>{user?.metadata?.creationTime || "—"}</div>
            </div>

            <div className="mt-4">
              <Link href="/orders" className="btn btn-primary !py-1.5 px-3 text-sm">View Orders</Link>
              <Link href="/account/edit" className="ml-3 btn !py-1.5 px-3 text-sm">Edit Profile</Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedClient>
  );
}
