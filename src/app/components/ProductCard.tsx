import PlaceholderImage from './PlaceholderImage';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full h-64 bg-gray-200">
          <PlaceholderImage />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="text-gray-600 mt-2">₹{product.price.toFixed(2)}</p>
        </div>
      </Link>
      <div className="p-4 border-t">
        <button className="w-full bg-organicGreen text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
