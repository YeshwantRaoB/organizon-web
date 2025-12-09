export interface ProductFormData {
  images?: string[];
  sku: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  unit: string;
}

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  images?: string[];
  imageUrl?: string;
  unit?: string;
  stock?: number;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  updatedAt: Date;
}
