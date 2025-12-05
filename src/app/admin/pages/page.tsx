"use client";

import { useState } from "react";
import Link from "next/link";
import ProtectedClient from "../../components/ProtectedClient";

const pages = [
  { path: "/", name: "Homepage", description: "Main landing page with hero section" },
  { path: "/catalog", name: "Product Catalog", description: "Browse all products" },
  { path: "/about", name: "About Us", description: "Company story and values" },
  { path: "/contact", name: "Contact", description: "Contact form and information" },
  { path: "/gallery", name: "Gallery", description: "Image gallery" },
  { path: "/faq", name: "FAQ", description: "Frequently asked questions" },
  { path: "/policies/shipping", name: "Shipping Policy", description: "Shipping information" },
  { path: "/policies/returns", name: "Returns Policy", description: "Return and refund policy" },
  { path: "/policies/privacy", name: "Privacy Policy", description: "Privacy and data protection" },
  { path: "/policies/terms", name: "Terms of Service", description: "Terms and conditions" },
];

export default function PagesManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPages = pages.filter(
    (page) =>
      page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.path.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedClient>
      <div className="min-h-screen bg-[#f8f9f5]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link
                href="/admin"
                className="p-2 hover:bg-gray-200 rounded-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Page Management</h1>
                <p className="text-gray-600 mt-1">Edit content and customize your website pages</p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Pages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPages.map((page) => (
              <div
                key={page.path}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{page.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{page.description}</p>
                    <p className="text-xs text-gray-400 font-mono">{page.path}</p>
                  </div>
                  <div className="w-10 h-10 bg-[#2d5016] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/admin/pages/edit?path=${encodeURIComponent(page.path)}`}
                    className="flex-1 px-4 py-2 bg-[#2d5016] text-white rounded-md hover:bg-[#234012] transition-colors text-center text-sm font-medium"
                  >
                    Edit Page
                  </Link>
                  <Link
                    href={page.path}
                    target="_blank"
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-center text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredPages.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-600">No pages found matching "{searchTerm}"</p>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-blue-900 mb-2">About Page Editing</h3>
                <p className="text-sm text-blue-800 mb-2">
                  Click "Edit Page" to customize the content, images, and layout of each page. Changes are saved automatically and will be visible to all visitors.
                </p>
                <p className="text-sm text-blue-800">
                  You can edit text, upload images, change colors, and modify the structure of each page to match your brand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedClient>
  );
}
