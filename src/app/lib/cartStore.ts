import { create } from 'zustand';
import toast from 'react-hot-toast';
import { persist, createJSONStorage } from 'zustand/middleware';
import { auth } from './firebaseClient'; // Import Firebase auth

export interface Product {
  _id: string;
  name: string;
  price: number;
  images?: string[];
  imageUrl?: string;
  unit?: string;
  stock?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setCart: (items: CartItem[]) => void; // New method to set the entire cart
}

let debounceTimer: NodeJS.Timeout; // For debouncing API calls

const saveCartToBackend = async (cartItems: CartItem[]) => {
  const user = auth.currentUser;
  if (user) {
    const idToken = await user.getIdToken();
    await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
      body: JSON.stringify({ items: cartItems }),
    });
  }
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find((i) => i._id === product._id);
          if (existingItem) {
            toast.success(`${product.name} added to cart`);
            const updatedItems = state.items.map((i) =>
              i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i
            );
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => saveCartToBackend(updatedItems), 500);
            return { items: updatedItems };
          }
          toast.success(`${product.name} added to cart`);
          const newItems = [...state.items, { ...product, quantity: 1 }];
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => saveCartToBackend(newItems), 500);
          return { items: newItems };
        }),
      removeFromCart: (id) =>
        set((state) => {
          const updatedItems = state.items.filter((i) => i._id !== id);
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => saveCartToBackend(updatedItems), 500);
          return { items: updatedItems };
        }),
      updateQuantity: (id, quantity) =>
        set((state) => {
          const updatedItems = state.items.map((i) => (i._id === id ? { ...i, quantity } : i));
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => saveCartToBackend(updatedItems), 500);
          return { items: updatedItems };
        }),
      clearCart: () => {
        set({ items: [] });
        // Optionally clear the backend cart as well, if user logs out explicitly
        // (Consider user experience: do we want to clear server cart on explicit clear or only on logout?)
        const user = auth.currentUser;
        if (user) {
          user.getIdToken().then(idToken => {
            fetch('/api/cart', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`,
              },
              body: JSON.stringify({ items: [] }),
            });
          });
        }
      },
      setCart: (items) => {
        set({ items });
        // When setting cart from backend, no need to save back immediately
      },
    }),
    {
      name: 'cart-storage', // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);