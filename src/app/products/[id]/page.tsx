'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import PlaceholderImage from '../../components/PlaceholderImage';
import { useCartStore } from '../../lib/cartStore';
import toast from 'react-hot-toast';

interface Product {
  _id: string;
  sku: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  unit: string;
  images: string[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        const data = await res.json();
        if (data.ok) {
          setProduct(data.product);
        } else {
          router.push('/catalog');
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
        router.push('/catalog');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id, router]);

  const handleAddToCart = () => {
    if (!product) return;
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        _id: product._id,
        id: product._id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        stock: product.stock,
        imageUrl: product.images?.[0],
        images: product.images,
        quantity: 1,
      });
    }
    
    setAddedToCart(true);
    toast.success(`Added ${quantity} ${product.name} to cart!`);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      router.push('/cart');
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9f5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2d5016]"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-organicCream py-8 md:py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 md:mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-600 hover:text-organicGreen transition-colors">Home</Link>
            </li>
            <li>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li>
              <Link href="/catalog" className="text-gray-600 hover:text-organicGreen transition-colors">Shop</Link>
            </li>
            <li>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-4">
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PlaceholderImage width="100%" height="100%" text={product.name} />
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 md:gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-organicGreen shadow-md ring-2 ring-organicGreen/20'
                        : 'border-gray-200 hover:border-organicGreen/50'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">{product.name}</h1>
            
            {/* Category Badge */}
            <div className="mb-6">
              <span className="inline-block bg-green-100 text-organicGreen text-sm font-semibold px-4 py-1.5 rounded-full">
                {product.category}
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl md:text-5xl font-bold text-organicGreen">₹{product.price.toFixed(2)}</span>
                <span className="text-lg md:text-xl text-gray-500">/ {product.unit}</span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <div className="flex items-center gap-2 text-green-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">In Stock ({product.stock} available)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description || 'No description available.'}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  disabled={product.stock === 0}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  disabled={product.stock === 0}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-organicGreen hover:bg-organicGreenLight text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {addedToCart ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Cart
                  </span>
                ) : (
                  'Add to Cart'
                )}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="w-full bg-white border-2 border-organicGreen text-organicGreen hover:bg-organicGreen hover:text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>

            {/* Product Features */}
            <div className="bg-green-50 rounded-xl p-6 space-y-4 border border-green-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-organicGreen rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">100% Organic</h3>
                  <p className="text-sm text-gray-600">Certified organic, no chemicals or pesticides</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-organicGreen rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Farm Fresh</h3>
                  <p className="text-sm text-gray-600">Directly sourced from trusted farmers</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-organicGreen rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Quality Assured</h3>
                  <p className="text-sm text-gray-600">Tested for purity and quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16 md:mt-20">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-600">Related products coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
