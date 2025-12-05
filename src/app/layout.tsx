// src/app/layout.tsx

import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// Make sure this path matches your folder structure
import SignInButton from "./components/SignInButton";

export const metadata = {
  title: "Organizon Organics",
  description: "100% organic farm-sourced foods — rice, millets, oils, spices, honey & more.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gradient-to-b from-white to-[#F7FFF7] text-slate-900`}>

        {/* ---------------------- HEADER ---------------------- */}
        <header className="bg-white shadow-md sticky top-0 z-50">
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

            {/* Social Media and Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-slate-600 hover:text-organicGreen"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                <a href="#" className="text-slate-600 hover:text-organicGreen"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 2.8 3.2 2.8 5.1 0 1.4-.5 2.7-1.5 3.7-1.1 1-2.5 1.6-4 1.6h-1.3c-1.2 0-2.3-.5-3.2-1.3-.8-.8-1.3-1.9-1.3-3.1 0-1.2.5-2.3 1.3-3.2.8-.8 1.9-1.3 3.2-1.3H18c.6 0 1.2.2 1.6.6.4.4.6 1 .6 1.6 0 .6-.2 1.2-.6 1.6-.4.4-1 0.6-1.6.6h-1.3c-.6 0-1.2-.2-1.6-.6-.4-.4-.6-1-.6-1.6s.2-1.2.6-1.6c.4-.4 1-.6 1.6-.6H18c1.7 0 3.3-1.4 3.3-3.3S19.7 4 18 4h-1.3c-1.7 0-3.3 1.4-3.3 3.3 0 .6.2 1.2.6 1.6.4.4 1 .6 1.6.6h1.3c.6 0 1.2-.2 1.6-.6.4-.4.6-1 .6-1.6s-.2-1.2-.6-1.6c-.4-.4-1-.6-1.6-.6H15c-2.8 0-5 2.2-5 5s2.2 5 5 5h1.3c2.8 0 5-2.2 5-5 0-1.9-1.2-3.5-2.8-4.6z"></path></svg></a>
                <a href="#" className="text-slate-600 hover:text-organicGreen"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></a>
              </div>
              <h3 className="font-semibold text-lg mb-2 mt-4">Quick Links</h3>
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
