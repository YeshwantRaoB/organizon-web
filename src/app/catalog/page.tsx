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
    <div className="bg-organicCream min-h-screen py-8 md:py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Page Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-3">Our Products</h1>
          <p className="text-base md:text-lg text-gray-600">Discover our range of 100% organic, farm-sourced products</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Filters</h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Category</h4>
                <div className="space-y-1.5">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-organicGreen text-white font-semibold shadow-md'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-organicGreen'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-organicGreen/50 focus:border-organicGreen bg-white"
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
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm md:text-base text-gray-600 font-medium">
                Showing <span className="font-bold text-gray-900">{sortedProducts.length}</span> product{sortedProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <svg className="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try selecting a different category.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
