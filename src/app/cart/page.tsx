"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '../lib/cartStore';

export default function CartPage() {
  const { items: cartItems, removeFromCart, updateQuantity } = useCartStore();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your cart is empty.</p>
          <Link href="/catalog" className="text-primary hover:underline mt-4 inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
            <ul className="divide-y divide-border">
              {cartItems.map(item => (
                <li key={item._id} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <Image src={item.images?.[0] || '/hero.png'} alt={item.name} width={80} height={80} className="object-cover rounded-md bg-muted" />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item._id, Math.max(1, parseInt(e.target.value, 10)))}
                          className="w-16 text-center border rounded-md bg-background"
                          min="1"
                        />
                        <button onClick={() => removeFromCart(item._id)} className="text-destructive hover:underline text-sm">Remove</button>
                      </div>
                    </div>
                  </div>
                  <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-1 bg-card border rounded-lg p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <p>₹{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Tax (5%)</p>
                <p>₹{tax.toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-border pt-2 mt-2">
                <p>Total</p>
                <p>₹{total.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-6">
              <button className="w-full bg-primary text-primary-foreground py-3 rounded-md hover:bg-primary/90 transition-colors duration-300">
                Proceed to Checkout
              </button>
              <Link href="/catalog" className="text-primary hover:underline mt-4 inline-block text-center w-full">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
