"use client";

import React, { ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebaseClient";
import SignInButton from "../components/SignInButton";

export default function ProtectedClient({ children }: { children: ReactNode }) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="text-sm text-slate-500">Checking authentication…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-red-500">
        <p>Error: {error.message}</p>
        <p>Could not authenticate. Please try again later.</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center border rounded-md">
        <h2 className="text-lg font-semibold mb-2">You need an account to view this page</h2>
        <p className="text-sm text-slate-600 mb-4">
          Please sign in with Google to access your account and orders.
        </p>
        <div className="flex justify-center">
          <SignInButton />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
