import { create } from 'zustand';
import toast from 'react-hot-toast';

export interface Product {
  _id: string;
  name: string;
  price: number;
  images?: string[];
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
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.items.find((i) => i._id === product._id);
      if (existingItem) {
        toast.success(`${product.name} added to cart`);
        return {
          items: state.items.map((i) =>
            i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      toast.success(`${product.name} added to cart`);
      return { items: [...state.items, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (id) =>
    set((state) => ({ items: state.items.filter((i) => i._id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) => (i._id === id ? { ...i, quantity } : i)),
    })),
  clearCart: () => set({ items: [] }),
}));
