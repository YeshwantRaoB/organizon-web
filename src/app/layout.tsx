// src/app/layout.tsx

import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

// Make sure this path matches your folder structure
import SignInButton from "./components/SignInButton";

export const metadata = {
  title: "Organizon Organics",
  description: "100% organic farm-sourced foods — rice, millets, oils, spices, honey & more.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#F7FFF7] text-slate-900">

        {/* ---------------------- HEADER ---------------------- */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

            {/* Logo + Brand name */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.jpg"  // replace with your actual logo file
                  alt="Organizon Logo"
                  fill
                  className="object-contain group-hover:scale-110 transition-transform"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-wide">Organizon Organics</h1>
                <p className="text-xs text-slate-500 -mt-1">Farm to your plate</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-6">
              <Link href="/catalog" className="hover:text-organicGreen transition-colors text-sm font-medium">
                Catalog
              </Link>
              <Link href="/gallery" className="hover:text-organicGreen transition-colors text-sm font-medium">
                Gallery
              </Link>
              <Link href="/contact" className="hover:text-organicGreen transition-colors text-sm font-medium">
                Contact
              </Link>

              {/* Cart Button */}
              <Link
                href="/cart"
                className="btn btn-primary !py-1.5 !px-4 text-sm shadow hover:shadow-md transition-all"
              >
                Cart
              </Link>

              {/* Sign-in Button */}
              <div className="ml-2">
                <SignInButton />
              </div>
            </nav>
          </div>
        </header>

        {/* ---------------------- MAIN CONTENT ---------------------- */}
        <main className="flex-1">
          {children}
        </main>

        {/* ---------------------- FOOTER ---------------------- */}
        <footer className="bg-white border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* About */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Organizon Organics</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pure, farm-sourced organic foods grown naturally by trusted Indian farmers.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
              <p className="text-sm text-slate-600">📞 WhatsApp: +91 XXXXXXXXXX</p>
              <p className="text-sm text-slate-600">✉️ Email: support@organizon.in</p>
              <p className="text-sm text-slate-600">🪪 FSSAI: XXXXXXXXXXXXXX</p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
              <ul className="space-y-1 text-sm text-slate-600">
                <li><Link href="/about" className="hover:text-organicGreen">About Us</Link></li>
                <li><Link href="/policies/shipping" className="hover:text-organicGreen">Shipping Policy</Link></li>
                <li><Link href="/policies/returns" className="hover:text-organicGreen">Return Policy</Link></li>
                <li><Link href="/policies/privacy" className="hover:text-organicGreen">Privacy Policy</Link></li>
              </ul>
            </div>

          </div>

          {/* Footer Bottom */}
          <div className="text-center py-4 text-xs text-slate-400 border-t">
            © {new Date().getFullYear()} Organizon Organics. All rights reserved.
          </div>
        </footer>

      </body>
    </html>
  );
}
