"use client";

import { useEffect, useState } from 'react';

interface Product {
  _id: string;
  name: string;
  images: string[];
}

export default function GalleryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Product Gallery</h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading gallery...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.flatMap(p => p.images.map((image, index) => (
            <div key={`${p._id}-${index}`} className="group relative aspect-square overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={`${p.name} image ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-center text-sm font-semibold p-2">{p.name}</p>
              </div>
            </div>
          )))}
        </div>
      )}
    </div>
  );
}
