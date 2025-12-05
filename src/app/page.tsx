import ProductCard from './components/ProductCard';

const featuredProducts = [
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
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">100% Organic, Straight from the Farm</h1>
          <p className="text-lg text-gray-600 mb-8">Pure, healthy, and natural products for a better you.</p>
          <a href="/catalog" className="bg-organicGreen text-white py-3 px-8 rounded-md text-lg font-semibold hover:bg-green-600 transition-colors duration-300">
            Shop Now
          </a>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">100% Organic</h3>
            <p className="text-gray-600">No chemicals, no pesticides. Just pure, natural goodness.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Farm-Sourced</h3>
            <p className="text-gray-600">Directly from our trusted network of local farmers.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Assured</h3>
            <p className="text-gray-600">Every product is tested for purity and quality.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

