import ProductCard from '../components/ProductCard';

const products = [
  {
    id: '1',
    name: 'Organic Basmati Rice',
    price: 150,
    imageUrl: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'Cold-Pressed Coconut Oil',
    price: 350,
    imageUrl: '/placeholder.svg',
  },
  {
    id: '3',
    name: 'Himalayan Pink Salt',
    price: 120,
    imageUrl: '/placeholder.svg',
  },
  {
    id: '4',
    name: 'Organic Turmeric Powder',
    price: 80,
    imageUrl: '/placeholder.svg',
  },
  {
    id: '5',
    name: 'Raw Wild Honey',
    price: 450,
    imageUrl: '/placeholder.svg',
  },
  {
    id: '6',
    name: 'Organic Jaggery',
    price: 90,
    imageUrl: '/placeholder.svg',
  },
  {
    id: '7',
    name: 'A2 Desi Ghee',
    price: 850,
    imageUrl: '/placeholder.svg',
  },
  {
    id: '8',
    name: 'Mixed Millets',
    price: 110,
    imageUrl: '/placeholder.svg',
  },
];

export default function CatalogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Products</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            {/* Add filter options here */}
            <p className="text-sm text-gray-500">Filter options coming soon.</p>
          </div>
        </aside>
        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
