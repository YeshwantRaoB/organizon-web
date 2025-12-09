import PlaceholderImage from './PlaceholderImage';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '../lib/cartStore';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    unit?: string;
    stock?: number;
    images?: string[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore();
  const imageUrl = product.imageUrl || product.images?.[0];
  const isOutOfStock = product.stock === 0;

  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      <Link href={`/products/${product.id}`} className="flex-1 flex flex-col">
        <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
          {imageUrl ? (
            <Image 
              src={imageUrl} 
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="group-hover:scale-110 transition-transform duration-500">
              <PlaceholderImage width="100%" height="100%" text={product.name} />
            </div>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-organicGreen transition-colors min-h-[3.5rem]">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-bold text-organicGreen">₹{product.price.toFixed(2)}</span>
            {product.unit && (
              <span className="text-sm text-gray-500">/ {product.unit}</span>
            )}
          </div>
          {product.stock !== undefined && product.stock > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-3">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-600 font-medium">{product.stock} in stock</span>
            </div>
          )}
        </div>
      </Link>
      <div className="px-5 pb-5">
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart({ ...product, _id: product.id });
          }}
          className="w-full bg-organicGreen hover:bg-organicGreenLight text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none disabled:hover:bg-gray-400"
          disabled={isOutOfStock}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
