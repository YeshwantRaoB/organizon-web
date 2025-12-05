"use client";

import Link from 'next/link';

// Mock data for cart items
const cartItems = [
  {
    id: '1',
    name: 'Organic Basmati Rice',
    price: 150,
    quantity: 2,
    imageUrl: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'Cold-Pressed Coconut Oil',
    price: 350,
    quantity: 1,
    imageUrl: '/placeholder.svg',
  },
];

export default function CartPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your cart is empty.</p>
          <Link href="/catalog" className="text-organicGreen hover:underline mt-4 inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
            <ul className="divide-y divide-gray-200">
              {cartItems.map(item => (
                <li key={item.id} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-1 bg-white border rounded-lg p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>₹{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Tax (5%)</p>
                <p>₹{tax.toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <p>Total</p>
                <p>₹{total.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-6">
              <button className="w-full bg-organicGreen text-white py-3 rounded-md hover:bg-green-600 transition-colors duration-300">
                Proceed to Checkout
              </button>
              <Link href="/catalog" className="text-organicGreen hover:underline mt-4 inline-block text-center w-full">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
