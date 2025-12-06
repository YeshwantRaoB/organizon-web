"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '../lib/cartStore';

export default function CartPage() {
  const { items: cartItems, removeFromCart, updateQuantity } = useCartStore();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05; // 5% tax
  const shipping = subtotal >= 500 ? 0 : 50; // Free shipping over ₹500
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-organicCream py-8 md:py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg className="w-24 h-24 mx-auto mb-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you have not added anything to your cart yet.</p>
            <Link 
              href="/catalog" 
              className="inline-block bg-organicGreen hover:bg-organicGreenLight text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Cart Items ({cartItems.length})</h2>
                <div className="space-y-6">
                  {cartItems.map(item => (
                    <div key={item._id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                      <div className="relative w-full sm:w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image 
                          src={item.images?.[0] || item.imageUrl || '/product-image.webp'} 
                          alt={item.name} 
                          fill
                          className="object-cover" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                        {item.unit && (
                          <p className="text-sm text-gray-500 mb-3">Unit: {item.unit}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700">Quantity:</label>
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item._id, Math.max(1, parseInt(e.target.value, 10) || 1))}
                                className="w-12 h-8 text-center border-0 focus:outline-none focus:ring-0 text-sm font-medium"
                                min="1"
                              />
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item._id)} 
                            className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} each</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (5%)</span>
                    <span className="font-medium">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `₹${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {subtotal < 500 && (
                    <p className="text-sm text-organicGreen bg-green-50 p-2 rounded-md">
                      Add ₹{(500 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-organicGreen">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-organicGreen hover:bg-organicGreenLight text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] mb-4">
                  Proceed to Checkout
                </button>
                <Link 
                  href="/catalog" 
                  className="block w-full text-center text-organicGreen hover:text-organicGreenLight font-medium py-2 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
