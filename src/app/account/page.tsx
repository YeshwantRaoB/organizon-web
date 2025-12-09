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

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-organicGreen"></div></div>;
  }

  if (error) {
    return <div className="text-center py-10">Error: {error.message}</div>;
  }

  return (
    <ProtectedClient>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">My Account</h2>

        <div className="bg-white border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Picture Column */}
            <div className="md:col-span-1 flex flex-col items-center">
              {user?.photoURL ? (
                <Image src={user.photoURL} alt="Profile" width={96} height={96} className="rounded-full" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-4xl font-bold text-gray-400">{user?.displayName?.charAt(0)}</div>
              )}
              <button onClick={() => auth.signOut()} className="mt-4 text-sm text-red-500 hover:underline">Sign Out</button>
            </div>

            {/* User Details Column */}
            <div className="md:col-span-2">
              <div className="text-2xl font-semibold mb-2">{user?.displayName}</div>
              <div className="text-slate-500 mb-6">{user?.email}</div>
              
              <div className="space-y-4 text-sm text-slate-600">
                <div>
                  <div className="text-xs text-slate-400">User ID</div>
                  <div className="font-mono text-xs bg-gray-50 p-1 rounded">{user?.uid}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Member since</div>
                  <div>{user?.metadata?.creationTime || "—"}</div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/orders" className="bg-organicGreen hover:bg-organicGreenLight text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-organicGreen/50">View Orders</Link>
                <Link href="/account/edit" className="bg-white border-2 border-gray-300 hover:border-organicGreen text-gray-800 hover:text-organicGreen font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-organicGreen/50">Edit Profile</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedClient>
  );
}
