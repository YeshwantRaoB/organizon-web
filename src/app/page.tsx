import Link from 'next/link';
import PlaceholderImage from './components/PlaceholderImage';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section with Large Image */}
      <section className="relative w-full bg-[#f8f9f5]">
        <div className="max-w-[1400px] mx-auto">
          {/* Hero Image Placeholder */}
          <div className="relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-green-50 to-green-100">
            <PlaceholderImage width="100%" height="100%" />
          </div>
        </div>
      </section>

      {/* Main Content Section with Images and Text */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
            {/* Left Image */}
            <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg overflow-hidden shadow-lg">
              <PlaceholderImage width="100%" height="100%" />
            </div>
            
            {/* Right Image */}
            <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-green-50 to-green-100 rounded-lg overflow-hidden shadow-lg">
              <PlaceholderImage width="100%" height="100%" />
            </div>
          </div>

          {/* Text Content Section */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Grown Naturally. Delivered Pure
            </h2>
            
            <div className="space-y-6 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Organizon Organics is not just a brand — it's our commitment to purity, people, and the planet.
              </p>
              <p>
                We partner directly with trusted Indian farmers who follow natural, chemical-free farming practices without pesticides or genetically modified seeds. Our mission is to bring clean, nutritious, and honest food from the farm to your family, ensuring optimal health, sustainability, and true organic goodness in every pack.
              </p>
            </div>

            <div className="mt-10">
              <Link 
                href="/catalog" 
                className="inline-block bg-[#2d5016] hover:bg-[#3d6820] text-white font-semibold text-lg px-10 py-4 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#f8f9f5]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#2d5016]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Organic</h3>
              <p className="text-gray-600">No chemicals, no pesticides. Just pure, natural goodness from certified organic farms.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#2d5016]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Farm-Sourced</h3>
              <p className="text-gray-600">Directly from our trusted network of local Indian farmers who care about the land.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#2d5016]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Assured</h3>
              <p className="text-gray-600">Every product is tested for purity and quality to ensure you get the best.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

