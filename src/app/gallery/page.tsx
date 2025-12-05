"use client";

import { useEffect, useState } from 'react';
import PlaceholderImage from '../components/PlaceholderImage';

interface Product {
  _id: string;
  name: string;
  images: string[];
}

export default function GalleryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products?limit=50');
        const data = await res.json();
        if (data.ok) {
          setProducts(data.items);
        }
      } catch (error) {
        console.error('Failed to fetch products for gallery:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const allImages = products.flatMap(p => 
    p.images.map((image, index) => ({
      url: image,
      productName: p.name,
      id: `${p._id}-${index}`
    }))
  );

  return (
    <div className="bg-[#f8f9f5] min-h-screen py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Gallery</h1>
          <p className="text-lg text-gray-600">
            Explore our collection of 100% organic products
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#2d5016]"></div>
            <p className="mt-4 text-gray-600">Loading gallery...</p>
          </div>
        ) : allImages.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allImages.map((item) => (
              <div 
                key={item.id} 
                className="group relative aspect-square overflow-hidden rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage(item.url)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={`${item.productName}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-center text-sm font-semibold p-3 w-full">{item.productName}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <PlaceholderImage height="200px" text="No images yet" />
              <p className="mt-4 text-gray-600">No product images available yet. Check back soon!</p>
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage}
              alt="Full size"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </div>
  );
}
