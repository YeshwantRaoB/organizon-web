import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Inter, Playfair_Display } from 'next/font/google';
import SignInButton from "./components/SignInButton";
import AdminBar from "./components/AdminBar";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700']
});

export const metadata = {
  title: "Organizon Organics - Pure Organic Foods from Farm to Family",
  description: "100% organic farm-sourced foods — rice, millets, oils, spices, honey & more. Grown naturally by trusted Indian farmers.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.variable} min-h-screen flex flex-col bg-white text-gray-900`}>

        {/* Header */}
        <header className="bg-white/95 backdrop-blur-sm border-b border-organicGreen/20 sticky top-0 z-50 shadow-sm">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            {/* Top Bar */}
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="/logo.jpg"
                    alt="Organizon Organics Logo"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 tracking-tight">Organizon Organics</h1>
                  <p className="text-xs text-gray-500">Pure. Natural. Organic.</p>
                </div>
              </Link>

              {/* Search Bar */}
              <div className="hidden md:block flex-1 max-w-md mx-8">
                <form action="/search" method="get" className="relative">
                  <input
                    type="text"
                    name="q"
                    placeholder="Search organic products..."
                    className="w-full px-4 py-2 pr-10 text-sm border border-organicGreen/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-organicGreen focus:border-organicGreen/50 bg-organicCream/50"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-organicGreen transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>
              </div>

              {/* Navigation */}
              <Navbar />

              {/* Right Side Actions */}
              <div className="flex items-center gap-4">
                <Link
                  href="/cart"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-organicGreen transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="hidden sm:inline">Cart</span>
                </Link>
                <SignInButton />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Admin Bar (only visible to admins) */}
        <AdminBar />

        {/* Footer */}
        <footer className="bg-gradient-to-br from-organicGreen via-organicGreen to-organicGreenDark text-white mt-20 relative overflow-hidden">
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="footerTexture" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="1" fill="white" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#footerTexture)"/>
            </svg>
          </div>

          <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              
              {/* About */}
              <div>
                <h3 className="font-bold text-lg mb-4">Organizon Organics</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Pure, farm-sourced organic foods grown naturally by trusted Indian farmers. Our commitment to purity, people, and the planet.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link href="/catalog" className="hover:text-white transition-colors">Shop All Products</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                </ul>
              </div>

              {/* Policies */}
              <div>
                <h3 className="font-bold text-lg mb-4">Policies</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link href="/policies/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                  <li><Link href="/policies/returns" className="hover:text-white transition-colors">Return & Refund</Link></li>
                  <li><Link href="/policies/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/policies/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>📞 WhatsApp: +91 XXXXXXXXXX</li>
                  <li>✉️ support@organizon.in</li>
                  <li>🪪 FSSAI: XXXXXXXXXXXXXX</li>
                </ul>
                <div className="flex gap-4 mt-4">
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="border-t border-green-700 pt-8 mb-8">
              <div className="text-center">
                <h3 className="text-xl font-serif font-bold mb-4">Stay Connected with Nature</h3>
                <p className="text-green-100 mb-6 max-w-md mx-auto">Subscribe to receive updates on new organic products, farming stories, and exclusive offers.</p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="bg-white text-organicGreen font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition-colors duration-300 shadow-lg">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-green-700 pt-8 text-center">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-green-100">© {new Date().getFullYear()} Organizon Organics. All rights reserved.</p>
                <div className="flex items-center gap-2 text-sm text-green-100">
                  <span>Made with</span>
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span>for organic living</span>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
