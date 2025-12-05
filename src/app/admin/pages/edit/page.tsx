"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProtectedClient from "../../../components/ProtectedClient";

function PageEditorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pagePath = searchParams?.get("path") || "/";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageData, setPageData] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadPageData() {
      try {
        const res = await fetch(`/api/admin/pages?path=${encodeURIComponent(pagePath)}`);
        const data = await res.json();
        
        if (res.ok) {
          setPageData(data.page);
        } else {
          // Initialize with default structure
          setPageData({
            path: pagePath,
            title: getPageTitle(pagePath),
            sections: [],
          });
        }
      } catch (error) {
        console.error("Error loading page:", error);
        setPageData({
          path: pagePath,
          title: getPageTitle(pagePath),
          sections: [],
        });
      } finally {
        setLoading(false);
      }
    }

    loadPageData();
  }, [pagePath]);

  function getPageTitle(path: string) {
    const titles: Record<string, string> = {
      "/": "Homepage",
      "/catalog": "Product Catalog",
      "/about": "About Us",
      "/contact": "Contact",
      "/gallery": "Gallery",
      "/faq": "FAQ",
      "/policies/shipping": "Shipping Policy",
      "/policies/returns": "Returns Policy",
      "/policies/privacy": "Privacy Policy",
      "/policies/terms": "Terms of Service",
    };
    return titles[path] || "Page";
  }

  async function handleSave() {
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageData),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Failed to save page");
      }
    } catch (error) {
      console.error("Error saving page:", error);
      alert("Error saving page");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9f5] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#2d5016]"></div>
          <p className="mt-4 text-gray-600">Loading page editor...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedClient>
      <div className="min-h-screen bg-[#f8f9f5]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Link
                  href="/admin/pages"
                  className="p-2 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">Edit Page</h1>
                  <p className="text-gray-600 mt-1">{pageData?.title || "Page Editor"}</p>
                  <p className="text-sm text-gray-400 font-mono mt-1">{pagePath}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href={pagePath}
                  target="_blank"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Preview
                </Link>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2 bg-[#2d5016] text-white rounded-md hover:bg-[#234012] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-green-800 font-medium">Page saved successfully!</p>
              </div>
            )}
          </div>

          {/* Editor Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-6">
              {/* Page Settings */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Page Settings</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Page Title
                    </label>
                    <input
                      type="text"
                      value={pageData?.title || ""}
                      onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                      placeholder="Enter page title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meta Description
                    </label>
                    <textarea
                      value={pageData?.metaDescription || ""}
                      onChange={(e) => setPageData({ ...pageData, metaDescription: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                      placeholder="Enter meta description for SEO"
                    />
                  </div>
                </div>
              </div>

              {/* Content Editor */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Page Content</h2>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex gap-3">
                    <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-yellow-800 font-medium mb-1">Visual Page Builder Coming Soon</p>
                      <p className="text-sm text-yellow-700">
                        For now, you can edit page content by modifying the source files directly. A drag-and-drop page builder will be available in the next update.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Page Content (HTML)
                    </label>
                    <textarea
                      value={pageData?.content || ""}
                      onChange={(e) => setPageData({ ...pageData, content: e.target.value })}
                      rows={15}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d5016] font-mono text-sm"
                      placeholder="Enter HTML content or use the visual editor (coming soon)"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 text-left text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Add Image
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Add Video
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Add Section
                  </button>
                </div>
              </div>

              {/* Page Info */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Page Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Path</p>
                    <p className="font-mono text-gray-900">{pagePath}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status</p>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Published
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600">Last Modified</p>
                    <p className="text-gray-900">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Help */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-blue-900 mb-2">Need Help?</h3>
                <p className="text-sm text-blue-800 mb-3">
                  Learn how to customize your pages effectively.
                </p>
                <Link
                  href="/admin/help"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Documentation →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedClient>
  );
}

export default function PageEditor() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f8f9f5] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#2d5016]"></div>
          <p className="mt-4 text-gray-600">Loading editor...</p>
        </div>
      </div>
    }>
      <PageEditorContent />
    </Suspense>
  );
}
