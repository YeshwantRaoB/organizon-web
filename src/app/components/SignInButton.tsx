"use client";

import { useEffect, useRef, useState } from "react";
import { auth } from "../lib/firebaseClient";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function SignInButton() {
  const [user, loading, error] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Check if user is admin
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
        setIsAdmin(data.isAdmin);
      } catch {
        setIsAdmin(false);
      }
    }

    checkAdmin();
  }, [user]);

  // Close dropdown on outside click or ESC
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  // keep a fresh token cookie for server calls (short-lived)
  useEffect(() => {
    let mounted = true;
    async function setTokenCookie() {
      if (!user) {
        Cookies.remove("firebase_token");
        return;
      }
      try {
        const token = await user.getIdToken(/* forceRefresh */ false);
        if (!mounted) return;
        Cookies.set("firebase_token", token, { expires: 1 / 24 }); // ~1 hour
      } catch (err) {
        console.error("Failed to refresh token cookie", err);
      }
    }
    setTokenCookie();
    // optionally refresh token every 45 minutes (background)
    const interval = setInterval(() => {
      setTokenCookie();
    }, 45 * 60 * 1000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [user]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      Cookies.set("firebase_token", token, { expires: 1 / 24 });
      setOpen(false);
    } catch (err) {
      console.error("Google sign-in error:", err);
      alert("Sign-in failed. Check console for details.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Cookies.remove("firebase_token");
      setOpen(false);
      // optional: redirect to homepage after sign out
      router.push("/");
    } catch (err) {
      console.error("Sign-out error:", err);
      alert("Sign-out failed. Check console.");
    }
  };

  const handleNavigate = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  if (loading) return <div className="px-3 py-1 text-sm text-gray-500">Loading...</div>;
  if (error)
    return (
      <div className="px-3 py-1 text-sm text-red-500">Auth error</div>
    );

  return (
    <div className="relative" ref={menuRef}>
      {!user ? (
        <button
          onClick={handleGoogleSignIn}
          className="inline-flex items-center gap-2 bg-[#2d5016] hover:bg-[#3d6820] text-white font-medium text-sm px-4 py-2 rounded-md transition-all shadow-sm hover:shadow-md"
          aria-haspopup="menu"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path fill="#FFF" d="M44 20H24v8h11.3C34.8 31.9 30.8 36 24 36c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.4 0 6.4 1.2 8.7 3.2l6-6C34 3.9 29.4 2 24 2 12.9 2 4 10.9 4 22s8.9 20 20 20 20-8.9 20-20c0-1.4-.1-2.7-.3-4z" />
          </svg>
          Sign In
        </button>
      ) : (
        <>
          <button
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-haspopup="menu"
            className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100 transition-colors"
          >
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt={user.displayName || "avatar"}
                width={32}
                height={32}
                className="rounded-full border-2 border-gray-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#2d5016] text-white flex items-center justify-center text-sm font-semibold">
                {user.displayName?.charAt(0) || "U"}
              </div>
            )}
            <span className="hidden sm:inline-block text-sm font-medium text-gray-700">
              {user.displayName?.split(" ")[0] || user.email}
            </span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02l3.47 3.72 3.47-3.72a.75.75 0 111.08 1.04l-4 4.29a.75.75 0 01-1.08 0l-4-4.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Dropdown */}
          <div
            role="menu"
            aria-label="User menu"
            className={`absolute right-0 mt-2 w-56 rounded-lg bg-white border shadow-lg ring-1 ring-black ring-opacity-5 transform origin-top-right transition-all ${
              open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
            }`}
          >
            <div className="p-3 border-b">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || "avatar"}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                    {user.displayName?.charAt(0) || "U"}
                  </div>
                )}
                <div className="flex-1">
                  <div className="text-sm font-semibold flex items-center gap-2">
                    {user.displayName || "User"}
                    {isAdmin && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-medium rounded-full">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        Admin
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 truncate max-w-[12rem]">
                    {user.email}
                  </div>
                </div>
              </div>
            </div>

            <div className="py-1">
              {isAdmin && (
                <>
                  <button
                    onClick={() => handleNavigate("/admin")}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 flex items-center gap-2 font-medium text-purple-700"
                    role="menuitem"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Admin Dashboard
                  </button>
                  <div className="border-t my-1"></div>
                </>
              )}
              
              <button
                onClick={() => handleNavigate("/account")}
                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                role="menuitem"
              >
                My Account
              </button>

              <button
                onClick={() => handleNavigate("/orders")}
                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                role="menuitem"
              >
                My Orders
              </button>

              <button
                onClick={() => handleNavigate("/wishlist")}
                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                role="menuitem"
              >
                Wishlist
              </button>
            </div>

            <div className="border-t px-3 py-2">
              <button
                onClick={handleSignOut}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
