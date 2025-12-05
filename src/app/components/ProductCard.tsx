import PlaceholderImage from './PlaceholderImage';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
    unit?: string;
    stock?: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full h-72 bg-gray-100 overflow-hidden">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="group-hover:scale-105 transition-transform duration-300">
              <PlaceholderImage width="100%" height="100%" text={product.name} />
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#2d5016] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
            {product.unit && (
              <span className="text-sm text-gray-500">/ {product.unit}</span>
            )}
          </div>
          {product.stock !== undefined && (
            <p className="text-xs text-gray-500 mb-3">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>
          )}
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button 
          className="w-full bg-[#2d5016] text-white py-2.5 px-4 rounded-md font-medium hover:bg-[#3d6820] transition-all duration-300 shadow-sm hover:shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
