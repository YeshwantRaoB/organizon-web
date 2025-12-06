"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebaseClient";
import Link from "next/link";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      try {
        const token = await user.getIdToken();
        const res = await fetch("/api/admin/check", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setIsAdmin(data.ok);
      } catch {
        setIsAdmin(false);
      }
    }

    checkAdmin();
  }, [user]);

  return (
    <nav className="hidden md:flex items-center gap-8">
      <Link href="/" className="text-sm font-medium text-gray-700 hover:text-[#2d5016] transition-colors">
        Home
      </Link>
      <Link href="/catalog" className="text-sm font-medium text-gray-700 hover:text-[#2d5016] transition-colors">
        Shop
      </Link>
      <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-[#2d5016] transition-colors">
        About
      </Link>
      <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-[#2d5016] transition-colors">
        Contact
      </Link>
      {isAdmin && (
        <Link 
          href="/admin" 
          className="text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Admin
        </Link>
      )}
    </nav>
  );
}
