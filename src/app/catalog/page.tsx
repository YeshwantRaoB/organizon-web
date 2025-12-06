'use client';

import { useState } from 'react';
import ProductCard from '../components/ProductCard';

const products = [
  {
    id: '1',
    name: 'Organic Basmati Rice',
    price: 150,
    unit: '1 kg',
    stock: 50,
    category: 'Rice & Grains',
  },
  {
    id: '2',
    name: 'Cold-Pressed Coconut Oil',
    price: 350,
    unit: '500 ml',
    stock: 30,
    category: 'Oils',
  },
  {
    id: '3',
    name: 'Himalayan Pink Salt',
    price: 120,
    unit: '500 g',
    stock: 100,
    category: 'Spices & Condiments',
  },
  {
    id: '4',
    name: 'Organic Turmeric Powder',
    price: 80,
    unit: '200 g',
    stock: 75,
    category: 'Spices & Condiments',
  },
  {
    id: '5',
    name: 'Raw Wild Honey',
    price: 450,
    unit: '500 g',
    stock: 25,
    category: 'Sweeteners',
  },
  {
    id: '6',
    name: 'Organic Jaggery',
    price: 90,
    unit: '500 g',
    stock: 60,
    category: 'Sweeteners',
  },
  {
    id: '7',
    name: 'A2 Desi Ghee',
    price: 850,
    unit: '500 ml',
    stock: 20,
    category: 'Dairy',
  },
  {
    id: '8',
    name: 'Mixed Millets',
    price: 110,
    unit: '1 kg',
    stock: 45,
    category: 'Rice & Grains',
  },
];

const categories = ['All', 'Rice & Grains', 'Oils', 'Spices & Condiments', 'Sweeteners', 'Dairy'];

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('name');

  const filteredProducts = products.filter(
    (product) => selectedCategory === 'All' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="bg-[#f8f9f5] min-h-screen py-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">Discover our range of 100% organic, farm-sourced products</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-[#2d5016] text-white font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5016] focus:border-transparent"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found in this category.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
