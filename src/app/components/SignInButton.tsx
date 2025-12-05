"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);

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

  if (loading) return <div className="px-3 py-1">Loading...</div>;
  if (error)
    return (
      <div className="px-3 py-1 text-red-500">Authentication error</div>
    );

  return (
    <div className="relative" ref={menuRef}>
      {!user ? (
        <button
          onClick={handleGoogleSignIn}
          className="inline-flex items-center gap-2 btn btn-primary text-sm px-3 py-1.5"
          aria-haspopup="menu"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path fill="#4285F4" d="M44 20H24v8h11.3C34.8 31.9 30.8 36 24 36c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.4 0 6.4 1.2 8.7 3.2l6-6C34 3.9 29.4 2 24 2 12.9 2 4 10.9 4 22s8.9 20 20 20 20-8.9 20-20c0-1.4-.1-2.7-.3-4z" />
          </svg>
          Sign in
        </button>
      ) : (
        <>
          <button
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-haspopup="menu"
            className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-slate-100 transition"
          >
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt={user.displayName || "avatar"}
                width={36}
                height={36}
                className="rounded-full"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                {user.displayName?.charAt(0) || "U"}
              </div>
            )}
            <span className="hidden sm:inline-block text-sm font-medium">
              {user.displayName?.split(" ")[0] || user.email}
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
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
                <div>
                  <div className="text-sm font-semibold">
                    {user.displayName || "User"}
                  </div>
                  <div className="text-xs text-slate-500 truncate max-w-[12rem]">
                    {user.email}
                  </div>
                </div>
              </div>
            </div>

            <div className="py-1">
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

            <div className="border-t px-3 py-2 flex items-center justify-between gap-2">
              <button
                onClick={handleSignOut}
                className="btn text-sm !px-3 !py-1 rounded-md"
              >
                Sign out
              </button>
              <button
                onClick={() => {
                  // quick dev helper: copy token to clipboard for testing APIs
                  user.getIdToken().then((t) => {
                    void navigator.clipboard.writeText(t);
                    alert("ID token copied to clipboard (for testing).");
                  });
                }}
                className="text-xs text-slate-500 hover:underline"
                title="Copy token"
              >
                Copy token
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
