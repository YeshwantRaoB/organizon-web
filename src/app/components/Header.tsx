"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '../lib/cartStore';
import SignInButton from './SignInButton';
import Navbar from './Navbar';
import { useEffect } from 'react';
import { auth } from '../lib/firebaseClient';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Header() {
  const { items, setCart, clearCart } = useCartStore();
  const [user, loading, error] = useAuthState(auth);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const idToken = await user.getIdToken();
        const response = await fetch('/api/cart', {
          headers: {
            'Authorization': `Bearer ${idToken}`,
          },
        });
        const data = await response.json();
        if (response.ok && data.cart) {
          setCart(data.cart.items);
        }
      } else {
        clearCart();
      }
    };

    if (!loading) {
      fetchCart();
    }
  }, [user, loading, setCart, clearCart]);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-organicGreen/20 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 ring-organicGreen/20 group-hover:ring-organicGreen/40 transition-all">
              <Image
                src="/logo.jpg"
                alt="Organizon Organics Logo"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight group-hover:text-organicGreen transition-colors">Organizon Organics</h1>
              <p className="text-xs text-gray-500">Pure. Natural. Organic.</p>
            </div>
          </Link>

          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <form action="/search" method="get" className="relative">
              <input
                type="text"
                name="q"
                placeholder="Search organic products..."
                className="w-full px-4 py-2.5 pr-10 text-sm border border-organicGreen/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-organicGreen/50 focus:border-organicGreen bg-organicCream/50 placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-organicGreen transition-colors duration-200 p-1"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          <Navbar />

          <div className="flex items-center gap-3 md:gap-4">
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 md:gap-2 text-sm font-medium text-gray-700 hover:text-organicGreen transition-colors duration-200 p-2 rounded-md hover:bg-gray-50"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-organicGreen text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
            <SignInButton />
          </div>
        </div>
      </div>
    </header>
  );
}
