'use client';

import Link from 'next/link';
import PlaceholderImage from './components/PlaceholderImage';
import ProductCard from './components/ProductCard';
import { useEffect, useState } from 'react';

interface Product {
  _id?: string;
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  unit?: string;
  stock?: number;
}

export default function Home() {
  const [topProducts, setTopProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch top selling products
    fetch('/api/products?limit=4')
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setTopProducts(data.products.slice(0, 4));
        }
      })
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section with Large Image */}
      <section className="relative w-full bg-organicCream overflow-hidden">
        <div className="relative w-full h-[500px] md:h-[600px]">
          <img
            src="/hero.png"
            alt="Organizon Organics - Pure Organic Foods"
            className="w-full h-full object-cover filter blur-[1px] brightness-50"
          />
          {/* Organic leaf decorations */}
          <div className="absolute top-8 left-8 opacity-20 animate-fade-in">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="#2d5016">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4L19 9Z"/>
            </svg>
          </div>
          <div className="absolute bottom-8 right-8 opacity-20 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <svg width="50" height="50" viewBox="0 0 24 24" fill="#2d5016">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4L19 9Z"/>
            </svg>
          </div>
          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4 md:px-8 max-w-4xl animate-slide-up">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight drop-shadow-lg">
                  &ldquo;Where Every Grain Has a Story&rdquo;
                </h1>
                <p className="text-sm md:text-base lg:text-lg mb-8 leading-relaxed drop-shadow-md font-light">
                  We partner with real Indian farmers to bring you pure, natural, farm-grown Jaggery, Rice, Millets, Honey & Oils.
                </p>
              <Link
                href="/catalog"
                className="inline-block bg-organicGreen hover:bg-organicGreenLight text-white font-semibold text-base px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-organicGreen/50"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Farmers Section */}
      <section className="py-16 md:py-20 bg-organicCream">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg animate-scale-in">
              <img
                src="//organizonorganics.myshopify.com/cdn/shop/files/Yellow_And_Green_Traditional_Indian_Farmer_YouTube_Thumbnail_1.png?v=1764692208&width=3840"
                alt="Indian farmers working in organic fields"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="animate-slide-up">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                Meet Our Farmers
              </h2>
              <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  Our story begins with the hardworking farmers of India who have been cultivating the land with traditional wisdom for generations. These are real people, real families, who understand that healthy soil produces healthy food.
                </p>
                <p>
                  We partner directly with these farmers, ensuring fair prices and sustainable practices. No middlemen, no compromises — just pure, honest relationships built on trust and mutual respect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="animate-slide-up order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                Pure, Natural Products
              </h2>
              <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  From farm to table, our products maintain their natural integrity. We carefully select only the finest organic ingredients, processing them with traditional methods that preserve nutrients and flavor.
                </p>
                <p>
                  Each product tells a story of dedication, care, and commitment to quality. Taste the difference that comes from foods grown with love and harvested at peak ripeness.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/catalog"
                  className="inline-block bg-organicGreen hover:bg-organicGreenLight text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-organicGreen/50"
                >
                  Explore Our Products
                </Link>
              </div>
            </div>

            <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg animate-scale-in order-1 lg:order-2" style={{animationDelay: '0.2s'}}>
              <img
                src="//organizonorganics.myshopify.com/cdn/shop/files/ChatGPT_Image_Dec_2_2025_10_04_27_PM.png?v=1764693292&width=1500"
                alt="Organic products from Organizon"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-16 md:py-20 bg-organicCream">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-8 leading-tight">
              Grown Naturally. Delivered Pure
            </h2>

            <div className="space-y-6 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Organizon Organics is not just a brand — it&apos;s our commitment to purity, people, and the planet.
              </p>
              <p>
                We partner directly with trusted Indian farmers who follow natural, chemical-free farming practices without pesticides or genetically modified seeds. Our mission is to bring clean, nutritious, and honest food from the farm to your family, ensuring optimal health, sustainability, and true organic goodness in every pack.
              </p>
            </div>

            <div className="mt-10">
              <Link
                href="/catalog"
                className="inline-block bg-organicGreen hover:bg-organicGreenLight text-white font-semibold text-lg px-10 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-organicGreen/50"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-white relative overflow-hidden">
        {/* Subtle leaf pattern background */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="leafPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10 5 Q15 0 20 5 Q15 10 10 5" fill="#2d5016" opacity="0.1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#leafPattern)"/>
          </svg>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
              Why Choose Organizon Organics
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the difference that comes from our commitment to purity, sustainability, and authentic organic farming practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center p-8 bg-organicCream rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group animate-slide-up">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-organicGreen to-organicGreenLight rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">100% Organic</h3>
              <p className="text-gray-700 leading-relaxed">No chemicals, no pesticides. Just pure, natural goodness from certified organic farms that follow traditional farming wisdom.</p>
            </div>

            <div className="text-center p-8 bg-organicCream rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-organicGreen to-organicGreenLight rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Farm-Sourced</h3>
              <p className="text-gray-700 leading-relaxed">Directly from our trusted network of local Indian farmers who have been cultivating the land with care for generations.</p>
            </div>

            <div className="text-center p-8 bg-organicCream rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-organicGreen to-organicGreenLight rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Quality Assured</h3>
              <p className="text-gray-700 leading-relaxed">Every product undergoes rigorous testing for purity, nutritional value, and quality to ensure you receive only the best.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Selling Products Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Top Selling Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular organic products, loved by customers across India
            </p>
          </div>

          {topProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {topProducts.map((product: Product, index: number) => (
                <div key={product._id || product.id} className="animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="animate-pulse">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-200 rounded-lg h-80 animate-scale-in" style={{animationDelay: `${i * 0.1}s`}}></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-12 animate-fade-in" style={{animationDelay: '0.5s'}}>
            <Link
              href="/catalog"
              className="inline-block bg-organicGreen hover:bg-organicGreenLight text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-organicGreen/50"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

